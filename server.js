
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize db.json if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// GET all inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE);
    const inquiries = JSON.parse(data);
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to read database" });
  }
});

// POST a new inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const newInquiry = {
      ...req.body,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };

    const data = fs.readFileSync(DB_FILE);
    const inquiries = JSON.parse(data);
    inquiries.push(newInquiry);

    fs.writeFileSync(DB_FILE, JSON.stringify(inquiries, null, 2));
    res.status(201).json(newInquiry);
  } catch (err) {
    res.status(500).json({ error: "Failed to save inquiry" });
  }
});

// DELETE an inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(DB_FILE);
    let inquiries = JSON.parse(data);
    
    const filteredInquiries = inquiries.filter(item => item.id !== id);
    fs.writeFileSync(DB_FILE, JSON.stringify(filteredInquiries, null, 2));
    
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
