
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { inquiryService } from '../services/inquiryService';
import { PROJECTS } from '../constants/projects';

const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });

  const services = [
    { 
      title: "Portfolio Management", 
      desc: "Strategic asset allocation and property management for investors looking for stability and high yield returns.",
      longDesc: "Our Portfolio Management service is designed for high-net-worth individuals who demand institutional-grade oversight of their real estate assets.",
      details: ["Tax-efficient restructuring", "Quarterly yield optimization", "International legal compliance"],
      icon: "📈"
    },
    { 
      title: "Global Search", 
      desc: "Access to off-market listings and exclusive networks worldwide to find the exact property that meets your criteria.",
      longDesc: "Leverage the Bailan Group's global intelligence network. We specialize in sourcing off-market 'quiet listings' that never reach public portals.",
      details: ["Bespoke property scouting", "Confidential negotiations", "Historical asset verification"],
      icon: "🌍"
    },
    { 
      title: "Legal Concierge", 
      desc: "Complete administrative and legal support, ensuring your transactions are secure, private, and seamless.",
      longDesc: "Navigation of complex international real estate laws requires precision. Our Legal Concierge team provides a shield of privacy.",
      details: ["Escrow management", "Privacy protection protocols", "Title insurance oversight"],
      icon: "⚖️"
    }
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
        message: `Inquiry for ${services[selectedService].title}. Details: ${formData.details}`
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', details: '' });
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  // Extract projects for the featured section
  const vanbagh = PROJECTS.find(p => p.id === 'vanbagh-farm');
  const others = PROJECTS.filter(p => p.id !== 'vanbagh-farm');

  return (
    <div className="bg-white overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center px-6 md:px-[8%] pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/videos/1.mp4" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl w-full">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#7A2318]"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/80">Exclusive Rajasthan Land Assets</span>
          </div>
          <h1 className="playfair text-white mb-8 uppercase">
            Discover Your <br/><span className="text-[#7A2318]">Sanctuary.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-light tracking-wide">
            Specializing in high-yield land acquisitions and luxury farmhouse estates in Alwar. Bailan Group provides a tailored approach to elite regional property ownership.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Link to="/projects" className="w-full sm:w-auto text-center bg-[#7A2318] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-[#7A2318] transition-all shadow-xl">
              Explore Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROPERTIES --- */}
      <section className="py-24 md:py-32 px-6 md:px-[8%] bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-[#7A2318] font-black uppercase tracking-[0.5em] text-[10px]">Curated Selection</span>
            <h2 className="playfair text-gray-900 uppercase">Featured Estates</h2>
          </div>
          <Link to="/projects" className="px-8 py-4 border-2 border-gray-100 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-gray-50 transition-all">
            Browse All Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Flagship Project: Vanbagh Farm with Video Support */}
          {vanbagh && (
            <Link to={`/projects/${vanbagh.id}`} className="group relative h-[450px] md:h-[600px] rounded-[40px] md:rounded-[50px] overflow-hidden shadow-2xl block bg-black">
              {vanbagh.mainVideo ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                >
                  <source src={vanbagh.mainVideo} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={vanbagh.mainImage} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt={vanbagh.title}
                />
              )}
              
              <div className="absolute top-8 right-8 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7A2318] animate-pulse"></div>
                  <span className="text-white text-[8px] font-black tracking-[0.3em] uppercase">Cinematic Preview</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent p-8 md:p-12 flex flex-col justify-end z-10">
                <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Prime Acquisition</span>
                <h3 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-wide uppercase">{vanbagh.title}</h3>
                <p className="text-white/60 mb-8 max-w-sm tracking-wide text-sm font-light">
                  {vanbagh.location} • {vanbagh.type}
                </p>
                <div className="flex items-center gap-4 text-white group-hover:gap-6 transition-all duration-500">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">View Dossier</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xl">→</div>
                </div>
              </div>
            </Link>
          )}

          {/* Supporting Regional Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {others.map((prop) => (
              <Link to={`/projects/${prop.id}`} key={prop.id} className="group cursor-pointer block">
                <div className="h-56 md:h-64 rounded-[30px] md:rounded-[35px] overflow-hidden shadow-lg mb-6 relative bg-gray-50 p-2">
                  <img 
                    src={prop.mainImage} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                    alt={prop.title}
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                    <span className="text-white/60 text-[8px] font-black tracking-widest uppercase italic">Ref: BLN-{prop.id.slice(0,3).toUpperCase()}</span>
                  </div>
                </div>
                <div className="space-y-1">
                   <h4 className="font-black text-gray-900 tracking-wide uppercase text-sm group-hover:text-[#7A2318] transition-colors">{prop.title}</h4>
                   <p className="text-[9px] text-gray-400 uppercase tracking-[0.4em]">{prop.location}</p>
                </div>
              </Link>
            ))}
            
            {/* CTA Card for more */}
            <Link to="/projects" className="flex flex-col items-center justify-center h-56 md:h-64 rounded-[30px] md:rounded-[35px] border-2 border-dashed border-gray-100 hover:border-[#7A2318] transition-all group p-10 text-center">
              <p className="text-[10px] font-black text-gray-300 group-hover:text-[#7A2318] uppercase tracking-[0.5em] mb-4">Discovery Vault</p>
              <h4 className="font-black text-gray-400 group-hover:text-black uppercase text-xs tracking-widest">More Assets Available</h4>
              <div className="mt-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#7A2318] group-hover:text-white transition-all">↓</div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section className="py-24 md:py-32 bg-gray-50 px-6 md:px-[8%]">
        <div className="text-center mb-20 space-y-6">
          <span className="text-[#7A2318] font-black uppercase tracking-[0.5em] text-[10px]">Excellence in every detail</span>
          <h2 className="playfair text-gray-900 uppercase">Bespoke Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {services.map((service, i) => (
            <div key={i} className="group p-8 md:p-10 bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-start">
              <div className="text-4xl md:text-5xl mb-8">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 tracking-wide uppercase">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm mb-8 tracking-wide font-light">{service.desc}</p>
              <button 
                onClick={() => { setSelectedService(i); setIsSuccess(false); }}
                className="mt-auto text-[9px] font-black uppercase tracking-[0.4em] text-[#7A2318] flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                Configure Service <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Service Overlay */}
      {selectedService !== null && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedService(null)}></div>
          <div className="relative w-full max-w-5xl my-8">
            <div className="bg-white rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/20">
              <div className="lg:w-1/2 p-8 md:p-12 bg-gray-50">
                <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-wide">{services[selectedService].title}</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light tracking-wide mb-8">{services[selectedService].longDesc}</p>
                <div className="space-y-4">
                  {services[selectedService].details.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7A2318]"></div>
                      <span className="text-[11px] font-bold text-gray-700 tracking-wide uppercase">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
                {isSuccess ? (
                  <div className="text-center space-y-6 py-10">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#7A2318] text-2xl font-bold">✓</div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-wide uppercase">Request Logged</h3>
                    <button onClick={() => setSelectedService(null)} className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">Return</button>
                  </div>
                ) : (
                  <form onSubmit={handleServiceRequest} className="space-y-5">
                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent transition-all text-sm tracking-wide" />
                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent transition-all text-sm tracking-wide" />
                    <textarea rows={3} placeholder="Additional Details" value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent transition-all text-sm tracking-wide resize-none" />
                    <button disabled={isSubmitting} className="w-full bg-[#7A2318] text-white py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all">
                      {isSubmitting ? "Syncing..." : "Initialize Link"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
