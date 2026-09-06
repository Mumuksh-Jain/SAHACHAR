import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Activity, AlertTriangle, Radio, ChevronRight, X, MapPin, Truck, Award, Sparkles, Download, CheckCircle2, Shield } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { SahacharLogo } from '../components/SahacharLogo';
import { ExecutionSpine } from '../components/ExecutionSpine';
import { MissionMap } from '../components/MissionMap';
import { DemoControl } from '../components/DemoControl';
import { AccessHorizonPanel, RouteComparisonPanel } from '../components/AccessHorizon';
import { VehicleInspectorPanel, CapacityCalcPanel } from '../components/VehicleInspector';
import { PlanPanel, ApprovalPanel, DispatchPanel } from '../components/PlanPanel';
import { ResourceGapPanel, EscalationPanel, FieldTasksPanel, AfterActionPanel } from '../components/ResourceGap';
import { MissionPanel } from '../components/MissionPanel';
import { FleetPanel, VehicleTrackingPanel } from '../components/FleetPanel';
import { FleetTimeline } from '../components/FleetTimeline';
import { startVehicleAnimation } from '../engine/telemetryEngine';

// Emergency Dual-Tone Klaxon Synthesizer
function playEmergencyAlarm() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {}
}

// Victory Major Triad Fanfare Synthesizer
function playVictoryFanfare() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.7);
    });
  } catch {}
}

