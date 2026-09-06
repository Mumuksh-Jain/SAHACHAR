import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, RotateCcw, Zap, AlertTriangle, Shield, Truck,
  ChevronRight, FastForward, X, Terminal, Compass
} from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { startAutoDemo, stopAutoDemo } from '../engine/demoEvents';
import { startVehicleAnimation, stopAllAnimations } from '../engine/telemetryEngine';

export const DemoControl: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const store = useDemoStore();
  const { demoStage, autoDemoRunning, autoDemoPaused, autoDemoSpeed } = store;

  const handleStartFlood = () => {
    store.triggerFloodAlert();
  };

  const handleAdvanceFlood = () => {
    store.advanceFlood();
    store.setActivePanel('access_horizon');
    store.setSelectedSettlement('S01');
  };

  const handleShowRoutes = () => {
    store.setActivePanel('route_comparison');
    store.setSelectedSettlement('S01');
  };

  const handleVehicleCheck = () => {
    store.setActivePanel('vehicle_inspector');
    store.setSelectedVehicle('T07');
  };

  const handleGeneratePlan = () => {
    store.generatePlanV1();
  };

  const handleApprove = () => {
    if (store.demoStage === 'PLAN_V2' || store.activePlanVersion === 'V2') {
      store.approvePlanV2();
    } else {
      store.setActivePanel('approval');
      setTimeout(() => {
        store.approvePlanV1();
        store.reserveVehicles();
      }, 800);
    }
  };

  const handleStartEvacuation = () => {
    store.startEvacuation();
    setTimeout(() => {
      startVehicleAnimation('T07', 'R3', 55000, () => {
        store.t07ArriveCamp();
        setTimeout(() => store.t07Release(), 6000);
      });
      startVehicleAnimation('B04', 'R3', 45000);
    }, 500);
  };

  const handleT07Pickup = () => {
    store.t07ArrivePickup();
  };

  const handleT07Depart = () => {
    store.t07DepartLoaded();
  };

  const handleT07Bridge = () => {
    store.t07PassCriticalEdge();
  };

  const handleT07Arrive = () => {
    store.t07ArriveCamp();
    setTimeout(() => store.t07Release(), 3000);
  };

  const handleTriggerRoadFailure = () => {
    store.blockEC2();
    setTimeout(() => store.generatePlanV2(), 500);
  };

  const handleFailT09 = () => {
    store.failT09();
    setTimeout(() => store.showResourceGap(), 1000);
  };

  const handleEscalate = () => {
    store.createEscalation();
  };

  const handleAllocateT11 = () => {
    store.allocateT11();
  };

  const handleComplete = () => {
    store.completeDemo();
    stopAllAnimations();
  };

  const handleReset = () => {
    stopAutoDemo();
    stopAllAnimations();
    store.resetDemo();
  };

  const handleAutoDemo = () => {
    if (autoDemoRunning) {
      if (autoDemoPaused) {
        store.resumeAutoDemo();
      } else {
        store.pauseAutoDemo();
      }
    } else {
      startAutoDemo(autoDemoSpeed);
      setTimeout(() => {
        const speed = autoDemoSpeed;
        startVehicleAnimation('T07', 'R3', 55000 / speed);
        startVehicleAnimation('B04', 'R3', 45000 / speed);
      }, 57000 / autoDemoSpeed);
    }
  };

  const demoButtons = [
    { label: '⚡ SYSTEM BOOT SEQUENCE', icon: Zap, onClick: () => store.triggerBoot(), color: '#D4AF37', always: true },
    { label: 'RESET TO BASELINE', icon: RotateCcw, onClick: handleReset, color: '#94a3b8', always: true },
    { label: 'TRIGGER FLOOD SURGE', icon: AlertTriangle, onClick: handleStartFlood, color: '#DC2626', stages: ['NORMAL'] },
    { label: 'ADVANCE RIVER ELEVATION', icon: Zap, onClick: handleAdvanceFlood, color: '#D97706', stages: ['FLOOD_ALERT', 'ANALYZING'] },
    { label: 'COMPARE R1 VS R3', icon: ChevronRight, onClick: handleShowRoutes, color: '#0284C7', stages: ['FLOOD_ALERT', 'ANALYZING'] },
    { label: 'INSPECT T07 RAMP TRUCK', icon: Truck, onClick: handleVehicleCheck, color: '#c084fc', stages: ['FLOOD_ALERT', 'ANALYZING'] },
    { label: 'GENERATE PLAN V1', icon: Play, onClick: handleGeneratePlan, color: '#0284C7', stages: ['FLOOD_ALERT', 'ANALYZING', 'PLAN_READY'] },
    { label: 'DISTRICT APPROVAL', icon: Shield, onClick: handleApprove, color: '#16A34A', stages: ['PLAN_READY', 'PLAN_V2'] },
    { label: 'DISPATCH CONVOYS', icon: Play, onClick: handleStartEvacuation, color: '#0284C7', stages: ['APPROVED', 'DISPATCHED'] },
    { label: 'T07 → AT PICKUP', icon: Truck, onClick: handleT07Pickup, color: '#D97706', stages: ['EVACUATING'] },
    { label: 'T07 → DEPART LOADED', icon: Truck, onClick: handleT07Depart, color: '#D97706', stages: ['EVACUATING'] },
    { label: 'T07 → PAIKA BRIDGE CROSSED', icon: ChevronRight, onClick: handleT07Bridge, color: '#16A34A', stages: ['EVACUATING'] },
    { label: 'T07 → SAFE AT CAMP C1', icon: ChevronRight, onClick: handleT07Arrive, color: '#16A34A', stages: ['EVACUATING'] },
    { label: 'PAIKA BRIDGE 4 BREACH', icon: AlertTriangle, onClick: handleTriggerRoadFailure, color: '#DC2626', stages: ['EVACUATING', 'EVACUATING_V2'] },
    { label: 'SIMULATE T09 BREAKDOWN', icon: X, onClick: handleFailT09, color: '#DC2626', stages: ['EVACUATING', 'PLAN_V2', 'EVACUATING_V2'] },
    { label: 'REQUEST DISTRICT CARRIER', icon: Zap, onClick: handleEscalate, color: '#c084fc', stages: ['RESOURCE_GAP'] },
    { label: 'ALLOCATE T11 TO TARAPUR', icon: Truck, onClick: handleAllocateT11, color: '#16A34A', stages: ['ESCALATION'] },
    { label: 'ALL CITIZENS IN SANCTUARY', icon: Shield, onClick: handleComplete, color: '#16A34A', stages: ['EVACUATING', 'EVACUATING_V2', 'ESCALATION'] },
  ];

  const visibleButtons = demoButtons.filter(b =>
    b.always || (b.stages && b.stages.includes(demoStage))
  );

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-black tracking-wider cursor-pointer transition-all"
        style={{
          background: isOpen ? '#121620' : 'linear-gradient(135deg, #18202F 0%, #121620 100%)',
          border: `1.5px solid ${isOpen ? 'rgba(220, 195, 165, 0.3)' : '#D4AF37'}`,
          color: isOpen ? '#E2D9CE' : '#FAF8F5',
          boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.8)' : '0 0 30px rgba(212, 175, 55, 0.35)',
        }}
      >
        <Terminal size={14} className={isOpen ? 'text-[#E2D9CE]' : 'text-[#D4AF37]'} />
        {isOpen ? 'CLOSE CONSOLE' : 'COMMAND CONSOLE'}
      </motion.button>

      {/* Demo Control Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-16 right-5 z-50 rounded-2xl p-4 w-80 crisis-card shadow-[0_16px_50px_rgba(0,0,0,0.8)] border border-[#D4AF37]/30"
            style={{
              background: '#0D1117',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div>
                <div className="text-xs font-mono font-bold text-[#D4AF37] tracking-widest uppercase">
                  INCIDENT DEMO COMMAND
                </div>
                <div className="text-[10px] text-[#E2D9CE]/60 font-mono mt-0.5">
                  STAGE: {demoStage.replace(/_/g, ' ')}
                </div>
              </div>
              <div>
                <select
                  value={autoDemoSpeed}
                  onChange={(e) => store.setAutoDemoSpeed(Number(e.target.value) as 1 | 2 | 4)}
                  className="text-xs px-2 py-1 rounded-lg bg-[#121620] border border-white/10 text-[#FAF8F5] font-mono"
                >
                  <option value={1}>1× Real</option>
                  <option value={2}>2× Fast</option>
                  <option value={4}>4× High</option>
                </select>
              </div>
            </div>

            {/* Auto Demo Master Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAutoDemo}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl mb-3 font-mono font-bold text-xs uppercase tracking-wider transition-all"
              style={{
                background: autoDemoRunning && !autoDemoPaused
                  ? 'linear-gradient(135deg, #D97706, #B45309)'
                  : 'linear-gradient(135deg, #0284C7, #0369A1)',
                color: '#FAF8F5',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              }}
            >
              {autoDemoRunning && !autoDemoPaused ? (
                <><Pause size={14} /> PAUSE AUTONOMOUS WORKFLOW</>
              ) : autoDemoRunning && autoDemoPaused ? (
                <><Play size={14} /> RESUME AUTONOMOUS WORKFLOW</>
              ) : (
                <><FastForward size={14} /> ▶ PLAY FULL END-TO-END DEMO</>
              )}
            </motion.button>

            {/* Manual Event Triggers */}
            <div className="text-[10px] font-mono font-bold text-[#E2D9CE]/50 tracking-wider uppercase mb-2">
              TACTICAL STAGE INJECTIONS
            </div>
            <div className="flex flex-col gap-1.5">
              {visibleButtons.map((btn) => {
                const Icon = btn.icon;
                return (
                  <motion.button
                    key={btn.label}
                    whileTap={{ scale: 0.98 }}
                    onClick={btn.onClick}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-left text-xs font-mono font-bold transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${btn.color}40`,
                      color: btn.color,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = `${btn.color}15`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <Icon size={13} className="flex-shrink-0" />
                    <span className="truncate">{btn.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
