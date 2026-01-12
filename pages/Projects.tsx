
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants/projects.ts';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.type === activeCategory);

  return (
    <div className="bg-white pt-32 pb-20 px-[6%] min-h-screen">
      <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
        <div className="max-w-xl">
          <span className="text-[#7A2318] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Global Reach</span>
          <h1 className="playfair text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">Featured <br/>Portfolios</h1>
          <p className="text-gray-500 text-lg italic font-light">"Turning visions into concrete reality across the globe."</p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 md:gap-8 border-b-2 border-gray-100 pb-4">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-black uppercase tracking-widest transition-all relative pb-4 -mb-4 ${
                activeCategory === cat 
                  ? 'text-[#7A2318]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7A2318] animate-grow-x"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {filteredProjects.map((project, i) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="aspect-[16/11] bg-gray-100 rounded-[40px] overflow-hidden mb-8 relative shadow-xl">
              <img 
                src={project.mainImage} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={project.title}
              />
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#7A2318] shadow-sm">
                {project.type}
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="bg-white text-gray-900 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Masterpiece</span>
              </div>
            </div>
            <div className="flex justify-between items-center px-6">
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{project.title}</h3>
                <div className="flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#7A2318]"></span>
                   <p className="text-gray-500 text-sm font-medium uppercase tracking-widest opacity-60">{project.location}</p>
                </div>
              </div>
              <div className="w-14 h-14 border-2 border-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#7A2318] group-hover:text-white group-hover:border-[#7A2318] transition-all duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-400 font-black uppercase tracking-widest">No listings found in this category.</p>
        </div>
      )}

      <style>{`
        @keyframes growX {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-grow-x {
          animation: growX 0.3s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Projects;
