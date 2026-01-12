import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    { 
      title: "Portfolio Management", 
      desc: "Strategic asset allocation and property management for investors looking for stability and high yield returns.",
      longDesc: "Our Portfolio Management service is designed for high-net-worth individuals who demand institutional-grade oversight of their real estate assets. We treat every property not just as a building, but as a critical component of your wealth legacy.",
      details: ["Tax-efficient restructuring", "Quarterly yield optimization", "International legal compliance", "Maintenance & concierge oversight"],
      icon: "📈"
    },
    { 
      title: "Global Search", 
      desc: "Access to off-market listings and exclusive networks worldwide to find the exact property that meets your criteria.",
      longDesc: "Leverage the Bailan Group's global intelligence network. We specialize in sourcing off-market 'quiet listings' that never reach public portals, ensuring you have first-mover advantage on the world's most desirable coordinates.",
      details: ["Bespoke property scouting", "Confidential negotiations", "Cross-border logistics", "Historical asset verification"],
      icon: "🌍"
    },
    { 
      title: "Legal Concierge", 
      desc: "Complete administrative and legal support, ensuring your transactions are secure, private, and seamless.",
      longDesc: "Navigation of complex international real estate laws requires precision. Our Legal Concierge team provides a shield of privacy and security, managing everything from title transfers to multi-jurisdictional tax structuring.",
      details: ["Escrow management", "Privacy protection protocols", "Title insurance oversight", "Residency & Visa support"],
      icon: "⚖️"
    }
  ];

  // Placeholder for brand logos - replace these strings with your actual logo SVG/PNG paths
  const partners = [
    "ROLEX", "RITZ-CARLTON", "SOTHEBY'S", "GULFSTREAM", "ASTON MARTIN", "NETJETS", "BENTLEY", "FOUR SEASONS"
  ];

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
            src="public/videos/1.mp4"
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
            <img src="https://images.unsplash.com/photo-1600607687940-477a4a4b0b73?q=80&w=1200" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
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
                  onClick={() => setSelectedService(i)}
                  className="text-[10px] font-black uppercase tracking-widest text-[#7A2318] flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Read More <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- SERVICE DETAIL OVERLAY --- */}
        {selectedService !== null && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 md:p-12 transition-all duration-500">
            {/* Dark Blur Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in cursor-pointer"
              onClick={() => setSelectedService(null)}
            ></div>
            
            {/* Detail Panel */}
            <div className="relative bg-white w-full max-w-2xl rounded-[60px] p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-slide-up border border-white/20">
              {/* Decorative background number */}
              <div className="absolute -top-10 -right-10 text-[200px] font-black text-gray-50 pointer-events-none select-none">
                0{selectedService + 1}
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="text-6xl">{services[selectedService].icon}</div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#7A2318] hover:text-white transition-all group"
                  >
                    <span className="text-2xl group-hover:rotate-90 transition-transform">×</span>
                  </button>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">
                  {services[selectedService].title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
                  {services[selectedService].longDesc}
                </p>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7A2318]">Service Pillars</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services[selectedService].details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-500 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A2318] group-hover:scale-150 transition-transform"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 flex gap-4">
                  <Link 
                    to="/contact" 
                    onClick={() => setSelectedService(null)}
                    className="bg-[#7A2318] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#5a1a12] transition-all"
                  >
                    Consult an Advisor
                  </Link>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-8 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
                  >
                    Close
                  </button>
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
            {/* First set of logos */}
            {partners.map((partner, i) => (
              <span key={i} className="text-4xl md:text-5xl font-black text-gray-200 hover:text-[#7A2318] transition-colors cursor-default tracking-widest">
                {partner}
              </span>
            ))}
            {/* Identical second set for seamless looping */}
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
          from { transform: translateY(50px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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