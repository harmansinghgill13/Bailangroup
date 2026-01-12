
import { Inquiry } from '../types/inquiry';

// In production, we use the same domain. In development, we use localhost:5000
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_URL = isProduction ? '/api/inquiries' : 'http://localhost:5000/api/inquiries';

const LOCAL_STORAGE_KEY = 'bailan_group_inquiries';

const getLocalInquiries = (): Inquiry[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalInquiry = (inquiry: Inquiry) => {
  const local = getLocalInquiries();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...local, inquiry]));
};

export const inquiryService = {
  saveInquiry: async (data: Omit<Inquiry, 'id' | 'timestamp'>): Promise<Inquiry> => {
    const tempId = Math.random().toString(36).substr(2, 9);
    const timestamp = Date.now();
    const fullInquiry: Inquiry = { ...data, id: tempId, timestamp };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Backend failed');
      return response.json();
    } catch (err) {
      console.warn("Backend offline. Saving lead to browser storage.");
      saveLocalInquiry(fullInquiry);
      return fullInquiry;
    }
  },

  getAllInquiries: async (): Promise<Inquiry[]> => {
    let serverInquiries: Inquiry[] = [];
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        serverInquiries = await response.json();
      }
    } catch (error) {
      console.error("Backend offline. Loading local data only.");
    }

    const localInquiries = getLocalInquiries();
    const all = [...serverInquiries, ...localInquiries];
    // Filter duplicates by ID
    const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
    return unique.sort((a, b) => b.timestamp - a.timestamp);
  },

  deleteInquiry: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Server delete failed');
    } catch (err) {
      const local = getLocalInquiries();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local.filter(i => i.id !== id)));
    }
  }
};
