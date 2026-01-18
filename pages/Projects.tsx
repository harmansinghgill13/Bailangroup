
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants/projects';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Farmhouse Estate', 'Planned Township'];
  const filteredProjects = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === activeCategory);

  return (
    <div className="bg-white pt-32 pb-20 px-6 md:px-[8%] min-h-screen">
      <div className="mb-24 flex flex-col lg:flex-row justify-between items-end gap-10">
        <div className="max-w-2xl">
          <span className="text-[#7A2318] font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Elite Land Acquisitions</span>
          <h1 className="playfair text-gray-900 mb-8 leading-[1.1] tracking-[0.02em] uppercase">Estate <br/>Portfolios</h1>
          <p className="text-gray-500 text-lg italic font-light tracking-wide">"Mapping the future of luxury land ownership in Rajasthan."</p>
        </div>
        <div className="flex flex-wrap gap-8 border-b-2 border-gray-100 pb-4 w-full lg:w-auto">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all relative pb-4 -mb-4 ${
                activeCategory === cat ? 'text-[#7A2318]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
              {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7A2318]"></span>}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {filteredProjects.map((project, i) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="group cursor-pointer">
            <div className="aspect-[16/10] bg-gray-100 rounded-[40px] md:rounded-[50px] overflow-hidden mb-8 relative shadow-xl border border-gray-100">
              <img src={project.mainImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={project.title} />
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] text-[#7A2318]">
                {project.type}
              </div>
            </div>
            <div className="px-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-wide uppercase">{project.title}</h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em]">{project.location}</p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#7A2318] group-hover:text-white group-hover:border-[#7A2318] transition-all">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
