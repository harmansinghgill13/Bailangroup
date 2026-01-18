
import React, { useState } from 'react';
import { inquiryService } from '../services/inquiryService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', type: 'Property Inquiry', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await inquiryService.saveInquiry(formData);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', type: 'Property Inquiry', message: '' });
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white pt-32 pb-20">
      <div className="px-[6%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <span className="text-[#7A2318] font-black uppercase tracking-[0.6em] text-[10px] block mb-6">Contact Expertise</span>
              <h1 className="playfair text-[64px] font-black text-gray-900 leading-[1.1] tracking-[0.02em] uppercase">
                Secure Your <br/><span className="text-[#7A2318]">Legacy.</span>
              </h1>
            </div>
            <div className="space-y-12 pt-12 border-t border-gray-100">
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-gray-50 text-gray-400 group-hover:bg-[#7A2318] group-hover:text-white transition-all flex items-center justify-center rounded-[24px] shrink-0 text-xl font-black italic">B</div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-[0.4em] mb-3 text-[#7A2318]">Private Office</h4>
                  <p className="text-gray-500 font-light text-lg tracking-wide">P.O. Box 356, Aledo, TX 76008, USA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-12 md:p-20 rounded-[80px] shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-green-50 text-[#7A2318] rounded-full flex items-center justify-center mx-auto mb-10 text-4xl">✦</div>
                <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-wide uppercase">Transmission Received.</h3>
                <button onClick={() => setIsSubmitted(false)} className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">New Inquiry</button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full bg-white px-8 py-5 rounded-[25px] outline-none focus:border-[#7A2318] border-2 border-transparent transition-all tracking-wide text-sm" />
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full bg-white px-8 py-5 rounded-[25px] outline-none focus:border-[#7A2318] border-2 border-transparent transition-all tracking-wide text-sm" />
                </div>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Secure Email" className="w-full bg-white px-8 py-5 rounded-[25px] outline-none focus:border-[#7A2318] border-2 border-transparent transition-all tracking-wide text-sm" />
                <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Describe your requirements..." rows={6} className="w-full bg-white px-8 py-5 rounded-[30px] outline-none focus:border-[#7A2318] border-2 border-transparent transition-all tracking-wide text-sm resize-none" />
                <button disabled={isLoading} className="w-full bg-[#7A2318] text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all">
                  {isLoading ? 'Vaulting...' : 'Establish Connection'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
