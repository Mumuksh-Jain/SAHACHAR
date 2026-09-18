import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../store/useDemoStore';

export const VirtualCursor: React.FC = () => {
  const { virtualCursor, autoDemoRunning } = useDemoStore();

  if (!autoDemoRunning || !virtualCursor.visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[10000] transition-all duration-700 ease-out"
      style={{
        left: `${virtualCursor.x}px`,
        top: `${virtualCursor.y}px`,
        transform: 'translate(-4px, -4px)',
      }}
    >
      {/* Reticle / Pointer Body */}
      <div className="relative flex items-center">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_10px_rgba(224,90,27,0.9)]"
        >
          <path
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            fill="#E05A1B"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Action Label Badge */}
        <AnimatePresence>
          {virtualCursor.label && (
            <motion.div
              key={virtualCursor.label}
              initial={{ opacity: 0, x: 6, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 4, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="ml-2.5 px-3 py-1 rounded-lg bg-[#070D18]/95 border border-[#E05A1B]/70 text-white text-[11px] font-mono font-bold whitespace-nowrap shadow-2xl backdrop-blur-md flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-ping" />
              <span>{virtualCursor.label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tactical Expanding Click Ripple */}
        {virtualCursor.clicking && (
          <span className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-[#E05A1B] animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
};
