import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Users, Shield, CheckCircle2, AlertTriangle, Clock, ArrowRight, Truck, MapPin } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { MissionStatus } from '../data/scenario';

const statusDisplay: Record<MissionStatus, { label: string; color: string; bg: string; border: string }> = {
  PLANNED: { label: 'ALGORITHMICALLY COMPUTED', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)', border: 'rgba(148, 163, 184, 0.25)' },
  APPROVED: { label: 'DISTRICT SANCTIONED', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.12)', border: 'rgba(45, 212, 191, 0.35)' },
  RESERVED: { label: 'VEHICLE ASSIGNED', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.12)', border: 'rgba(45, 212, 191, 0.35)' },
  DISPATCHED: { label: 'DISPATCH ORDER SENT', color: '#E05A1B', bg: 'rgba(224, 90, 27, 0.15)', border: 'rgba(224, 90, 27, 0.4)' },
  AT_PICKUP: { label: 'AT HAMLET PICKUP', color: '#fbbf24', bg: 'rgba(217, 119, 6, 0.15)', border: 'rgba(217, 119, 6, 0.4)' },
  LOADING: { label: 'BOARDING IN PROGRESS', color: '#fde047', bg: 'rgba(217, 119, 6, 0.2)', border: 'rgba(217, 119, 6, 0.5)' },
  IN_TRANSIT: { label: 'INBOUND ON LIFELINE CORRIDOR', color: '#E05A1B', bg: 'rgba(224, 90, 27, 0.18)', border: 'rgba(224, 90, 27, 0.5)' },
  CRITICAL_EDGE_PASSED: { label: 'PAIKA BRIDGE CLEARED ✓', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.15)', border: 'rgba(45, 212, 191, 0.4)' },
  ARRIVED: { label: 'AT SANCTUARY POINT', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.15)', border: 'rgba(45, 212, 191, 0.4)' },
  UNLOADING: { label: 'SAFE DEBOARDING', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.2)', border: 'rgba(45, 212, 191, 0.45)' },
  COMPLETED: { label: 'SANCTUARY REACHED ✓', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.2)', border: 'rgba(45, 212, 191, 0.5)' },
  BLOCKED: { label: 'BRIDGE BREACH HALT', color: '#f87171', bg: 'rgba(220, 38, 38, 0.2)', border: 'rgba(220, 38, 38, 0.5)' },
};

type FilterType = 'ALL' | 'HUMAN' | 'LIVESTOCK' | 'BLOCKED' | 'COMPLETED';

