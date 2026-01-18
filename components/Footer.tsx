
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
    { name: 'X', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"></path></svg> },
    { name: 'Instagram', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
    { name: 'LinkedIn', href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> }
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 px-6 md:px-[8%] mt-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A2318]/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 border-b border-white/10 pb-16 mb-12 relative z-10">
        <div className="md:col-span-2 lg:col-span-2 space-y-8">
          <Link to="/" className="inline-block">
            {/* Reduced size in footer to ensure no overflow */}
            <Logo mode="white" size="md" className="!items-start scale-90 md:scale-100 origin-left" />
          </Link>
          <p className="text-white/50 text-[13px] leading-relaxed max-w-xs font-light tracking-wide">
            Bailan Group is a premier real estate advisory firm specializing in the acquisition and management of high-value architectural assets worldwide.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                aria-label={social.name}
                className="w-10 h-10 bg-white/5 text-white/40 flex items-center justify-center rounded-xl transition-all duration-500 hover:bg-[#7A2318]/10 hover:text-[#7A2318] border border-white/5"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-[#7A2318]">Company</h4>
          <ul className="space-y-4 text-[13px] text-white/60 font-medium tracking-wide">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Legacy</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Expertise</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">Portfolios</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-1">
          <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-[#7A2318]">Legal</h4>
          <ul className="space-y-4 text-[13px] text-white/60 font-medium tracking-wide">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-[#7A2318]">Headquarters</h4>
          <ul className="space-y-6 text-[13px] text-white/60 tracking-wide">
            <li className="flex gap-4 items-start">
              <span className="opacity-40 font-black text-[9px] tracking-widest pt-1 uppercase">LOC</span> 
              <span className="font-light leading-relaxed">P.O. Box 356, Aledo, TX 76008 <br/>United States</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="opacity-40 font-black text-[9px] tracking-widest pt-1 uppercase">MAIL</span> 
              <span className="font-light">rajbailan65@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em] text-center md:text-left">
          &copy; {new Date().getFullYear()} BAILAN GROUP. Architectural Excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
