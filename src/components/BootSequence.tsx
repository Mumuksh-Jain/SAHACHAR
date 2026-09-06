import React, { useRef, useState } from 'react';
import { FastForward, Volume2, VolumeX } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';

export const BootSequence: React.FC = () => {
  const { setIsBooting } = useDemoStore();
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState('/boot-video.mp4');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnded = () => {
    setIsBooting(false);
  };

  const handleSkip = () => {
    setIsBooting(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleError = () => {
    // If /boot-video.mp4 is not found, fallback to /BOOTING PAGE.mp4
    if (videoSrc !== '/BOOTING PAGE.mp4') {
      setVideoSrc('/BOOTING PAGE.mp4');
    } else {
      // If neither is found or playable, gracefully dismiss
      setIsBooting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden select-none">
      {/* Full-Screen Boot Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={handleEnded}
        onError={handleError}
        className="w-full h-full object-cover"
      />

      {/* Floating HUD Controls */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-all cursor-pointer backdrop-blur-md shadow-lg"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#E05A1B] text-white font-mono text-xs font-bold transition-all cursor-pointer backdrop-blur-md shadow-lg"
          title="Skip Video"
        >
          <span>SKIP</span>
          <FastForward size={14} />
        </button>
      </div>

      {/* Subtle Bottom Progress Hint */}
      <div className="absolute bottom-4 left-6 z-30 font-mono text-[11px] text-white/60 tracking-wider flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-pulse" />
        <span>SAHACHAR-DRR • SYSTEM INITIALIZATION</span>
      </div>
    </div>
  );
};
