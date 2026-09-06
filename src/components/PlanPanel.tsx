import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, User, Truck, ChevronRight, Clock } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';

// ─── Plan V1/V2 Panel ──────────────────────────────────────────────────
export const PlanPanel: React.FC = () => {
  const { missions, vehicles, settlements, shelters, animalCamps, activePlanVersion, planStatus, setActivePanel } = useDemoStore();
  const [showHouseholdLink, setShowHouseholdLink] = useState(false);

  const missionData = [
    { id: 'M12', label: 'Human', settlementId: 'S01', dest: 'H2', passengers: 42, vehicleId: 'B04', route: 'R3', departure: '12:10' },
    { id: 'A27', label: 'Livestock', settlementId: 'S01', dest: 'C1', cattle: 6, vehicleId: 'T07', route: 'R3', departure: '12:20' },
    { id: 'M31', label: 'Human', settlementId: 'S02', dest: 'H1', passengers: 23, vehicleId: 'B06', route: 'R1→R4', departure: '12:48' },
    { id: 'A41', label: 'Livestock', settlementId: 'S02', dest: 'C2', cattle: 12, vehicleId: 'T09', route: 'R1', departure: '13:42' },
    { id: 'M15', label: 'Human', settlementId: 'S04', dest: 'H1', passengers: 26, vehicleId: 'M01', route: 'R3', departure: '12:30' },
    { id: 'M44', label: 'Human', settlementId: 'S03', dest: 'H2', passengers: 17, vehicleId: 'B04', route: 'R3', departure: '13:15' },
    { id: 'M55', label: 'Human', settlementId: 'S06', dest: 'H3', passengers: 16, vehicleId: 'B06', route: 'R4', departure: '13:30' },
  ];

  const getSName = (id: string) => settlements.find(s => s.id === id)?.name || id;
  const getDestName = (id: string) => {
    const s = shelters.find(sh => sh.id === id);
    const c = animalCamps.find(ac => ac.id === id);
    return s?.name || c?.name || id;
  };

  const isV2 = activePlanVersion === 'V2';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      {/* Plan header - Storm & Sanctuary Card */}
      <div className="rounded-2xl p-4 backdrop-blur-xl flex items-center justify-between"
        style={{
          background: isV2 ? 'rgba(38, 16, 20, 0.92)' : 'rgba(18, 24, 34, 0.92)',
          border: `1.5px solid ${isV2 ? 'rgba(224, 72, 56, 0.5)' : 'rgba(220, 195, 165, 0.16)'}`,
        }}>
        <div>
          <div className="font-mono font-black text-lg tracking-wider" style={{ color: isV2 ? '#fca5a5' : '#FAF8F5' }}>
            {isV2 ? 'ADAPTIVE PLAN V2' : 'EVACUATION ASSURANCE PLAN V1'}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            STATUS: <span className="font-bold font-mono" style={{ color: planStatus === 'APPROVED' || planStatus === 'ACTIVE' ? '#10b981' : '#f59e0b' }}>
              {planStatus.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="text-right font-mono text-[10px] text-slate-400">
          <div>Human Convoys: <strong className="text-white">8</strong></div>
          <div>Cattle Convoys: <strong className="text-amber-400">6</strong></div>
          <div>Vehicles Active: <strong className="text-white">7</strong></div>
        </div>
      </div>

      {/* Mission list */}
      <div className="flex flex-col gap-2">
        {missionData.slice(0, 5).map((m, i) => {
          const isChanged = isV2 && (m.id === 'M31' || m.id === 'A41' || m.id === 'M44');
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-3 backdrop-blur-xl"
              style={{
                background: 'rgba(18, 24, 34, 0.88)',
                border: `1px solid ${isChanged ? 'rgba(224, 72, 56, 0.5)' : 'rgba(220, 195, 165, 0.12)'}`,
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                    style={{
                      background: m.label === 'Human' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(217, 119, 6, 0.2)',
                      color: m.label === 'Human' ? '#93c5fd' : '#fde68a',
                      border: `1px solid ${m.label === 'Human' ? 'rgba(37, 99, 235, 0.4)' : 'rgba(217, 119, 6, 0.4)'}`
                    }}>
                    {m.label === 'Human' ? '👤 CITIZEN BUS' : '🐄 CATTLE TRUCK'} {m.id}
                  </span>
                  {isChanged && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/40">
                      REROUTED V2
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono font-bold text-amber-300">{m.departure} DEPART</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-white/5">
                <div>
                  <div className="text-[9px] text-slate-400">EXTRACTION</div>
                  <div className="font-semibold text-white truncate">{getSName(m.settlementId)}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400">CORRIDOR</div>
                  <div className="font-bold text-cyan-300">{m.route}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400">SANCTUARY</div>
                  <div className="font-semibold text-white truncate">{getDestName(m.dest)}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Household Link Preview - Human Dignity Protection */}
      <motion.button
        onClick={() => setShowHouseholdLink(!showHouseholdLink)}
        className="text-left rounded-2xl p-3 backdrop-blur-xl transition-all cursor-pointer flex items-center justify-between"
        style={{
          background: 'rgba(18, 24, 34, 0.88)',
          border: '1px solid rgba(220, 195, 165, 0.14)',
        }}
      >
        <div className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
          <span>👨‍👩‍👧‍👦</span>
          <span>HOUSEHOLD PAIRING REASSURANCE (FAMILY H27)</span>
        </div>
        <span className="text-xs text-amber-400 font-mono">{showHouseholdLink ? '▲ HIDE' : '▼ VIEW'}</span>
      </motion.button>

      <AnimatePresence>
        {showHouseholdLink && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl p-3.5 backdrop-blur-xl overflow-hidden"
            style={{
              background: 'rgba(18, 24, 34, 0.95)',
              border: '1px solid rgba(220, 195, 165, 0.2)',
            }}
          >
            <div className="text-xs font-bold text-white mb-2">FAMILY H27 DUAL-SANCTUARY MANIFEST</div>
            <div className="flex gap-2.5">
              <div className="flex-1 rounded-xl p-2.5 bg-slate-900/80 border border-blue-500/30">
                <div className="text-[10px] text-slate-400 mb-1 font-mono">👤 MOTHER & CHILDREN</div>
                <div className="text-xs font-bold text-blue-300">→ BUS B04</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Shelter H2 (Medical / Food)</div>
              </div>
              <div className="flex-1 rounded-xl p-2.5 bg-slate-900/80 border border-amber-500/30">
                <div className="text-[10px] text-slate-400 mb-1 font-mono">🐄 FAMILY CATTLE (6 UNITS)</div>
                <div className="text-xs font-bold text-amber-300">→ TRUCK T07</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Camp C1 (Go-Sadan Fodder)</div>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-center font-mono font-bold text-emerald-300 rounded-xl py-1.5 bg-emerald-950/40 border border-emerald-500/30">
              DUAL TRACKING ASSURANCE: FAMILY REUNION CODE #H27-M01 ACTIVE ✓
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setActivePanel('approval')}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.9) 0%, rgba(21, 128, 61, 0.9) 100%)',
          color: '#FAF8F5',
          border: '1px solid rgba(74, 222, 128, 0.5)',
          boxShadow: '0 4px 20px rgba(22, 163, 74, 0.3)',
        }}
      >
        <Shield size={14} /> FORWARD FOR INCIDENT COMMAND APPROVAL <ChevronRight size={14} />
      </motion.button>
    </motion.div>
  );
};

// ─── Officer Approval Panel ─────────────────────────────────────────
export const ApprovalPanel: React.FC = () => {
  const { approvePlanV1, reserveVehicles, activePlanVersion, approvePlanV2, setActivePanel, demoStage } = useDemoStore();
  const [approvalState, setApprovalState] = useState<'review' | 'approved' | 'reserving'>('review');

  const isV2 = activePlanVersion === 'V2';

  const handleApprove = () => {
    setApprovalState('approved');
    setTimeout(() => {
      setApprovalState('reserving');
      if (isV2) {
        approvePlanV2();
      } else {
        approvePlanV1();
        setTimeout(() => {
          reserveVehicles();
          setActivePanel('dispatch');
        }, 1500);
      }
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="rounded-2xl p-4 text-center backdrop-blur-xl"
        style={{
          background: 'rgba(18, 24, 34, 0.92)',
          border: '1px solid rgba(220, 195, 165, 0.16)',
        }}>
        <div className="text-[10px] font-mono font-bold tracking-widest text-amber-400 mb-1 uppercase">
          DISTRICT INCIDENT COMMAND AUTHORIZATION
        </div>
        <div className="font-mono font-black text-lg text-white">
          {isV2 ? 'ADAPTIVE EMERGENCY PLAN V2' : 'OPERATIONAL DISASTER PLAN V1'}
        </div>
      </div>

      <div className="rounded-2xl p-3.5 backdrop-blur-xl"
        style={{
          background: 'rgba(18, 24, 34, 0.88)',
          border: '1px solid rgba(220, 195, 165, 0.12)',
        }}>
        {[
          { label: 'Communities in Hazard Zone', value: '4 Hamlets' },
          { label: 'Priority Citizen Transits', value: '8 Convoys (Buses)' },
          { label: 'Livelihood Animal Missions', value: '6 Convoys (Cattle Trucks)' },
          { label: 'Dedicated Drivers Mobilized', value: '7 Drivers' },
          { label: 'Critical Bridge Submergence', value: '13:05 Cutoff', urgent: true },
          ...(isV2 ? [
            { label: 'Rerouted Convoys (Bridge 4 Bypass)', value: '3 Convoys', urgent: true },
            { label: 'Residual Trapped Missions', value: '0 (All Secured)', good: true },
          ] : []),
        ].map(row => (
          <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-xs text-slate-300 font-medium">{row.label}</span>
            <span className="text-xs font-mono font-bold" style={{
              color: row.urgent ? '#f59e0b' : row.good ? '#22c55e' : '#FAF8F5'
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {approvalState === 'review' && (
          <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleApprove}
              className="w-full py-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.9) 0%, rgba(21, 128, 61, 0.9) 100%)',
                color: '#FAF8F5',
                border: '1px solid rgba(74, 222, 128, 0.5)',
                boxShadow: '0 4px 20px rgba(22, 163, 74, 0.35)',
              }}
            >
              <Shield size={16} /> AUTHORIZE & DISPATCH {isV2 ? 'EMERGENCY PLAN V2' : 'PLAN V1'}
            </motion.button>
          </motion.div>
        )}

        {approvalState === 'approved' && (
          <motion.div
            key="approved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-6"
          >
            <CheckCircle size={36} color="#22c55e" />
            <div className="font-mono font-black text-sm text-emerald-400">PLAN {isV2 ? 'V2' : 'V1'} OFFICIALLY AUTHORIZED</div>
            <div className="text-xs text-slate-400 font-mono">Disaster transport convoy alerted immediately</div>
          </motion.div>
        )}

        {approvalState === 'reserving' && !isV2 && (
          <motion.div
            key="reserving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl p-3.5 backdrop-blur-xl"
            style={{
              background: 'rgba(18, 24, 34, 0.92)',
              border: '1px solid rgba(220, 195, 165, 0.14)',
            }}
          >
            <div className="text-[10px] font-mono font-bold text-amber-400 mb-2 uppercase">RESERVING CONVOY UNITS...</div>
            {['B04 (Bus)', 'T07 (Cattle)', 'T09 (Cattle)', 'M01 (Minibus)', 'B06 (Bus)'].map((vid, i) => (
              <motion.div
                key={vid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="flex justify-between items-center py-1.5 border-b border-white/5"
              >
                <span className="text-xs font-mono text-slate-200">{vid}</span>
                <span className="text-xs font-mono font-bold text-emerald-400">ASSIGNED ✓</span>
              </motion.div>
            ))}
            <div className="mt-2 pt-2 text-center text-xs font-mono font-bold text-emerald-300">
              7 / 7 RESCUE VEHICLES DISPATCHED
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Dispatch Panel (Driver + Household Notifications) ───────────────
export const DispatchPanel: React.FC = () => {
  const { startEvacuation, demoStage } = useDemoStore();
  const [driverAck, setDriverAck] = useState(false);
  const [householdDelivered, setHouseholdDelivered] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDriverAck(true), 1500);
    const t2 = setTimeout(() => setHouseholdDelivered(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      {/* Driver mobile notification */}
      <div className="rounded-2xl p-4 backdrop-blur-xl shadow-xl"
        style={{
          background: 'rgba(18, 24, 34, 0.92)',
          border: '1px solid rgba(220, 195, 165, 0.16)',
        }}>
        <div className="text-[10px] font-mono font-bold text-amber-400 mb-2 tracking-widest uppercase flex items-center justify-between">
          <span>DRIVER DISPATCH TELEMETRY</span>
          <span className="text-emerald-400 font-mono">MISSION A27</span>
        </div>
        {[
          ['Assigned Driver', 'R. Das (Livestock Specialist)'],
          ['Vehicle Unit', 'T07 (High-Clearance Ramp Truck)'],
          ['Pickup Location', 'Manijanga GP Ward Center'],
          ['Destination Haven', 'Go-Sadan Camp C1'],
          ['Assigned Corridor', 'Route R3 (Elevated Bund)'],
          ['Pickup Window ETA', '8 min remaining'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between py-1.5 border-b border-white/5 text-xs font-mono">
            <span className="text-slate-400">{label}</span>
            <span className="font-semibold text-slate-100">{value}</span>
          </div>
        ))}
        <div className="mt-3 py-2 text-center text-xs font-mono font-bold text-emerald-300 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
          {driverAck ? '✓ DRIVER ACKNOWLEDGED & EN ROUTE' : 'AWAITING DRIVER HANDSHAKE...'}
        </div>
      </div>

      {/* Household notification reassurance */}
      <AnimatePresence>
        {householdDelivered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 backdrop-blur-xl shadow-xl"
            style={{
              background: 'rgba(18, 24, 34, 0.92)',
              border: '1px solid rgba(220, 195, 165, 0.16)',
            }}
          >
            <div className="text-[10px] font-mono font-bold text-amber-400 mb-1 tracking-widest uppercase">
              CITIZEN SOS REASSURANCE FEED
            </div>
            <div className="text-xs text-slate-300 mb-2 font-sans">
              Automated SMS broadcast in English and Odia to Manijanga residents:
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 font-mono text-[11px] text-slate-200 leading-relaxed">
              &quot;SAHACHAR ALERT: Bus B04 arriving in 8 min for family evacuation to Shelter H2. Truck T07 arriving simultaneously for your 6 cattle to Go-Sadan C1. Do not leave your animals.&quot;
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-mono text-emerald-400">
              <span>SMS BROADCAST SENT ✓</span>
              <span>42 HOUSEHOLDS DELIVERED ✓</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {driverAck && householdDelivered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={startEvacuation}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold transition-all shadow-xl cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)',
              color: '#FAF8F5',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              boxShadow: '0 4px 25px rgba(2, 132, 199, 0.35)',
            }}
          >
            ▶ LAUNCH EVACUATION CONVOY IN TRANSIT
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