export const MissionPanel: React.FC = () => {
  const { missions, vehicles, settlements, shelters, animalCamps, selectedMissionId, setSelectedMission } = useDemoStore();
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [expandedMission, setExpandedMission] = useState<string | null>(null);

  const filtered = missions.filter(m => {
    if (filter === 'HUMAN') return m.category === 'HUMAN';
    if (filter === 'LIVESTOCK') return m.category === 'LIVESTOCK';
    if (filter === 'BLOCKED') return m.status === 'BLOCKED';
    if (filter === 'COMPLETED') return m.status === 'COMPLETED';
    return true;
  });

  const getVehicle = (id: string) => vehicles.find(v => v.id === id);
  const getSettlement = (id: string) => settlements.find(s => s.id === id);
  const getDest = (id: string) => {
    const s = shelters.find(sh => sh.id === id);
    const c = animalCamps.find(ac => ac.id === id);
    return s || c;
  };

  const lifecycleSteps: { label: string; status: MissionStatus }[] = [
    { label: 'CALCULATED BY SAHACHAR', status: 'PLANNED' },
    { label: 'OFFICIAL SANCTION', status: 'APPROVED' },
    { label: 'VEHICLE RESERVED', status: 'RESERVED' },
    { label: 'CONVOY DISPATCH', status: 'DISPATCHED' },
    { label: 'COMMUNITY BOARDING', status: 'LOADING' },
    { label: 'TRANSIT ON ELEVATED R3', status: 'IN_TRANSIT' },
    { label: 'PAIKA BRIDGE SAFELY CROSSED', status: 'CRITICAL_EDGE_PASSED' },
    { label: 'SANCTUARY UNLOADED', status: 'COMPLETED' },
  ];

  const statusOrder: MissionStatus[] = [
    'PLANNED', 'APPROVED', 'RESERVED', 'DISPATCHED',
    'AT_PICKUP', 'LOADING', 'IN_TRANSIT', 'CRITICAL_EDGE_PASSED',
    'ARRIVED', 'UNLOADING', 'COMPLETED'
  ];

  const getStepState = (step: { label: string; status: MissionStatus }, currentStatus: MissionStatus) => {
    const stepIdx = statusOrder.indexOf(step.status);
    const curIdx = statusOrder.indexOf(currentStatus);
    if (curIdx > stepIdx) return 'done';
    if (curIdx === stepIdx) return 'active';
    return 'pending';
  };

  return (
    <div className="flex flex-col h-full bg-[#0B132B]/95">
      {/* Filter Tabs */}
      <div className="flex gap-1.5 p-2.5 border-b border-white/5 flex-wrap">
        {[
          { key: 'ALL', label: 'ALL SORTIES' },
          { key: 'HUMAN', label: '👤 FAMILIES' },
          { key: 'LIVESTOCK', label: '🐄 LIVESTOCK' },
          { key: 'BLOCKED', label: '⚠️ BLOCKED' },
          { key: 'COMPLETED', label: '✓ SANCTUARY' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as FilterType)}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all ${
              filter === tab.key
                ? 'bg-[#E05A1B] text-white border border-[#F97316] shadow-sm'
                : 'bg-white/5 text-[#E8F3ED]/60 hover:text-white border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mission List */}
      <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="text-center text-xs text-[#E8F3ED]/40 font-mono py-8">
            No sortie missions matching this filter
          </div>
        )}

        {filtered.map(mission => {
          const vehicle = getVehicle(mission.vehicleId);
          const settlement = getSettlement(mission.settlementId);
          const dest = getDest(mission.destinationId);
          const isExpanded = expandedMission === mission.id;
          const status = statusDisplay[mission.status] || statusDisplay.PLANNED;
          const isHuman = mission.category === 'HUMAN';
          const isSelected = selectedMissionId === mission.id;

          return (
            <motion.div
              key={mission.id}
              layout
              onClick={() => {
                setExpandedMission(isExpanded ? null : mission.id);
                setSelectedMission(mission.id);
              }}
              className={`rounded-2xl p-3 cursor-pointer transition-all ${
                isSelected
                  ? 'crisis-card ring-1 ring-[#2DD4BF]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
                  : mission.status === 'BLOCKED'
                  ? 'crisis-card-danger'
                  : 'crisis-card'
              }`}
            >
              {/* Mission Header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: isHuman ? 'rgba(45, 212, 191, 0.15)' : 'rgba(217, 119, 6, 0.15)',
                    border: `1px solid ${isHuman ? 'rgba(45, 212, 191, 0.3)' : 'rgba(217, 119, 6, 0.3)'}`,
                  }}
                >
                  {isHuman ? '👤' : '🐄'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono font-black text-xs text-[#FAF8F5] tracking-tight">{mission.id}</span>
                      <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                        {isHuman ? 'FAMILY RESCUE' : 'LIVESTOCK PROTECTION'}
                      </span>
                      {mission.planVersion === 'V2' && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                          ADAPTIVE V2
                        </span>
                      )}
                    </div>

                    <div
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                      style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
                    >
                      {['IN_TRANSIT', 'DISPATCHED', 'LOADING', 'AT_PICKUP'].includes(mission.status) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                      )}
                      {status.label}
                    </div>
                  </div>

                  {/* Corridor Summary */}
                  <div className="text-[11px] text-[#E8F3ED]/80 flex items-center gap-1.5 font-medium mb-1">
                    <span className="text-[#FAF8F5]">{settlement?.name}</span>
                    <ArrowRight size={11} className="text-[#2DD4BF]" />
                    <span className="text-[#2DD4BF] font-semibold">{dest?.name}</span>
                  </div>

                  {/* Operational Details */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#E8F3ED]/50 pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Truck size={11} className="text-[#E05A1B]" /> {vehicle?.id} ({vehicle?.driver})
                    </span>
                    <span>
                      {mission.passengers ? `${mission.passengers} Villagers` : `${mission.cattle || 0} Cattle Units`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Detail and Lifecycle */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 pt-2.5 border-t border-white/10"
                  >
                    <div className="text-[9px] font-mono font-bold text-[#E05A1B] uppercase tracking-wider mb-2">
                      CRISIS SORTIE PROGRESSION
                    </div>

                    <div className="flex flex-col gap-1.5 mb-3">
                      {lifecycleSteps.map(step => {
                        const state = getStepState(step, mission.status);
                        return (
                          <div key={step.label} className="flex items-center gap-2 text-xs">
                            <div
                              className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                background: state === 'done' ? '#0F3E2E' : state === 'active' ? '#E05A1B' : '#0B1F16',
                                border: `1px solid ${state === 'done' ? '#2DD4BF' : state === 'active' ? '#F97316' : '#164E3D'}`,
                              }}
                            >
                              {state === 'done' ? (
                                <CheckCircle2 size={9} className="text-[#2DD4BF]" />
                              ) : state === 'active' ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              ) : null}
                            </div>
                            <span
                              className="text-[10px] font-mono"
                              style={{
                                color: state === 'done' ? '#2DD4BF' : state === 'active' ? '#E05A1B' : '#749F82',
                                fontWeight: state === 'active' ? 700 : 400,
                              }}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Corridor & Safeguards */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-[#0F172A] p-2 rounded-xl border border-white/5">
                      <div>
                        <span className="text-[#E8F3ED]/40 block text-[9px]">ASSIGNED CORRIDOR</span>
                        <strong className="text-[#2DD4BF]">{mission.routeId} (High Embankment)</strong>
                      </div>
                      <div>
                        <span className="text-[#E8F3ED]/40 block text-[9px]">DEPARTURE TIME</span>
                        <strong className="text-[#FAF8F5]">{mission.departure} hrs</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
