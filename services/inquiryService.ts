
import { Inquiry } from '../types/inquiry';

const API_URL = 'http://localhost:5000/api/inquiries';

export const inquiryService = {
  // Sends the form data to the backend server
  saveInquiry: async (data: Omit<Inquiry, 'id' | 'timestamp'>): Promise<Inquiry> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save inquiry to the server');
    }
    
    return response.json();
  },

  // Fetches all inquiries from the backend database
  getAllInquiries: async (): Promise<Inquiry[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Could not fetch data');
      return response.json();
    } catch (error) {
      console.error("Backend offline? Use 'node server.js' to start it.");
      return []; // Return empty if server is down
    }
  },

  // Tells the backend to remove an inquiry
  deleteInquiry: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete inquiry');
    }
  }
};
