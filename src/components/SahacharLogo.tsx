import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, X, Info } from 'lucide-react';

interface SahacharLogoProps {
  variant?: 'compact' | 'full' | 'hero';
  showSubtitle?: boolean;
  className?: string;
}

export const SahacharLogo: React.FC<SahacharLogoProps> = ({
  variant = 'compact',
  showSubtitle = true,
  className = '',
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-2.5 cursor-pointer group select-none transition-all ${className}`}
        title="Click to view SAHACHAR Identity & Humanitarian Mission"
      >
        {/* Circular Emblem with Sheltering Hand & Togetherness */}
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#E0A53B]/60 shadow-[0_0_15px_rgba(224,165,59,0.35)] group-hover:border-[#E0A53B] group-hover:shadow-[0_0_20px_rgba(224,165,59,0.6)] transition-all bg-[#101E17]">
            <img
              src="/sahachar-logo.png"
              alt="SAHACHAR Official Logo"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
          {/* Saffron beacon dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#E0A53B] border-2 border-[#0A130E] animate-pulse" />
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-black tracking-wider text-base sm:text-lg text-[#FAF8F5] group-hover:text-[#E0A53B] transition-colors leading-none">
              SAHACHAR
            </span>
            <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-[#1E4B32] text-[#86EFAC] border border-[#6A8F3A]/60 uppercase tracking-wider">
              DRR
            </span>
          </div>

          {showSubtitle && (
            <div className="text-[10px] font-sans text-[#F2E6D3]/70 font-medium tracking-tight truncate max-w-[220px] sm:max-w-xs mt-0.5">
              Livelihood-Aware Human–Livestock Evacuation
            </div>
          )}
        </div>
      </div>

      {/* Brand Identity & Mission Manifesto Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto crisis-card rounded-3xl p-5 border-2 border-[#E0A53B]/50 shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
              style={{ background: 'linear-gradient(160deg, #101E17 0%, #0A130E 100%)' }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <X size={18} />
              </button>

              {/* Full Brand Sheet Display */}
              <div className="rounded-2xl overflow-hidden border border-white/10 mb-4 bg-white shadow-2xl">
                <img
                  src="/sahachar-logo.png"
                  alt="SAHACHAR Brand Identity Sheet"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="text-center mb-4">
                <div className="font-serif font-black text-2xl text-[#FAF8F5] tracking-wide">
                  SAHACHAR-DRR
                </div>
                <div className="text-xs text-[#E0A53B] font-mono font-bold mt-1">
                  Livelihood-Aware Joint Human–Livestock Evacuation Intelligence for Rural Disasters
                </div>
              </div>

              {/* Symbol Meaning Manifesto */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[10px] font-mono p-3 rounded-2xl bg-black/40 border border-white/5 mb-4">
                {[
                  { title: 'DANGER', desc: 'Threat & Disruption', icon: '⛈️' },
                  { title: 'TOGETHERNESS', desc: 'Human & Herd Together', icon: '👨‍🌾' },
                  { title: 'PROTECTION', desc: 'Companionship That Shelters', icon: '🤲' },
                  { title: 'MOVEMENT', desc: 'Intelligent Path', icon: '🛣️' },
                  { title: 'SAFETY', desc: 'Safe Sanctuaries', icon: '🏫' },
                  { title: 'HOPE', desc: 'Rural Resilience', icon: '🌅' },
                ].map(item => (
                  <div key={item.title} className="flex flex-col items-center">
                    <span className="text-xl mb-1">{item.icon}</span>
                    <strong className="text-[#E0A53B]">{item.title}</strong>
                    <span className="text-[#F2E6D3]/60 text-[8px] leading-tight mt-0.5">{item.desc}</span>
                  </div>
                ))}
              </div>

              {/* Brand Palette Swatches */}
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/10">
                {[
                  { color: '#1E4B32', name: 'Forest Green' },
                  { color: '#6A8F3A', name: 'Sage' },
                  { color: '#1D3C6A', name: 'Slate Blue' },
                  { color: '#8B5A2B', name: 'Mud Embankment' },
                  { color: '#E0A53B', name: 'Saffron Sun' },
                  { color: '#F2E6D3', name: 'Warm Ivory' },
                ].map(swatch => (
                  <div key={swatch.color} className="flex flex-col items-center">
                    <div
                      className="w-6 h-6 rounded-full border border-white/30 shadow"
                      style={{ background: swatch.color }}
                      title={swatch.name}
                    />
                    <span className="text-[8px] font-mono text-[#F2E6D3]/50 mt-1">{swatch.color}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
