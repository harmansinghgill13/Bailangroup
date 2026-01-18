
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants/projects';
import { inquiryService } from '../services/inquiryService';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === projectId);

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await inquiryService.saveInquiry({
        firstName: formData.name,
        lastName: `(Viewing Request: ${project?.title})`,
        email: formData.email,
        type: 'Property Viewing',
        message: `Automatic request for a private tour or site visit to ${project?.title} in ${project?.location}.`
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!project) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* --- CINEMATIC DOSSIER HERO --- */}
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={project.mainImage} 
            className="w-full h-full object-cover scale-105 animate-slow-zoom" 
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-[8%] pb-16 md:pb-20">
          <div className="max-w-5xl space-y-8 animate-reveal">
            <Link to="/projects" className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.4em] mb-4 group">
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">←</span> 
              Asset Portfolio
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="bg-[#7A2318] text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em]">
                  {project.type}
                </span>
                <span className="text-white/40 text-[8px] font-black uppercase tracking-[0.2em]">Asset Ref: BLN-{project.id.toUpperCase().slice(0,4)}</span>
              </div>
              <h1 className="playfair text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-4">
                {project.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-8 md:w-12 h-[1px] bg-[#7A2318]"></div>
                <p className="text-white/80 text-lg md:text-xl font-light tracking-wide uppercase italic">
                  {project.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-[6%] hidden md:flex items-center gap-6">
           <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em] rotate-90 origin-right translate-y-full">Scroll for Dossier</p>
           <div className="w-[1px] h-32 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* --- ASSET SPECIFICATIONS BAR --- */}
      <div className="sticky top-[68px] lg:top-[80px] z-[100] bg-white/80 backdrop-blur-xl border-y border-gray-100 px-6 md:px-[8%] py-6 md:py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
          <div className="flex gap-8 md:gap-16 lg:gap-20 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar">
            {[
              { label: 'Guide Price', val: project.price },
              { label: 'Infrastructure', val: 'Premium' },
              { label: 'Area Range', val: `${project.sqft}` }
            ].map((stat, i) => (
              <div key={i} className="space-y-1 shrink-0">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#7A2318]">{stat.label}</p>
                <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter uppercase">{stat.val}</p>
              </div>
            ))}
          </div>
          <button 
             onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
             className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[9px] hover:bg-[#7A2318] transition-all shadow-xl active:scale-95"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* --- DOSSIER CONTENT --- */}
      <section className="py-24 md:py-32 px-6 md:px-[8%] max-w-[1400px] mx-auto relative overflow-hidden">
        <div className="absolute top-40 left-0 text-[20vw] font-black text-gray-50 opacity-30 select-none pointer-events-none -z-10 leading-none tracking-tighter hidden lg:block uppercase">PLAN</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-[#7A2318] font-black uppercase tracking-[0.5em] text-[9px] mb-4 block">Site Specification</span>
                <h2 className="playfair text-4xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1] uppercase">
                  Masterplan <br/>Logic.
                </h2>
              </div>
              <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-light first-letter:text-6xl first-letter:md:text-7xl first-letter:font-black first-letter:text-[#7A2318] first-letter:mr-4 first-letter:float-left">
                {project.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-16 border-t border-gray-100">
              {project.features.map((feature, i) => (
                <div key={i} className="group flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#7A2318] font-black transition-all group-hover:bg-[#7A2318] group-hover:text-white shadow-sm">
                    ✓
                  </div>
                  <span className="font-black text-gray-900 tracking-tight text-base md:text-lg uppercase">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR ENQUIRY CARD */}
          <div className="lg:col-span-5 lg:sticky lg:top-48 w-full" id="enquiry-form">
            <div className="bg-[#0A0A0A] rounded-[40px] md:rounded-[60px] p-10 md:p-16 space-y-10 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7A2318]/20 blur-[100px] pointer-events-none"></div>
              
              {isSuccess ? (
                <div className="text-center py-10 animate-reveal">
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-black">✓</div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">Request Logged</h3>
                  <p className="text-white/40 text-xs font-light mb-10 leading-relaxed">Your interest in {project.title} has been logged in our secure system. A partner will reach out to schedule your site visit.</p>
                  <button onClick={() => setIsSuccess(false)} className="text-[9px] font-black uppercase tracking-[0.3em] text-[#7A2318] border-b border-[#7A2318] pb-1">Reset Protocol</button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Schedule <br/>Visit.</h3>
                    <p className="text-white/30 text-[10px] font-light italic">
                      Private tours for {project.title} are strictly by referral or vetted appointment.
                    </p>
                  </div>
                  
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                      <label className="text-white/20 text-[8px] font-black uppercase tracking-[0.2em] ml-4">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Legal Identity" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] focus:bg-white/10 transition-all text-white font-medium text-sm" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-white/20 text-[8px] font-black uppercase tracking-[0.2em] ml-4">Secure Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-[#7A2318] focus:bg-white/10 transition-all text-white font-medium text-sm" 
                      />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-[#7A2318] text-white py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[9px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group mt-6"
                    >
                      {isSubmitting ? "Verifying..." : "Request Site Tour"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- SITE LAYOUT & KEY PLANS --- */}
      <section className="py-24 md:py-40 px-6 md:px-[8%] bg-[#FDFCFB]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
             <span className="text-[#7A2318] font-black uppercase tracking-[0.5em] text-[10px] block mb-4">Dossier Visuals</span>
             <h2 className="playfair text-gray-900 uppercase">Layout Evidence</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
            {project.gallery.map((img, i) => (
              <div 
                key={i} 
                className={`group relative rounded-[35px] md:rounded-[60px] overflow-hidden shadow-2xl transition-transform duration-1000 bg-white p-4 border border-gray-100 ${
                  i % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-24'
                }`}
              >
                <div className="overflow-hidden rounded-[25px] md:rounded-[45px] bg-gray-50 border border-gray-100">
                  <img 
                    src={img} 
                    className="w-full h-auto object-contain transition-transform duration-[2s] group-hover:scale-105" 
                    alt={`${project.title} plan detail ${i}`} 
                  />
                </div>
                <div className="mt-4 px-4 pb-4">
                  <span className="text-[8px] font-black text-[#7A2318] uppercase tracking-[0.4em]">Asset Visualization 0{i+1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes reveal {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.15); }
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slow-zoom {
          animation: slowZoom 20s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
