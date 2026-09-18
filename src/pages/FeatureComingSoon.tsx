import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Cpu, Radio, Activity, Lock, AlertTriangle } from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { SahacharLogo } from '../components/SahacharLogo';

export const FeatureComingSoon: React.FC = () => {
  const { appView, setAppView } = useDemoStore();

  const getSurfaceInfo = () => {
    switch (appView) {
      case 'mission_control':
        return {
          title: 'SEOC Mission Control Radar',
          code: 'RADAR-SURFACE-01',
          desc: 'High-resolution MapLibre GL 60Hz vector basemap, real-time hydrological river sensor hydrographs, and Google OR-Tools CP-SAT multi-objective dispatch engine.',
          tag: 'Command Surface',
        };
      case 'driver':
        return {
          title: 'Driver Telemetry Cockpit (T-07)',
          code: 'TACTICAL-HUD-T07',
          desc: 'Vehicle telemetry HUD with dynamic Paika Bridge submergence alarms, edge clearance countdown timers, and offline turn-by-turn routing.',
          tag: 'Fleet Telemetry',
        };
      case 'citizen':
        return {
          title: 'Citizen SOS Assurance Pass (H-27)',
          code: 'TWIN-TOKEN-H27',
          desc: 'Bilingual (Odia/English) evacuation pass linking human passenger allocation with paired cattle transport at designated Go-Sadan animal sanctuaries.',
          tag: 'Citizen Service',
        };
      case 'field':
        return {
          title: 'Field Marshal Intake Audit (EC-2)',
          code: 'FIELD-CHECKPOINT-EC2',
          desc: 'Offline QR barcode intake verification, shelter bed tallying, and peer-to-peer LoRa radio synchronization without cloud dependence.',
          tag: 'Field Operations',
        };
      default:
        return {
          title: 'Operational Command Surface',
          code: 'SURFACE-RESTRICTED',
          desc: 'This operational module is undergoing deployment and integration testing.',
          tag: 'Tactical Service',
        };
    }
  };

  const info = getSurfaceInfo();

  return (
    <div className="min-h-screen w-full bg-[#070D18] text-slate-100 flex flex-col font-sans relative overflow-hidden selection:bg-[#E05A1B] selection:text-white">
      {/* Tactical Glow Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#1E3A8A]/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#E05A1B]/15 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/90 bg-[#070D18]/95 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <SahacharLogo clickable={true} />

        <button
          onClick={() => setAppView('landing')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-200 bg-[#0D1929] hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer hover:text-white"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO PORTAL</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0B1728] via-[#0F1E2E] to-[#08101C] border border-slate-700/80 shadow-[0_20px_70px_rgba(0,0,0,0.7)] text-center relative overflow-hidden"
        >
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1929] border border-[#2DD4BF]/40 text-[#2DD4BF] text-xs font-mono font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-ping" />
            <span>OPERATIONAL DEPLOYMENT • {info.code}</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E05A1B] via-[#EA580C] to-[#F97316] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-orange-950/60">
            <Shield size={32} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-black text-white mb-3">
            {info.title}
          </h1>

          <div className="text-sm font-mono text-[#E05A1B] font-bold tracking-wider uppercase mb-4">
            FEATURE UNDER ACTIVE DEPLOYMENT
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {info.desc}
          </p>

          {/* Tactical Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left mb-8 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-[#070D18] border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
                <Cpu size={12} className="text-[#2DD4BF]" />
                SOLVER ENGINE
              </div>
              <div className="text-white font-bold">OR-Tools CP-SAT</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Private Deployment</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070D18] border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
                <Radio size={12} className="text-[#2DD4BF]" />
                TELEMETRY MESH
              </div>
              <div className="text-white font-bold">LoRa 868MHz P2P</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Hardware Ingestion</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070D18] border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1.5 mb-1">
                <Lock size={12} className="text-[#E05A1B]" />
                SECURITY
              </div>
              <div className="text-white font-bold">HMAC-SHA256</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Offline Verified</div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setAppView('landing')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] via-[#EA580C] to-[#F97316] hover:from-[#d04f14] hover:to-[#ea580c] shadow-lg shadow-orange-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={14} />
              <span>RETURN TO LANDING PAGE</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
