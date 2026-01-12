import React from 'react';

interface LogoProps {
  mode?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ mode = 'dark', size = 'md', className = '' }) => {
  const isWhite = mode === 'white';
  const isDark = mode === 'dark';
  
  const sizeClasses = {
    sm: { wrapper: 'scale-75', text: 'text-lg', group: 'text-[6px]', svg: 'w-8' },
    md: { wrapper: 'scale-100', text: 'text-xl', group: 'text-[7px]', svg: 'w-10' },
    lg: { wrapper: 'scale-125 md:scale-[1.5]', text: 'text-3xl', group: 'text-[10px]', svg: 'w-12' }
  };

  const currentSize = sizeClasses[size];

  const colors = {
    bai: isWhite ? 'text-white' : 'text-[#4F545A]',
    lan: 'text-[#7A2318]',
    group: isWhite ? 'text-white/60' : 'text-[#4F545A]',
    stroke: isWhite ? '#FFFFFF' : '#4F545A'
  };

  return (
    <div className={`flex flex-col items-center group cursor-pointer select-none transition-transform duration-500 hover:scale-105 ${className} ${currentSize.wrapper}`}>
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
          {/* Subtle Glow beneath roof */}
          <div className="absolute inset-0 bg-[#7A2318]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        {/* Brand Text */}
        <div className="flex items-baseline gap-0.5 overflow-hidden">
          <span className={`${currentSize.text} font-black tracking-tighter transition-all duration-700 delay-100 ${colors.bai} group-hover:translate-y-0 translate-y-[2px]`}>
            BAI
          </span>
          <span className={`${currentSize.text} font-black ${colors.lan} tracking-tighter relative group-hover:translate-y-0 translate-y-[2px] transition-all duration-700 delay-150`}>
            LAN
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></span>
          </span>
        </div>

        {/* Subtitle */}
        <div className={`${currentSize.group} font-bold tracking-[0.4em] uppercase mt-0.5 transition-all duration-700 delay-200 ${colors.group} group-hover:tracking-[0.6em] group-hover:opacity-100`}>
          GROUP
        </div>
      </div>

      <style>{`
        .path-draw {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          /* Infinite loop: 7 seconds total. 1.5s animation, then pause. */
          animation: drawPathInfinite 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes drawPathInfinite {
          0% { stroke-dashoffset: 100; opacity: 0; }
          5% { opacity: 1; }
          20% { stroke-dashoffset: 0; } /* Finished drawing by 1.4s */
          95% { stroke-dashoffset: 0; opacity: 1; } /* Stay until 6.65s */
          100% { stroke-dashoffset: 100; opacity: 0; } /* Reset */
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
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