import React, { useState, useEffect } from 'react';
import { inquiryService } from '../services/inquiryService';
import { Inquiry } from '../types/inquiry';
import { GoogleGenAI } from "@google/genai";

const Admin: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('online');
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState(false);

  const MASTER_CODE = 'bailan2025';

  // Environment-aware API check
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const API_CHECK_URL = isProduction ? '/api/inquiries' : 'http://localhost:5000/api/inquiries';

  const fetchInquiries = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const data = await inquiryService.getAllInquiries();
      setInquiries(data);
      const resp = await fetch(API_CHECK_URL).catch(() => null);
      setServerStatus(resp?.ok ? 'online' : 'offline');
    } catch (err) {
      setServerStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === MASTER_CODE) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setAccessCode('');
    }
  };

  const analyzeLeadsWithAI = async () => {
    if (inquiries.length === 0) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are the Chief Strategy Officer for Bailan Group. 
        Analyze these ${inquiries.length} recent inquiries: ${JSON.stringify(inquiries.map(i => ({ name: i.firstName, type: i.type, msg: i.message })))}
        
        Provide a structured response:
        1. EXECUTIVE SUMMARY: High-level overview of lead quality.
        2. TIER 1 LEADS: List names of clients expressing urgent or high-value interest.
        3. STRATEGIC ACTIONS: 3 immediate next steps for the brokerage team.
        
        Tone: Professional, elite, and ultra-concise.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiAnalysis(response.text);
    } catch (err) {
      console.error("AI Analysis failed:", err);
      setAiAnalysis("Intelligence link failed. Please check your connectivity and API configuration.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Archive this client record? This will permanently remove it from the vault.')) {
      await inquiryService.deleteInquiry(id);
      setInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-12 text-center animate-reveal">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
               <div className="w-16 h-16 rounded-3xl bg-[#7A2318] flex items-center justify-center text-white text-2xl font-black italic">B</div>
            </div>
            <h1 className="playfair text-4xl font-black text-white tracking-tighter">Director Access</h1>
            <p className="text-white/40 text-sm font-light">Please enter your secure credentials to access the Bailan Intelligence Vault.</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" 
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="ENTER ACCESS CODE" 
              className={`w-full bg-white/5 border ${authError ? 'border-red-500' : 'border-white/10'} px-8 py-5 rounded-2xl text-white text-center tracking-[0.5em] focus:outline-none focus:border-[#7A2318] transition-all font-black text-xs uppercase placeholder:text-white/20`}
            />
            {authError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">Invalid Credentials</p>}
            <button className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#7A2318] hover:text-white transition-all">
              Initialize Connection
            </button>
          </form>
          
          <p className="text-white/10 text-[8px] font-black uppercase tracking-[0.3em]">Encrypted Session • Bailan Group Security Protocol v4.0</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-[6%]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-[10px]">Command Center</span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black border ${serverStatus === 'online' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${serverStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                VAULT {serverStatus.toUpperCase()}
              </div>
            </div>
            <h1 className="playfair text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none">Intelligence <br/>Vault.</h1>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={analyzeLeadsWithAI}
              disabled={isAnalyzing || inquiries.length === 0}
              className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-[10px] hover:bg-[#7A2318] transition-all disabled:opacity-50 shadow-xl"
            >
              {isAnalyzing ? <span className="animate-spin">🌀</span> : <span className="text-lg">✦</span>}
              {isAnalyzing ? "Analyzing..." : "AI Strategy"}
            </button>
            <button 
              onClick={fetchInquiries}
              className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100"
            >
              ↺
            </button>
          </div>
        </div>

        {aiAnalysis && (
          <div className="mb-16 bg-[#0A0A0A] text-white p-12 rounded-[50px] relative overflow-hidden animate-slide-up shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7A2318] blur-[120px] opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <span className="text-[#7A2318] text-2xl animate-pulse">✦</span>
                <h2 className="text-sm font-black uppercase tracking-[0.3em]">Bailan AI Strategy Report</h2>
                <button onClick={() => setAiAnalysis(null)} className="ml-auto text-white/30 hover:text-white transition-colors">✕</button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 leading-relaxed font-light whitespace-pre-line text-lg tracking-wide">
                  {aiAnalysis}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {isLoading ? (
            <div className="py-20 text-center space-y-6">
              <div className="w-12 h-12 border-4 border-[#7A2318]/20 border-t-[#7A2318] rounded-full animate-spin mx-auto"></div>
              <span className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px] block">Decrypting Records...</span>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-40 text-center bg-gray-50 rounded-[60px] border-2 border-dashed border-gray-200">
              <h2 className="text-2xl font-black text-gray-300">VAULT EMPTY</h2>
              <p className="text-gray-400 text-sm mt-2 font-medium">Awaiting new high-value property inquiries.</p>
            </div>
          ) : (
            inquiries.map((item, idx) => (
              <div key={item.id} className="group bg-white p-10 rounded-[45px] border border-gray-100 hover:border-[#7A2318]/30 hover:shadow-2xl transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/3 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#7A2318] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {item.type}
                      </span>
                      <span className="text-gray-300 text-[9px] font-bold uppercase">
                        {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 leading-tight">
                      {item.firstName} <br/> {item.lastName}
                    </h3>
                    <p className="text-[#7A2318] font-bold text-sm tracking-tight">{item.email}</p>
                    
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-[9px] font-black uppercase tracking-widest text-red-300 hover:text-red-500 transition-colors pt-4 flex items-center gap-2"
                    >
                      Archive Entry <span className="text-xs">×</span>
                    </button>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <div className="bg-gray-50 p-10 rounded-[40px] h-full relative group-hover:bg-white group-hover:shadow-inner transition-all border border-transparent group-hover:border-gray-100">
                      <div className="absolute top-6 right-8 text-4xl text-gray-200 font-serif italic select-none">"</div>
                      <p className="text-gray-600 text-lg italic leading-relaxed font-light">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes reveal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Admin;