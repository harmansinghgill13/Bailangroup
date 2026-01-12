import React, { useState, useEffect } from 'react';
import { inquiryService } from '../services/inquiryService';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const servicesList = [
    { 
      title: "Property Appraisal", 
      desc: "Accurate market valuations for high-value assets using proprietary data models.", 
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800",
      icon: "💎",
      longDesc: "Our appraisal division utilizes a blend of historical data, current market velocity, and future infrastructure projections to provide the most accurate valuation for your architectural assets.",
      tiers: ["Historical Analysis", "Market Benchmarking", "Future Projection"]
    },
    { 
      title: "Investment Strategy", 
      desc: "Expert advice on high-yield real estate portfolios and tax-efficient structures.", 
      img: "https://images.pexels.com/photos/7654610/pexels-photo-7654610.jpeg",
      icon: "📈",
      longDesc: "Maximize your wealth legacy through strategic acquisitions. We design customized roadmaps for portfolio growth, focusing on low-risk, high-appreciation international markets.",
      tiers: ["Portfolio Audits", "Tax-Efficient Sourcing", "Risk Mitigation"]
    },
    { 
      title: "Global Sales", 
      desc: "Seamless cross-border property transactions handled with absolute discretion.", 
      img: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=80&w=800",
      icon: "🌍",
      longDesc: "Connecting global buyers with exclusive estates. Our sales team manages the entire lifecycle of the transaction, ensuring privacy and regulatory compliance across borders.",
      tiers: ["Quiet Listings", "Escrow Management", "Logistics Support"]
    },
    { 
      title: "Luxury Rentals", 
      desc: "Short-term and long-term premium stays in the world's most desired coordinates.", 
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      icon: "🏰",
      longDesc: "Experience the Bailan lifestyle before you buy. We curate a selection of fully managed, ultra-luxury rentals that meet our rigorous standards of design and service.",
      tiers: ["Private Butler Service", "Security Detail", "Concierge Access"]
    },
    { 
      title: "Interior Consulting", 
      desc: "Transform your living space with our network of award-winning designers.", 
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
      icon: "🎨",
      longDesc: "Architecture is the body; interior is the soul. We partner with the world's most provocative designers to ensure your property is a masterpiece of both form and function.",
      tiers: ["Space Planning", "Curation & Sourcing", "Art Integration"]
    },
    { 
      title: "Legal Assistance", 
      desc: "Complete documentation, title insurance, and legal support for elite buyers.", 
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800",
      icon: "⚖️",
      longDesc: "A dedicated legal shield for your transactions. Our legal concierge handles complex title issues, residency requirements, and privacy protection protocols.",
      tiers: ["Title Verification", "Residency Support", "Privacy Shielding"]
    },
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
        message: `Inquiry for ${servicesList[selectedService].title}. Notes: ${formData.message}`
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-32 pb-20 min-h-screen">
      <div className="px-[6%] mb-20 text-center">
        <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Expertise</span>
        <h1 className="playfair text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">Bailan Intelligence</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Elite real estate advisory services for the next generation of architectural collectors and institutional investors.
        </p>
      </div>

      <div className="px-[6%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {servicesList.map((service, i) => (
          <div 
            key={i} 
            onClick={() => { setSelectedService(i); setIsSuccess(false); }}
            className="group relative rounded-[45px] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer h-[500px] border border-gray-100"
          >
            <img src={service.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0" alt={service.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0 transition-transform">
              <span className="text-4xl mb-4 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">{service.icon}</span>
              <h3 className="text-white text-3xl font-black mb-2 tracking-tight">{service.title}</h3>
              <p className="text-white/60 text-sm mb-8 line-clamp-2 font-light">
                {service.desc}
              </p>
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-0 group-hover:w-12 bg-[#7A2318] transition-all duration-500"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Select Expertise</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- LIQUID GLASS SERVICE REQUEST OVERLAY --- */}
      {selectedService !== null && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl animate-fade-in"
            onClick={() => setSelectedService(null)}
          ></div>

          {/* Container */}
          <div className="relative w-full max-w-6xl">
            <div className="relative glass-container rounded-[60px] overflow-hidden flex flex-col lg:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/20 animate-scale-up">
              {/* Animated Liquid Background Layer (Behind Glass) */}
              <div className="absolute inset-0 -z-10 liquid-mesh opacity-40"></div>
              
              {/* LEFT: INFORMATION (STATIC GLASS) */}
              <div className="lg:w-1/2 p-12 md:p-16 space-y-12 relative overflow-hidden flex flex-col">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-12">
                     <span className="text-6xl">{servicesList[selectedService].icon}</span>
                     <button onClick={() => setSelectedService(null)} className="lg:hidden text-white/50 text-3xl">✕</button>
                  </div>
                  <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
                    {servicesList[selectedService].title}
                  </h2>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#7A2318] animate-pulse"></div>
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Priority Protocol Active</span>
                  </div>
                  <p className="text-white/70 text-lg font-light leading-relaxed max-w-md">
                    {servicesList[selectedService].longDesc}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  {servicesList[selectedService].tiers.map((tier, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-md">
                       <span className="text-[#7A2318] font-black text-xs">0{idx + 1}</span>
                       <span className="text-white text-sm font-bold tracking-tight">{tier}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: INTERACTIVE REQUEST FORM (FLOAT GLASS) */}
              <div className="lg:w-1/2 p-12 md:p-16 bg-white/5 backdrop-blur-[60px] border-l border-white/10 flex flex-col justify-center">
                {isSuccess ? (
                  <div className="text-center space-y-8 animate-reveal">
                    <div className="w-24 h-24 bg-[#7A2318] rounded-full flex items-center justify-center mx-auto text-white text-4xl shadow-[0_0_50px_rgba(122,35,24,0.5)]">✓</div>
                    <div className="space-y-4">
                      <h3 className="text-white text-3xl font-black tracking-tight">Access Granted</h3>
                      <p className="text-white/50 font-light max-w-sm mx-auto">Your inquiry for {servicesList[selectedService].title} has been encrypted and vaulted. A specialist will contact you momentarily.</p>
                    </div>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#7A2318] hover:text-white transition-all shadow-2xl"
                    >
                      Dismiss Portal
                    </button>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div className="space-y-2">
                      <h4 className="text-white text-2xl font-black tracking-tight">Request Protocol</h4>
                      <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Initialize secure service link</p>
                    </div>

                    <form onSubmit={handleRequestSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-white/40 text-[10px] font-black uppercase tracking-widest block ml-4">Full Identity</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Your Legal Name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-[25px] outline-none focus:border-[#7A2318] focus:bg-white/10 transition-all text-white font-medium text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/40 text-[10px] font-black uppercase tracking-widest block ml-4">Secure Endpoint</label>
                        <input 
                          required
                          type="email" 
                          placeholder="contact@identity.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-[25px] outline-none focus:border-[#7A2318] focus:bg-white/10 transition-all text-white font-medium text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/40 text-[10px] font-black uppercase tracking-widest block ml-4">Inquiry Notes</label>
                        <textarea 
                          rows={3}
                          placeholder="Project specifics, timelines, or location requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-[30px] outline-none focus:border-[#7A2318] focus:bg-white/10 transition-all text-white font-medium text-sm resize-none" 
                        ></textarea>
                      </div>

                      <button 
                        disabled={isSubmitting}
                        className="w-full bg-[#7A2318] text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-[0_20px_60px_rgba(122,35,24,0.4)] hover:bg-white hover:text-black transition-all transform active:scale-95 flex items-center justify-center gap-4 group"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            ESTABLISH LINK
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                          </>
                        )}
                      </button>
                    </form>

                    <div className="flex items-center justify-center gap-3 opacity-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Quantum Encrypted Transaction</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/50 text-2xl hover:text-white hover:bg-[#7A2318] transition-all hidden lg:flex backdrop-blur-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
        }

        .liquid-mesh {
          background: linear-gradient(135deg, #7A2318 0%, #0A0A0A 50%, #1A1A1A 100%);
          background-size: 400% 400%;
          animation: liquidFlow 15s ease infinite;
        }

        @keyframes liquidFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-scale-up { animation: scaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-reveal { animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Services;