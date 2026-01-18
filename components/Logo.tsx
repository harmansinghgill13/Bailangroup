
import React from 'react';

interface LogoProps {
  mode?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ mode = 'dark', size = 'md', className = '' }) => {
  const isWhite = mode === 'white';
  
  const sizeClasses = {
    sm: { wrapper: 'scale-[0.8]', text: 'text-lg', group: 'text-[7px]', svg: 'w-8' },
    md: { wrapper: 'scale-[0.9] md:scale-100', text: 'text-xl', group: 'text-[8px]', svg: 'w-10' },
    lg: { wrapper: 'scale-[1.1] md:scale-[1.4]', text: 'text-2xl md:text-3xl', group: 'text-[9px] md:text-[10px]', svg: 'w-12' }
  };

  const currentSize = sizeClasses[size];

  const colors = {
    bai: isWhite ? 'text-[#7A2318]' : 'text-[#4F545A]',
    lan: 'text-[#7A2318]',
    group: isWhite ? 'text-white/60' : 'text-[#4F545A]',
    stroke: isWhite ? '#FFFFFF' : '#4F545A'
  };

  return (
    <div className={`flex flex-col items-center group cursor-pointer select-none transition-transform duration-500 ${className} ${currentSize.wrapper}`}>
      <div className="relative flex flex-col items-center leading-none">
        {/* Animated Roof SVG */}
        <div className="flex flex-col items-center -mb-1 relative">
          <svg 
            width="40" 
            height="20" 
            viewBox="0 0 40 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="logo-roof transition-all duration-700 ease-out group-hover:-translate-y-1.5"
          >
            <path 
              d="M2 18 L20 2 L38 18" 
              stroke={colors.stroke} 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="path-draw"
            />
            <rect 
              x="18" 
              y="10" 
              width="4" 
              height="4" 
              fill="#7A2318" 
              className="core-dot transition-all duration-500 group-hover:rotate-45 group-hover:scale-125"
            />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex items-baseline gap-0.5 overflow-hidden">
          <span className={`${currentSize.text} font-black tracking-tighter transition-all duration-700 ${colors.bai}`}>
            BAI
          </span>
          <span className={`${currentSize.text} font-black ${colors.lan} tracking-tighter transition-all duration-700`}>
            LAN
          </span>
        </div>

        {/* Subtitle */}
        <div className={`${currentSize.group} font-bold tracking-[0.4em] uppercase mt-0.5 transition-all duration-700 ${colors.group} group-hover:tracking-[0.6em]`}>
          GROUP
        </div>
      </div>

      <style>{`
        .path-draw {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawPathInfinite 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes drawPathInfinite {
          0% { stroke-dashoffset: 100; opacity: 0; }
          5% { opacity: 1; }
          20% { stroke-dashoffset: 0; }
          95% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 100; opacity: 0; }
        }

        .logo-roof {
          filter: drop-shadow(0 0 0px transparent);
        }
        
        .group:hover .logo-roof {
          filter: drop-shadow(0 4px 6px rgba(122, 35, 24, 0.2));
        }
      `}</style>
    </div>
  );
};

export default Logo;
