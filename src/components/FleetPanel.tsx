import React from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '../store/useDemoStore';
import { VehicleStatus } from '../data/scenario';
import { computeETA } from '../engine/telemetryEngine';
import { Truck, Users, ShieldAlert, Radio, Clock, AlertTriangle, CheckCircle2, Compass, Gauge } from 'lucide-react';

const typeMetadata: Record<string, { label: string; icon: string; role: string; specs: string }> = {
  BUS: {
    label: 'EVACUATION BUS',
    icon: '🚌',
    role: 'Passenger Conveyance • Elders & Families',
    specs: '42 seats • All-weather chassis',
  },
  LIVESTOCK_CARRIER: {
    label: 'CATTLE CARRIER',
    icon: '🚛',
    role: 'Livelihood Protection • Family Herds',
    specs: '8.4m² non-slip bed • Hydraulic ramp',
  },
  AMBULANCE: {
    label: 'CRITICAL CARE',
    icon: '🚑',
    role: 'Emergency Medical & High-Risk Pregnancy',
    specs: 'Oxygen cradle • Stretcher suspension',
  },
  JEEP: {
    label: 'COMMAND 4x4',
    icon: '🚙',
    role: 'Reconnaissance & Field Verification',
    specs: 'High-clearance snorkel 4WD',
  },
  MINIBUS: {
    label: 'HAMLET FEEDER',
    icon: '🚐',
    role: 'Narrow Kutcha Road Feeder',
    specs: 'Compact wheel base • 22 seats',
  },
};

const statusConfig: Record<VehicleStatus, { label: string; bg: string; text: string; border: string }> = {
  AVAILABLE: {
    label: 'STAGED & READY',
    bg: 'rgba(45, 212, 191, 0.14)',
    text: '#2DD4BF',
    border: 'rgba(45, 212, 191, 0.35)',
  },
  RESERVED: {
    label: 'RESERVED TO CONVOY',
    bg: 'rgba(45, 212, 191, 0.14)',
    text: '#2DD4BF',
    border: 'rgba(45, 212, 191, 0.35)',
  },
  DRIVER_ACK_PENDING: {
    label: 'RADIO ACK PENDING',
    bg: 'rgba(217, 119, 6, 0.14)',
    text: '#fbbf24',
    border: 'rgba(217, 119, 6, 0.4)',
  },
  DISPATCHED: {
    label: 'DISPATCH ORDERED',
    bg: 'rgba(224, 90, 27, 0.18)',
    text: '#E05A1B',
    border: 'rgba(224, 90, 27, 0.45)',
  },
  EN_ROUTE_TO_PICKUP: {
    label: 'INBOUND TO HAMLET',
    bg: 'rgba(224, 90, 27, 0.18)',
    text: '#E05A1B',
    border: 'rgba(224, 90, 27, 0.5)',
  },
  AT_PICKUP: {
    label: 'AT ASSEMBLY POINT',
    bg: 'rgba(217, 119, 6, 0.15)',
    text: '#fbbf24',
    border: 'rgba(217, 119, 6, 0.45)',
  },
  LOADING: {
    label: 'EMERGENCY BOARDING',
    bg: 'rgba(217, 119, 6, 0.2)',
    text: '#fde047',
    border: 'rgba(217, 119, 6, 0.5)',
  },
  EN_ROUTE: {
    label: 'CONVOY IN TRANSIT',
    bg: 'rgba(224, 90, 27, 0.22)',
    text: '#E05A1B',
    border: 'rgba(224, 90, 27, 0.55)',
  },
  ARRIVED: {
    label: 'AT SANCTUARY CAMP',
    bg: 'rgba(45, 212, 191, 0.18)',
    text: '#2DD4BF',
    border: 'rgba(45, 212, 191, 0.45)',
  },
  UNLOADING: {
    label: 'SAFE OFF-LOADING',
    bg: 'rgba(45, 212, 191, 0.18)',
    text: '#2DD4BF',
    border: 'rgba(45, 212, 191, 0.45)',
  },
  TURNAROUND: {
    label: 'SORTIE TURNAROUND',
    bg: 'rgba(100, 116, 139, 0.15)',
    text: '#cbd5e1',
    border: 'rgba(100, 116, 139, 0.35)',
  },
  UNAVAILABLE: {
    label: 'MECHANICAL FAILURE',
    bg: 'rgba(220, 38, 38, 0.16)',
    text: '#f87171',
    border: 'rgba(220, 38, 38, 0.45)',
  },
  RESERVE: {
    label: 'DISTRICT STRATEGIC RESERVE',
    bg: 'rgba(71, 85, 105, 0.18)',
    text: '#94a3b8',
    border: 'rgba(71, 85, 105, 0.4)',
  },
};

