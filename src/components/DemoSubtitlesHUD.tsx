import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Tv,
  Volume2,
  Sparkles,
  X
} from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { startAutoDemo, stopAutoDemo, pauseAutoDemo, resumeAutoDemo, skipToNextStage } from '../engine/demoEvents';

export const DemoSubtitlesHUD: React.FC = () => {
  const {
    autoDemoRunning,
    autoDemoPaused,
    demoElapsedSeconds,
    demoSubtitlesStage,
    demoSubtitlesHindi,
    demoSubtitlesEnglish,
    showDemoSubtitles,
    setShowDemoSubtitles,
    demoRecordingMode,
    setDemoRecordingMode,
  } = useDemoStore();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!autoDemoRunning || !showDemoSubtitles) return null;

  const totalDuration = 228; // 3 min 48 sec
  const progressPct = Math.min(100, Math.max(0, (demoElapsedSeconds / totalDuration) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9990] w-[95%] max-w-4xl select-none font-sans"
    >
      <div className="relative rounded-2xl p-4 bg-[#070D18]/95 border-2 border-[#E05A1B]/70 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white flex flex-col gap-2.5 overflow-hidden">
        {/* Glowing tactical top line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E05A1B] to-[#2DD4BF]" />

        {/* Header: Stage Badge, Time Elapsed, and Quick Controls */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E05A1B] animate-pulse" />
            <span className="font-bold text-[#2DD4BF] tracking-wider uppercase">
              {demoSubtitlesStage}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Synchronized Timer */}
            <div className="px-2.5 py-1 rounded-lg bg-[#0D1929] border border-slate-700/80 text-[#FAF8F5] font-bold">
              <span className="text-[#E05A1B]">{formatTime(demoElapsedSeconds)}</span>
              <span className="text-slate-400"> / {formatTime(totalDuration)}</span>
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => {
                if (autoDemoPaused) resumeAutoDemo();
                else pauseAutoDemo();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
              title={autoDemoPaused ? 'Resume Demo' : 'Pause Demo'}
            >
              {autoDemoPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} />}
            </button>

            {/* Skip to Next Stage */}
            <button
              onClick={() => skipToNextStage()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Skip to Next Script Section"
            >
              <FastForward size={13} />
            </button>

            {/* Restart */}
            <button
              onClick={() => startAutoDemo()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Restart 3:38 Demo Sequence"
            >
              <RotateCcw size={13} />
            </button>

            {/* 16:9 Recording Mode Toggle */}
            <button
              onClick={() => setDemoRecordingMode(!demoRecordingMode)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                demoRecordingMode
                  ? 'bg-[#E05A1B] border-[#F97316] text-white shadow-md'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Toggle 16:9 Presentation Frame"
            >
              <Tv size={11} />
              <span>16:9</span>
            </button>

            {/* Minimize */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title={isMinimized ? 'Expand Subtitles' : 'Minimize Subtitles'}
            >
              {isMinimized ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {/* Close */}
            <button
              onClick={() => stopAutoDemo()}
              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-all cursor-pointer"
              title="Exit Demo Mode"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Subtitles Content Area (Collapsible) */}
        {!isMinimized && (
          <div className="flex flex-col gap-1 mt-0.5">
            {/* Spoken Hindi Text */}
            <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed font-sans">
              &ldquo;{demoSubtitlesHindi}&rdquo;
            </p>

            {/* Technical Context Summary in English */}
            <div className="text-[11px] font-mono text-[#2DD4BF] font-semibold flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#E05A1B]" />
              <span>{demoSubtitlesEnglish}</span>
            </div>
          </div>
        )}

        {/* Micro Timeline Bar */}
        <div className="w-full h-1 bg-slate-800/90 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-[#E05A1B] via-[#F97316] to-[#2DD4BF] transition-all duration-300 ease-linear rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
