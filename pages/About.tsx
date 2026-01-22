
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { inquiryService } from '../services/inquiryService';

const About: React.FC = () => {
  const [showAdvisors, setShowAdvisors] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Updated to use local image paths from your public folder
  const advisors = [
    { 
      name: "Dalchand", 
      role: "Founder & Lead Curator", 
      img: "/images/people2.png", 
      bio: "With over 30 years in global land acquisition, Dalchandleads our strategic vision with an eye for architectural legacy." 
    },
    { 
      name: "Rajesh Saini", 
      role: "Director of Acquisitions", 
      img: "/images/people1.png", 
      bio: "Rajesh specializes in navigating high-stakes negotiations for exclusive off-market estates."
    },
    
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
        message: formData.message
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-[6%] bg-[#FDFCFB] pt-20">
        <span className="text-[#7A2318] font-black uppercase tracking-[0.6em] text-[10px] block mb-8">Established 1994</span>
        <h1 className="text-gray-900 font-black playfair text-[64px] leading-[1.1] uppercase mb-12 tracking-[0.02em]">
          THE ART OF <br/><span className="text-[#7A2318]">ACQUISITION.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed font-light tracking-wide">
          Bailan Group is more than a real estate firm. We are curators of space, advisors of legacy, and partners in your journey toward the extraordinary.
        </p>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="py-32 px-[6%] bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <span className="text-[#7A2318] font-black uppercase tracking-[0.6em] text-[10px]">Our Mission</span>
            <h2 className="playfair text-[64px] font-black text-gray-900 leading-[1.1] tracking-[0.02em] uppercase">
              Acquiring <br/><span className="text-[#7A2318]">Beyond</span> <br/>Limits.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed font-light tracking-wide">
              We specialize in the acquisition of high-yield assets and the curation of unique living spaces. Every project we undertake is a testament to our belief that architecture should inspire.
            </p>
          </div>
          <div className="rounded-[60px] overflow-hidden shadow-2xl h-[600px]">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" className="w-full h-full object-cover" alt="Architectural Building" />
          </div>
        </div>
      </section>

      {/* --- BIGGER SPECIALIST CARDS SECTION --- */}
      <section className="py-32 px-[6%] bg-gray-50">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-24 space-y-6">
             <span className="text-[#7A2318] font-black uppercase tracking-[0.6em] text-[10px]">The Council</span>
             <h2 className="playfair text-[64px] font-black text-gray-900 tracking-[0.02em] uppercase">Our Specialists</h2>
             <p className="text-gray-400 max-w-xl mx-auto text-sm font-light uppercase tracking-widest leading-relaxed">
               Access the collective intelligence of our founding partners and directors.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16">
             {advisors.map((adv, i) => (
               <div 
                 key={i} 
                 className="group relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl bg-white border border-gray-100 transition-all duration-700 hover:-translate-y-4"
               >
                 {/* Large Portrait Image */}
                 <img 
                   src={adv.img} 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                   alt={adv.name}
                   onError={(e) => {
                     // Fallback for demo if local image is missing
                     (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${i === 0 ? '1560250097-0b93528c311a' : i === 1 ? '1573496359142-b8d87734a5a2' : i === 2 ? '1472099645785-5658abf4ff4e' : '1580489944761-15a19d654956'}?q=80&w=1200`;
                   }}
                 />

                 {/* Editorial Content Overlay */}
                 <div className="absolute inset-x-0 bottom-0 p-10 md:p-12 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end min-h-[50%]">
                    <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                      <span className="text-[#7A2318] font-black uppercase tracking-[0.5em] text-[9px]">
                        {adv.role}
                      </span>
                      <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                        {adv.name}
                      </h3>
                      <p className="text-white/60 text-sm font-light leading-relaxed tracking-wide max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {adv.bio}
                      </p>
                      
                      <div className="pt-6">
                        <button 
                          onClick={() => { setSelectedAdvisor(i); setShowAdvisors(true); setIsSuccess(false); }} 
                          className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-[#7A2318] hover:text-white transition-all shadow-xl"
                        >
                          Contact Advisor
                        </button>
                      </div>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- ADVISOR CONTACT MODAL --- */}
      {showAdvisors && selectedAdvisor !== null && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowAdvisors(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[40px] p-12 shadow-2xl overflow-hidden border border-white/20">
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#7A2318] text-3xl font-bold">✓</div>
                <h3 className="text-3xl font-black text-gray-900 tracking-wide uppercase mt-8">Handshake Verified</h3>
                <p className="text-gray-400 mt-4 font-light text-sm tracking-wide">Communication has been routed to {advisors[selectedAdvisor].name}'s private office.</p>
                <button onClick={() => setShowAdvisors(false)} className="mt-8 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">Close</button>
              </div>
            ) : (
              <form onSubmit={handleAdvisorContact} className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <img src={advisors[selectedAdvisor].img} className="w-full h-full object-cover" alt={advisors[selectedAdvisor].name} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-wide uppercase leading-none">Contact {advisors[selectedAdvisor].name}</h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#7A2318] mt-1">{advisors[selectedAdvisor].role}</p>
                  </div>
                </div>
                <input required type="text" placeholder="Full Identity" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 px-6 py-5 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide text-sm" />
                <input required type="email" placeholder="Secure Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 px-6 py-5 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide text-sm" />
                <textarea required placeholder="Consultation Requirements" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 px-6 py-5 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide text-sm resize-none" />
                <button disabled={isSubmitting} className="w-full bg-[#7A2318] text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all">
                  {isSubmitting ? "Syncing..." : "Initiate Secure Consultation"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
