import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, Users, Beef, MapPin, ChevronRight } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { routes } from '../data/scenario';

// ─── Animated countdown timer ───────────────────────────────────────
const useSimulatedCountdown = (targetHHMM: string, startHHMM: string) => {
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const [th, tm] = targetHHMM.split(':').map(Number);
    const [sh, sm] = startHHMM.split(':').map(Number);
    const totalMinutes = (th * 60 + tm) - (sh * 60 + sm);
    let secs = totalMinutes * 60;

    const tick = () => {
      if (secs <= 0) { setRemaining('00:00:00'); return; }
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = secs % 60;
      setRemaining(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      secs--;
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetHHMM, startHHMM]);

  return remaining;
};

export const AccessHorizonPanel: React.FC = () => {
  const { selectedSettlementId, settlements, scenarioTime, setActivePanel } = useDemoStore();
  const settlement = settlements.find(s => s.id === selectedSettlementId);
  const remaining = useSimulatedCountdown(
    settlement?.accessDeadline || '13:05',
    scenarioTime || '11:30'
  );

  if (!settlement) return (
    <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
      <MapPin size={24} className="mb-2 opacity-40" />
      Select a settlement on the map
    </div>
  );

  const deadlineColor = settlement.accessDeadline <= '12:30' ? '#ef4444' :
    settlement.accessDeadline <= '13:30' ? '#f97316' : '#f59e0b';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3 h-full overflow-y-auto"
    >
      {/* Settlement header - Apple Grade Frosted Card */}
      <div className="rounded-2xl p-4 backdrop-blur-xl" style={{ background: 'rgba(11, 31, 22, 0.94)', border: '1px solid rgba(45, 212, 191, 0.22)' }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white">{settlement.name}</span>
              {settlement.odiaName && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#0F3E2E] border border-[#2DD4BF]/40 text-[#2DD4BF] font-medium">
                  {settlement.odiaName}
                </span>
              )}
            </div>
            <div className="text-[11px] font-mono text-slate-300 mt-1 flex items-center gap-2">
              <span>GP: {settlement.gramPanchayat || 'Tirtol'}</span>
              <span>•</span>
              <span>Ward {settlement.wardNo || '04'}</span>
              <span>•</span>
              <span className="text-[#2DD4BF] font-semibold">{settlement.elevationMeters || 6.2}m Elev</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono font-bold text-slate-400">ACCESS DEADLINE</div>
            <div className="font-mono font-black text-sm tracking-wide" style={{ color: deadlineColor }}>
              {settlement.accessDeadline}
            </div>
          </div>
        </div>

        {/* Frontline Cadre Banner */}
        {settlement.ashaWorker && (
          <div className="mb-3 p-2.5 rounded-xl bg-[#07140E] border border-[#2DD4BF]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">👩‍⚕️</span>
              <div>
                <div className="text-[11px] font-bold text-[#2DD4BF]">
                  ASHA Didi: {typeof settlement.ashaWorker === 'object' ? (settlement.ashaWorker as any).name : settlement.ashaWorker}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {typeof settlement.ashaWorker === 'object' ? (settlement.ashaWorker as any).phone : '+91 94371-28901 (Dedicated Link)'}
                </div>
              </div>
            </div>
            <a
              href={`tel:${typeof settlement.ashaWorker === 'object' ? (settlement.ashaWorker as any).phone : '+919437128901'}`}
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#0F3E2E] text-[#2DD4BF] border border-[#2DD4BF]/40 hover:bg-[#134E35] transition-all"
            >
              CALL DIDI
            </a>
          </div>
        )}

        {/* Road Infrastructure Vulnerability */}
        <div className="mb-3 px-2.5 py-1.5 rounded-xl text-[11px] flex items-center justify-between font-mono" style={{
          background: settlement.roadType === 'kutcha' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(37, 99, 235, 0.15)',
          border: `1px solid ${settlement.roadType === 'kutcha' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(56, 189, 248, 0.35)'}`,
          color: settlement.roadType === 'kutcha' ? '#fca5a5' : '#93c5fd'
        }}>
          <span>ROAD: {settlement.roadType === 'kutcha' ? 'MUD KUTCHA TRACK (BREACH PRONE)' : 'PMGSY ALL-WEATHER PUCCA'}</span>
          <span>{settlement.riverProximityKm ? `${settlement.riverProximityKm}km to River` : 'Paika Basin'}</span>
        </div>

        {/* Population & Livestock breakdown */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Assisted Need', value: settlement.assistedPeople, icon: '👤', color: '#38bdf8' },
            { label: 'Pregnant', value: settlement.pregnantMothers || 0, icon: '🤰', color: '#f472b6' },
            { label: 'Bedridden', value: settlement.bedriddenElderly || 0, icon: '🧓', color: '#fb923c' },
            { label: 'Kutcha Huts', value: settlement.kutchaHouses || 0, icon: '🛖', color: '#e879f9' },
            { label: 'Cattle Units', value: settlement.cattle, icon: '🐄', color: '#facc15' },
            { label: 'Goats / Small', value: settlement.goats, icon: '🐐', color: '#a3e635' },
          ].map(item => (
            <div key={item.label} className="rounded-xl p-2 bg-slate-900/70 border border-white/5">
              <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </div>
              <div className="font-mono font-bold text-base mt-0.5" style={{ color: item.color }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Horizon & Time Budget Card */}
      <div className="rounded-2xl p-4 backdrop-blur-xl"
        style={{
          background: 'rgba(18, 24, 34, 0.9)',
          border: '1px solid rgba(220, 195, 165, 0.14)',
        }}>
        <div className="text-[10px] font-mono font-bold tracking-widest text-amber-400 mb-3 uppercase flex items-center justify-between border-b border-white/5 pb-1.5">
          <span>RACE AGAINST RISING WATER</span>
          <span className="text-red-400 font-bold">BRIDGE AT RISK</span>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { label: 'Paika Culvert Submerges', value: settlement.accessDeadline, accent: true, desc: 'Water reaches bridge deck' },
            { label: 'Village Extraction & Pickup', value: '15 min', desc: 'Staging at GP Ward Center' },
            { label: 'Livestock Loading (Ramp)', value: '20 min', desc: 'Securing cattle (prevents abandonment)' },
            { label: 'Transit to Paika Embankment', value: '35 min', desc: 'Traversing wet mud track' },
            { label: 'Mandatory Safety Margin', value: '20 min', desc: 'Protection against stalled trucks' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-white/5">
              <div>
                <div className="text-xs text-slate-200 font-medium">{row.label}</div>
                <div className="text-[9px] text-slate-400 font-mono">{row.desc}</div>
              </div>
              <span className="text-xs font-mono font-bold" style={{ color: row.accent ? deadlineColor : '#FAF8F5' }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2.5 mt-1">
          <div>
            <div className="text-xs font-bold text-amber-300">LATEST SAFE EXTRACTION</div>
            <div className="text-[9px] text-slate-400 font-mono">After this time, vehicles will be trapped</div>
          </div>
          <span className="font-mono font-black text-base text-amber-400">13:05</span>
        </div>
      </div>

      {/* Countdown to Cutoff */}
      <div className="rounded-2xl p-4 text-center backdrop-blur-xl"
        style={{
          background: 'rgba(38, 16, 20, 0.9)',
          border: '1.5px solid rgba(224, 72, 56, 0.4)',
          boxShadow: '0 0 25px rgba(224, 72, 56, 0.15)',
        }}>
        <div className="text-[10px] font-mono font-bold tracking-widest text-red-300 mb-1 uppercase">TIME UNTIL ROAD CLOSURE</div>
        <div className="font-mono font-black tracking-wider text-red-400" style={{ fontSize: 32 }}>
          {remaining}
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">Remaining window for human & livestock convoy</div>
      </div>

      {/* Action button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setActivePanel('route_comparison')}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.9) 0%, rgba(180, 83, 9, 0.9) 100%)',
          color: '#FAF8F5',
          border: '1px solid rgba(251, 191, 36, 0.5)',
          boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)',
        }}
      >
        EVALUATE ESCAPE CORRIDORS <ChevronRight size={14} />
      </motion.button>
    </motion.div>
  );
};

// ─── Route Comparison Panel ──────────────────────────────────────────
export const RouteComparisonPanel: React.FC = () => {
  const { setActivePanel } = useDemoStore();
  const [selected, setSelected] = useState<string | null>('R3');

  const r1 = routes.R1;
  const r3 = routes.R3;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
        CORRIDOR RESILIENCE ANALYSIS — MANIJANGA
      </div>

      {/* Route R1: The Risky Trap */}
      <motion.div
        onClick={() => setSelected('R1')}
        animate={{ scale: selected === 'R1' ? 1.01 : 1 }}
        className="rounded-2xl p-3.5 cursor-pointer backdrop-blur-xl transition-all"
        style={{
          background: selected === 'R1' ? 'rgba(38, 16, 20, 0.95)' : 'rgba(18, 24, 34, 0.85)',
          border: `1.5px solid ${selected === 'R1' ? '#e04838' : 'rgba(220, 195, 165, 0.12)'}`,
          boxShadow: selected === 'R1' ? '0 0 20px rgba(224, 72, 56, 0.25)' : 'none',
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>ROUTE R1</span>
              <span className="text-[10px] font-mono font-bold text-red-400">SHORTCUT (LOW GROUND)</span>
            </div>
            <div className="text-[11px] text-slate-400">{r1.name}</div>
          </div>
          <div className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/80 text-red-300 border border-red-500/50">
            ⚠️ HIGH RISK
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-slate-900/60 p-2 rounded-xl border border-white/5 my-2">
          {[
            { label: 'Distance', value: `${r1.distanceKm} km` },
            { label: 'Transit Time', value: `${r1.durationMin} min` },
            { label: 'Safety Margin', value: `${r1.accessMarginMin} min`, danger: true },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="font-mono font-bold text-sm" style={{ color: item.danger ? '#ef4444' : '#FAF8F5' }}>
                {item.value}
              </div>
              <div className="text-[9px] text-slate-400 font-mono">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-red-300 leading-relaxed font-sans mt-1">
          <strong>Vulnerability:</strong> Only a 4-minute safety margin. If livestock loading faces a brief delay, loaded vehicles will be trapped on the submerged Paika Bridge.
        </div>
      </motion.div>

      {/* Route R3: The Resilient Lifeline */}
      <motion.div
        onClick={() => setSelected('R3')}
        animate={{
          scale: selected === 'R3' ? 1.01 : 1,
          boxShadow: selected === 'R3' ? '0 0 25px rgba(45, 212, 191, 0.3)' : '0 0 0px transparent',
        }}
        className="rounded-2xl p-3.5 cursor-pointer backdrop-blur-xl transition-all"
        style={{
          background: selected === 'R3' ? 'rgba(15, 62, 46, 0.95)' : 'rgba(11, 31, 22, 0.85)',
          border: `1.5px solid ${selected === 'R3' ? '#2DD4BF' : 'rgba(45, 212, 191, 0.18)'}`,
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>ROUTE R3</span>
              <span className="text-[10px] font-mono font-bold text-[#2DD4BF]">ELEVATED BUND CORRIDOR</span>
            </div>
            <div className="text-[11px] text-slate-400">{r3.name}</div>
          </div>
          <div className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0F3E2E] text-[#2DD4BF] border border-[#2DD4BF]/50">
            ✓ RECOMMENDED LIFELINE
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-[#07140E] p-2 rounded-xl border border-white/5 my-2">
          {[
            { label: 'Distance', value: `${r3.distanceKm} km` },
            { label: 'Transit Time', value: `${r3.durationMin} min` },
            { label: 'Safety Margin', value: `${r3.accessMarginMin} min`, good: true },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="font-mono font-bold text-sm" style={{ color: item.good ? '#2DD4BF' : '#FAF8F5' }}>
                {item.value}
              </div>
              <div className="text-[9px] text-slate-400 font-mono">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-slate-200 leading-relaxed font-sans mt-1">
          <strong>Operational Assurance:</strong> 1.6 km longer, but provides <strong>38 minutes of access margin</strong> along reinforced embankments. Guarantees safe transit for both human evacuees and livestock.
        </div>
      </motion.div>

      {/* SAHACHAR Decision Note */}
      <div className="rounded-2xl p-3 text-xs text-slate-300 backdrop-blur-xl leading-relaxed"
        style={{
          background: 'rgba(7, 20, 14, 0.9)',
          border: '1px solid rgba(45, 212, 191, 0.2)',
        }}>
        <strong className="text-[#E05A1B]">SAHACHAR Decision Rationale:</strong> Speed is meaningless if the bridge floods before arrival. Route R3 preserves life and livestock without entrapment risk.
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => { setSelected('R3'); setActivePanel('vehicle_inspector'); }}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg cursor-pointer uppercase tracking-wider"
        style={{
          background: 'linear-gradient(135deg, #E05A1B 0%, #EA580C 100%)',
          color: '#FFFFFF',
          border: '1px solid #F97316',
          boxShadow: '0 4px 20px rgba(224, 90, 27, 0.45)',
        }}
      >
        SELECT RESCUE VEHICLE T07 (LIVESTOCK) <ChevronRight size={14} />
      </motion.button>
    </motion.div>
  );
};
