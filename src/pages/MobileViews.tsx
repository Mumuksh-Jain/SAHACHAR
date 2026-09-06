import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Navigation, CheckCircle2, AlertTriangle, Phone, Radio, Shield, HeartHandshake, MapPin, Gauge } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';

export const DriverView: React.FC = () => {
  const { setAppView, t07ArrivePickup, t07DepartLoaded, t07PassCriticalEdge, t07ArriveCamp } = useDemoStore();
  const [phase, setPhase] = useState<'enroute' | 'pickup' | 'loading' | 'transit' | 'arrived'>('enroute');
  const [loadProgress, setLoadProgress] = useState(0);

  const handleArrivePickup = () => {
    setPhase('pickup');
    t07ArrivePickup();
  };

  const handleLoadingComplete = () => {
    setLoadProgress(0);
    setPhase('loading');
    const interval = setInterval(() => {
      setLoadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('transit');
          t07DepartLoaded();
          return 100;
        }
        return p + 12;
      });
    }, 250);
  };

  const handleArrive = () => {
    setPhase('arrived');
    t07ArriveCamp();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-[#0A0F1D]">
      {/* Device Frame */}
      <div className="w-[380px] max-w-full rounded-[40px] p-3 bg-[#0B132B] border-2 border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col">
        {/* Device Notch */}
        <div className="w-32 h-4 bg-black/80 rounded-b-2xl mx-auto mb-2 flex items-center justify-center">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Inner Screen */}
        <div className="rounded-[32px] p-4 bg-[#0F172A] flex-1 flex flex-col justify-between border border-white/5 overflow-y-auto">
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAppView('landing')}
                  className="flex items-center gap-1 text-xs text-[#E8F3ED] hover:text-white font-mono"
                  title="Return to Landing Page"
                >
                  🏠
                </button>
                <button
                  onClick={() => setAppView('mission_control')}
                  className="flex items-center gap-1 text-xs text-[#E8F3ED]/70 hover:text-white font-mono"
                >
                  <ArrowLeft size={13} /> RADAR
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-ping" />
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF]">OSDMA DRIVER LINK</span>
              </div>
            </div>

            {/* Mission Identifier Header */}
            <div className="crisis-card rounded-2xl p-3.5 mb-3 border border-[#2DD4BF]/20">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono font-bold text-[#E05A1B] uppercase tracking-wider">
                  SORTIE A27 • LIVESTOCK RESCUE
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0F3E2E] text-[#2DD4BF] border border-[#2DD4BF]/40">
                  CRITICAL
                </span>
              </div>
              <div className="font-mono font-black text-lg text-[#FAF8F5]">TRUCK T07 • R. DAS</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Paired convoy with Passenger Bus B04 (Household Link H27)
              </div>
            </div>

            {/* Tactical Navigation Metrics */}
            <div className="flex flex-col divide-y divide-white/5 bg-[#0B1F16] rounded-2xl p-3 border border-white/5 mb-3 text-xs">
              {[
                { label: 'PICKUP HAMLET', value: 'Tarapur Assembly Ground', urgent: false },
                { label: 'SANCTUARY POINT', value: 'Camp C1 (Go-Sadan High School)', urgent: false },
                { label: 'MANDATED ROUTE', value: 'R3 (Elevated PWD Embankment)', urgent: false },
                { label: 'PAIKA BRIDGE CUTOFF', value: '13:05 hrs (Cross before breach)', urgent: true },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400 text-[10px] font-mono">{item.label}</span>
                  <span className={`font-mono font-bold text-[11px] ${item.urgent ? 'text-[#F87171]' : 'text-[#FAF8F5]'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Workflow Actions */}
          <AnimatePresence mode="wait">
            {phase === 'enroute' && (
              <motion.div key="enroute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-[#0F3E2E]/60 border border-[#2DD4BF]/30 text-[#2DD4BF] text-xs font-mono font-bold">
                  <Navigation size={14} className="animate-pulse" />
                  INBOUND TO TARAPUR PICKUP POINT
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleArrivePickup}
                  className="w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-xl cursor-pointer"
                >
                  CONFIRM ARRIVAL AT ASSEMBLY GROUND
                </motion.button>
              </motion.div>
            )}

            {phase === 'pickup' && (
              <motion.div key="pickup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                <div className="py-2.5 px-3 rounded-xl text-xs font-mono font-bold text-[#E05A1B] bg-[#E05A1B]/10 border border-[#E05A1B]/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-ping" />
                  HYDRAULIC RAMP LOWERED • FARMERS ASSEMBLED
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLoadingComplete}
                  className="w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-xl cursor-pointer"
                >
                  COMMENCE BOARDING (12 CATTLE)
                </motion.button>
              </motion.div>
            )}

            {phase === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 p-2">
                <div className="text-[11px] font-mono text-[#2DD4BF] font-bold text-center">
                  SECURING LIVESTOCK ON HYDRAULIC BED...
                </div>
                <div className="h-2 rounded-full bg-[#0B1F16] overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0F3E2E] via-[#2DD4BF] to-[#E05A1B]"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <div className="text-center font-mono font-bold text-xs text-[#FAF8F5]">{loadProgress}% LOADED</div>
              </motion.div>
            )}

            {phase === 'transit' && (
              <motion.div key="transit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                <div className="py-2.5 px-3 rounded-xl text-xs font-mono font-bold text-[#2DD4BF] bg-[#0F3E2E]/50 border border-[#2DD4BF]/40 flex items-center gap-2">
                  <Gauge size={14} className="animate-spin" />
                  EN ROUTE ON ROUTE R3 • PAIKA BRIDGE BUFFER SECURE
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleArrive}
                  className="w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-xl cursor-pointer"
                >
                  CONFIRM SAFE ARRIVAL AT CAMP C1
                </motion.button>
              </motion.div>
            )}

            {phase === 'arrived' && (
              <motion.div key="arrived" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-2 py-4">
                <CheckCircle2 size={42} className="text-[#2DD4BF]" />
                <div className="font-mono font-black text-sm text-[#2DD4BF]">SORTIE COMPLETE • SANCTUARY REACHED</div>
                <div className="text-xs text-slate-300 text-center">
                  12 cattle safely transferred to Camp C1 holding sheds. Zero casualties.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const CitizenView: React.FC = () => {
  const { setAppView } = useDemoStore();
  const [status, setStatus] = useState<'waiting' | 'ready' | 'help'>('waiting');
  const [countdown, setCountdown] = useState(504); // 8:24

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(c => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-[#0A0F1D]">
      <div className="w-[380px] max-w-full rounded-[40px] p-3 bg-[#0B132B] border-2 border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col">
        <div className="w-32 h-4 bg-black/80 rounded-b-2xl mx-auto mb-2 flex items-center justify-center">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        <div className="rounded-[32px] p-4 bg-[#0F172A] flex-1 flex flex-col justify-between border border-white/5 overflow-y-auto">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAppView('landing')}
                  className="flex items-center gap-1 text-xs text-[#E8F3ED] hover:text-white font-mono"
                  title="Return to Landing Page"
                >
                  🏠
                </button>
                <button
                  onClick={() => setAppView('mission_control')}
                  className="flex items-center gap-1 text-xs text-[#E8F3ED]/70 hover:text-white font-mono"
                >
                  <ArrowLeft size={13} /> RADAR
                </button>
              </div>
              <div className="text-[10px] font-mono font-bold text-[#E05A1B]">
                ସହଚର • CITIZEN SAFETY
              </div>
            </div>

            {/* Countdown Banner */}
            <div className="crisis-card rounded-2xl p-4 text-center mb-3 border border-[#2DD4BF]/30">
              <div className="text-[10px] font-mono font-bold text-[#E05A1B] uppercase tracking-wider mb-1">
                ଜରୁରୀ ସ୍ଥାନାନ୍ତରଣ • EVACUATION CONVOY INBOUND
              </div>
              <div className="text-xs text-slate-300">Your assigned convoy reaches Tarapur in:</div>
              <div className="font-mono font-black text-4xl text-[#FAF8F5] my-2 tracking-tight">
                {formatTime(countdown)}
              </div>
              <div className="text-[10px] font-mono text-[#2DD4BF]">
                Arriving via Elevated Lifeline Corridor R3
              </div>
            </div>

            {/* Household Family + Livestock Twin Allocation */}
            <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5">
              YOUR HOUSEHOLD PAIRING (LINK H27)
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="crisis-card rounded-xl p-3 border-l-4 border-l-[#2DD4BF]">
                <div className="text-[10px] font-mono text-[#2DD4BF] font-bold">👤 FAMILY (6 PAX)</div>
                <div className="font-mono font-black text-xs text-[#FAF8F5] mt-1">BUS B04</div>
                <div className="text-[10px] text-slate-300">Tarapur High School</div>
              </div>
              <div className="crisis-card rounded-xl p-3 border-l-4 border-l-[#E05A1B]">
                <div className="text-[10px] font-mono text-[#E05A1B] font-bold">🐄 CATTLE (4 HEAD)</div>
                <div className="font-mono font-black text-xs text-[#FAF8F5] mt-1">RAMP TRUCK T07</div>
                <div className="text-[10px] text-slate-300">Camp C1 Holding Sheds</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300 flex items-start gap-2 mb-3">
              <Shield size={14} className="text-[#2DD4BF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Dignified Evacuation:</strong> Your family and livestock will be checked in together at the assembly point. You will receive matching wristband token #27.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setStatus('ready')}
              className={`w-full py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                status === 'ready'
                  ? 'bg-[#0F3E2E] text-[#2DD4BF] border border-[#2DD4BF]/50 shadow-lg'
                  : 'bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] text-white shadow-xl'
              }`}
            >
              {status === 'ready' ? '✓ READY AT ASSEMBLY POINT (ଆମେ ପ୍ରସ୍ତୁତ)' : 'CONFIRM READY AT ASSEMBLY POINT'}
            </motion.button>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-[10px] font-mono font-bold bg-[#0F3E2E]/60 border border-[#2DD4BF]/30 text-[#E8F3ED]">
                NEED STRETCHER FOR ELDER
              </button>
              <button className="flex-1 py-2 rounded-xl text-[10px] font-mono font-bold bg-red-950/40 border border-red-500/30 text-red-300">
                WATER IN COURTYARD
              </button>
            </div>
            <button className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-[11px] font-mono text-slate-400 bg-white/5 hover:bg-white/10">
              <Phone size={12} className="text-[#2DD4BF]" /> CONTACT ASHA DIDI: PRAVATI SWAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FieldView: React.FC = () => {
  const { setAppView } = useDemoStore();
  const [taskState, setTaskState] = useState<'pending' | 'open' | 'restricted' | 'blocked' | 'submitted'>('pending');

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-[#0A0F1D]">
      <div className="w-[380px] max-w-full rounded-[40px] p-3 bg-[#0B132B] border-2 border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col">
        <div className="w-32 h-4 bg-black/80 rounded-b-2xl mx-auto mb-2 flex items-center justify-center">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        <div className="rounded-[32px] p-4 bg-[#0F172A] flex-1 flex flex-col justify-between border border-white/5 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAppView('landing')}
                  className="flex items-center gap-1 text-xs text-[#E8F3ED] hover:text-white font-mono"
                  title="Return to Landing Page"
                >
                  🏠
                </button>
                <button
                  onClick={() => setAppView('mission_control')}
                  className="flex items-center gap-1 text-xs text-[#E8F3ED]/70 hover:text-white font-mono"
                >
                  <ArrowLeft size={13} /> RADAR
                </button>
              </div>
              <div className="text-[10px] font-mono font-bold text-[#E05A1B]">
                FIELD VERIFICATION APP
              </div>
            </div>

            <div className="crisis-card-danger rounded-2xl p-3.5 mb-3">
              <div className="text-[10px] font-mono font-bold text-[#DC2626] uppercase tracking-wider mb-1">
                URGENT PHYSICAL ROAD AUDIT
              </div>
              <div className="font-mono font-black text-sm text-white">PAIKA SIPHON CULVERT (EC2)</div>
              <div className="text-[11px] text-slate-300 mt-1">
                Telemetry indicates water elevation at +20cm below slab. Confirm physical structural integrity.
              </div>
            </div>

            <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-2">
              OBSERVED ROADWAY PASSABILITY
            </div>

            <div className="flex flex-col gap-2 mb-3">
              {[
                { label: 'PASSIBLE (Water Below Deck)', color: '#2DD4BF', value: 'open' },
                { label: 'RESTRICTED (Heavy Trucks Only)', color: '#D97706', value: 'restricted' },
                { label: 'IMPASSABLE / SUBMERGED', color: '#DC2626', value: 'blocked' },
              ].map(opt => (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTaskState(opt.value as any)}
                  className="w-full py-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  style={{
                    background: taskState === opt.value ? `${opt.color}25` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${taskState === opt.value ? opt.color : 'rgba(45, 212, 191, 0.15)'}`,
                    color: taskState === opt.value ? opt.color : '#E8F3ED',
                  }}
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <AnimatePresence>
              {taskState !== 'pending' && taskState !== 'submitted' && (
                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTaskState('submitted')}
                  className="w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-xl mb-2 cursor-pointer"
                >
                  TRANSMIT TELEMETRY TO EOC →
                </motion.button>
              )}
            </AnimatePresence>

            {taskState === 'submitted' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="crisis-card-sanctuary rounded-2xl p-3 text-center"
              >
                <CheckCircle2 size={24} className="text-[#2DD4BF] mx-auto mb-1" />
                <div className="font-mono font-bold text-xs text-[#2DD4BF]">TELEMETRY SYNCED WITH CENTRAL MAP</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
