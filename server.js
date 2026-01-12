
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize db.json if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// GET all inquiries
app.get('/api/inquiries', (req, res) => {
  const data = fs.readFileSync(DB_FILE);
  const inquiries = JSON.parse(data);
  res.json(inquiries);
});

// POST a new inquiry
app.post('/api/inquiries', (req, res) => {
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
});

// DELETE an inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(DB_FILE);
  let inquiries = JSON.parse(data);
  
  const filteredInquiries = inquiries.filter(item => item.id !== id);
  fs.writeFileSync(DB_FILE, JSON.stringify(filteredInquiries, null, 2));
  
  res.status(200).json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`Your "Database" is saved in: ${DB_FILE}`);
});
