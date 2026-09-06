import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radio, Terminal, Cpu, Satellite, Waves, Volume2, VolumeX, FastForward, CheckCircle2 } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';

interface BootStep {
  time: string;
  subsystem: string;
  message: string;
  status: 'DONE' | 'ACTIVE' | 'PENDING';
}

const INITIAL_STEPS: BootStep[] = [
  { time: '0.00s', subsystem: 'KERNEL', message: 'SAHACHAR Linux-RT Disaster Core v2.6.4 loaded into secure memory', status: 'PENDING' },
  { time: '0.25s', subsystem: 'SATELLITE', message: 'ISRO RISAT-2BR1 (C-Band SAR) & INSAT-3DR synthetic aperture feed locked', status: 'PENDING' },
  { time: '0.55s', subsystem: 'HYDROLOGY', message: '14/14 telemetry river gauge stations online (Baitarani & Mahanadi delta)', status: 'PENDING' },
  { time: '0.90s', subsystem: 'TOPOLOGY', message: 'High-res 30m Digital Elevation Model (DEM) & Tirtol road mesh calibrated', status: 'PENDING' },
  { time: '1.25s', subsystem: 'SOLVER', message: 'Offline-first Dijkstra Access Horizon & flood inundation simulator armed', status: 'PENDING' },
  { time: '1.60s', subsystem: 'FLEET', message: '21 Evacuation vehicles, 6 Cyclone Shelters, 3 Livestock camps registered', status: 'PENDING' },
  { time: '1.95s', subsystem: 'TELEMETRY', message: 'LoRa Mesh (865-867 MHz) & Emergency Cell Broadcast (CAP) synchronized', status: 'PENDING' },
  { time: '2.25s', subsystem: 'SECURITY', message: 'Multi-Agent Autonomous Evacuation Assurance Protocol armed. ALL SYSTEMS GO.', status: 'PENDING' },
];

