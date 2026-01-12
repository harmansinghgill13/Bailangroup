
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants/projects.ts';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={project.mainImage} 
            className="w-full h-full object-cover scale-105 animate-slow-zoom" 
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-end px-[6%] pb-20">
          <div className="max-w-4xl space-y-6">
            <Link to="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <span className="text-xl">←</span> Back to Portfolios
            </Link>
            <span className="inline-block bg-[#7A2318] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
              {project.type}
            </span>
            <h1 className="playfair text-6xl md:text-9xl font-black text-white leading-tight tracking-tighter animate-reveal">
              {project.title}
            </h1>
            <p className="text-white/80 text-xl font-light tracking-wide uppercase">
              {project.location}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <div className="sticky top-[80px] z-[100] bg-white border-y border-gray-100 px-[6%] py-6 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-16">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Guide Price</p>
              <p className="text-xl font-black text-gray-900">{project.price}</p>
            </div>
            {project.beds > 0 && (
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Bedrooms</p>
                <p className="text-xl font-black text-gray-900">{project.beds}</p>
              </div>
            )}
            {project.baths > 0 && (
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Bathrooms</p>
                <p className="text-xl font-black text-gray-900">{project.baths}</p>
              </div>
            )}
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Internal Area</p>
              <p className="text-xl font-black text-gray-900">{project.sqft} SQFT</p>
            </div>
          </div>
          <Link to="/contact" className="bg-[#7A2318] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all">
            Enquire Now
          </Link>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <section className="py-32 px-[6%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Narrative */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <span className="text-[#7A2318] font-black uppercase tracking-[0.4em] text-[10px]">Architectural Narrative</span>
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                Designed for the <br/>Discerning Few.
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed font-light">
                {project.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-gray-100">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#7A2318] font-bold">
                    ✓
                  </div>
                  <span className="font-bold text-gray-700 tracking-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-[50px] p-12 space-y-10">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Viewing Request</h3>
              <p className="text-gray-500 text-sm font-light">
                Bailan Group offers private, confidential viewings for this property by appointment only.
              </p>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full bg-white px-6 py-4 rounded-2xl outline-none border border-transparent focus:border-[#7A2318] transition-all text-sm" />
                <input type="email" placeholder="Email Address" className="w-full bg-white px-6 py-4 rounded-2xl outline-none border border-transparent focus:border-[#7A2318] transition-all text-sm" />
                <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#7A2318] transition-all">
                  Request Private Tour
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section className="py-20 px-[6%] bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {project.gallery.map((img, i) => (
              <div key={i} className="group relative rounded-[40px] overflow-hidden shadow-xl break-inside-avoid">
                <img 
                  src={img} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt={`${project.title} gallery ${i}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEXT PROJECT CTA --- */}
      <section className="py-40 bg-white text-center px-[6%]">
        <span className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Continue Exploring</span>
        <h2 className="playfair text-6xl md:text-8xl font-black text-gray-900 mb-12 tracking-tighter">Next Masterpiece</h2>
        <Link to="/projects" className="text-[#7A2318] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 group">
          Back to all portfolios
          <span className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:bg-[#7A2318] group-hover:text-white group-hover:border-[#7A2318] transition-all">
            →
          </span>
        </Link>
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
      `}</style>
    </div>
  );
};

export default ProjectDetail;
