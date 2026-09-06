import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { DemoStage } from '../data/scenario';

const stages = [
  { id: 1, label: 'SURGE ALERT', stages: ['FLOOD_ALERT'] },
  { id: 2, label: 'IMPACT', stages: ['ANALYZING'] },
  { id: 3, label: 'ACCESS CUTOFF', stages: ['PLAN_READY'] },
  { id: 4, label: 'RESCUE PLAN', stages: ['PLAN_READY'] },
  { id: 5, label: 'AUTHORIZE', stages: ['APPROVED'] },
  { id: 6, label: 'DISPATCH', stages: ['DISPATCHED'] },
  { id: 7, label: 'IN TRANSIT', stages: ['EVACUATING', 'DISRUPTION', 'REPLANNING', 'PLAN_V2', 'EVACUATING_V2'] },
  { id: 8, label: 'ARRIVAL', stages: ['EVACUATING', 'EVACUATING_V2'] },
  { id: 9, label: 'REROUTE', stages: ['DISRUPTION', 'REPLANNING', 'PLAN_V2', 'RESOURCE_GAP', 'ESCALATION'] },
  { id: 10, label: 'SANCTUARY', stages: ['COMPLETED'] },
];

const stageOrder: DemoStage[] = [
  'NORMAL', 'FLOOD_ALERT', 'ANALYZING', 'PLAN_READY', 'APPROVED',
  'DISPATCHED', 'EVACUATING', 'DISRUPTION', 'REPLANNING',
  'PLAN_V2', 'RESOURCE_GAP', 'ESCALATION', 'EVACUATING_V2', 'COMPLETED'
];

const getStageIndex = (stage: DemoStage) => stageOrder.indexOf(stage);

const getStageStatus = (stageNum: number, currentStage: DemoStage): 'done' | 'active' | 'pending' | 'disrupted' => {
  const currentIdx = getStageIndex(currentStage);

  if (currentStage === 'DISRUPTION' && stageNum === 9) return 'active';
  if (currentStage === 'REPLANNING' && stageNum === 9) return 'active';
  if (currentStage === 'PLAN_V2' && stageNum === 9) return 'active';

  const thresholds: Record<number, number> = {
    1: 1,   // FLOOD_ALERT
    2: 2,   // ANALYZING
    3: 3,   // PLAN_READY
    4: 3,   // PLAN_READY
    5: 4,   // APPROVED
    6: 5,   // DISPATCHED
    7: 6,   // EVACUATING
    8: 6,   // EVACUATING
    9: 7,   // DISRUPTION
    10: 13, // COMPLETED
  };

  const threshold = thresholds[stageNum] ?? 99;
  if (currentIdx > threshold) return 'done';
  if (currentIdx === threshold || (currentIdx >= threshold - 1 && stageNum === 7 && currentIdx >= 6)) {
    if (stageNum === 7 && ['DISRUPTION', 'REPLANNING', 'PLAN_V2'].includes(currentStage)) return 'done';
    return 'active';
  }
  return 'pending';
};

