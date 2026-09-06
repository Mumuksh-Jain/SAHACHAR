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

  const ticks = [12 * 60, 12 * 60 + 30, 13 * 60, 13 * 60 + 30, 14 * 60, 14 * 60 + 30];
  const cutoffPercent = ((PAIKA_CUTOFF - TIMELINE_START) / TIMELINE_SPAN) * 100;

  return (
    <div className="h-full flex flex-col px-3 py-1.5 overflow-hidden bg-[#070D18]/95 select-none text-slate-100">
      {/* Timeline Header with Legend */}
      <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-[#E05A1B]" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">
            SYNCHRONIZED EVACUATION TIMELINE
          </span>
          <span className="text-[9px] text-slate-400 font-sans hidden sm:inline">
            (Paika River Rising • Bridge Submergence Horizon: 13:05)
          </span>
          {!isEvacuating && (
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
              STANDBY SCHEDULE
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[9px] font-mono">
          <span className="flex items-center gap-1 text-[#38BDF8]">
            <span className="w-2 h-2 rounded bg-[#0284C7] border border-[#38BDF8]" /> HUMAN
          </span>
          <span className="flex items-center gap-1 text-[#FBBF24]">
            <span className="w-2 h-2 rounded bg-[#D97706] border border-[#FBBF24]" /> LIVESTOCK
          </span>
          <span className="flex items-center gap-1 text-[#4ADE80]">
            <span className="w-2 h-2 rounded bg-[#10B981] border border-[#4ADE80]" /> SANCTUARY
          </span>
          <span className="flex items-center gap-1 text-[#F87171]">
            <span className="w-2 h-0.5 bg-[#DC2626]" /> 13:05 CUTOFF
          </span>
        </div>
      </div>

      <div className="flex-1 relative overflow-x-auto overflow-y-auto min-w-[600px]">
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
                  <span className="text-[9px] font-mono text-slate-400 font-medium">
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
                  background: 'rgba(255, 255, 255, 0.07)',
                  height: '180px',
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
              height: '180px',
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
              height: '180px',
            }}
          >
            <div className="bg-[#E05A1B] text-white text-[8px] font-mono font-black px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
              NOW {scenarioTime}
            </div>
            <div className="w-0.5 flex-1 bg-[#E05A1B] shadow-[0_0_8px_#E05A1B]" />
          </div>
        </div>

        {/* Vehicle Rows */}
        <div className="flex flex-col gap-1 relative z-10" style={{ marginLeft: 0 }}>
          {vehiclesList.map(veh => {
            const bars = missionBars.filter(b => b.vehicleId === veh.id);

            return (
              <div key={veh.id} className="flex items-center gap-2" style={{ height: 18 }}>
                {/* Vehicle label */}
                <div
                  className="font-mono font-bold text-right flex items-center justify-end gap-1 flex-shrink-0"
                  style={{ width: 60, fontSize: 10 }}
                >
                  <span className="text-slate-200">{veh.id}</span>
                  <span className="text-[9px] text-slate-400">
                    {veh.type === 'LIVESTOCK' ? '🐄' : veh.type === 'MEDICAL' ? '🚑' : '👤'}
                  </span>
                </div>

                {/* Timeline bar track */}
                <div
                  className="flex-1 relative h-4 rounded border border-white/5 overflow-hidden"
                  style={{ background: 'rgba(15, 23, 42, 0.75)' }}
                >
                  {bars.map(b => {
                    const left = Math.max(0, timeToPercent(b.start));
                    const right = Math.min(100, timeToPercent(b.end));
                    const width = right - left;

                    // Match dynamic mission status
                    const mObj = missions.find(m => m.id === b.missionId);
                    const isComplete = mObj?.status === 'COMPLETED' || demoStage === 'COMPLETED';
                    const isActive = isEvacuating && mObj && !['COMPLETED', 'PLANNED', 'BLOCKED'].includes(mObj.status);
                    const isBlocked = mObj?.status === 'BLOCKED' || (b.vehicleId === 'T09' && demoStage === 'DISRUPTION');

                    let bgGradient = 'linear-gradient(90deg, #0284C7, #0369A1)';
                    let borderCol = '#38BDF8';

                    if (b.type === 'LIVESTOCK') {
                      bgGradient = 'linear-gradient(90deg, #D97706, #B45309)';
                      borderCol = '#F59E0B';
                    } else if (b.type === 'MEDICAL') {
                      bgGradient = 'linear-gradient(90deg, #DC2626, #B91C1C)';
                      borderCol = '#EF4444';
                    }

                    if (isComplete) {
                      bgGradient = 'linear-gradient(90deg, #10B981, #059669)';
                      borderCol = '#34D399';
                    } else if (isBlocked) {
                      bgGradient = 'linear-gradient(90deg, #7F1D1D, #991B1B)';
                      borderCol = '#DC2626';
                    }

                    return (
                      <motion.div
                        key={b.missionId}
                        initial={{ opacity: 0.85 }}
                        animate={{
                          opacity: isActive ? [0.85, 1, 0.85] : isEvacuating ? 0.95 : 0.75,
                          boxShadow: isActive ? '0 0 10px rgba(56,189,248,0.5)' : 'none',
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
                        <span className="text-[8.5px] font-mono font-bold text-white truncate drop-shadow-sm">
                          {b.label}
                        </span>
                        {isComplete ? (
                          <ShieldCheck size={9} className="text-white flex-shrink-0 ml-1" />
                        ) : isBlocked ? (
                          <AlertTriangle size={9} className="text-amber-300 flex-shrink-0 ml-1" />
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