export const FleetPanel: React.FC = () => {
  const { vehicles, missions, vehicleProgress, vehicleSpeed, selectedVehicleId, setSelectedVehicle, demoStage } = useDemoStore();

  const getMission = (vehicleId: string) =>
    missions.find(m => m.vehicleId === vehicleId && !['COMPLETED', 'BLOCKED', 'PLANNED'].includes(m.status));

  const isMoving = (status: VehicleStatus) =>
    ['EN_ROUTE_TO_PICKUP', 'EN_ROUTE', 'IN_TRANSIT'].includes(status);

  return (
    <div className="flex flex-col gap-2.5 p-2 overflow-y-auto">
      {/* Fleet Context Header */}
      <div className="px-1 py-1 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#E8F3ED]/60 uppercase font-bold flex items-center gap-1.5">
            <Compass size={13} className="text-[#2DD4BF]" />
            DEPLOYED RESCUE CONVOYS
          </div>
          <div className="text-[10px] text-[#E2D9CE]/40 font-sans">
            Human passenger buses paired with dignified livestock carriers
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#121620] text-[#D4AF37] border border-[#D4AF37]/30">
          {vehicles.filter(v => v.status !== 'UNAVAILABLE').length} OPERATIONAL
        </span>
      </div>

      {vehicles.map(v => {
        const isSelected = selectedVehicleId === v.id;
        const conf = statusConfig[v.status] || statusConfig.AVAILABLE;
        const progress = vehicleProgress[v.id] || 0;
        const speed = vehicleSpeed[v.id] || 0;
        const mission = getMission(v.id);
        const active = isMoving(v.status);
        const meta = typeMetadata[v.type] || {
          label: v.type,
          icon: '🚗',
          role: 'Emergency Tasked Vehicle',
          specs: 'Standard utility',
        };
        const eta = mission ? computeETA(progress, v.type === 'LIVESTOCK_CARRIER' ? 42 : 35) : null;

        // Don't show RESERVE until escalation phase
        if (v.status === 'RESERVE' && !['ESCALATION', 'EVACUATING_V2', 'COMPLETED'].includes(demoStage)) {
          return null;
        }

        const isBroken = v.status === 'UNAVAILABLE';

        return (
          <motion.div
            key={v.id}
            layout
            onClick={() => setSelectedVehicle(isSelected ? null : v.id)}
            animate={{
              scale: isSelected ? 1.01 : 1,
            }}
            transition={{ duration: 0.2 }}
            className={`rounded-2xl p-3.5 cursor-pointer transition-all ${
              isSelected
                ? 'crisis-card ring-1 ring-[#D4AF37]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
                : isBroken
                ? 'crisis-card-danger'
                : 'crisis-card'
            }`}
            style={{
              background: isSelected
                ? 'linear-gradient(145deg, #18202F, #121620)'
                : isBroken
                ? 'linear-gradient(145deg, rgba(60, 20, 20, 0.4), #121620)'
                : undefined,
            }}
          >
            {/* Top row */}
            <div className="flex items-start gap-3">
              {/* Vehicle icon badge */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: isSelected
                    ? 'rgba(2, 132, 199, 0.2)'
                    : isBroken
                    ? 'rgba(220, 38, 38, 0.15)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${
                    isSelected
                      ? 'rgba(2, 132, 199, 0.4)'
                      : isBroken
                      ? 'rgba(220, 38, 38, 0.3)'
                      : 'rgba(220, 195, 165, 0.12)'
                  }`,
                }}
              >
                {meta.icon}
              </div>

              {/* Vehicle Identity & Role */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono font-black text-sm text-[#FAF8F5] tracking-tight">{v.id}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-[#E2D9CE]/70 border border-white/10 font-bold">
                      {meta.label}
                    </span>
                    {v.status === 'RESERVE' && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/40">
                        DISTRICT RESERVE
                      </span>
                    )}
                  </div>

                  {/* Status badge */}
                  <div
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 flex-shrink-0"
                    style={{
                      background: conf.bg,
                      color: conf.text,
                      border: `1px solid ${conf.border}`,
                    }}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                    )}
                    {conf.label}
                  </div>
                </div>

                {/* Subtitle / Human mission context */}
                <div className="text-[11px] text-[#E2D9CE]/80 font-medium line-clamp-1 mb-1.5">
                  {meta.role}
                </div>

                {/* Driver & VHF Radio Channel */}
                <div className="flex items-center justify-between text-[11px] text-[#E8F3ED]/60 font-mono mb-2 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#FAF8F5] font-sans font-semibold">👨‍✈️ {v.driver}</span>
                  </span>
                  <span className="text-[10px] text-[#E8F3ED]/40 flex items-center gap-1">
                    <Radio size={10} className="text-[#2DD4BF]" /> LOC: {v.assignedLocation || 'BASE STAGING'}
                  </span>
                </div>

                {/* Progress bar if en route */}
                {active && progress > 0 && (
                  <div className="mb-2 bg-[#0F172A] p-2 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                      <span className="text-[#E8F3ED]/60 flex items-center gap-1">
                        <Gauge size={11} className="text-[#2DD4BF]" /> CORRIDOR TRANSIT
                      </span>
                      <span className="font-bold text-[#2DD4BF]">{Math.round(progress)}% COMPLETE</span>
                    </div>
                    <div className="h-1.5 rounded-full w-full bg-slate-900/80 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          width: `${progress}%`,
                          background: 'linear-gradient(90deg, #0F3E2E, #2DD4BF)',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Mission readout */}
                {mission && (
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1.5 border-t border-white/5 text-[#E2D9CE]/80">
                    <span className="font-bold text-[#38BDF8] flex items-center gap-1">
                      MISSION {mission.id}
                    </span>
                    {eta !== null && (
                      <span className="flex items-center gap-1">
                        <Clock size={11} className="text-[#D97706]" />
                        DEST ETA: <strong className="text-[#FAF8F5] font-black">{eta} MIN</strong>
                      </span>
                    )}
                    {active && speed > 0 && (
                      <span className="text-[#38bdf8] font-bold">{speed} km/h</span>
                    )}
                  </div>
                )}

                {/* Capacity & Specs if selected */}
                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-[#D4AF37]/20 grid grid-cols-2 gap-2 text-[10px] font-mono text-[#E2D9CE]/70">
                    <div className="bg-[#0A0D14]/70 p-1.5 rounded-lg border border-white/5">
                      <span className="text-[#E2D9CE]/40 block text-[9px]">PAYLOAD CAPACITY</span>
                      <strong className="text-[#FAF8F5] text-[11px]">
                        {v.capacity ? `${v.capacity} Passengers` : `${v.usableFloorArea} m² Ramp Deck`}
                      </strong>
                    </div>
                    <div className="bg-[#0A0D14]/70 p-1.5 rounded-lg border border-white/5">
                      <span className="text-[#E2D9CE]/40 block text-[9px]">SAFETY SPECS</span>
                      <span className="text-[#FAF8F5] text-[10px] truncate block">{meta.specs}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── Telemetry / Tracking Panel for selected vehicle ─────────────────────────────
export const VehicleTrackingPanel: React.FC = () => {
  const { selectedVehicleId, vehicles, missions, vehicleProgress, vehicleSpeed } = useDemoStore();
  const vehicle = vehicles.find(v => v.id === selectedVehicleId);
  const mission = vehicle ? missions.find(m => m.vehicleId === vehicle.id && !['COMPLETED', 'PLANNED'].includes(m.status)) : null;
  const progress = selectedVehicleId ? vehicleProgress[selectedVehicleId] || 0 : 0;
  const speed = selectedVehicleId ? vehicleSpeed[selectedVehicleId] || 0 : 0;

  if (!vehicle) return null;

  const totalMin = vehicle.type === 'LIVESTOCK_CARRIER' ? 42 : 35;
  const eta = computeETA(progress, totalMin);
  const distRemaining = ((100 - progress) / 100 * (vehicle.type === 'LIVESTOCK_CARRIER' ? 9.4 : 9.4)).toFixed(1);
  const bridgeEta = Math.max(0, Math.round(eta * 0.6));
  const bridgeMargin = Math.max(0, 13 * 60 + 5 - (12 * 60 + (totalMin - eta)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="crisis-card rounded-2xl p-3.5 mx-2 mb-2 ring-1 ring-[#2DD4BF]/40 shadow-xl"
    >
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E05A1B] animate-ping" />
          <span className="font-mono font-black text-sm text-[#FAF8F5]">{vehicle.id} LIVE TELEMETRY</span>
        </div>
        {mission && (
          <span className="text-[10px] text-[#2DD4BF] font-mono px-2 py-0.5 rounded bg-[#0F3E2E]/60 border border-[#2DD4BF]/30 font-bold">
            MISSION {mission.id}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          { label: 'TELEMETRY SPEED', value: `${speed || 32} km/h`, highlight: false },
          { label: 'DISTANCE TO SANCTUARY', value: `${distRemaining} km`, highlight: false },
          { label: 'PICKUP ETA', value: `${Math.round(eta * 0.3)} min`, highlight: false },
          { label: 'DESTINATION ETA', value: `${eta} min`, highlight: true },
          { label: 'PAIKA BRIDGE CROSSING', value: `${bridgeEta} min`, highlight: false },
          { label: 'WATER CUTOFF DEADLINE', value: '13:05 hrs', highlight: true },
        ].map(item => (
          <div key={item.label} className="rounded-xl p-2 bg-[#0A0D14] border border-white/5">
            <div className="text-[#E2D9CE]/50 font-mono text-[9px] tracking-wider uppercase">{item.label}</div>
            <div className={`font-mono font-bold text-xs ${item.highlight ? 'text-[#D4AF37]' : 'text-[#FAF8F5]'}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Bridge Margin Indicator */}
      {progress > 0 && progress < 100 && (
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#E8F3ED]/70 flex items-center gap-1 font-medium">
            <ShieldAlert size={12} className={bridgeMargin > 15 ? 'text-[#2DD4BF]' : 'text-[#DC2626]'} />
            PAIKA BRIDGE CLEARANCE MARGIN:
          </span>
          <span
            className="font-mono font-bold text-xs px-2 py-0.5 rounded"
            style={{
              background: bridgeMargin > 20 ? 'rgba(45, 212, 191, 0.15)' : 'rgba(220, 38, 38, 0.2)',
              color: bridgeMargin > 20 ? '#2DD4BF' : '#f87171',
              border: `1px solid ${bridgeMargin > 20 ? 'rgba(45, 212, 191, 0.35)' : 'rgba(220, 38, 38, 0.4)'}`,
            }}
          >
            {bridgeMargin > 0 ? `+${bridgeMargin} MIN BUFFER (SAFE)` : 'BREACH IMMINENT'}
          </span>
        </div>
      )}
    </motion.div>
  );
};
