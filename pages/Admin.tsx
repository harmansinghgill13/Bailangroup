
import React, { useState, useEffect } from 'react';
import { inquiryService } from '../services/inquiryService';
import { Inquiry } from '../types/inquiry';

const Admin: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const data = await inquiryService.getAllInquiries();
      if (data.length === 0 && inquiries.length === 0) {
        // Double check if it's actually empty or server is just down
        setServerStatus('offline');
      } else {
        setServerStatus('online');
      }
      setInquiries(data.sort((a, b) => b.timestamp - a.timestamp));
    } catch (err) {
      setServerStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this from the database?')) {
      try {
        await inquiryService.deleteInquiry(id);
        setInquiries(inquiries.filter(i => i.id !== id));
      } catch (err) {
        alert('Could not delete. Is the server running?');
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20 px-[6%]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#7A2318] font-black uppercase tracking-[0.3em] text-xs">Real-Time Management</span>
              <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-[10px] uppercase font-bold text-gray-400">{serverStatus}</span>
            </div>
            <h1 className="playfair text-6xl font-black text-gray-900 tracking-tighter">Admin Inbox</h1>
          </div>
          <button 
            onClick={fetchInquiries}
            className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all text-[10px] font-black uppercase tracking-widest"
          >
            Refresh Data ↺
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest animate-pulse">
            Loading from database...
          </div>
        ) : serverStatus === 'offline' && inquiries.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] shadow-sm text-center border-2 border-dashed border-red-100">
            <p className="text-red-400 font-bold uppercase tracking-widest mb-4">Backend Server Offline</p>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">Please run <code className="bg-gray-100 px-2 py-1 rounded">node server.js</code> in your terminal to see real inquiries.</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] shadow-sm text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest">Database is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="flex-grow space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="bg-[#7A2318]/10 text-[#7A2318] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {item.type}
                      </span>
                      <span className="text-gray-400 text-xs font-bold uppercase">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{item.firstName} {item.lastName}</h3>
                      <p className="text-[#7A2318] font-bold text-sm">{item.email}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group-hover:bg-[#7A2318]/[0.02] transition-colors">
                      <p className="text-gray-600 leading-relaxed italic">"{item.message}"</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="shrink-0 text-red-500 text-xs font-black uppercase tracking-widest border border-red-100 px-6 py-3 rounded-xl hover:bg-red-50 transition-all"
                  >
                    Delete Entry
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
