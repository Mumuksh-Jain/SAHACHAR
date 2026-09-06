import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight, Truck } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { animalLoadDemo } from '../data/scenario';

export const VehicleInspectorPanel: React.FC = () => {
  const { vehicles, setActivePanel } = useDemoStore();
  const t07 = vehicles.find(v => v.id === 'T07');

  if (!t07) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      {/* Vehicle header - Storm & Sanctuary Card */}
      <div className="rounded-2xl p-4 backdrop-blur-xl"
        style={{
          background: 'rgba(15, 23, 42, 0.94)',
          border: '1px solid rgba(56, 189, 248, 0.22)',
        }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl p-2 rounded-xl bg-[#0F3E2E] border border-[#2DD4BF]/30">🚛</div>
          <div>
            <div className="font-bold text-base text-white flex items-center gap-2">
              <span>TRUCK T07</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E05A1B]/20 text-[#E05A1B] border border-[#E05A1B]/40">
                SPECIALIZED LIVESTOCK
              </span>
            </div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Hydraulic Ramp • Non-Slip Bed • High Clearance</div>
          </div>
          <div className="ml-auto px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#0F3E2E] text-[#2DD4BF] border border-[#2DD4BF]/40">
            DISPATCH READY
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
          {[
            { label: 'Assigned Driver', value: 'R. Das (Livestock Handler)', icon: '👤' },
            { label: 'Current Staging', value: 'Tirtol Block Depot', icon: '📍' },
            { label: 'Floor Deck Area', value: '7.9 m² (Up to 8 Cattle)', icon: '📐' },
            { label: 'Max Pay Load', value: '5.8 tonnes', icon: '⚖️' },
            { label: 'Destination Sanctuary', value: 'Camp C1 (Go-Sadan)', icon: '🌾' },
          ].map(item => (
            <div key={item.label} className="p-2 rounded-lg bg-slate-900/80">
              <div className="text-[10px] text-slate-400 font-mono">{item.icon} {item.label}</div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-amber-200/90 leading-relaxed font-sans mt-3 p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
          <strong>Livelihood Protection Note:</strong> Rural families in Manijanga will not board rescue buses unless their cattle are loaded first. T07 directly eliminates evacuation refusal.
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setActivePanel('capacity_calc')}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.9) 0%, rgba(180, 83, 9, 0.9) 100%)',
          color: '#FAF8F5',
          border: '1px solid rgba(251, 191, 36, 0.5)',
          boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)',
        }}
      >
        <Truck size={14} /> SIMULATE CATTLE LOADING CAPACITY
      </motion.button>
    </motion.div>
  );
};