// ─── Notification Stack ──────────────────────────────────────────────
const NotificationStack: React.FC = () => {
  const { notifications } = useDemoStore();
  const recent = notifications.slice(0, 3);

  return (
    <div className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 pointer-events-none" style={{ width: 300 }}>
      <AnimatePresence>
        {recent.map(n => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30 }}
            className="rounded-xl p-3 pointer-events-auto"
            style={{
              background: '#0E1A2B',
              border: `1px solid ${
                n.type === 'critical' ? 'rgba(239,68,68,0.4)' :
                  n.type === 'success' ? 'rgba(16,185,129,0.4)' :
                    n.type === 'warning' ? 'rgba(245,158,11,0.4)' :
                      'rgba(30,50,72,0.8)'
              }`,
              borderLeft: `3px solid ${
                n.type === 'critical' ? '#ef4444' :
                  n.type === 'success' ? '#10b981' :
                    n.type === 'warning' ? '#f59e0b' :
                      '#06b6d4'
              }`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex items-start gap-2">
              <div style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>
                {n.type === 'critical' ? '🔴' : n.type === 'success' ? '✅' : n.type === 'warning' ? '⚠️' : 'ℹ️'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-200 mb-0.5">{n.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{n.message}</div>
              </div>
              <div className="text-xs font-mono text-slate-600 flex-shrink-0">{n.time}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ─── Left Rail Panel Router ──────────────────────────────────────────
const LeftRailPanel: React.FC = () => {
  const { activePanel, demoStage, settlements, selectedSettlementId } = useDemoStore();

  const panelMap: Record<string, React.ReactNode> = {
    access_horizon: <AccessHorizonPanel />,
    route_comparison: <RouteComparisonPanel />,
    vehicle_inspector: <VehicleInspectorPanel />,
    capacity_calc: <CapacityCalcPanel />,
    plan: <PlanPanel />,
    approval: <ApprovalPanel />,
    dispatch: <DispatchPanel />,
    resource_gap: <ResourceGapPanel />,
    escalation: <EscalationPanel />,
    field_tasks: <FieldTasksPanel />,
    after_action: <AfterActionPanel />,
    none: <SettlementList />,
    driver_notification: <DispatchPanel />,
    household_notification: <DispatchPanel />,
  };

  return (
    <div className="h-full overflow-y-auto p-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
          className="h-full"
        >
          {panelMap[activePanel] || <SettlementList />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Settlement List (default left rail) ─────────────────────────────
const SettlementList: React.FC = () => {
  const { settlements, setSelectedSettlement, setActivePanel, demoStage, language } = useDemoStore();
  const [filter, setFilter] = useState<'all' | 'at_risk' | 'livestock' | 'vulnerable'>('all');

  const statusColor: Record<string, string> = {
    AT_RISK: '#e04838',
    WATCH: '#d97706',
    MONITORING: '#0284c7',
    NORMAL: '#16a34a',
  };

  const filteredSettlements = settlements.filter(s => {
    if (filter === 'at_risk') return s.status === 'AT_RISK';
    if (filter === 'livestock') return s.cattle >= 50;
    if (filter === 'vulnerable') return (s.pregnantMothers || 0) + (s.bedriddenElderly || 0) > 5;
    return true;
  });

  return (
    <div className="flex flex-col gap-2.5">
      {/* Incident summary - Crisis Impact Matrix */}
      <div className="rounded-2xl p-3.5 backdrop-blur-xl shadow-lg"
        style={{
          background: 'rgba(18, 24, 34, 0.92)',
          border: '1px solid rgba(220, 195, 165, 0.16)',
        }}>
        <div className="text-[10px] font-mono font-bold tracking-widest text-amber-400 mb-2.5 uppercase flex items-center justify-between border-b border-white/5 pb-1.5">
          <span>{language === 'or' ? 'ଗ୍ରାମ ପଞ୍ଚାୟତ ସଙ୍କଟ ମାଟ୍ରିକ୍ସ' : 'HUMAN & LIVELIHOOD IMPACT MATRIX'}</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: language === 'or' ? 'ବିପଦରେ' : 'ISOLATION RISK', value: settlements.filter(s => s.status === 'AT_RISK').length, color: '#e04838', bg: 'rgba(224,72,56,0.18)' },
            { label: language === 'or' ? 'ସତର୍କ' : 'WATCH ZONE', value: settlements.filter(s => s.status === 'WATCH').length, color: '#d97706', bg: 'rgba(217,119,6,0.18)' },
            { label: language === 'or' ? 'ସୁରକ୍ଷିତ' : 'HIGH GROUND', value: settlements.filter(s => s.status === 'MONITORING' || s.status === 'NORMAL').length, color: '#16a34a', bg: 'rgba(22,163,74,0.18)' },
          ].map(item => (
            <div key={item.label} className="text-center rounded-xl p-2 border" style={{ background: item.bg, borderColor: `${item.color}50` }}>
              <div className="font-mono font-black text-xl" style={{ color: item.color }}>{item.value}</div>
              <div className="text-[9px] font-mono font-bold text-slate-300 tracking-wider mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Filter Pills */}
        <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: language === 'or' ? 'ସମସ୍ତ' : 'ALL HAMLETS' },
            { id: 'at_risk', label: language === 'or' ? 'ବିପଦ' : '🚨 AT RISK' },
            { id: 'livestock', label: language === 'or' ? 'ଗୋ-ଧନ' : '🐄 CATTLE PRIORITY' },
            { id: 'vulnerable', label: language === 'or' ? 'ଗର୍ଭବତୀ/ବୃଦ୍ଧ' : '🤰 VULNERABLE' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all whitespace-nowrap ${
                filter === f.id
                  ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Frontline Cadre Dispatch Badge */}
      <div className="px-3 py-2 rounded-xl text-[11px] font-mono flex items-center justify-between text-slate-300 shadow-sm"
        style={{
          background: 'rgba(18, 24, 34, 0.85)',
          border: '1px solid rgba(220, 195, 165, 0.12)',
        }}>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">{language === 'or' ? 'ଆଶା ଦିଦି ଏବଂ ଆପଦା ମିତ୍ର ସଂଯୋଗ' : 'ASHA DIDIS & AAPDA MITRA MOBILIZED'}</span>
        </span>
        <span className="text-amber-400 font-bold">12 GPs ACTIVE</span>
      </div>

      {/* Settlement list */}
      <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 px-1 uppercase flex items-center justify-between">
        <span>{language === 'or' ? 'ଗ୍ରାମ ସମୂହ' : 'COMMUNITIES UNDER THREAT'} ({filteredSettlements.length})</span>
        <span className="text-amber-400/80 font-normal">{language === 'or' ? 'ବିବରଣୀ ପାଇଁ କ୍ଲିକ କରନ୍ତୁ' : 'SELECT TO INSPECT'}</span>
      </div>

      {filteredSettlements.map(s => {
        const color = statusColor[s.status] || '#64748b';
        const isAtRisk = s.status === 'AT_RISK';

        return (
          <motion.div
            key={s.id}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => {
              setSelectedSettlement(s.id);
              setActivePanel('access_horizon');
            }}
            className="rounded-2xl p-3.5 cursor-pointer transition-all shadow-md backdrop-blur-md relative overflow-hidden"
            style={{
              background: isAtRisk ? 'rgba(38, 16, 20, 0.92)' : 'rgba(18, 24, 34, 0.88)',
              border: `1.5px solid ${isAtRisk ? 'rgba(224, 72, 56, 0.6)' : 'rgba(220, 195, 165, 0.12)'}`,
              boxShadow: isAtRisk ? '0 0 24px rgba(224, 72, 56, 0.25)' : '0 4px 14px rgba(0,0,0,0.3)',
            }}
          >
            {/* Top Row: Name + Status */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{
                  background: color,
                  boxShadow: `0 0 10px ${color}`,
                  animation: isAtRisk ? 'pulse 1.2s infinite' : 'none',
                }} />
                <span className="text-sm font-bold text-white tracking-wide">{s.name}</span>
                {s.odiaName && (
                  <span className="text-[11px] text-amber-300 font-medium font-mono px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-500/30">
                    {s.odiaName}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md" style={{
                background: `${color}25`, color, border: `1px solid ${color}60`,
              }}>
                {s.status.replace('_', ' ')}
              </span>
            </div>

            {/* Rural GP & Frontline Info */}
            <div className="text-[11px] text-slate-400 font-mono mb-2 flex items-center justify-between">
              <span>GP: <strong className="text-slate-200">{s.gramPanchayat || 'Tirtol'}</strong> (W-{s.wardNo || '04'})</span>
              {s.ashaWorker && (
                <span className="text-emerald-300 flex items-center gap-1 font-semibold">
                  <span>👩‍⚕️</span> {typeof s.ashaWorker === 'object' ? (s.ashaWorker as any).name?.split(' ')[0] : s.ashaWorker.split(' ')[0]}
                </span>
              )}
            </div>

            {/* Rural Demographics & Livestock */}
            <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-slate-300 bg-slate-900/70 p-2 rounded-xl border border-white/5 mb-2">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px]">WAITING</span>
                <span className="text-white font-bold text-xs">{s.assistedPeople} pax</span>
              </div>
              <div className="flex flex-col">
                <span className="text-pink-300 text-[9px]">PREGNANT</span>
                <span className="font-bold text-xs text-pink-300">🤰 {s.pregnantMothers || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-amber-300 text-[9px]">CATTLE</span>
                <span className="font-bold text-xs text-amber-300">🐄 {s.cattle}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-slate-400 text-[9px]">CUTOFF</span>
                <span className="font-bold text-xs" style={{ color: isAtRisk ? '#f87171' : '#fbbf24' }}>
                  {s.accessDeadline}
                </span>
              </div>
            </div>

            {/* Road status & River proximity */}
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className={`px-2 py-0.5 rounded font-bold ${s.roadType === 'kutcha' ? 'bg-red-950/70 text-red-300 border border-red-500/40' : 'bg-slate-800/80 text-slate-300'}`}>
                {s.roadType === 'kutcha' ? '⚠️ MUD TRACK (BREACH PRONE)' : '🛣️ PMGSY PUCCA'}
              </span>
              <span className="text-slate-400">
                Paika: <span className="text-amber-400 font-semibold">{s.riverProximityKm || 0.4}km</span>
              </span>
            </div>

            {/* Evacuation progress bars */}
            {(s.humanEvacuation > 0 || s.animalEvacuation > 0) && (
              <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-col gap-1 text-[10px] font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>CITIZENS SECURED</span>
                  <span className="text-emerald-400 font-bold">{s.humanEvacuation}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-slate-900">
                  <div className="h-full rounded-full bg-emerald-400 transition-all duration-500" style={{ width: `${s.humanEvacuation}%` }} />
                </div>

                <div className="flex justify-between text-slate-300 mt-1">
                  <span>LIVESTOCK EXTRACTED</span>
                  <span className="text-amber-400 font-bold">{s.animalEvacuation}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-slate-900">
                  <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${s.animalEvacuation}%` }} />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── Right Rail Tab state ────────────────────────────────────────────
type RightTab = 'missions' | 'fleet';

// ─── Top Header: Disaster Agency & Operations Command ────────────────
const TopBar: React.FC = () => {
  const { demoStage, scenarioTime, activePlanVersion, notifications, setAppView, triggerBoot, language, setLanguage, riverGauges } = useDemoStore();
  const [tick, setTick] = useState(scenarioTime);
  const unread = notifications.length;

  useEffect(() => {
    setTick(scenarioTime);
  }, [scenarioTime]);

  const paikaGauge = riverGauges?.find(g => g.id === 'G01');

  return (
    <div className="flex items-center justify-between px-6 py-2.5 shadow-xl relative z-20 backdrop-blur-2xl"
      style={{
        background: 'rgba(11, 14, 20, 0.96)',
        borderBottom: '1px solid rgba(220, 195, 165, 0.15)',
      }}>
      {/* Brand & Administrative Jurisdiction with Official SAHACHAR Logo */}
      <div className="flex items-center gap-3.5">
        <SahacharLogo variant="compact" />

        <div className="hidden lg:flex flex-col border-l border-[#E0A53B]/20 pl-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1E4B32] border border-[#6A8F3A]/60 text-[#86EFAC] font-bold tracking-wider">
              {language === 'or' ? 'ଓସଡମା ଆପଦ କମାଣ୍ଡ' : 'OSDMA RURAL CRISIS COMMAND'}
            </span>
            <span className="text-[#E0A53B] font-mono text-[10px] font-bold">12 GPs UNDER SURGE</span>
          </div>
          <div className="text-[10px] font-medium text-[#F2E6D3]/60 truncate mt-0.5 max-w-[280px]">
            {language === 'or' ? 'ତିର୍ତ୍ତୋଲ ବ୍ଲକ କଣ୍ଟ୍ରୋଲ ରୁମ • ଜଗତସିଂହପୁର' : 'Tirtol Block Emergency Operations Centre • Jagatsinghpur'}
          </div>
        </div>

        <div className="h-7 w-px mx-1" style={{ background: 'rgba(224, 165, 59, 0.2)' }} />

        {/* Live River Gauge Status Badge */}
        {paikaGauge && (
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/40 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-slate-400">PAIKA SIPHON:</span>
            <span className="text-amber-300 font-black">{paikaGauge.currentLevelM}m</span>
            <span className="text-[10px] text-red-400 font-bold uppercase">{paikaGauge.status}</span>
          </div>
        )}

        {activePlanVersion !== 'NONE' && (
          <div className="px-3 py-1 rounded-xl text-xs font-black font-mono shadow-sm"
            style={{
              background: activePlanVersion === 'V2' ? 'rgba(224, 72, 56, 0.25)' : 'rgba(217, 119, 6, 0.25)',
              border: `1.5px solid ${activePlanVersion === 'V2' ? '#e04838' : '#d97706'}`,
              color: activePlanVersion === 'V2' ? '#fca5a5' : '#fde68a',
            }}>
            {activePlanVersion === 'V2' ? 'ADAPTIVE PLAN V2 (REROUTED)' : 'OPTIMIZED PLAN V1'}
          </div>
        )}
      </div>

      {/* Center Clock & Crisis State */}
      <div className="flex items-center gap-4">
        <div className="text-center px-4 py-1.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-inner">
          <div className="font-mono font-black text-xl text-amber-300 tracking-wider">
            {tick}
          </div>
          <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">{language === 'or' ? 'ସ୍ଥିତି ସମୟ' : 'CRISIS TIME'}</div>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl shadow-md backdrop-blur-md" style={{
          background: demoStage === 'NORMAL' ? 'rgba(71,85,105,0.25)' :
            demoStage === 'COMPLETED' ? 'rgba(22,163,74,0.25)' :
              demoStage === 'DISRUPTION' || demoStage === 'RESOURCE_GAP' ? 'rgba(224,72,56,0.25)' :
                'rgba(217,119,6,0.25)',
          border: `1px solid ${demoStage === 'NORMAL' ? '#475569' :
            demoStage === 'COMPLETED' ? '#16a34a' :
              demoStage === 'DISRUPTION' || demoStage === 'RESOURCE_GAP' ? '#e04838' :
                '#d97706'}`,
        }}>
          <Activity size={14} className="animate-pulse" style={{
            color: demoStage === 'NORMAL' ? '#cbd5e1' :
              demoStage === 'COMPLETED' ? '#4ade80' :
                demoStage === 'DISRUPTION' ? '#f87171' : '#fbbf24'
          }} />
          <span className="text-xs font-mono font-black tracking-wide" style={{
            color: demoStage === 'NORMAL' ? '#cbd5e1' :
              demoStage === 'COMPLETED' ? '#4ade80' :
                demoStage === 'DISRUPTION' || demoStage === 'RESOURCE_GAP' ? '#fca5a5' : '#fde68a'
          }}>
            {demoStage === 'NORMAL' ? (language === 'or' ? 'ନିରୀକ୍ଷଣ ଚାଲିଛି' : 'STANDBY MONITORING') : demoStage.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Right controls: Bilingual + Boot + Switchers */}
      <div className="flex items-center gap-2.5">
        {/* Tactile Bilingual Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10 shadow-inner">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              language === 'en'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ENG
          </button>
          <button
            onClick={() => setLanguage('or')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              language === 'or'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ଓଡ଼ିଆ
          </button>
        </div>

        {/* Reboot / Boot Sequence trigger button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={triggerBoot}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono text-amber-300 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 shadow-md transition-all cursor-pointer"
          title="Replay tactical system boot initialization"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          ⚡ BOOT
        </motion.button>

        {/* View switchers */}
        <div className="flex items-center gap-0.5 bg-slate-900/90 p-1 rounded-xl border border-white/10">
          {[
            { label: language === 'or' ? 'ଚାଳକ' : 'DRIVER', view: 'driver' as const },
            { label: language === 'or' ? 'ନାଗରିକ' : 'CITIZEN SOS', view: 'citizen' as const },
            { label: language === 'or' ? 'କ୍ଷେତ୍ର' : 'FIELD CADRE', view: 'field' as const },
          ].map(v => (
            <button
              key={v.view}
              onClick={() => setAppView(v.view)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all hover:bg-slate-800 text-slate-300 hover:text-white"
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Notification bell */}
        <div className="relative">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-white/10">
            <Bell size={14} className="text-slate-300" />
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono font-black text-red-400"
              >
                {unread}
              </motion.span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-mono font-bold text-red-300">
          <Radio size={12} className="animate-pulse" />
          LIVE DISASTER
        </div>
      </div>
    </div>
  );
};

// ─── MAIN MISSION CONTROL PAGE ───────────────────────────────────────
const CONFETTI_COLORS = ['#E0A53B', '#16A34A', '#FAF8F5', '#F59E0B', '#6A8F3A', '#38BDF8'];

export const MissionControl: React.FC = () => {
  const { demoStage, selectedVehicleId, setActivePanel, resetDemo } = useDemoStore();
  const [rightTab, setRightTab] = useState<RightTab>('fleet');
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const isEmergencyAlert = ['FLOOD_ALERT', 'DISRUPTION', 'REPLANNING', 'RESOURCE_GAP'].includes(demoStage);

  // Vehicle animation hook — starts when evacuation begins
  useEffect(() => {
    if (demoStage === 'EVACUATING') {
      setTimeout(() => {
        startVehicleAnimation('T07', 'R3', 60000);
        startVehicleAnimation('B04', 'R3', 50000);
      }, 1000);
    }
  }, [demoStage]);

  // Audio & celebration effects
  useEffect(() => {
    if (isEmergencyAlert) {
      playEmergencyAlarm();
    } else if (demoStage === 'COMPLETED' && !hasCelebrated) {
      setShowCelebration(true);
      setHasCelebrated(true);
      playVictoryFanfare();
    }
  }, [demoStage, isEmergencyAlert, hasCelebrated]);

  const confettiItems = React.useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${(i * 2.5) + (Math.sin(i) * 3)}%`,
      delay: `${(i % 10) * 0.15}s`,
      duration: `${2.8 + (i % 5) * 0.4}s`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: `${7 + (i % 6)}px`,
      shape: i % 2 === 0 ? '50%' : '2px',
    }));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden relative" style={{ background: '#0A130E' }}>
      {/* ── EMERGENCY RED ALERT SCREEN STROBE ── */}
      {isEmergencyAlert && <div className="emergency-screen-alert pointer-events-none" />}

      {/* ── TOP EMERGENCY ALERT BANNER ── */}
      <AnimatePresence>
        {isEmergencyAlert && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-2xl bg-[#5E1214]/95 border-2 border-[#DC2626] shadow-[0_0_40px_rgba(220,38,38,0.8)] text-white flex items-center gap-3 font-mono text-xs backdrop-blur-md"
          >
            <span className="w-3 h-3 rounded-full bg-red-400 animate-ping" />
            <span className="font-bold text-red-100 uppercase tracking-wider">
              {demoStage === 'FLOOD_ALERT' && '⚠️ MONSOON FLOOD SURGE DETECTED • PAIKA DISTRIBUTARY 8.82m DANGER THRESHOLD'}
              {demoStage === 'DISRUPTION' && '🚨 CRITICAL ACCESS CUTOFF • PAIKA BRIDGE 4 SUBMERGED • ROUTE R1 BLOCKED'}
              {demoStage === 'REPLANNING' && '🔄 ADAPTIVE RE-PLANNING ACTIVE • REROUTING DISASTER FLEET VIA NORTH EMBANKMENT'}
              {demoStage === 'RESOURCE_GAP' && '⚠️ LIVESTOCK DEFICIT CRISIS • TRUCK T09 BROKEN DOWN • 18 CATTLE STRANDED'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CELEBRATION CONFETTI PARTICLES ── */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {confettiItems.map(p => (
            <div
              key={p.id}
              className="confetti-particle"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                borderRadius: p.shape,
              }}
            />
          ))}
        </div>
      )}

      {/* ── INTERACTIVE MISSION COMPLETED POPUP MODAL ── */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              className="relative w-full max-w-lg crisis-card-sanctuary rounded-3xl p-6 border-2 border-[#E0A53B] shadow-[0_20px_70px_rgba(224,165,59,0.4)] text-center"
              style={{ background: 'linear-gradient(160deg, #10261A 0%, #0A140F 100%)' }}
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowCelebration(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-all"
              >
                <X size={18} />
              </button>

              {/* Victory Badge */}
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-[#E0A53B] to-[#F59E0B] text-white shadow-[0_0_30px_rgba(224,165,59,0.8)]">
                <Award size={36} />
              </div>

              <div className="text-[11px] font-mono font-black text-[#E0A53B] tracking-widest uppercase mb-1">
                ODISHA STATE DISASTER MANAGEMENT AUTHORITY
              </div>
              <h2 className="text-2xl font-serif font-black text-[#FAF8F5] tracking-wide mb-2">
                100% SANCTUARY ASSURED
              </h2>
              <p className="text-xs text-[#F2E6D3]/80 leading-relaxed max-w-md mx-auto mb-4">
                Joint human and livestock evacuation successfully concluded across all 12 Gram Panchayats with zero loss of life or family separation.
              </p>

              {/* Achievement Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {[
                  { label: 'CITIZENS SHELTERED', val: '428 / 428', icon: '👤', highlight: '#86EFAC' },
                  { label: 'CATTLE IN GO-SADANS', val: '194 / 194', icon: '🐄', highlight: '#FDE047' },
                  { label: 'CASUALTIES', val: '0 ZERO', icon: '🛡️', highlight: '#86EFAC' },
                  { label: 'DEADLINES MISSED', val: '0 ZERO', icon: '⏱️', highlight: '#86EFAC' },
                ].map(item => (
                  <div key={item.label} className="p-2.5 rounded-2xl bg-black/40 border border-white/10">
                    <span className="text-base mb-0.5 block">{item.icon}</span>
                    <div className="text-[9px] font-mono text-[#F2E6D3]/60">{item.label}</div>
                    <div className="font-mono font-black text-xs mt-0.5" style={{ color: item.highlight }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActivePanel('after_action');
                    setShowCelebration(false);
                  }}
                  className="flex-1 py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider text-black bg-[#E0A53B] hover:bg-[#F3C853] shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={14} /> VIEW INCIDENT DEBRIEF
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCelebration(false)}
                  className="px-5 py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider text-[#FAF8F5] bg-white/10 hover:bg-white/20 border border-white/15"
                >
                  EXPLORE CENTRAL RADAR
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <TopBar />

      {/* Execution spine */}
      <ExecutionSpine />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT RAIL (22%) ── */}
        <div
          className="flex flex-col overflow-hidden flex-shrink-0 backdrop-blur-xl"
          style={{ width: '22%', background: 'rgba(16, 30, 23, 0.92)', borderRight: '1px solid rgba(224, 165, 59, 0.15)' }}
        >
          <LeftRailPanel />
        </div>

        {/* ── MAP (56%) ── */}
        <div className="flex-1 relative overflow-hidden">
          <MissionMap />
          <NotificationStack />
        </div>

        {/* ── RIGHT RAIL (22%) ── */}
        <div
          className="flex flex-col overflow-hidden flex-shrink-0 backdrop-blur-xl"
          style={{ width: '22%', background: 'rgba(16, 30, 23, 0.92)', borderLeft: '1px solid rgba(224, 165, 59, 0.15)' }}
        >
          {/* Saffron & Forest Green Tab switcher */}
          <div className="p-2 border-b border-white/5">
            <div className="flex p-1 rounded-xl bg-[#0A130E] border border-white/10">
              {(['fleet', 'missions'] as RightTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setRightTab(tab)}
                  className={`flex-1 py-1.5 text-xs font-mono font-bold tracking-wider rounded-lg transition-all ${
                    rightTab === tab
                      ? 'bg-[#E0A53B]/25 text-[#E0A53B] border border-[#E0A53B]/50 shadow-sm'
                      : 'text-[#F2E6D3]/60 hover:text-white'
                  }`}
                >
                  {tab === 'fleet' ? '🚛 FLEET TELEMETRY' : '📋 SORTIE MISSIONS'}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle tracking panel when vehicle selected */}
          <AnimatePresence>
            {selectedVehicleId && ['EVACUATING', 'EVACUATING_V2'].includes(demoStage) && (
              <VehicleTrackingPanel />
            )}
          </AnimatePresence>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {rightTab === 'fleet' ? (
                <motion.div
                  key="fleet"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full overflow-y-auto"
                >
                  <FleetPanel />
                </motion.div>
              ) : (
                <motion.div
                  key="missions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full overflow-hidden"
                >
                  <MissionPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TIMELINE ── */}
      <div style={{ height: 100, background: 'rgba(10, 19, 14, 0.96)', borderTop: '1px solid rgba(224, 165, 59, 0.15)', flexShrink: 0 }}>
        <FleetTimeline />
      </div>

      {/* Demo Control */}
      <DemoControl />
    </div>
  );
};
