
import React, { useState } from 'react';
import { inquiryService } from '../services/inquiryService';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const servicesList = [
    { title: "Property Appraisal", icon: "💎", desc: "Accurate market valuations for high-value assets." },
    { title: "Investment Strategy", icon: "📈", desc: "Expert advice on high-yield real estate portfolios." },
    { title: "Global Sales", icon: "🌍", desc: "Seamless cross-border property transactions." },
    { title: "Luxury Rentals", icon: "🏰", desc: "Short-term stays in the world's most desired coordinates." },
    { title: "Interior Consulting", icon: "🎨", desc: "Transform your living space with world-class design." },
    { title: "Legal Assistance", icon: "⚖️", desc: "Complete documentation and legal support for elite buyers." },
  ];

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService === null) return;
    setIsSubmitting(true);
    try {
      await inquiryService.saveInquiry({
        firstName: formData.name,
        lastName: `(Service Detail: ${servicesList[selectedService].title})`,
        email: formData.email,
        type: 'Service Request',
        message: formData.message
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-white pt-32 pb-20 min-h-screen">
      <div className="px-[6%] mb-24 text-center">
        <span className="text-[#7A2318] font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Our Expertise</span>
        <h1 className="playfair text-[64px] font-black text-gray-900 tracking-[0.02em] uppercase leading-[1.1]">Bailan Intelligence</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed mt-6 tracking-wide">
          Elite real estate advisory services for architectural collectors and institutional investors.
        </p>
      </div>

      <div className="px-[6%] grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {servicesList.map((service, i) => (
          <div 
            key={i} 
            onClick={() => { setSelectedService(i); setIsSuccess(false); }}
            className="group p-12 bg-gray-50 rounded-[45px] hover:bg-white hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100"
          >
            <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{service.icon}</div>
            <h3 className="text-gray-900 text-3xl font-black mb-4 tracking-wide uppercase">{service.title}</h3>
            <p className="text-gray-500 text-sm font-light leading-relaxed tracking-wide">{service.desc}</p>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-[10px] font-black text-[#7A2318] uppercase tracking-[0.4em]">Select Expertise</span>
              <span className="text-[#7A2318]">→</span>
            </div>
          </div>
        ))}
      </div>

      {selectedService !== null && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedService(null)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[50px] p-12 shadow-2xl overflow-hidden">
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-[#7A2318] rounded-full flex items-center justify-center mx-auto text-white text-4xl shadow-xl">✓</div>
                <h3 className="text-gray-900 text-3xl font-black tracking-wide uppercase mt-10">Access Granted</h3>
                <button onClick={() => setSelectedService(null)} className="mt-8 bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">Close</button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-wide leading-none">{servicesList[selectedService].title}</h2>
                <input required type="text" placeholder="Full Identity" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 px-8 py-5 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide text-sm" />
                <input required type="email" placeholder="Secure Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 px-8 py-5 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide text-sm" />
                <textarea required placeholder="Notes" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 px-8 py-5 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide text-sm resize-none" />
                <button disabled={isSubmitting} className="w-full bg-[#7A2318] text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all">
                  {isSubmitting ? "Syncing..." : "ESTABLISH LINK"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
