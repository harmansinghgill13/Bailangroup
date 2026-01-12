import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { inquiryService } from '../services/inquiryService';

const About: React.FC = () => {
  const [showAdvisors, setShowAdvisors] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [scrollY, setScrollY] = useState(0);

  const visionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const advisors = [
    {
      name: "Julian Bailan",
      role: "Founder & Chief Curator",
      bio: "Visionary behind the group's global footprint. Julian specializes in ultra-rare historical estates.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800",
      specialty: "Historical Assets"
    },
    {
      name: "Elena Moretti",
      role: "Director of Global Search",
      bio: "The world's leading scout for off-market listings. Elena holds keys to doors that don't exist on maps.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
      specialty: "Off-Market Intelligence"
    },
    {
      name: "Marcus Thorne",
      role: "Senior Portfolio Strategist",
      bio: "Ex-hedge fund architect turned real estate strategist. Marcus ensures your legacy outpaces the market.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800",
      specialty: "Yield Optimization"
    },
    {
      name: "Sofia Chen",
      role: "Legal Concierge Lead",
      bio: "Expert in multi-jurisdictional law and privacy protocols. Sofia provides the shield for your acquisitions.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800",
      specialty: "Privacy & Compliance"
    }
  ];

  const handleAdvisorContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAdvisor === null) return;
    setIsSubmitting(true);
    try {
      await inquiryService.saveInquiry({
        firstName: formData.name,
        lastName: `(Direct to: ${advisors[selectedAdvisor].name})`,
        email: formData.email,
        type: 'Private Consultation',
        message: `Direct inquiry for ${advisors[selectedAdvisor].name}. Message: ${formData.message}`
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
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-[6%] bg-[#FDFCFB] overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-[0.03] grayscale"
            alt="About Background"
          />
        </div>
        
        <div className="relative z-10">
          <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-[10px] block mb-6 md:mb-8">Established 1994</span>
          <h1 className="text-gray-900 font-black text-5xl sm:text-7xl lg:text-[10rem] leading-[0.9] lg:leading-[0.8] uppercase mb-10 md:mb-12 tracking-tighter">
            THE ART OF <br/>
            <span className="text-[#7A2318]">ACQUISITION.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16">
            <p className="text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed font-light">
              Bailan Group is more than a real estate firm. We are curators of space, advisors of legacy, and partners in your journey toward the extraordinary. Our heritage is built on trust, discretion, and an unwavering commitment to architectural excellence.
            </p>
            
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center shrink-0">
              <svg className="absolute w-full h-full rotate-badge" viewBox="0 0 100 100">
                <path id="badgePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent"/>
                <text className="text-[7px] uppercase fill-[#7A2318] font-black tracking-[0.3em]">
                  <textPath xlinkHref="#badgePath">Bailan Group Worldwide • Premium Real Estate • World Class • </textPath>
                </text>
              </svg>
              <div className="flex flex-col items-center">
                <div className="text-[#7A2318] text-2xl md:text-4xl font-black tracking-tighter">BIG</div>
                <div className="text-[6px] font-black tracking-widest text-gray-400 -mt-0.5 uppercase">EST. 1994</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REDESIGNED VISION SECTION --- */}
      <section ref={visionRef} className="py-20 md:py-40 px-[6%] relative overflow-hidden bg-white">
        {/* Decorative Background Text - Hidden on very small screens for clarity */}
        <div className="hidden sm:block absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-gray-50 opacity-[0.4] select-none pointer-events-none -rotate-90 origin-left tracking-tighter">
          VISIONARY
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Column: Interactive Architectural Stack */}
          <div className="lg:col-span-7 relative h-[450px] sm:h-[600px] lg:h-[800px] flex items-center justify-center lg:justify-start order-1 lg:order-none">
            {/* Main Background Card */}
            <div 
              className="absolute w-[85%] lg:w-[80%] h-[350px] sm:h-[500px] lg:h-[600px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl transition-transform duration-700 ease-out"
              style={{ transform: `translateY(${scrollY * -0.02}px)` }}
            >
              <img 
                src="images/about2.jpg" 
                className="w-full h-full object-cover" 
                alt="Vision Main" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Floating Glass Detail Card */}
            <div 
              className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 lg:translate-y-0 w-[50%] lg:w-[45%] h-[250px] sm:h-[350px] lg:h-[400px] rounded-[30px] md:rounded-[40px] overflow-hidden border-[8px] md:border-[5px] border-white shadow-3xl z-20 group transition-transform duration-1000 ease-out"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            >
              <img 
                src="images/about1.jpg" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 lg:group-hover:grayscale-0 lg:group-hover:scale-110" 
                alt="Vision Detail" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                <span className="text-white font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] border border-white/40 px-4 md:px-6 py-2 md:py-3 rounded-full">Explore Detail</span>
              </div>
            </div>

            {/* Interactive "Hotspots" */}
            <div className="absolute left-[15%] top-[45%] z-30 group">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer animate-ping-slow">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#7A2318] rounded-full"></div>
              </div>
              <div className="absolute left-8 sm:left-10 top-0 w-32 sm:w-48 bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 shadow-xl border border-white pointer-events-none">
                <p className="text-[8px] sm:text-[10px] font-black text-[#7A2318] uppercase tracking-widest mb-1">Precision</p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Every angle is calculated for light.</p>
              </div>
            </div>

            <div className="absolute left-[35%] bottom-[30%] z-30 group">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer animate-ping-slow" style={{ animationDelay: '1s' }}>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#7A2318] rounded-full"></div>
              </div>
              <div className="absolute left-8 sm:left-10 top-0 w-32 sm:w-48 bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 shadow-xl border border-white pointer-events-none">
                <p className="text-[8px] sm:text-[10px] font-black text-[#7A2318] uppercase tracking-widest mb-1">Legacy</p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Materials chosen to endure.</p>
              </div>
            </div>
          </div>

          {/* Column: Mission and Stats */}
          <div className="lg:col-span-5 space-y-10 lg:space-y-16 relative z-10 order-2 lg:order-none">
            <div className="space-y-4 lg:space-y-6">
              <span className="text-[#7A2318] font-black uppercase tracking-[0.5em] text-[10px]">Our Mission</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.9] lg:leading-[0.85] tracking-tighter uppercase">
                Acquiring <br/>
                <span className="text-[#7A2318]">Beyond</span> <br/>
                Limits.
              </h2>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <p className="text-gray-500 text-base md:text-xl leading-relaxed font-light first-letter:text-4xl md:first-letter:text-5xl first-letter:font-black first-letter:text-[#7A2318] first-letter:mr-3 first-letter:float-left">
                We specialize in the acquisition of high-yield assets and the curation of unique living spaces. Every project we undertake is a testament to our belief that architecture should inspire, protect, and endure. We don't just sell property; we bridge the gap between imagination and physical reality.
              </p>
              
              <div className="p-8 lg:p-10 bg-gray-50/50 backdrop-blur-sm rounded-[40px] lg:rounded-[50px] border-l-[6px] lg:border-l-[10px] border-[#7A2318] relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 bg-[#7A2318]/5 rounded-full -mr-12 lg:-mr-16 -mt-12 lg:-mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                <p className="text-gray-900 text-lg lg:text-2xl leading-tight font-medium relative z-10 tracking-tight italic">
                  "Architecture is the silent witness to the history we create. We ensure that your witness is nothing short of spectacular."
                </p>
                <div className="mt-4 lg:mt-6 flex items-center gap-3 lg:gap-4 relative z-10">
                  <div className="w-8 lg:w-10 h-[1px] bg-[#7A2318]"></div>
                  <p className="text-[#7A2318] font-black uppercase tracking-widest text-[8px] lg:text-[10px]">Julian Bailan, Founder</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 lg:pt-10 border-t border-gray-100">
              <div className="group cursor-default">
                <h4 className="text-[#7A2318] text-3xl sm:text-4xl lg:text-5xl font-black mb-1 transition-transform lg:group-hover:-translate-y-2">200+</h4>
                <p className="text-[8px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Global Assets</p>
              </div>
              <div className="group cursor-default">
                <h4 className="text-[#7A2318] text-3xl sm:text-4xl lg:text-5xl font-black mb-1 transition-transform lg:group-hover:-translate-y-2">15</h4>
                <p className="text-[8px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Offices</p>
              </div>
              <div className="group cursor-default">
                <h4 className="text-[#7A2318] text-3xl sm:text-4xl lg:text-5xl font-black mb-1 transition-transform lg:group-hover:-translate-y-2">98%</h4>
                <p className="text-[8px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Retention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADVISORS CALL TO ACTION --- */}
      <section className="py-12 md:py-20 px-[6%] bg-white">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => setShowAdvisors(true)}
            className="group relative w-full h-[300px] md:h-[400px] rounded-[40px] md:rounded-[60px] overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center text-center transition-all duration-700 hover:scale-[1.01] sm:hover:scale-[1.02] shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#7A2318]/10 group-hover:bg-[#7A2318]/20 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10 space-y-4 md:space-y-6 px-4">
              <span className="text-[#7A2318] font-black uppercase tracking-[0.5em] text-[10px] md:text-xs">Human Capital</span>
              <h2 className="playfair text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Meet Our <br/><span className="text-white/40">Advisors</span>
              </h2>
              <div className="flex items-center justify-center gap-3 md:gap-4 text-white/40 group-hover:text-white transition-all">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Enter Talent Portal</span>
                <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">→</span>
              </div>
            </div>

            {/* Subtle floating portraits behind the title - Hidden on mobile for performance and visual clarity */}
            <div className="hidden sm:flex absolute bottom-0 left-0 w-full h-1/2 justify-center items-end gap-10 opacity-20 pointer-events-none transition-transform duration-1000 group-hover:translate-y-4">
               {advisors.map((adv, i) => (
                 <img key={i} src={adv.img} className="w-32 h-40 object-cover rounded-t-3xl grayscale" alt="adv" />
               ))}
            </div>
          </button>
        </div>
      </section>

      {/* --- THE BAILAN PROCESS --- */}
      <section className="py-20 md:py-40 bg-[#0A0A0A] text-white px-[6%] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#7A2318] opacity-[0.03] -skew-x-12"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-8">
            <div className="space-y-2 md:space-y-4">
              <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-[10px]">How we work</span>
              <h2 className="playfair text-5xl md:text-8xl font-black tracking-tighter">The Acquisition <br/>Lifecycle</h2>
            </div>
            <p className="text-white/40 max-w-sm text-xs md:text-sm font-light leading-relaxed">
              A meticulously refined methodology developed over three decades to ensure zero-risk transactions and absolute privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                step: "01", 
                title: "Deep Discovery", 
                desc: "We begin with a high-level consultation to understand your financial objectives and architectural preferences." 
              },
              { 
                step: "02", 
                title: "Asset Scouting", 
                desc: "Leveraging our off-market network, we present a curated shortlist of assets that exist outside the public gaze." 
              },
              { 
                step: "03", 
                title: "Elite Handover", 
                desc: "Our legal and concierge teams manage every detail of the transfer, ensuring a seamless entry into your new legacy." 
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 md:p-12 bg-white/5 rounded-[40px] md:rounded-[50px] border border-white/10 hover:bg-white hover:text-black transition-all duration-700">
                <span className="text-4xl md:text-6xl font-black text-white/10 group-hover:text-[#7A2318]/20 transition-colors duration-700 block mb-8 md:mb-12">
                  {item.step}
                </span>
                <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight">{item.title}</h3>
                <p className="text-sm md:text-base text-white/50 group-hover:text-black/60 transition-colors duration-700 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ADVISOR PORTAL OVERLAY (THE BEAUTIFUL WINDOW) --- */}
      {showAdvisors && (
        <div className="fixed inset-0 z-[2000] flex items-start md:items-center justify-center p-4 md:p-12 overflow-y-auto overflow-x-hidden">
          {/* Backdrop with Liquid Gradient */}
          <div 
            className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-3xl animate-fade-in"
            onClick={() => { setShowAdvisors(false); setSelectedAdvisor(null); setIsSuccess(false); }}
          >
            <div className="absolute inset-0 liquid-mesh opacity-20"></div>
          </div>

          {/* Container */}
          <div className="relative w-full max-w-[1400px] my-auto">
            <div className="bg-transparent rounded-[30px] md:rounded-[60px] overflow-visible animate-reveal">
              {selectedAdvisor !== null ? (
                /* ADVISOR CONTACT PROTOCOL VIEW */
                <div className="max-w-3xl mx-auto bg-white rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 animate-slide-up">
                  <div className="md:w-1/3 bg-[#FDFCFB] p-8 md:p-12 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-100">
                    <img src={advisors[selectedAdvisor].img} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 md:mb-6 border-4 border-[#7A2318]" />
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{advisors[selectedAdvisor].name}</h3>
                    <p className="text-[8px] md:text-[10px] font-black uppercase text-[#7A2318] tracking-widest mt-1">{advisors[selectedAdvisor].role}</p>
                    <button 
                      onClick={() => { setSelectedAdvisor(null); setIsSuccess(false); }}
                      className="mt-6 md:mt-12 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 flex items-center gap-2"
                    >
                      ← Back to Portal
                    </button>
                  </div>
                  
                  <div className="md:w-2/3 p-8 md:p-16 bg-white relative">
                    {isSuccess ? (
                      <div className="text-center space-y-6 md:space-y-8 h-full flex flex-col justify-center py-10 md:py-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#7A2318] text-2xl md:text-3xl font-bold">✓</div>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Handshake Verified</h3>
                        <p className="text-sm md:text-base text-gray-500 font-light px-4">Our advisor has been notified. Privacy protocols are active.</p>
                        <button onClick={() => setShowAdvisors(false)} className="bg-black text-white px-8 md:px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px]">Dismiss Portal</button>
                      </div>
                    ) : (
                      <div className="space-y-6 md:space-y-10">
                        <div className="space-y-1 md:space-y-2">
                          <h4 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">Direct Consultation</h4>
                          <p className="text-gray-400 text-[10px] md:text-xs italic">Secure link with our {advisors[selectedAdvisor].role}.</p>
                        </div>
                        <form onSubmit={handleAdvisorContact} className="space-y-3 md:space-y-4">
                          <input required type="text" placeholder="Full Identity" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl outline-none focus:bg-white focus:border-[#7A2318] border-2 border-transparent transition-all text-sm font-medium" />
                          <input required type="email" placeholder="Private Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl outline-none focus:bg-white focus:border-[#7A2318] border-2 border-transparent transition-all text-sm font-medium" />
                          <textarea required placeholder="Consultation Notes..." rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-[30px] outline-none focus:bg-white focus:border-[#7A2318] border-2 border-transparent transition-all text-sm font-medium resize-none"></textarea>
                          <button disabled={isSubmitting} className="w-full bg-[#7A2318] text-white py-4 md:py-6 rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 group mt-2">
                             {isSubmitting ? <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : "ESTABLISH CONNECTION"}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* MAIN ADVISOR GRID VIEW */
                <div className="space-y-10 md:space-y-16 py-10">
                  <div className="text-center space-y-2 md:space-y-4 px-4">
                    <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-[10px]">Global Private Office</span>
                    <h2 className="text-white text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none">Command & Control</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4">
                    {advisors.map((adv, i) => (
                      <div 
                        key={i} 
                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[35px] md:rounded-[45px] overflow-hidden transition-all duration-700 hover:bg-white lg:hover:-translate-y-4 shadow-2xl animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="h-[220px] sm:h-[320px] overflow-hidden relative">
                          <img src={adv.img} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:group-hover:from-[#7A2318]/40 transition-all duration-700"></div>
                          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[7px] font-black text-white uppercase tracking-widest opacity-0 lg:group-hover:opacity-100 transition-all">Available</div>
                        </div>
                        <div className="p-6 md:p-10 space-y-4 md:space-y-6">
                          <div className="space-y-1">
                            <h3 
                              onClick={() => setSelectedAdvisor(i)}
                              className="text-white lg:group-hover:text-gray-900 text-2xl md:text-3xl font-black tracking-tight leading-none cursor-pointer lg:hover:text-[#7A2318] transition-colors flex items-center gap-2"
                            >
                              {adv.name}
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7A2318] opacity-0 lg:group-hover:opacity-100 transition-all"></span>
                            </h3>
                            <p className="text-white/40 lg:group-hover:text-[#7A2318] text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">{adv.role}</p>
                          </div>
                          <p className="text-white/30 lg:group-hover:text-gray-500 text-[10px] md:text-xs font-light leading-relaxed line-clamp-2">
                            {adv.bio}
                          </p>
                          <div className="pt-4 border-t border-white/10 lg:group-hover:border-gray-100">
                             <div className="flex items-center justify-between">
                                <span className="text-white/20 lg:group-hover:text-gray-400 text-[7px] md:text-[8px] font-black uppercase tracking-widest">{adv.specialty}</span>
                                <button 
                                  onClick={() => setSelectedAdvisor(i)}
                                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 lg:group-hover:bg-black flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-xl"
                                >
                                  ✉
                                </button>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pb-10">
                    <button 
                      onClick={() => setShowAdvisors(false)}
                      className="px-10 py-4 rounded-full border border-white/20 text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:text-white hover:border-[#7A2318] transition-all"
                    >
                      Return to About
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER CTA --- */}
      <section className="py-24 md:py-40 px-[6%] text-center bg-white">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          <h2 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-tight">Ready to start <br/>your legacy?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
           <Link 
              to="/contact" 
              className="bg-[#7A2318] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-2xl inline-block"
            >
              Partner with Us
            </Link>
            <Link to="/projects" className="px-8 md:px-12 py-5 md:py-6 border-2 border-gray-100 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-gray-50 transition-all">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <style>{`
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
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-ping-slow { animation: ping-slow 2.5s infinite; }
        
        .rotate-badge {
          animation: rotate-slow 15s linear infinite;
        }
        @keyframes rotate-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default About;