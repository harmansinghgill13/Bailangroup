import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { inquiryService } from '../services/inquiryService';

const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });

  const services = [
    { 
      title: "Portfolio Management", 
      desc: "Strategic asset allocation and property management for investors looking for stability and high yield returns.",
      longDesc: "Our Portfolio Management service is designed for high-net-worth individuals who demand institutional-grade oversight of their real estate assets. We treat every property not just as a building, but as a critical component of your wealth legacy.",
      details: ["Tax-efficient restructuring", "Quarterly yield optimization", "International legal compliance", "Maintenance & concierge oversight"],
      icon: "📈",
      color: "#7A2318"
    },
    { 
      title: "Global Search", 
      desc: "Access to off-market listings and exclusive networks worldwide to find the exact property that meets your criteria.",
      longDesc: "Leverage the Bailan Group's global intelligence network. We specialize in sourcing off-market 'quiet listings' that never reach public portals, ensuring you have first-mover advantage on the world's most desirable coordinates.",
      details: ["Bespoke property scouting", "Confidential negotiations", "Cross-border logistics", "Historical asset verification"],
      icon: "🌍",
      color: "#1A1A1A"
    },
    { 
      title: "Legal Concierge", 
      desc: "Complete administrative and legal support, ensuring your transactions are secure, private, and seamless.",
      longDesc: "Navigation of complex international real estate laws requires precision. Our Legal Concierge team provides a shield of privacy and security, managing everything from title transfers to multi-jurisdictional tax structuring.",
      details: ["Escrow management", "Privacy protection protocols", "Title insurance oversight", "Residency & Visa support"],
      icon: "⚖️",
      color: "#4F545A"
    }
  ];

  const partners = [
    "ROLEX", "RITZ-CARLTON", "SOTHEBY'S", "GULFSTREAM", "ASTON MARTIN", "NETJETS", "BENTLEY", "FOUR SEASONS"
  ];

  const handleServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService === null) return;
    setIsSubmitting(true);
    try {
      await inquiryService.saveInquiry({
        firstName: formData.name,
        lastName: `(Service: ${services[selectedService].title})`,
        email: formData.email,
        type: 'Service Request',
        message: `Inquiry for ${services[selectedService].title}. Additional details: ${formData.details}`
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', details: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* --- HERO SECTION WITH VIDEO BACKGROUND --- */}
      <section className="relative min-h-screen flex items-center px-[6%] pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            src="/videos/1.mp4"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-bounce-slow">
            <span className="flex h-2 w-2 rounded-full bg-[#7A2318]"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Exclusive Bailan Group Listings</span>
          </div>

          <h1 className="playfair text-7xl md:text-9xl leading-[0.85] font-black text-white mb-8 tracking-tighter">
            Discover Your <br/>
            <span className="text-[#7A2318] relative inline-block">
              Sanctuary.
              <svg className="absolute -bottom-4 left-0 w-full h-3 text-[#7A2318]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-light">
            We specialize in connecting high-net-worth individuals with architectural masterpieces. Bailan Group provides a tailored approach to elite property acquisition.
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <Link to="/projects" className="bg-[#7A2318] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-[#7A2318] transition-all shadow-[0_20px_50px_rgba(122,35,24,0.3)] hover:-translate-y-1 active:scale-95">
              Explore Portfolio
            </Link>
            <Link to="/about" className="group flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs">
              <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                →
              </span>
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROPERTIES SECTION --- */}
      <section className="py-32 px-[6%] bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[#7A2318] font-black uppercase tracking-[0.3em] text-xs">Curated Selection</span>
            <h2 className="playfair text-6xl font-black text-gray-900 tracking-tighter">Featured Estates</h2>
          </div>
          <Link to="/projects" className="mt-8 md:mt-0 px-8 py-4 border-2 border-gray-100 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all">
            Browse All Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="group relative h-[600px] rounded-[50px] overflow-hidden shadow-2xl">
            <img src="https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-12 flex flex-col justify-end">
              <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mb-2">New Entry</span>
              <h3 className="text-white text-4xl font-black mb-4">The Obsidian Manor</h3>
              <p className="text-white/70 mb-8 max-w-sm">A triumph of modern architecture nestled in the hills of Aspen.</p>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-black">6 BEDS</div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-black">8 BATHS</div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-black">12,000 SQFT</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { title: "Azure Coast Villa", loc: "Malibu, CA", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" },
              { title: "The Sky Loft", loc: "New York, NY", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800" },
              { title: "Pine Ridge Estate", loc: "Lake Tahoe, NV", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800" },
              { title: "Golden Gate View", loc: "San Francisco, CA", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800" },
            ].map((prop, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="h-64 rounded-[35px] overflow-hidden shadow-lg mb-4 relative">
                  <img src={prop.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-gray-900">FOR SALE</div>
                </div>
                <h4 className="font-black text-gray-900 tracking-tight">{prop.title}</h4>
                <p className="text-xs text-gray-500">{prop.loc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES REFINED --- */}
      <section className="py-32 bg-gray-50 px-[6%] relative">
        <div className="absolute top-0 right-0 w-[20%] h-full bg-[#7A2318]/[0.02] -skew-x-12"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-xs">Excellence in every detail</span>
            <h2 className="playfair text-6xl font-black text-gray-900 tracking-tighter">Bespoke Real Estate Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {services.map((service, i) => (
              <div key={i} className="relative group p-10 bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
                <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500 origin-left">{service.icon}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight group-hover:text-[#7A2318] transition-colors">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm mb-8">{service.desc}</p>
                <button 
                  onClick={() => { setSelectedService(i); setIsSuccess(false); }}
                  className="text-[10px] font-black uppercase tracking-widest text-[#7A2318] flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Configure Service <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- SERVICE OVERLAY --- */}
        {selectedService !== null && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 transition-all duration-500 overflow-y-auto">
            <div 
              className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-2xl animate-fade-in cursor-pointer"
              onClick={() => setSelectedService(null)}
            ></div>
            
            <div className="relative w-full max-w-5xl">
              <div className="bg-white rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row border border-white/20 animate-slide-up">
                {/* LEFT: INFORMATION LAYER */}
                <div className="lg:w-1/2 p-10 md:p-16 relative bg-gray-50 overflow-hidden">
                  <div className="absolute -top-20 -left-20 text-[250px] font-black text-gray-200/50 pointer-events-none select-none">
                    0{selectedService + 1}
                  </div>

                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl">
                        {services[selectedService].icon}
                      </div>
                      <button 
                        onClick={() => setSelectedService(null)}
                        className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#7A2318] hover:text-white transition-all shadow-md group"
                      >
                        <span className="text-2xl group-hover:rotate-90 transition-transform">×</span>
                      </button>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-none">
                        {services[selectedService].title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Consultation Tier</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg leading-relaxed font-light">
                      {services[selectedService].longDesc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services[selectedService].details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                          <div className="w-2 h-2 rounded-full bg-[#7A2318]"></div>
                          <span className="text-xs font-bold text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT: INTERACTIVE REQUEST FORM LAYER */}
                <div className="lg:w-1/2 p-10 md:p-16 bg-white flex flex-col justify-center border-l border-gray-100 relative">
                  {isSuccess ? (
                    <div className="text-center space-y-6 animate-reveal">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#7A2318] text-3xl font-bold">✓</div>
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">Request Logged</h3>
                      <p className="text-gray-500 font-light">Your intelligence briefing regarding {services[selectedService].title} will be prepared immediately.</p>
                      <button 
                        onClick={() => setSelectedService(null)}
                        className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <div>
                        <h4 className="text-2xl font-black text-gray-900 tracking-tight">Secure Service Portal</h4>
                        <p className="text-gray-400 text-sm font-light mt-2 italic">Fill out the encrypted form to initialize this service.</p>
                      </div>

                      <form onSubmit={handleServiceRequest} className="space-y-4">
                        <div className="group">
                          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Full Identity</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none border-2 border-transparent focus:border-[#7A2318] focus:bg-white transition-all text-sm font-medium" 
                          />
                        </div>
                        <div className="group">
                          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Secure Email</label>
                          <input 
                            required
                            type="email" 
                            placeholder="contact@identity.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none border-2 border-transparent focus:border-[#7A2318] focus:bg-white transition-all text-sm font-medium" 
                          />
                        </div>
                        <div className="group">
                          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Additional Parameters (Optional)</label>
                          <textarea 
                            rows={3}
                            placeholder="Specific requirements or timelines..."
                            value={formData.details}
                            onChange={(e) => setFormData({...formData, details: e.target.value})}
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none border-2 border-transparent focus:border-[#7A2318] focus:bg-white transition-all text-sm font-medium resize-none" 
                          ></textarea>
                        </div>
                        
                        <button 
                          disabled={isSubmitting}
                          className="w-full bg-[#7A2318] text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : "Establish Secure Link"}
                        </button>
                      </form>

                      <div className="flex items-center justify-center gap-2 opacity-30">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="text-[8px] font-black uppercase tracking-widest">256-Bit SSL End-to-End Encryption</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* --- BRAND PARTNERS SECTION --- */}
      <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="px-[6%] mb-16 text-center">
          <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-[10px]">Global Alliances</span>
          <h2 className="playfair text-4xl font-black text-gray-900 tracking-tighter mt-4">Brand Partners</h2>
        </div>
        
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-24 py-4">
            {partners.map((partner, i) => (
              <span key={i} className="text-4xl md:text-5xl font-black text-gray-200 hover:text-[#7A2318] transition-colors cursor-default tracking-widest">
                {partner}
              </span>
            ))}
            {partners.map((partner, i) => (
              <span key={`dup-${i}`} className="text-4xl md:text-5xl font-black text-gray-200 hover:text-[#7A2318] transition-colors cursor-default tracking-widest">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- REFINED CTA --- */}
      <section className="py-32 px-[6%]">
        <div className="relative bg-[#0A0A0A] rounded-[60px] p-16 md:p-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-full opacity-30">
             <img src="https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=80&w=1200" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          
          <div className="relative z-10 max-w-2xl space-y-8">
            <h2 className="playfair text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">Your Journey <br/>Begins Here.</h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              Schedule a private consultation with a Bailan Group advisor to discuss your real estate aspirations.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/contact" className="bg-[#7A2318] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                Book Consultation
              </Link>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-300 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} />
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Joined by 500+ Luxury Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes reveal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
      `}</style>
    </div>
  );
};

export default Home;