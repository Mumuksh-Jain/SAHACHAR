import React, { useRef, useState, useEffect } from 'react';
import { FastForward, Volume2, VolumeX } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';

export const BootSequence: React.FC = () => {
  const { setIsBooting } = useDemoStore();
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState('/booting video.mp4');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Boot video autoplay notice:', err);
      });
    }
  }, [videoSrc]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

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
    // Fallback sequence: '/booting video.mp4' -> '/booting-video.mp4' -> '/BOOTING PAGE.mp4'
    if (videoSrc === '/booting video.mp4') {
      setVideoSrc('/booting-video.mp4');
    } else if (videoSrc === '/booting-video.mp4') {
      setVideoSrc('/BOOTING PAGE.mp4');
    } else {
      // If none can be played, gracefully dismiss to landing page
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
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        className="w-full h-full object-cover"
      />

      {/* Subtle Dark Vignette on edges for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* Floating HUD Controls */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white font-mono text-xs transition-all cursor-pointer backdrop-blur-md shadow-lg"
          title={isMuted ? 'Click to Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={15} className="text-amber-400" /> : <Volume2 size={15} className="text-emerald-400" />}
          <span className="hidden sm:inline">{isMuted ? 'UNMUTE' : 'MUTED'}</span>
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E05A1B]/90 hover:bg-[#E05A1B] border border-white/30 text-white font-mono text-xs font-bold transition-all cursor-pointer backdrop-blur-md shadow-[0_0_20px_rgba(224,90,27,0.5)] hover:scale-105 active:scale-95"
          title="Skip Boot Video and Enter SAHACHAR"
        >
          <span>ENTER SITE</span>
          <FastForward size={14} />
        </button>
      </div>

      {/* Bottom Progress & Tactical Branding */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-4 sm:p-6 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-pulse" />
            <span className="font-bold text-white tracking-wider">SAHACHAR-DRR • SYSTEM INITIALIZATION</span>
          </div>
          <span className="text-slate-400 font-mono hidden sm:inline">KENDRAPARA DISASTER RISK REDUCTION ENGINE</span>
        </div>

        {/* Video Progress Bar */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#E05A1B] to-[#2DD4BF] transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
