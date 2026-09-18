import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, Shield, HeartHandshake, AlertCircle, ArrowRight, Zap, X } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';

export const CPSATSolverModal: React.FC = () => {
  const { activeSolverModal, setActiveSolverModal, generatePlanV1, setActivePanel } = useDemoStore();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!activeSolverModal) {
      setStep(1);
      return;
    }

    const t1 = setTimeout(() => setStep(2), 700);
    const t2 = setTimeout(() => setStep(3), 1500);
    const t3 = setTimeout(() => setStep(4), 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeSolverModal]);

  if (!activeSolverModal) return null;

  const objectives = [
    {
      level: 'OBJECTIVE 1',
      title: 'Vulnerable Humans Priority',
      desc: 'Expectant mothers, infants, and bedridden elders geocoded with ASHA cadres given initial departure slots.',
      score: '100% SATISFIED',
      activeStep: 1,
      color: '#2DD4BF',
      icon: Shield,
    },
    {
      level: 'OBJECTIVE 2',
      title: 'Assisted Human Transit',
      desc: 'Direct passenger buses (B04, B06) linked to destination cyclone shelters with zero transfers.',
      score: '428 / 428 PAX ALLOCATED',
      activeStep: 2,
      color: '#38BDF8',
      icon: CheckCircle2,
    },
    {
      level: 'OBJECTIVE 3',
      title: 'Safety Margin Maximization',
      desc: 'Dijkstra route elevation comparison: avoids Paika culvert R1, routes via elevated embankment R3.',
      score: '+38.5 MIN BUFFER BEFORE CUTOFF',
      activeStep: 3,
      color: '#E05A1B',
      icon: Zap,
    },
    {
      level: 'OBJECTIVE 4',
      title: 'Decoupled Livestock Protection',
      desc: 'Specialized ramp transporters (T07) synchronized with cattle ear-tags and Go-Sadan pens.',
      score: '194 / 194 LIVESTOCK SECURED',
      activeStep: 4,
      color: '#4ADE80',
      icon: HeartHandshake,
    },
  ];

  const handleConfirmPlan = () => {
    generatePlanV1();
    setActiveSolverModal(false);
    setActivePanel('approval');
  };

  return (
    <div className="fixed inset-0 z-[9995] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0D1929] via-[#0B1524] to-[#070D18] border-2 border-[#E05A1B] shadow-[0_20px_70px_rgba(224,90,27,0.4)] text-white relative overflow-hidden"
      >
        {/* Corner Reticle */}
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={() => setActiveSolverModal(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E05A1B] to-[#EA580C] flex items-center justify-center text-white shadow-lg shadow-orange-950/50 shrink-0">
            <Cpu size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2DD4BF] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-pulse" />
              GOOGLE OR-TOOLS CP-SAT SOLVER • NETWORKX GRAPH
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
              Lexicographic Constraint Optimization Engine
            </h3>
          </div>
        </div>

        {/* Solver Telemetry Matrix */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#070D18] border border-slate-700/80">
            <div className="text-[10px] text-slate-400">DECISION VARS</div>
            <div className="text-white font-bold text-sm">1,420 Booleans</div>
          </div>
          <div className="p-3 rounded-xl bg-[#070D18] border border-slate-700/80">
            <div className="text-[10px] text-slate-400">HARD BOUNDS</div>
            <div className="text-[#2DD4BF] font-bold text-sm">3,892 Constraints</div>
          </div>
          <div className="p-3 rounded-xl bg-[#070D18] border border-slate-700/80">
            <div className="text-[10px] text-slate-400">GRAPH NODES</div>
            <div className="text-emerald-400 font-bold text-sm">24 Road Edges</div>
          </div>
          <div className="p-3 rounded-xl bg-[#070D18] border border-slate-700/80">
            <div className="text-[10px] text-slate-400">SOLVER LATENCY</div>
            <div className="text-[#F97316] font-bold text-sm">38ms Optimal</div>
          </div>
        </div>

        {/* 4-Tier Lexicographic Objective Stack */}
        <div className="space-y-3 mb-6">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            const isResolved = step >= obj.activeStep;
            return (
              <motion.div
                key={obj.level}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: isResolved ? 1 : 0.4 }}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isResolved
                    ? 'bg-[#070D18] border-slate-600 shadow-md'
                    : 'bg-[#050A12]/40 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-black"
                    style={{
                      background: isResolved ? `${obj.color}20` : '#1E293B',
                      color: isResolved ? obj.color : '#64748B',
                      border: `1px solid ${isResolved ? obj.color : '#334155'}`,
                    }}
                  >
                    0{i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {obj.title}
                      </h4>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {obj.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-tight max-w-md">
                      {obj.desc}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs">
                  {isResolved ? (
                    <div className="flex items-center gap-1 font-bold" style={{ color: obj.color }}>
                      <CheckCircle2 size={13} />
                      <span>{obj.score}</span>
                    </div>
                  ) : (
                    <div className="text-slate-500 flex items-center gap-1 text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
                      <span>Evaluating...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">
            STATUS: <strong className="text-emerald-400">CP-SAT FEASIBLE & PARETO-OPTIMAL</strong>
          </div>

          <button
            onClick={handleConfirmPlan}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] via-[#EA580C] to-[#F97316] hover:from-[#d04f14] hover:to-[#ea580c] shadow-lg shadow-orange-950/50 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <span>INSPECT & AUTHORIZE PLAN V1</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
