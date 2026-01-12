
import React, { useState } from 'react';
import { inquiryService } from '../services/inquiryService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: 'Property Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Calling the real backend service
      await inquiryService.saveInquiry(formData);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        type: 'Property Inquiry',
        message: ''
      });
    } catch (err) {
      setError("Server Error: Make sure your backend is running with 'node server.js'");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
              <span className="text-[#7A2318] font-black uppercase tracking-[0.3em] text-xs block mb-4">Contact Us</span>
              <h1 className="playfair text-7xl font-black text-gray-900 leading-none tracking-tighter">Get in <br/>Touch.</h1>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#7A2318] text-white flex items-center justify-center rounded-2xl shrink-0">📍</div>
                <div>
                  <h4 className="font-black uppercase text-sm mb-2">Our Office</h4>
                  <p className="text-gray-500 font-medium">123 Luxury Lane, Beverly Hills<br/>CA 90210, USA</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#7A2318] text-white flex items-center justify-center rounded-2xl shrink-0">📞</div>
                <div>
                  <h4 className="font-black uppercase text-sm mb-2">Phone</h4>
                  <p className="text-gray-500 font-medium">+1 (234) 567 8900</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#7A2318] text-white flex items-center justify-center rounded-2xl shrink-0">✉️</div>
                <div>
                  <h4 className="font-black uppercase text-sm mb-2">Email</h4>
                  <p className="text-gray-500 font-medium">hello@ourhome.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 md:p-16 rounded-[60px] shadow-sm relative overflow-hidden">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                {error}
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Success!</h3>
                <p className="text-gray-500 mb-8">Your message is now in our secure database. An admin will see it shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#7A2318] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Send us a message</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#7A2318]/20 border border-transparent focus:border-[#7A2318] transition-all font-medium" />
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#7A2318]/20 border border-transparent focus:border-[#7A2318] transition-all font-medium" />
                  </div>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#7A2318]/20 border border-transparent focus:border-[#7A2318] transition-all font-medium" />
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#7A2318]/20 border border-transparent focus:border-[#7A2318] transition-all font-medium appearance-none">
                    <option>Property Inquiry</option>
                    <option>Sell Your Home</option>
                    <option>Investment Advice</option>
                    <option>Other</option>
                  </select>
                  <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your needs..." rows={5} className="w-full bg-white px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#7A2318]/20 border border-transparent focus:border-[#7A2318] transition-all font-medium resize-none"></textarea>
                  <button disabled={isLoading} className={`w-full bg-[#7A2318] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#5a1a12] transition-all active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {isLoading ? 'Connecting to Server...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