export const ExecutionSpine: React.FC = () => {
  const demoStage = useDemoStore(s => s.demoStage);
  const isDisrupted = ['DISRUPTION', 'REPLANNING'].includes(demoStage);

  return (
    <div className="relative flex items-center gap-0 px-6 py-2.5 shadow-lg z-10 backdrop-blur-md"
      style={{
        borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
        background: 'rgba(11, 19, 43, 0.98)'
      }}>
      {/* Breach Disruption Alert banner */}
      <AnimatePresence>
        {isDisrupted && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-4 flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-mono font-black bg-red-950/90 border border-red-500 text-red-200 shadow-[0_0_20px_rgba(220,38,38,0.6)] z-20"
          >
            <AlertTriangle size={14} className="animate-pulse text-red-400" />
            <span>PAIKA BRIDGE 4 BREACHED • ADAPTIVE REROUTE ACTIVE</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-0 flex-1 justify-center">
        {stages.map((stage, idx) => {
          const status = getStageStatus(stage.id, demoStage);
          const isReplan = stage.id === 9;

          return (
            <React.Fragment key={stage.id}>
              {/* Connector line */}
              {idx > 0 && (
                <div
                  className="h-[2px] w-6 lg:w-9 flex-shrink-0 transition-all duration-500"
                  style={{
                    background: status === 'done' || (idx > 0 && getStageStatus(stages[idx - 1].id, demoStage) === 'done')
                      ? 'linear-gradient(90deg, #0284C7, #38BDF8)'
                      : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: status === 'done' ? '0 0 8px rgba(56, 189, 248, 0.5)' : 'none'
                  }}
                />
              )}

              {/* Stage bubble */}
              <motion.div
                className="flex flex-col items-center gap-1 flex-shrink-0"
                animate={status === 'active' ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-500 relative"
                  style={{
                    width: status === 'active' ? 30 : 24,
                    height: status === 'active' ? 30 : 24,
                    background:
                      status === 'done' ? 'rgba(56, 189, 248, 0.22)' :
                        status === 'active' ? (isReplan && isDisrupted ? 'rgba(220, 38, 38, 0.35)' : 'rgba(224, 90, 27, 0.35)') :
                          'rgba(15, 23, 42, 0.85)',
                    border: `1.5px solid ${status === 'done' ? '#38BDF8' :
                      status === 'active' ? (isReplan && isDisrupted ? '#ef4444' : '#E05A1B') :
                        'rgba(255, 255, 255, 0.12)'}`,
                    boxShadow: status === 'active' ?
                      (isReplan && isDisrupted ? '0 0 16px rgba(220,38,38,0.7)' : '0 0 16px rgba(224,90,27,0.7)') :
                      status === 'done' ? '0 0 8px rgba(56,189,248,0.3)' : 'none',
                  }}
                >
                  {status === 'done' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <CheckCircle size={13} color="#2DD4BF" />
                    </motion.div>
                  ) : status === 'active' && isReplan && isDisrupted ? (
                    <RotateCcw size={12} color="#ef4444" className="animate-spin" style={{ animationDuration: '2s' }} />
                  ) : (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: status === 'active' ? '#FFFFFF' : '#94A3B8',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {stage.id}
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.07em',
                  color:
                    status === 'done' ? '#2DD4BF' :
                      status === 'active' ? (isReplan && isDisrupted ? '#f87171' : '#E05A1B') :
                        '#64748b',
                  transition: 'color 0.3s',
                  textShadow: status === 'active' ? '0 0 10px rgba(224,90,27,0.5)' : 'none'
                }}>
                  {stage.label}
                </span>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Stage status indicator badge */}
      <div className="absolute right-4 hidden md:flex items-center gap-2">
        <motion.div
          key={demoStage}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-xl shadow-md"
          style={{
            background: demoStage === 'NORMAL' ? 'rgba(100, 116, 139, 0.15)' :
              demoStage === 'COMPLETED' ? 'rgba(15, 62, 46, 0.8)' :
                demoStage === 'DISRUPTION' || demoStage === 'RESOURCE_GAP' ? 'rgba(220, 38, 38, 0.25)' :
                  'rgba(224, 90, 27, 0.25)',
            color: demoStage === 'NORMAL' ? '#94a3b8' :
              demoStage === 'COMPLETED' ? '#2DD4BF' :
                demoStage === 'DISRUPTION' || demoStage === 'RESOURCE_GAP' ? '#fca5a5' :
                  '#E05A1B',
            border: `1px solid ${demoStage === 'NORMAL' ? 'rgba(255,255,255,0.1)' :
              demoStage === 'COMPLETED' ? 'rgba(45, 212, 191, 0.5)' :
                demoStage === 'DISRUPTION' || demoStage === 'RESOURCE_GAP' ? 'rgba(220, 38, 38, 0.5)' :
                  'rgba(224, 90, 27, 0.5)'}`,
          }}
        >
          {demoStage === 'NORMAL' ? 'STANDBY MONITORING' : demoStage.replace(/_/g, ' ')}
        </motion.div>
      </div>
    </div>
  );
};

