import React from 'react';
import { useDemoStore } from '../store/useDemoStore';

interface SahacharLogoProps {
  variant?: 'compact' | 'full' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  clickable?: boolean;
}

export const SahacharLogo: React.FC<SahacharLogoProps> = ({
  variant = 'compact',
  showSubtitle = true,
  className = '',
  clickable = true,
}) => {
  const { setAppView } = useDemoStore();

  const handleClick = () => {
    if (clickable) {
      setAppView('landing');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-2.5 ${clickable ? 'cursor-pointer' : ''} group select-none transition-all ${className}`}
      title={clickable ? "Return to SAHACHAR-DRR Landing Portal" : "SAHACHAR-DRR"}
    >
      {/* Circular Emblem with Uploaded Official Logo */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#E05A1B] shadow-[0_0_15px_rgba(224,90,27,0.35)] group-hover:border-white group-hover:shadow-[0_0_20px_rgba(224,90,27,0.6)] transition-all bg-white flex items-center justify-center p-0.5">
          <img
            src="/sahachar-logo.png"
            alt="SAHACHAR Official Logo"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        {/* Rescue Orange Action Dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#E05A1B] border-2 border-[#0B1512] animate-pulse" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-serif font-black tracking-wider text-base sm:text-lg text-white group-hover:text-[#E8F3ED] transition-colors leading-none">
            SAHACHAR
          </span>
          <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-[#E05A1B] text-white border border-[#F97316] uppercase tracking-wider shadow-sm">
            DRR
          </span>
        </div>

        {showSubtitle && (
          <div className="text-[10px] font-sans text-slate-300 font-medium tracking-tight truncate max-w-[220px] sm:max-w-xs mt-0.5">
            Rural Evacuation Assurance & Action System
          </div>
        )}
      </div>
    </div>
  );
};
