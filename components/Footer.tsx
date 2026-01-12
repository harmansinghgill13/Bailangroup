import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: 'X',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"></path>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 px-[6%] mt-20 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A2318]/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 border-b border-white/10 pb-16 mb-12 relative z-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="flex flex-col items-start">
            <Link to="/">
              <Logo mode="white" size="lg" className="!items-start" />
            </Link>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm font-light">
            Bailan Group is a premier real estate advisory firm specializing in the acquisition and management of high-value architectural assets worldwide.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                aria-label={social.name}
                className="w-12 h-12 bg-white/5 text-white/40 flex items-center justify-center rounded-2xl transition-all duration-500 hover:bg-[#7A2318]/10 hover:text-[#7A2318] hover:shadow-[0_0_25px_rgba(122,35,24,0.15)] hover:-translate-y-1 border border-white/5 hover:border-[#7A2318]/30"
              >
                {social.icon}
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
            <li><a href="#" className="hover:text-white transition-colors opacity-10 cursor-default">Security Standards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-[#7A2318]">
            Headquarters
          </h4>
          <ul className="space-y-6 text-[13px] text-white/60">
            <li className="flex gap-4 items-start">
              <span className="opacity-40 font-black text-[9px] tracking-widest">LOC</span> 
              <span className="font-light leading-relaxed">P.O. Box 356, Aledo, TX 76008 <br/>United States</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="opacity-40 font-black text-[9px] tracking-widest">TEL</span> 
              <span className="font-light">+1 234 567 8901</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="opacity-40 font-black text-[9px] tracking-widest">MAIL</span> 
              <span className="font-light">contact@bailangroup.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} BAILAN GROUP. Architectural Excellence.
        </p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <span className="hover:text-white transition-colors cursor-default">London</span>
          <span className="hover:text-white transition-colors cursor-default">New York</span>
          <span className="hover:text-white transition-colors cursor-default">Dubai</span>
          <span className="hover:text-white transition-colors cursor-default">Tokyo</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;