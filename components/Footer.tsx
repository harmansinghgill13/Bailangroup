
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 px-[6%] mt-20">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 border-b border-white/10 pb-16 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-gray-400 tracking-tighter">BAI</span>
              <span className="text-3xl font-black text-[#7A2318] tracking-tighter">LAN</span>
            </div>
            <div className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase">
              GROUP
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm font-light">
            Bailan Group is a premier real estate advisory firm specializing in the acquisition and management of high-value architectural assets worldwide.
          </p>
          <div className="flex gap-4">
            {['FB', 'TW', 'IG', 'LI'].map((soc) => (
              <a key={soc} href="#" className="w-10 h-10 bg-white/5 text-white/40 flex items-center justify-center rounded-xl transition-all hover:bg-[#7A2318] hover:text-white text-[10px] font-black uppercase tracking-widest">
                {soc}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-[#7A2318]">
            Company
          </h4>
          <ul className="space-y-4 text-[13px] text-white/60 font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Legacy</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Expertise</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">Portfolios</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-[#7A2318]">
            Legal
          </h4>
          <ul className="space-y-4 text-[13px] text-white/60 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            <li><Link to="/admin" className="hover:text-white transition-colors">Management Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-[#7A2318]">
            Headquarters
          </h4>
          <ul className="space-y-6 text-[13px] text-white/60">
            <li className="flex gap-4 items-start">
              <span className="opacity-40">LOC</span> 
              <span className="font-light leading-relaxed">P.O. Box 356, Aledo, TX 76008 <br/>United States</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="opacity-40">TEL</span> 
              <span className="font-light">+1 234 567 8901</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="opacity-40">MAIL</span> 
              <span className="font-light">contact@bailangroup.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} BAILAN GROUP. Architectural Excellence.
        </p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <span>London</span>
          <span>New York</span>
          <span>Dubai</span>
          <span>Tokyo</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
