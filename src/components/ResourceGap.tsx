import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, CheckCircle2, Shield, Radio, HeartHandshake, PhoneCall, Building2, UserCheck } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { resourceGapData } from '../data/scenario';

// ─── Resource Gap Panel (Consequential Humanitarian Dilemma) ────────────────
export const ResourceGapPanel: React.FC = () => {
  const { createEscalation } = useDemoStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3 p-1"
    >
      {/* Critical Alert Banner */}
      <div className="crisis-card-danger rounded-2xl p-3.5 shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <AlertTriangle size={17} className="text-[#DC2626] animate-pulse" />
          <div className="font-mono font-black text-xs text-[#DC2626] tracking-wider uppercase">
            LIVESTOCK SHORTFALL CRISIS • EVACUATION HALTED
          </div>
        </div>
        <div className="text-xs text-[#FAF8F5] font-medium leading-relaxed">
          <strong className="text-[#F87171]">Truck T09 transmission seized.</strong> 18 Cattle stranded in Tarapur Kutcha Hamlet.
        </div>
        <div className="mt-2 p-2 rounded-xl bg-black/40 border border-red-500/20 text-[11px] text-[#E2D9CE]/80 flex items-start gap-2">
          <HeartHandshake size={14} className="text-[#D97706] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#FAF8F5]">Agrarian Reality:</strong> 4 farming families (Household Link H27) refuse to board passenger bus B04 without their cattle. Remaining in the submergence zone poses catastrophic drowning risk within 45 minutes.
          </div>
        </div>
      </div>

      {/* Gap Quantitative Analysis */}
      <div className="crisis-card rounded-2xl p-3.5">
        <div className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-2 flex items-center justify-between">
          <span>SHORTFALL SPECIFICATION</span>
          <span className="text-red-400">DEFICIT CRITICAL</span>
        </div>

        <div className="flex flex-col divide-y divide-white/5 text-xs">
          {[
            { label: 'Pending Livestock', value: `${resourceGapData.pendingLivestockCount} Family Cattle Units`, danger: false },
            { label: 'Required Carrier Deck', value: `${resourceGapData.requiredCarrierAreaM2} m² Ramp Area`, danger: false },
            { label: 'Available Operational Deck', value: `${resourceGapData.availableAreaM2} m²`, danger: false },
            { label: 'UNMET CAPACITY DEFICIT', value: `-${resourceGapData.shortfallM2} m² (2 Loads Required)`, danger: true },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center py-2">
              <span className="text-[#E2D9CE]/70 text-[11px]">{row.label}</span>
              <span className={`font-mono font-bold text-xs ${row.danger ? 'text-[#DC2626] bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30' : 'text-[#FAF8F5]'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Intervention Options */}
      <div className="text-[11px] font-mono font-bold tracking-widest text-[#E2D9CE]/60 uppercase px-1">
        INCIDENT COMMAND INTERVENTIONS
      </div>

      <div className="flex flex-col gap-2">
        {resourceGapData.options.map((opt, i) => (
          <div
            key={i}
            className={`rounded-2xl p-3 transition-all ${
              opt.recommended
                ? 'bg-gradient-to-r from-[#0284C7]/15 to-[#121620] border border-[#0284C7]/40 shadow-md'
                : 'crisis-card'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5"
                style={{
                  background: opt.recommended ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${opt.recommended ? '#0284C7' : 'rgba(220, 195, 165, 0.2)'}`,
                  color: opt.recommended ? '#38BDF8' : '#94a3b8',
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#FAF8F5] font-medium">{opt.label}</div>
                {opt.recommended && (
                  <div className="text-[10px] font-mono font-bold text-[#38BDF8] mt-1 flex items-center gap-1">
                    ★ RECOMMENDED BY SAHACHAR: Zero family displacement, compliant with 13:05 Bridge Deadline
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => createEscalation()}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-mono font-black uppercase tracking-wider text-[#FAF8F5] shadow-xl transition-all"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
          border: '1px solid rgba(196, 181, 253, 0.4)',
        }}
      >
        <Zap size={14} className="text-yellow-300" /> REQUISITION DISTRICT RESERVE CARRIER (T11)
      </motion.button>
    </motion.div>
  );
};

// ─── Government Escalation Panel ────────────────────────────────────
export const EscalationPanel: React.FC = () => {
  const { escalation, advanceEscalation, allocateT11 } = useDemoStore();

  if (!escalation) return null;

  const statusSteps: { status: string; label: string; agency: string }[] = [
    { status: 'SENT', label: 'Requisition radioed to District Control Room', agency: 'Tirtol EOC' },
    { status: 'ACKNOWLEDGED', label: 'Collectorate EOC assigned urgent ticket', agency: 'Jagatsinghpur HQ' },
    { status: 'RESOURCE_IDENTIFIED', label: 'T11 Ramp Carrier standing by at Kujang', agency: 'OSDMA Transport' },
    { status: 'APPROVED', label: 'District Magistrate sanction confirmed', agency: 'Collectorate' },
    { status: 'RESOLVED', label: 'Carrier dispatched onto Elevated Corridor R3', agency: 'En Route' },
  ];

  const currentIdx = statusSteps.findIndex(s => s.status === escalation.status);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3 p-1"
    >
      {/* Official Government Header */}
      <div className="crisis-card rounded-2xl p-3.5 border-l-4 border-l-purple-500 shadow-lg">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-purple-400" />
            <span className="font-mono font-bold text-xs text-[#FAF8F5]">OSDMA EMERGENCY REQUISITION</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
            {escalation.requestId}
          </span>
        </div>
        <div className="text-xs text-[#FAF8F5] font-medium mb-1">{escalation.need}</div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#D97706] pt-2 border-t border-white/5">
          <span>ACCESS EXPIRY HORIZON:</span>
          <strong className="text-white bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
            {escalation.requiredBefore} hrs
          </strong>
        </div>
      </div>

      {/* Requisition Status Timeline */}
      <div className="crisis-card rounded-2xl p-3.5">
        <div className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-3">
          INTER-AGENCY COORDINATION WORKFLOW
        </div>
        <div className="flex flex-col gap-3.5">
          {statusSteps.map((step, i) => {
            const isDone = i < currentIdx;
            const isActive = i === currentIdx;

            return (
              <div key={step.status} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5"
                  style={{
                    background: isDone ? '#16A34A' : isActive ? '#7C3AED' : '#1A202C',
                    border: `1.5px solid ${isDone ? '#4ADE80' : isActive ? '#C4B5FD' : '#334155'}`,
                    boxShadow: isActive ? '0 0 10px rgba(124, 58, 237, 0.6)' : 'none',
                  }}
                >
                  {isDone ? (
                    <CheckCircle2 size={12} className="text-white" />
                  ) : isActive ? (
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  ) : (
                    <span className="text-[#64748b] text-[9px]">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: isDone ? '#4ADE80' : isActive ? '#E9D5FF' : '#64748b' }}
                    >
                      {step.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-[#E2D9CE]/40">{step.agency}</span>
                  </div>
                  <div className="text-[11px] text-[#E2D9CE]/70 mt-0.5">{step.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reallocated Vehicle Showcase */}
      <AnimatePresence>
        {(escalation.status === 'APPROVED' || escalation.status === 'RESOLVED') && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="crisis-card-sanctuary rounded-2xl p-3.5 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🚛</span>
              <div>
                <div className="font-mono font-black text-xs text-[#4ADE80]">CARRIER T11 — SANCTIONED</div>
                <div className="text-[10px] text-[#E2D9CE]/70 font-sans">
                  Driver: M. Jena • Hydraulic Ramp Deck: 8.4 m² • Max Load: 6.0 t
                </div>
              </div>
            </div>
            <div className="text-[11px] text-[#86EFAC] font-mono mt-1 pt-1 border-t border-emerald-500/20">
              ✓ Telemetry beacon linked to Central Map • Paired with Bus B04
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progression Button */}
      {escalation.status !== 'RESOLVED' && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (escalation.status === 'APPROVED') {
              allocateT11();
            } else {
              advanceEscalation();
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-mono font-black uppercase tracking-wider text-white shadow-xl transition-all"
          style={{
            background:
              escalation.status === 'APPROVED'
                ? 'linear-gradient(135deg, #16A34A, #15803D)'
                : 'linear-gradient(135deg, #7C3AED, #6D28D9)',
            border: `1px solid ${
              escalation.status === 'APPROVED' ? 'rgba(74, 222, 128, 0.4)' : 'rgba(196, 181, 253, 0.4)'
            }`,
          }}
        >
          {escalation.status === 'APPROVED' ? '🚛 DEPLOY T11 TO TARAPUR CORRIDOR' : 'ADVANCE SANCTION PROTOCOL →'}
        </motion.button>
      )}
    </motion.div>
  );
};

// ─── Field Tasks Panel (Ground Reality Verifications) ───────────────
export const FieldTasksPanel: React.FC = () => {
  const { fieldChecks } = useDemoStore();
  const [localChecks, setLocalChecks] = useState(fieldChecks);

  const handleVerify = (id: string) => {
    setLocalChecks(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'REQUESTED' as const } : c))
    );
    setTimeout(() => {
      setLocalChecks(prev =>
        prev.map(c => (c.id === id ? { ...c, status: 'VERIFIED' as const } : c))
      );
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3 p-1"
    >
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
          COMMUNITY & STRUCTURAL AUDITS
        </span>
        <span className="text-[10px] font-mono text-[#E2D9CE]/40">VHF RADIO + FIELD APP</span>
      </div>

      {localChecks.map((check, i) => (
        <motion.div
          key={check.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="crisis-card rounded-2xl p-3.5 transition-all"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 text-xs text-[#FAF8F5] font-medium leading-snug">
              <span className="font-mono text-[#D4AF37] mr-1.5">[{check.id}]</span>
              {check.task}
            </div>
            <span
              className="px-2 py-0.5 rounded text-[9px] font-mono font-bold flex-shrink-0"
              style={{
                background: check.priority === 'HIGH' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(217, 119, 6, 0.2)',
                color: check.priority === 'HIGH' ? '#f87171' : '#fbbf24',
                border: `1px solid ${check.priority === 'HIGH' ? 'rgba(220, 38, 38, 0.4)' : 'rgba(217, 119, 6, 0.4)'}`,
              }}
            >
              {check.priority}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {check.status === 'PENDING' && (
              <motion.button
                key="pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVerify(check.id)}
                className="w-full py-2 rounded-xl text-[11px] font-mono font-bold text-[#38BDF8] bg-[#0284C7]/15 border border-[#0284C7]/30 hover:bg-[#0284C7]/25 transition-all flex items-center justify-center gap-1.5"
              >
                <Radio size={12} /> REQUEST FIELD AUDIT VIA ASHA / PANCHAYAT →
              </motion.button>
            )}
            {check.status === 'REQUESTED' && (
              <motion.div
                key="requested"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] text-[#FBBF24] font-mono font-semibold flex items-center justify-center gap-2 py-1.5 rounded-xl bg-amber-950/20 border border-amber-500/20"
              >
                <span className="w-2 h-2 rounded-full bg-[#D97706] animate-ping" />
                VHF DISPATCHED • AWAITING GROUND TELEMETRY...
              </motion.div>
            )}
            {check.status === 'VERIFIED' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] text-[#4ADE80] font-mono font-bold flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30"
              >
                <CheckCircle2 size={13} /> CONFIRMED BY GROUND TEAM ✓
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ─── After Action Review Panel (Humanitarian Accomplishment) ─────────
export const AfterActionPanel: React.FC = () => {
  const aaData = {
    missions: [
      { id: 'M12 (Tarapur People)', plannedDeparture: '12:10', actualDeparture: '12:14', departureDiff: '+4 min', plannedArrival: '12:34', actualArrival: '12:38', arrivalDiff: '+4 min' },
      { id: 'A27 (Tarapur Cattle)', plannedDeparture: '12:20', actualDeparture: '12:24', departureDiff: '+4 min', plannedBridge: '12:51', actualBridge: '12:54', bridgeDiff: '+3 min', plannedArrival: '13:08', actualArrival: '13:12', arrivalDiff: '+4 min' },
    ],
    recommendations: [
      'Pre-stage hydraulic livestock trailers at Manijanga Panchayat before river reaches warning level (8.2m).',
      'Increase mud-track departure buffer by +5 min when loading livestock with nursing calves.',
      'Install automated telemetry gauge at Paika Siphon culvert with 5-minute LoRa packet interval.',
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3 p-1"
    >
      {/* Triumph Banner */}
      <div className="crisis-card-sanctuary rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={20} className="text-[#16A34A]" />
          <div>
            <div className="font-mono font-black text-sm text-[#4ADE80]">ALL LIVES & LIVELIHOODS SECURED</div>
            <div className="text-[10px] text-[#E2D9CE]/70">ODSMA Incident Command #712 • Tirtol Block</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            { label: 'Villagers Safe in Shelters', value: '428 / 428', good: true },
            { label: 'Livestock in Go-Sadans', value: '194 / 194', good: true },
            { label: 'High-Risk Mothers/Elders', value: '38 Secured', good: true },
            { label: 'Bridge Deadlines Missed', value: '0 (Zero Breach)', good: true },
            { label: 'Family Units Intact', value: '100% (Link H27)', good: true },
            { label: 'Convoys Safely Returned', value: '8 Vehicles', good: true },
          ].map(item => (
            <div key={item.label} className="rounded-xl p-2 bg-[#0A0D14]/80 border border-white/5">
              <div className="text-[9px] text-[#E2D9CE]/50 font-mono">{item.label}</div>
              <div className="text-xs font-mono font-bold text-[#4ADE80] mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Planned vs Actual Sortie Precision */}
      <div className="crisis-card rounded-2xl p-3.5">
        <div className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
          PRECISION AUDIT • TIMING DRIFT
        </div>
        <div className="flex flex-col gap-2.5">
          {aaData.missions.map(m => (
            <div key={m.id} className="p-2.5 rounded-xl bg-[#0A0D14] border border-white/5 text-xs">
              <div className="font-mono font-bold text-[#FAF8F5] mb-1.5">{m.id}</div>
              <div className="flex justify-between items-center text-[11px] text-[#E2D9CE]/70 py-1 border-t border-white/5">
                <span>Dep: {m.plannedDeparture} → {m.actualDeparture}</span>
                <span className="font-mono text-[#D97706]">{m.departureDiff}</span>
              </div>
              {'plannedBridge' in m && (
                <div className="flex justify-between items-center text-[11px] text-[#E2D9CE]/70 py-1 border-t border-white/5">
                  <span>Bridge: {(m as any).plannedBridge} → {(m as any).actualBridge}</span>
                  <span className="font-mono text-[#4ADE80]">{(m as any).bridgeDiff} (Within Buffer)</span>
                </div>
              )}
              <div className="flex justify-between items-center text-[11px] text-[#E2D9CE]/70 py-1 border-t border-white/5">
                <span>Arrival: {m.plannedArrival} → {m.actualArrival}</span>
                <span className="font-mono text-[#D97706]">{m.arrivalDiff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Learnings */}
      <div className="crisis-card rounded-2xl p-3.5">
        <div className="text-[10px] font-mono font-bold tracking-widest text-[#38BDF8] uppercase mb-2">
          INSTITUTIONAL PREPAREDNESS UPGRADES
        </div>
        <div className="flex flex-col gap-2">
          {aaData.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#E2D9CE]/80 leading-relaxed">
              <span className="font-mono font-bold text-[#D4AF37] flex-shrink-0">{i + 1}.</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
