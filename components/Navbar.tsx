import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
  ];

  // Logic to determine if we should use white text (only on home hero when not scrolled)
  const isHome = location.pathname === '/';
  const useWhiteText = isHome && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-[6%] py-4 flex items-center justify-between ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      {/* BRAND LOGO */}
      <Link to="/">
        <Logo mode={useWhiteText ? 'white' : 'dark'} size="md" />
      </Link>

      {/* DESKTOP NAV */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-[12px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#7A2318] relative group ${
                  location.pathname === link.path 
                    ? 'text-[#7A2318]' 
                    : useWhiteText ? 'text-white' : 'text-gray-900'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#7A2318] transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          to="/contact"
          className={`hidden md:block bg-[#7A2318] text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#7A2318] transition-all shadow-xl hover:-translate-y-0.5 active:scale-95`}
        >
          Enquire Now
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <div className={`w-6 h-0.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''} ${useWhiteText ? 'bg-white' : 'bg-gray-900'}`}></div>
          <div className={`w-6 h-0.5 transition-all ${isMenuOpen ? 'opacity-0' : ''} ${useWhiteText ? 'bg-white' : 'bg-gray-900'}`}></div>
          <div className={`w-6 h-0.5 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${useWhiteText ? 'bg-white' : 'bg-gray-900'}`}></div>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-white z-[999] transition-transform duration-500 flex flex-col items-center justify-center gap-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-3xl font-black text-gray-900 uppercase tracking-tighter hover:text-[#7A2318]"
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/contact"
          className="mt-4 bg-[#7A2318] text-white px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl"
        >
          Enquire Now
        </Link>
      </div>
    </header>
  );
};

export default Navbar;