import React from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../store/useDemoStore';
import { Clock, AlertTriangle, ShieldCheck, Waves } from 'lucide-react';

const TIMELINE_START = 12 * 60; // 12:00
const TIMELINE_END = 14 * 60 + 30; // 14:30
const TIMELINE_SPAN = TIMELINE_END - TIMELINE_START; // 150 min
const PAIKA_CUTOFF = 13 * 60 + 5; // 13:05 Paika Bridge Submergence

const timeToPercent = (hhMM: string): number => {
  const [h, m] = hhMM.split(':').map(Number);
  const mins = h * 60 + m;
  return ((mins - TIMELINE_START) / TIMELINE_SPAN) * 100;
};

const formatTick = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}:${String(m).padStart(2, '0')}`;
};

interface MissionBarDef {
  vehicleId: string;
  missionId: string;
  start: string;
  end: string;
  label: string;
  type: 'HUMAN' | 'LIVESTOCK' | 'MEDICAL';
  desc: string;
}

const missionBars: MissionBarDef[] = [
  { vehicleId: 'B04', missionId: 'M12', start: '12:10', end: '12:50', label: 'M12 Tarapur (42 Villagers)', type: 'HUMAN', desc: 'Tarapur → School Shelter' },
  { vehicleId: 'B04', missionId: 'M44', start: '13:15', end: '13:55', label: 'M44 Bilasuni (38 Villagers)', type: 'HUMAN', desc: 'Bilasuni → Cyclone Shelter H2' },
  { vehicleId: 'T07', missionId: 'A27', start: '12:20', end: '13:20', label: 'A27 Tarapur (12 Cattle)', type: 'LIVESTOCK', desc: 'Tarapur → Go-Sadan C1' },
  { vehicleId: 'T07', missionId: 'A41', start: '13:22', end: '14:10', label: 'A41 Tentulipada (14 Cattle)', type: 'LIVESTOCK', desc: 'Tentulipada → Go-Sadan C1' },
  { vehicleId: 'T09', missionId: 'A32', start: '12:50', end: '13:40', label: 'A32 (Replaced by T11)', type: 'LIVESTOCK', desc: 'Mechanical Fail → Replaced' },
  { vehicleId: 'B06', missionId: 'M31', start: '12:48', end: '13:30', label: 'M31 Manijanga (35 Villagers)', type: 'HUMAN', desc: 'Manijanga → Shelter H1' },
  { vehicleId: 'B06', missionId: 'M55', start: '13:30', end: '14:15', label: 'M55 Kaduapada (28 Villagers)', type: 'HUMAN', desc: 'Kaduapada → Shelter H1' },
  { vehicleId: 'M01', missionId: 'M15', start: '12:30', end: '13:10', label: 'M15 High-Risk (18 Villagers)', type: 'HUMAN', desc: 'Bedridden Elders Shuttle' },
  { vehicleId: 'A02', missionId: 'MED', start: '12:00', end: '14:30', label: 'ALS Ambulance Standby', type: 'MEDICAL', desc: 'Tirtol Medical First Response' },
];

const vehiclesList = [
  { id: 'B04', name: 'Bus B04', type: 'HUMAN' },
  { id: 'T07', name: 'Truck T07', type: 'LIVESTOCK' },
  { id: 'T09', name: 'Truck T09', type: 'LIVESTOCK' },
  { id: 'B06', name: 'Bus B06', type: 'HUMAN' },
  { id: 'M01', name: 'Minibus M01', type: 'HUMAN' },
  { id: 'A02', name: 'Ambulance A02', type: 'MEDICAL' },
];

export const FleetTimeline: React.FC = () => {
  const { demoStage, missions, scenarioTime } = useDemoStore();

  const [h, m] = scenarioTime.split(':').map(Number);
  const nowMin = (h || 12) * 60 + (m || 0);
  const nowPercent = Math.max(0, Math.min(100, ((nowMin - TIMELINE_START) / TIMELINE_SPAN) * 100));

  const isEvacuating = ['EVACUATING', 'DISRUPTION', 'REPLANNING', 'PLAN_V2',
    'RESOURCE_GAP', 'ESCALATION', 'EVACUATING_V2', 'COMPLETED'].includes(demoStage);

  if (!isEvacuating) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-[#E2D9CE]/40 font-mono tracking-wider">
        CONVOY SORTIE TIMELINE ARMS UPON MISSION DISPATCH
      </div>
    );
  }

  const ticks = [12 * 60, 12 * 60 + 30, 13 * 60, 13 * 60 + 30, 14 * 60, 14 * 60 + 30];
  const cutoffPercent = ((PAIKA_CUTOFF - TIMELINE_START) / TIMELINE_SPAN) * 100;

  return (
    <div className="h-full flex flex-col px-3 py-2 overflow-hidden bg-[#0A0D14]/90 select-none">
      {/* Timeline Header with Legend */}
      <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-[#D4AF37]" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#FAF8F5] uppercase">
            SYNCHRONIZED EVACUATION TIMELINE
          </span>
          <span className="text-[9px] text-[#E2D9CE]/50 font-sans hidden sm:inline">
            (Paika River Rising • Bridge Submergence Horizon: 13:05)
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[9px] font-mono">
          <span className="flex items-center gap-1 text-[#38BDF8]">
            <span className="w-2 h-2 rounded bg-[#0284C7]" /> HUMAN
          </span>
          <span className="flex items-center gap-1 text-[#FBBF24]">
            <span className="w-2 h-2 rounded bg-[#D97706]" /> LIVESTOCK
          </span>
          <span className="flex items-center gap-1 text-[#4ADE80]">
            <span className="w-2 h-2 rounded bg-[#16A34A]" /> SANCTUARY REACHED
          </span>
          <span className="flex items-center gap-1 text-[#F87171]">
            <span className="w-2 h-0.5 bg-[#DC2626]" /> 13:05 CUTOFF
          </span>
        </div>
      </div>

      <div className="flex-1 relative overflow-x-auto min-w-[600px]">
        {/* Ticks header */}
        <div className="relative mb-1" style={{ marginLeft: 65 }}>
          <div className="relative h-4">
            {ticks.map(tick => {
              const pct = ((tick - TIMELINE_START) / TIMELINE_SPAN) * 100;
              return (
                <div
                  key={tick}
                  className="absolute text-center"
                  style={{
                    left: `${pct}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <span className="text-[9px] font-mono text-[#E2D9CE]/60 font-medium">
                    {formatTick(tick)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Grid background lines */}
          {ticks.map(tick => {
            const pct = ((tick - TIMELINE_START) / TIMELINE_SPAN) * 100;
            return (
              <div
                key={tick}
                className="absolute top-4 bottom-0"
                style={{
                  left: `${pct}%`,
                  width: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  height: '140px',
                  pointerEvents: 'none',
                }}
              />
            );
          })}

          {/* 13:05 PAIKA BRIDGE WATER CUTOFF VERTICAL LINE */}
          <div
            className="absolute top-0 z-20 pointer-events-none flex flex-col items-center"
            style={{
              left: `${cutoffPercent}%`,
              transform: 'translateX(-50%)',
              height: '145px',
            }}
          >
            <div className="bg-[#DC2626] text-white text-[8px] font-mono font-black px-1.5 py-0.5 rounded shadow-lg flex items-center gap-1 whitespace-nowrap">
              <Waves size={9} /> PAIKA BRIDGE BREACH 13:05
            </div>
            <div className="w-[1.5px] flex-1 bg-gradient-to-b from-[#DC2626] via-[#DC2626]/80 to-transparent border-r border-dashed border-red-400" />
          </div>

          {/* Current scenario time indicator */}
          <div
            className="absolute top-0 z-30 pointer-events-none flex flex-col items-center"
            style={{
              left: `${nowPercent}%`,
              transform: 'translateX(-50%)',
              height: '145px',
            }}
          >
            <div className="bg-[#D4AF37] text-black text-[8px] font-mono font-black px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
              NOW {scenarioTime}
            </div>
            <div className="w-0.5 flex-1 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
          </div>
        </div>

        {/* Vehicle Rows */}
        <div className="flex flex-col gap-1.5 relative z-10" style={{ marginLeft: 0 }}>
          {vehiclesList.map(veh => {
            const bars = missionBars.filter(b => b.vehicleId === veh.id);

            return (
              <div key={veh.id} className="flex items-center gap-2" style={{ height: 22 }}>
                {/* Vehicle label */}
                <div
                  className="font-mono font-bold text-right flex items-center justify-end gap-1 flex-shrink-0"
                  style={{ width: 60, fontSize: 10 }}
                >
                  <span className="text-[#FAF8F5]">{veh.id}</span>
                  <span className="text-[9px] text-[#E2D9CE]/40">
                    {veh.type === 'LIVESTOCK' ? '🐄' : veh.type === 'MEDICAL' ? '🚑' : '👤'}
                  </span>
                </div>

                {/* Timeline bar track */}
                <div
                  className="flex-1 relative h-5 rounded-lg border border-white/5 overflow-hidden"
                  style={{ background: 'rgba(18, 22, 32, 0.7)' }}
                >
                  {bars.map(b => {
                    const left = Math.max(0, timeToPercent(b.start));
                    const right = Math.min(100, timeToPercent(b.end));
                    const width = right - left;

                    // Match dynamic mission status
                    const mObj = missions.find(m => m.id === b.missionId);
                    const isComplete = mObj?.status === 'COMPLETED' || demoStage === 'COMPLETED';
                    const isActive = mObj && !['COMPLETED', 'PLANNED', 'BLOCKED'].includes(mObj.status);
                    const isBlocked = mObj?.status === 'BLOCKED' || (b.vehicleId === 'T09' && demoStage === 'DISRUPTION');

                    let bgGradient = 'linear-gradient(90deg, #0284C7, #0284C7dd)';
                    let borderCol = '#0284C7';

                    if (b.type === 'LIVESTOCK') {
                      bgGradient = 'linear-gradient(90deg, #D97706, #D97706dd)';
                      borderCol = '#D97706';
                    } else if (b.type === 'MEDICAL') {
                      bgGradient = 'linear-gradient(90deg, #E04838, #E04838dd)';
                      borderCol = '#E04838';
                    }

                    if (isComplete) {
                      bgGradient = 'linear-gradient(90deg, #16A34A, #16A34Add)';
                      borderCol = '#4ADE80';
                    } else if (isBlocked) {
                      bgGradient = 'linear-gradient(90deg, #7F1D1D, #991B1B)';
                      borderCol = '#DC2626';
                    }

                    return (
                      <motion.div
                        key={b.missionId}
                        initial={{ opacity: 0.8 }}
                        animate={{
                          opacity: isActive ? [0.85, 1, 0.85] : 0.95,
                          boxShadow: isActive ? '0 0 10px rgba(2,132,199,0.5)' : 'none',
                        }}
                        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                        className="absolute top-0.5 bottom-0.5 rounded px-1.5 flex items-center justify-between overflow-hidden cursor-default"
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          background: bgGradient,
                          border: `1px solid ${borderCol}`,
                        }}
                        title={`${b.label} (${b.desc})`}
                      >
                        <span className="text-[9px] font-mono font-bold text-white truncate drop-shadow-sm">
                          {b.label}
                        </span>
                        {isComplete ? (
                          <ShieldCheck size={10} className="text-white flex-shrink-0 ml-1" />
                        ) : isBlocked ? (
                          <AlertTriangle size={10} className="text-amber-300 flex-shrink-0 ml-1" />
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