export const BootSequence: React.FC = () => {
  const { setIsBooting } = useDemoStore();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<BootStep[]>(INITIAL_STEPS);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize cybernetic sound effects using Web Audio API
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  useEffect(() => {
    // Progressive boot animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          playBeep(880, 'triangle', 0.2);
          return 100;
        }
        const next = Math.min(100, prev + 2.5);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Step advancement based on progress percentage
  useEffect(() => {
    const total = INITIAL_STEPS.length;
    const activeIndex = Math.min(total - 1, Math.floor((progress / 100) * total));
    setCurrentStepIndex(activeIndex);

    setSteps(prev =>
      prev.map((step, idx) => {
        if (idx < activeIndex) return { ...step, status: 'DONE' };
        if (idx === activeIndex) return { ...step, status: 'ACTIVE' };
        return { ...step, status: 'PENDING' };
      })
    );

    if (progress > 0 && progress < 100 && Math.floor(progress) % 15 === 0) {
      playBeep(440 + (progress * 5), 'sine', 0.05);
    }
  }, [progress]);

  // Auto transition after completion with a slight delay
  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        setIsBooting(false);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, setIsBooting]);

  const handleSkip = () => {
    setIsBooting(false);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        audioCtxRef.current.resume();
      } catch {}
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden select-none"
         style={{
           background: 'radial-gradient(ellipse at 50% 30%, #0c1c33 0%, #07111F 70%, #03070d 100%)',
           color: '#F8FAFC',
           fontFamily: 'Inter, system-ui, sans-serif'
         }}>
      {/* Dynamic scanline and grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
           }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,17,31,0.8)_100%)]" />

      {/* TOP CLASSIFICATION BAR */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-cyan-500/20 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Shield size={20} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-400">
              NATIONAL DISASTER MANAGEMENT AUTHORITY • GOVT OF ODISHA
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              OPERATION AMRIT DHARA // TIRTOL BASIN DISASTER MITIGATION SYSTEM
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all"
            style={{
              background: soundEnabled ? 'rgba(6, 182, 212, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              borderColor: soundEnabled ? '#06b6d4' : '#334155',
              color: soundEnabled ? '#22d3ee' : '#94a3b8',
            }}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 transition-all shadow-md"
          >
            <FastForward size={14} />
            SKIP BOOT
          </button>
        </div>
      </div>

      {/* CENTER HOLOGRAPHIC INITIALIZATION DISPLAY */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto w-full py-4">
        
        {/* Animated Cyber Core Icon */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Rotating Outer Radar Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 rounded-full border border-dashed border-cyan-400/40 absolute"
          />
          {/* Counter-rotating Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border border-cyan-500/50 absolute"
          />
          {/* Pulsing Core with Official SAHACHAR Emblem */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 25px rgba(224,165,59,0.3)', '0 0 50px rgba(224,165,59,0.7)', '0 0 25px rgba(224,165,59,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full border-2 border-[#E0A53B] overflow-hidden shadow-2xl z-10 bg-[#101E17] flex items-center justify-center"
          >
            <img
              src="/sahachar-logo.png"
              alt="SAHACHAR Logo"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </motion.div>
        </div>

        {/* Title & System Name */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E4B32]/60 border border-[#6A8F3A]/60 text-[#86EFAC] text-xs font-mono font-bold mb-2 tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[#E0A53B] animate-pulse" />
            SECURE BOOT SEQUENCE v2.6.4 ACTIVE
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-wider text-[#FAF8F5] drop-shadow-[0_0_30px_rgba(224,165,59,0.4)]">
            SAHACHAR-DRR
          </h1>
          <p className="text-sm md:text-base text-[#E0A53B] font-medium tracking-wide mt-1">
            Livelihood-Aware Joint Human–Livestock Evacuation Intelligence
          </p>
        </div>

        {/* SUBSYSTEM READINESS GAUGES (5 METRIC CARDS) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full mb-6">
          {[
            { label: 'ISRO SATELLITE', icon: Satellite, status: progress >= 25 ? 'LOCKED' : 'SYNCING', active: progress >= 25, val: 'SAR 12ms' },
            { label: 'HYDRO GAUGES', icon: Waves, status: progress >= 50 ? 'ONLINE' : 'POLLING', active: progress >= 50, val: '14 Nodes' },
            { label: 'ROAD TOPOLOGY', icon: Cpu, status: progress >= 75 ? 'OPTIMIZED' : 'CALIBRATING', active: progress >= 75, val: '30m DEM' },
            { label: 'FLEET TELEMETRY', icon: Radio, status: progress >= 90 ? 'ARMED' : 'INITIALIZING', active: progress >= 90, val: '21 Units' },
            { label: 'MISSION CORE', icon: Shield, status: progress >= 100 ? 'READY' : 'STANDBY', active: progress >= 100, val: '100% SECURE' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-xl p-2.5 border transition-all duration-300 flex flex-col justify-between"
                style={{
                  background: item.active ? 'rgba(12, 28, 51, 0.9)' : 'rgba(10, 18, 30, 0.6)',
                  borderColor: item.active ? 'rgba(34, 211, 238, 0.4)' : 'rgba(51, 65, 85, 0.4)',
                  boxShadow: item.active ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400">{item.label}</span>
                  <Icon size={13} className={item.active ? 'text-cyan-400' : 'text-slate-600'} />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${item.active ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.val}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-900/80 rounded-full h-3 border border-slate-700/80 p-0.5 mb-2 relative overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* PROGRESS DETAILS */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">{Math.round(progress)}%</span>
            <span>INITIALIZING HIGH-PRECISION RUNTIME</span>
          </div>
          <div className="flex items-center gap-2">
            <span>CORRIDOR:</span>
            <span className="text-white font-semibold">TIRTOL, JAGATSINGHPUR</span>
          </div>
        </div>

        {/* LIVE TERMINAL LOG STREAM */}
        <div className="w-full bg-slate-950/90 rounded-xl border border-slate-800 p-3 h-36 overflow-y-auto font-mono text-xs shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1 text-cyan-400">
              <Terminal size={11} /> KERNEL TELEMETRY LOGS
            </span>
            <span className="animate-pulse text-emerald-400">● REALTIME SYNC</span>
          </div>

          <div className="space-y-1">
            {steps.slice(0, currentStepIndex + 1).map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] leading-tight">
                <span className="text-slate-600 font-mono select-none">[{step.time}]</span>
                <span className={`font-bold select-none ${
                  step.subsystem === 'SECURITY' ? 'text-emerald-400' :
                  step.subsystem === 'SATELLITE' ? 'text-cyan-400' :
                  step.subsystem === 'HYDROLOGY' ? 'text-blue-400' :
                  'text-amber-400'
                }`}>
                  {step.subsystem}:
                </span>
                <span className="text-slate-200 flex-1">{step.message}</span>
                {step.status === 'DONE' && (
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM ACTION / CONFIRMATION FOOTER */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 border-t border-cyan-500/20 bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>ALL FAILSAFE MATRIXES OPERATIONAL • AES-256 ZERO LOSS ENCRYPTED</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSkip}
          className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold font-mono text-sm tracking-wide transition-all shadow-lg cursor-pointer"
          style={{
            background: isCompleted
              ? 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)'
              : 'rgba(30, 41, 59, 0.8)',
            border: `1px solid ${isCompleted ? '#22d3ee' : '#475569'}`,
            color: isCompleted ? '#ffffff' : '#cbd5e1',
            boxShadow: isCompleted ? '0 0 25px rgba(6, 182, 212, 0.6)' : 'none',
          }}
        >
          {isCompleted ? (
            <>
              ENTER MISSION CONTROL <CheckCircle2 size={16} />
            </>
          ) : (
            <>
              INITIALIZING ENGINE ({Math.round(progress)}%)...
            </>
          )}
        </motion.button>
      </div>

    </div>
  );
};