// ─── Animated Capacity Calculator ──────────────────────────────────
export const CapacityCalcPanel: React.FC = () => {
  const { setActivePanel } = useDemoStore();
  const [phase, setPhase] = useState(0);
  const [animalsDone, setAnimalsDone] = useState(0);
  const [showRouteCheck, setShowRouteCheck] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    animalLoadDemo.animals.forEach((_, i) => {
      timers.push(setTimeout(() => setAnimalsDone(i + 1), 500 * (i + 1)));
    });
    timers.push(setTimeout(() => setPhase(1), 500 * (animalLoadDemo.animals.length + 1)));
    timers.push(setTimeout(() => setShowRouteCheck(true), 500 * (animalLoadDemo.animals.length + 2) + 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
        LIVESTOCK SAFETY SIMULATION — MISSION A27 (MANIJANGA)
      </div>

      {/* Animal loading manifest */}
      <div className="rounded-2xl p-3.5 backdrop-blur-xl flex flex-col gap-1.5"
        style={{
          background: 'rgba(15, 23, 42, 0.94)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
        }}>
        <div className="text-[10px] font-mono font-bold text-slate-400 mb-1 flex items-center justify-between border-b border-white/5 pb-1">
          <span>INDIVIDUAL CATTLE ALLOCATION (T07)</span>
          <span className="text-[#E05A1B]">6 COWS ONBOARD</span>
        </div>
        {animalLoadDemo.animals.map((animal, i) => (
          <AnimatePresence key={animal.id}>
            {i < animalsDone && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-center py-1.5 px-2.5 rounded-lg bg-[#0B132B] border border-white/5"
              >
                <span className="text-xs text-slate-200 flex items-center gap-1.5">
                  <span>🐄</span> {animal.label}
                </span>
                <span className="font-mono text-xs font-bold text-amber-400">{animal.weightKg} kg</span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Totals */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="rounded-2xl p-3.5 backdrop-blur-xl"
              style={{
                background: 'rgba(15, 23, 42, 0.94)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
              }}>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-xs text-slate-400">Total Cattle Weight</span>
                <span className="font-mono font-bold text-amber-400">{animalLoadDemo.totalAnimalWeightKg} kg</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-xs text-slate-400">Vehicle Gross Mass</span>
                <span className="font-mono font-bold text-white">{animalLoadDemo.loadedVehicleGrossT} t</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-xs text-slate-400">Required Floor Space</span>
                <span className="font-mono font-bold text-white">{animalLoadDemo.requiredFloorArea} m²</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-xs text-slate-400">Available Truck Bed</span>
                <span className="font-mono font-bold text-[#2DD4BF]">{animalLoadDemo.availableFloorArea} m²</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#0F3E2E]/50 border border-[#2DD4BF]/30 flex items-center gap-2">
              <span className="text-xl">✅</span>
              <div>
                <div className="font-mono font-bold text-xs text-[#2DD4BF]">SAFE TRANSIT COMPLIANT</div>
                <div className="text-[10px] text-slate-300">Space exceeds NDMA disaster animal transport guidelines</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route compatibility check */}
      <AnimatePresence>
        {showRouteCheck && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              BRIDGE LOAD & CORRIDOR CLEARANCE
            </div>

            {/* R1 — REJECTED */}
            <div className="rounded-2xl p-3 backdrop-blur-xl" style={{ background: 'rgba(38, 16, 20, 0.9)', border: '1px solid rgba(220, 38, 38, 0.4)' }}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-white">T07 + ROUTE R1 (SHORTCUT)</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/50">REJECTED ✕</span>
              </div>
              {[
                { check: 'Vehicle Class Clearance', result: 'PASS' },
                { check: 'Loaded Axle Weight', result: 'PASS' },
                { check: 'Paika Bridge Submergence Margin', result: 'FAIL (4 MIN)' },
              ].map(row => (
                <div key={row.check} className="flex justify-between items-center py-0.5 text-xs">
                  <span className="text-slate-400 text-[11px]">{row.check}</span>
                  <span className="flex items-center gap-1 font-bold text-[11px]" style={{ color: row.result.startsWith('PASS') ? '#2DD4BF' : '#ef4444' }}>
                    {row.result.startsWith('PASS') ? <CheckCircle size={10} /> : <XCircle size={10} />}
                    {row.result}
                  </span>
                </div>
              ))}
            </div>

            {/* R3 — APPROVED */}
            <div className="rounded-2xl p-3 backdrop-blur-xl" style={{ background: 'rgba(15, 62, 46, 0.9)', border: '1px solid rgba(45, 212, 191, 0.4)' }}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-white">T07 + ROUTE R3 (ELEVATED BUND)</span>
                <motion.span
                  animate={{ boxShadow: ['0 0 8px rgba(45, 212, 191, 0)', '0 0 16px rgba(45, 212, 191, 0.4)', '0 0 8px rgba(45, 212, 191, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0F3E2E] text-[#2DD4BF] border border-[#2DD4BF]/50"
                >
                  APPROVED ✓
                </motion.span>
              </div>
              {[
                { check: 'Vehicle Class Clearance', result: 'PASS' },
                { check: 'Loaded Axle Weight', result: 'PASS' },
                { check: 'Road Flood Inundation Defense', result: 'PASS' },
                { check: 'Safe Passage Window', result: 'PASS (38 MIN BUFFER)' },
              ].map(row => (
                <div key={row.check} className="flex justify-between items-center py-0.5 text-xs">
                  <span className="text-slate-400 text-[11px]">{row.check}</span>
                  <span className="flex items-center gap-1 font-bold text-[#2DD4BF] text-[11px]">
                    <CheckCircle size={10} /> {row.result}
                  </span>
                </div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePanel('plan')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg cursor-pointer uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #E05A1B 0%, #EA580C 100%)',
                color: '#FFFFFF',
                border: '1px solid #F97316',
                boxShadow: '0 4px 20px rgba(224, 90, 27, 0.45)',
              }}
            >
              COMPILE EVACUATION ASSURANCE PLAN <ChevronRight size={14} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
