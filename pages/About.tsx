
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex flex-col pt-40 px-[6%] bg-gray-50">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-[0.05]"
            alt="About Background"
          />
        </div>
        
        <div className="relative z-10">
          <span className="text-[#7A2318] font-black uppercase tracking-[0.3em] text-xs block mb-6">Our Legacy</span>
          <h1 className="text-gray-900 font-black text-6xl md:text-9xl leading-[0.8] uppercase mb-10 tracking-tighter">
            BAILAN <br/>GROUP <span className="text-[#7A2318]">ELITE.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end gap-16">
            <p className="text-gray-500 text-xl max-w-xl leading-relaxed font-light">
              Bailan Group is a global real estate firm dedicated to the art of luxury living. With decades of cross-continental experience, we bridge the gap between architectural masterpieces and discerning international buyers.
            </p>
            
            {/* INTERACTIVE BADGE */}
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              <svg className="absolute w-full h-full rotate-badge" viewBox="0 0 100 100">
                <path id="badgePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent"/>
                <text className="text-[8px] uppercase fill-[#7A2318] font-black tracking-[0.2em]">
                  <textPath xlinkHref="#badgePath">Bailan Group Worldwide • Premium Real Estate • World Class • </textPath>
                </text>
              </svg>
              <div className="text-[#7A2318] text-5xl font-thin tracking-tighter">BIG</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISION SECTION --- */}
      <section className="py-32 px-[6%] grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-[1400px] mx-auto">
        <div className="relative group">
          <div className="w-[90%] rounded-[60px] overflow-hidden shadow-2xl relative z-20">
            <img src="/images/about2.jpg" className="w-full h-[600px] object-cover" alt="Vision" />
          </div>
          <div className="absolute -right-4 top-1/4 w-[50%] rounded-[40px] overflow-hidden shadow-2xl border-[15px] border-white z-30 hidden md:block">
            <img src="/images/about1.jpg" className="w-full h-[350px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Vision Detail" />
          </div>
        </div>
        
        <div className="space-y-10">
          <h2 className="text-6xl font-black text-gray-900 leading-tight tracking-tighter uppercase">
            Transforming <br/>the Horizon.
          </h2>
          <div className="space-y-6">
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Bailan Group's mission is to empower individuals by providing a transparent, efficient, and luxurious property buying experience through our global network of experts.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed italic">
              "We don't just sell properties; we facilitate legacies."
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <h4 className="text-[#7A2318] text-4xl font-black mb-1">200+</h4>
              <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Elite Partners</p>
            </div>
            <div>
              <h4 className="text-[#7A2318] text-4xl font-black mb-1">15</h4>
              <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Global Offices</p>
            </div>
          </div>

          <button className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#7A2318] transition-all shadow-xl">
            Meet our Advisors
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
