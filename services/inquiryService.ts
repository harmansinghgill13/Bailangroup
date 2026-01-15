
import { Inquiry } from '../types/inquiry';

/**
 * ---------------------------------------------------------
 * CONFIGURATION: GOOGLE SHEETS INTEGRATION
 * 1. Open your Google Sheet
 * 2. Extensions > Apps Script > Paste the "Master Script"
 * 3. Deploy > New Deployment > Web App > Access: "Anyone"
 * 4. Paste the URL below:
 * ---------------------------------------------------------
 */
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxMUl6je_QA5MDDKuNbxIsfk5in2laxZl1YkPqPYCUXSjFiivn3CSyPfXcKJ35zTAZt/exec';

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
    const tempId = 'BLN-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const timestamp = Date.now();
    const fullInquiry: Inquiry = { ...data, id: tempId, timestamp };

    // 1. Save locally for the device owner (Browser History)
    saveLocalInquiry(fullInquiry);

    // 2. Transmit to Google Sheet
    try {
      // We use 'no-cors' mode because Google Apps Script redirects can trigger CORS errors in browsers.
      // 'no-cors' will still send the data successfully to the sheet.
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(fullInquiry),
      });
      
      console.log(`Vault Synced: ${tempId} has been pushed to Google Sheet.`);
      return fullInquiry;
    } catch (err) {
      console.error("Vault Sync Error:", err);
      return fullInquiry;
    }
  },

  getAllInquiries: async (): Promise<Inquiry[]> => {
    // Returns local history for the Admin panel on this device
    const localInquiries = getLocalInquiries();
    return localInquiries.sort((a, b) => b.timestamp - a.timestamp);
  },

  deleteInquiry: async (id: string): Promise<void> => {
    const local = getLocalInquiries();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local.filter(i => i.id !== id)));
  }
};
