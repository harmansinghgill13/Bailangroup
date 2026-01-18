
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { inquiryService } from '../services/inquiryService';

const About: React.FC = () => {
  const [showAdvisors, setShowAdvisors] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const advisors = [
    { name: "Julian Bailan", role: "Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" },
    { name: "Elena Moretti", role: "Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" },
    { name: "Marcus Thorne", role: "Strategist", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" },
    { name: "Sofia Chen", role: "Legal Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800" }
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
      <section className="relative min-h-screen flex flex-col justify-center px-[6%] bg-[#FDFCFB] pt-20">
        <span className="text-[#7A2318] font-black uppercase tracking-[0.6em] text-[10px] block mb-8">Established 1994</span>
        <h1 className="text-gray-900 font-black playfair text-[64px] leading-[1.1] uppercase mb-12 tracking-[0.02em]">
          THE ART OF <br/><span className="text-[#7A2318]">ACQUISITION.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed font-light tracking-wide">
          Bailan Group is more than a real estate firm. We are curators of space, advisors of legacy, and partners in your journey toward the extraordinary.
        </p>
      </section>

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
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 px-[6%] bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
           <h2 className="playfair text-[64px] font-black text-gray-900 tracking-[0.02em] uppercase mb-12">Our Specialists</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {advisors.map((adv, i) => (
               <div key={i} className="group bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                 <img src={adv.img} className="w-32 h-32 rounded-full object-cover mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all" />
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide">{adv.name}</h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7A2318] mt-2">{adv.role}</p>
                 <button onClick={() => { setSelectedAdvisor(i); setShowAdvisors(true); setIsSuccess(false); }} className="mt-6 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Contact Advisor</button>
               </div>
             ))}
           </div>
        </div>
      </section>

      {showAdvisors && selectedAdvisor !== null && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowAdvisors(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[40px] p-12 shadow-2xl">
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#7A2318] text-3xl font-bold">✓</div>
                <h3 className="text-3xl font-black text-gray-900 tracking-wide uppercase mt-8">Handshake Verified</h3>
                <button onClick={() => setShowAdvisors(false)} className="mt-8 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]">Close</button>
              </div>
            ) : (
              <form onSubmit={handleAdvisorContact} className="space-y-6">
                <h3 className="text-2xl font-black text-gray-900 tracking-wide uppercase">Contact {advisors[selectedAdvisor].name}</h3>
                <input required type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide" />
                <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide" />
                <textarea required placeholder="Message" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] border-2 border-transparent tracking-wide resize-none" />
                <button disabled={isSubmitting} className="w-full bg-[#7A2318] text-white py-5 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px]">
                  {isSubmitting ? "Syncing..." : "Send Request"}
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
