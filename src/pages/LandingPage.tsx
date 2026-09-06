import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Truck,
  Users,
  Radio,
  Navigation,
  ArrowRight,
  Play,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  Activity,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
  ExternalLink,
  MapPin,
  Cpu,
  Compass,
  PhoneCall,
  Zap,
} from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { SahacharLogo } from '../components/SahacharLogo';

export const LandingPage: React.FC = () => {
  const { setAppView, triggerBoot } = useDemoStore();
  const [activeTab, setActiveTab] = useState<'mission_control' | 'driver' | 'citizen' | 'field'>('mission_control');

  return (
    <div className="min-h-screen w-full bg-[#07140E] text-slate-100 flex flex-col selection:bg-[#E05A1B] selection:text-white relative overflow-x-hidden font-sans">
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-[#0F3E2E]/35 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-[#E05A1B]/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#2DD4BF]/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#164E3D_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      {/* ── TOPBAR NAVIGATION ── */}
      <header className="sticky top-0 z-50 w-full border-b border-[#164E3D]/50 bg-[#0B1F16]/90 backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <SahacharLogo clickable={false} />
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F3E2E]/80 border border-[#2DD4BF]/30 text-[11px] font-mono text-[#E8F3ED]">
            <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-pulse" />
            SMART INDIA HACKATHON 2025 • DISASTER ENGINE ACTIVE
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => triggerBoot()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            title="Replay System Boot Sequence"
          >
            <RefreshCw size={13} />
            <span className="hidden sm:inline">REPLAY BOOT</span>
          </button>

          <button
            onClick={() => setAppView('mission_control')}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs font-mono font-black tracking-wider uppercase text-white bg-gradient-to-r from-[#E05A1B] via-[#EA580C] to-[#F97316] hover:from-[#EA580C] hover:to-[#F97316] shadow-[0_4px_25px_rgba(224,90,27,0.45)] transition-all cursor-pointer border border-[#F97316]/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play size={14} fill="currentColor" />
            <span>LAUNCH RADAR</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT BODY ── */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-14">
        
        {/* ── HERO SECTION ── */}
        <section className="relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#0F3E2E]/60 via-[#0B1F16]/90 to-[#07140E] border border-[#164E3D] shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Subtle watermark background emblem */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full border-[20px] border-white/[0.02] pointer-events-none select-none flex items-center justify-center">
            <span className="text-8xl font-black text-white/[0.02]">DRR</span>
          </div>

          <div className="relative z-10 max-w-4xl">
            {/* Tag / Category */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F3E2E] border border-[#2DD4BF]/40 text-[#E8F3ED] text-xs font-mono font-bold mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-pulse" />
              ODISHA STATE DISASTER MANAGEMENT CORRIDOR • TIRTOL BASIN
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.1] mb-5">
              No Family Left Behind. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E05A1B] via-[#F97316] to-[#FDBA74]">
                No Cattle Abandoned.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mb-8 font-sans">
              <strong className="text-white">SAHACHAR-DRR</strong> bridges the fatal gap between early disaster warnings and executable ground action. By synchronizing family transport with specialized livestock rescue carriers and real-time offline route routing, we eliminate evacuation refusal at the last mile.
            </p>

            {/* Humanitarian Manifesto Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#07140E]/80 border-l-4 border-l-[#E05A1B] border-y border-r border-[#164E3D]/60 mb-8 max-w-2xl shadow-inner">
              <p className="italic text-sm sm:text-base text-slate-200 font-serif leading-relaxed">
                &ldquo;No rural family should have to choose between immediate personal safety and their future survival.&rdquo;
              </p>
              <div className="text-[11px] font-mono text-[#E05A1B] font-bold mt-1.5 tracking-wider uppercase">
                — SAHACHAR Humanitarian Charter • SIH 2025
              </div>
            </div>

            {/* Primary Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                onClick={() => setAppView('mission_control')}
                className="flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl font-mono font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] via-[#EA580C] to-[#F97316] hover:from-[#EA580C] hover:to-[#F97316] shadow-[0_0_30px_rgba(224,90,27,0.5)] border border-[#F97316]/60 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Play size={16} fill="currentColor" />
                <span>ENTER MISSION CONTROL RADAR</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setAppView('driver')}
                className="flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-[#E8F3ED] bg-[#0F3E2E]/80 hover:bg-[#0F3E2E] border border-[#2DD4BF]/40 hover:border-[#2DD4BF] transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              >
                <Truck size={16} className="text-[#2DD4BF]" />
                <span>DRIVER TELEMETRY (T07)</span>
              </button>

              <button
                onClick={() => setAppView('citizen')}
                className="flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Users size={16} className="text-[#E05A1B]" />
                <span>CITIZEN SOS (H27)</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── LIVE IMPACT METRICS STRIP ── */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { label: 'CITIZENS TRACKED', value: '428 / 428', note: '100% Evacuation Quota', icon: Users, color: '#2DD4BF' },
            { label: 'LIVESTOCK SECURED', value: '194 / 194', note: 'Zero Cattle Abandoned', icon: HeartHandshake, color: '#E05A1B' },
            { label: 'PANCHAYATS COVERED', value: '12 GPs', note: 'Tirtol & Paika Delta', icon: MapPin, color: '#2DD4BF' },
            { label: 'TELEMETRY GAUGES', value: '14 ONLINE', note: 'Real-time River Levels', icon: Activity, color: '#2DD4BF' },
            { label: 'CASUALTY RATE', value: '0 ZERO', note: 'Zero Family Separation', icon: Shield, color: '#4ADE80' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-4 bg-[#0B1F16]/80 border border-[#164E3D]/70 backdrop-blur-md flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400">
                    {stat.label}
                  </span>
                  <Icon size={15} style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-mono font-black text-white" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-sans text-slate-300 mt-0.5">
                    {stat.note}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── THE RURAL EVACUATION DILEMMA (WHY TRADITIONAL WARNINGS FAIL) ── */}
        <section className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#0B1F16]/60 border border-[#164E3D] shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-mono font-bold text-[#E05A1B] tracking-widest uppercase mb-1">
              THE REAL-WORLD PROBLEM
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Why Traditional Evacuations Fail in Coastal Odisha
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Disaster Management authorities broadcast warning alerts, but villagers frequently ignore orders until it is too late. The reasons are rooted in economic survival and geography:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dilemma 1 */}
            <div className="rounded-2xl p-5 bg-[#07140E] border border-red-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 font-bold mb-4">
                  01
                </div>
                <h3 className="font-bold text-white text-base mb-2">The Abandonment Paradox</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For smallholder farmers, dairy cows and oxen represent their lifetime savings and generational livelihood. When rescue teams refuse animals, over <strong className="text-red-400">84% of families refuse to evacuate</strong>, choosing to stay in flooded huts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#E05A1B] font-semibold">
                SAHACHAR Fix: Twin-Token Livestock Ramp Trucks (T07)
              </div>
            </div>

            {/* Dilemma 2 */}
            <div className="rounded-2xl p-5 bg-[#07140E] border border-amber-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold mb-4">
                  02
                </div>
                <h3 className="font-bold text-white text-base mb-2">The Shortcut Cutoff Trap</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Standard GPS apps route convoys along the shortest road (Route R1). But river siphon culverts submerge hours before peak flood, leaving loaded buses trapped in flash floodwaters without turning space.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#2DD4BF] font-semibold">
                SAHACHAR Fix: Predictive Access Horizon & Dijkstra Rerouting
              </div>
            </div>

            {/* Dilemma 3 */}
            <div className="rounded-2xl p-5 bg-[#07140E] border border-[#2DD4BF]/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0F3E2E] border border-[#2DD4BF]/40 flex items-center justify-center text-[#2DD4BF] font-bold mb-4">
                  03
                </div>
                <h3 className="font-bold text-white text-base mb-2">The Information Void</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When telecom towers drown, generic siren alarms cause blind panic. Citizens have no proof that shelter beds are available, or where their animals are being held, leading to chaotic crowd crushes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#E8F3ED] font-semibold">
                SAHACHAR Fix: Offline LoRa Mesh & Bilingual Reassurance SMS
              </div>
            </div>
          </div>
        </section>

        {/* ── THE 4 PILLARS OF SAHACHAR-DRR (MATCHING BANNER THEME) ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0D241C] via-[#091812] to-[#07140E] border border-[#164E3D] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#164E3D]/60 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E05A1B] tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#E05A1B]" />
                ARCHITECTURAL FOUNDATION
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-1">
                The Four Pillars of Rural Resilience
              </h2>
            </div>
            <div className="text-xs font-mono text-[#2DD4BF]">
              BUILT FOR SMART INDIA HACKATHON 2025
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="rounded-2xl p-5 bg-[#0A1A14] border border-[#164E3D] hover:border-[#2DD4BF]/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0F3E2E] border border-[#2DD4BF]/40 flex items-center justify-center text-2xl mb-4 shadow-md">
                  👥
                </div>
                <h3 className="font-bold text-white text-lg mb-1">People Safety</h3>
                <div className="text-[11px] font-mono text-[#2DD4BF] font-semibold mb-2">Vulnerable Cohort First</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Expectant mothers, infants, and bedridden elders are geocoded with ASHA frontline cadres. Dedicated passenger buses (B04) ensure expedited direct transit to multi-purpose cyclone shelters.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-400">
                • Zero evacuation stampedes • Medical kit onboard
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl p-5 bg-[#0A1A14] border border-[#164E3D] hover:border-[#E05A1B]/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1A3D2D] border border-[#E05A1B]/40 flex items-center justify-center text-2xl mb-4 shadow-md">
                  🐄
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Livelihood Protection</h3>
                <div className="text-[11px] font-mono text-[#E05A1B] font-semibold mb-2">Go-Sadan Cattle Sanctuaries</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Specialized ramp trailers (Truck T07) accommodate cattle alongside human convoys. Animals are transferred directly to elevated Go-Sadans stocked with dry fodder, water, and veterinary doctors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-400">
                • 194 Cattle safely sheltered • No farmer debt cycle
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl p-5 bg-[#0A1A14] border border-[#164E3D] hover:border-[#2DD4BF]/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0F3E2E] border border-[#2DD4BF]/40 flex items-center justify-center text-2xl mb-4 shadow-md">
                  🛣️
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Smarter Response</h3>
                <div className="text-[11px] font-mono text-[#2DD4BF] font-semibold mb-2">Predictive Graph Solver</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our offline Dijkstra graph engine calculates elevation margins on every road segment. When Paika Bridge approaches its 13:05 cutoff, the system dynamically reroutes convoys to elevated Route R3.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-400">
                • 38 min safety margin • 0ms server latency
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-2xl p-5 bg-[#0A1A14] border border-[#164E3D] hover:border-[#E05A1B]/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#3D1E10] border border-[#E05A1B]/50 flex items-center justify-center text-2xl mb-4 shadow-md">
                  🛡️
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Stronger Communities</h3>
                <div className="text-[11px] font-mono text-[#E05A1B] font-semibold mb-2">Twin Token Assurance (H27)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every rural family receives a matching physical and SMS token (H27). It locks their passenger seat with their animal carrier, guaranteeing they will be reunited at the destination haven.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-400">
                • Bilingual Odia/English • Trust-verified protocol
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE MULTI-SYSTEM SANDBOX / PORTAL SWITCHER ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0B1F16]/90 border border-[#164E3D] shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#E05A1B] tracking-widest uppercase">
                INTERACTIVE SYSTEM ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
                Explore the 4 Operational Viewports
              </h2>
            </div>

            {/* Tab buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#07140E] border border-[#164E3D]/70">
              {[
                { id: 'mission_control', label: 'EOC RADAR', icon: Shield },
                { id: 'driver', label: 'DRIVER TELEMETRY', icon: Truck },
                { id: 'citizen', label: 'CITIZEN SOS (H27)', icon: Users },
                { id: 'field', label: 'FIELD AUDIT (EC2)', icon: Radio },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#E05A1B] text-white shadow-md border border-[#F97316]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={13} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Display Card */}
          <div className="rounded-2xl p-6 bg-[#07140E] border border-[#164E3D] flex flex-col lg:flex-row items-center justify-between gap-8">
            {activeTab === 'mission_control' && (
              <>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0F3E2E] text-[#2DD4BF] text-xs font-mono font-bold mb-3 border border-[#2DD4BF]/30">
                    CENTRAL INCIDENT COMMAND
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Mission Control GIS Radar & Execution Spine
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Real-time operational dashboard for Emergency Operation Centers (EOC). Features live MapLibre GIS mapping, Paika River flood stage gauges, dynamic Dijkstra access horizons, vehicle telemetry beacons, and automated district reserve carrier requisitions.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono mb-6">
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">GIS ENGINE</div>
                      <div className="font-bold text-[#2DD4BF]">MapLibre Vector</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">GRAPH SOLVER</div>
                      <div className="font-bold text-[#E05A1B]">Offline Dijkstra</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">LATENCY</div>
                      <div className="font-bold text-white">&lt; 12ms Local</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppView('mission_control')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-lg border border-[#F97316]/50 cursor-pointer"
                  >
                    <span>LAUNCH FULL MISSION CONTROL</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0B1F16] border border-[#164E3D] font-mono text-xs shadow-inner">
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-2 border-b border-white/5 pb-1">
                    RADAR TELEMETRY FEED
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bridge 4 Cutoff:</span>
                      <span className="text-red-400 font-bold">13:05 (BREACHED)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Convoy:</span>
                      <span className="text-white font-bold">T07 + B04 on R3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Elevation Margin:</span>
                      <span className="text-[#2DD4BF] font-bold">+38 min safe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Destination:</span>
                      <span className="text-[#E8F3ED] font-bold">Haven H2 / Camp C1</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'driver' && (
              <>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#E05A1B]/20 text-[#E05A1B] text-xs font-mono font-bold mb-3 border border-[#E05A1B]/40">
                    MOBILE DISASTER TELEMETRY
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Driver Guidance App — Convoy T07
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Designed specifically for high-clearance livestock carrier drivers. Displays live hydraulic ramp loading sequence, turn-by-turn navigation along elevated embankments, Paika bridge flood countdowns, and instant delivery confirmation.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono mb-6">
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">VEHICLE UNIT</div>
                      <div className="font-bold text-[#E05A1B]">Truck T07 (Ramp)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">LIVESTOCK LOAD</div>
                      <div className="font-bold text-white">12 Cattle Head</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">MANDATED CORRIDOR</div>
                      <div className="font-bold text-[#2DD4BF]">Route R3 (Bund)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppView('driver')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-lg border border-[#F97316]/50 cursor-pointer"
                  >
                    <span>OPEN DRIVER VIEWPORT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0B1F16] border border-[#164E3D] font-mono text-xs shadow-inner">
                  <div className="text-[10px] text-[#E05A1B] font-bold uppercase mb-2 border-b border-white/5 pb-1">
                    DRIVER COCKPIT HUD
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Driver:</span>
                      <span className="text-white font-bold">R. Das (ODRF)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-[#2DD4BF] font-bold">En Route on R3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Paired Bus:</span>
                      <span className="text-white font-bold">Bus B04 (Family)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sanctuary:</span>
                      <span className="text-[#E8F3ED] font-bold">Go-Sadan Camp C1</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'citizen' && (
              <>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0F3E2E] text-[#E8F3ED] text-xs font-mono font-bold mb-3 border border-[#2DD4BF]/30">
                    BILINGUAL CITIZEN SOS LINK
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Citizen Reassurance Feed — Token H27
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Eliminates rural evacuation anxiety by broadcasting paired household confirmations in both English and Odia. Citizens can track the exact ETA of their family bus and livestock carrier, verifying their animal shelter location before boarding.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono mb-6">
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">TOKEN IDENTIFIER</div>
                      <div className="font-bold text-[#E05A1B]">#H27 PAIRING</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">FAMILY ALLOCATION</div>
                      <div className="font-bold text-white">Bus B04 (6 Pax)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">ANIMAL ALLOCATION</div>
                      <div className="font-bold text-[#2DD4BF]">Truck T07 (4 Cows)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppView('citizen')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-lg border border-[#F97316]/50 cursor-pointer"
                  >
                    <span>OPEN CITIZEN VIEWPORT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0B1F16] border border-[#164E3D] font-mono text-xs shadow-inner">
                  <div className="text-[10px] text-[#2DD4BF] font-bold uppercase mb-2 border-b border-white/5 pb-1">
                    BILINGUAL REASSURANCE SMS
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#07140E] border border-white/10 text-[11px] text-slate-200 leading-relaxed">
                    &quot;ସହଚର ସତର୍କତା: ଆପଣଙ୍କ ପରିବାର ପାଇଁ ବସ୍ B04 ଏବଂ ଗୋରୁଗାଈଙ୍କ ପାଇଁ ଟ୍ରକ୍ T07 ଆସୁଅଛି। ଆପଣଙ୍କ ପଶୁସମ୍ପଦ ସୁରକ୍ଷିତ ରହିବ।&quot;
                  </div>
                </div>
              </>
            )}

            {activeTab === 'field' && (
              <>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0F3E2E] text-[#2DD4BF] text-xs font-mono font-bold mb-3 border border-[#2DD4BF]/30">
                    GROUND REALITY TELEMETRY
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Field Cadre Culvert Verification — EC2
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Equips ASHA workers, Panchayat Sachivs, and Revenue Inspectors with a ruggedized road passability auditor. Enables real-time submission of observed bridge water levels, instantly triggering or clearing route closures on the central GIS map.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono mb-6">
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">LOCATION</div>
                      <div className="font-bold text-white">Paika Siphon (EC2)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">WATER LEVEL</div>
                      <div className="font-bold text-[#E05A1B]">+20cm to slab</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B1F16] border border-white/5">
                      <div className="text-[10px] text-slate-400">CADRE UNIT</div>
                      <div className="font-bold text-[#2DD4BF]">ASHA / RI Cadre</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppView('field')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-lg border border-[#F97316]/50 cursor-pointer"
                  >
                    <span>OPEN FIELD AUDIT VIEWPORT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0B1F16] border border-[#164E3D] font-mono text-xs shadow-inner">
                  <div className="text-[10px] text-yellow-400 font-bold uppercase mb-2 border-b border-white/5 pb-1">
                    ROAD PASSABILITY AUDIT
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Structure:</span>
                      <span className="text-white font-bold">EC2 Culvert</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Status:</span>
                      <span className="text-yellow-400 font-bold">Restricted (Heavy Only)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Telemetry Sync:</span>
                      <span className="text-[#2DD4BF] font-bold">Verified via LoRa</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── OPERATIONAL LIFECYCLE (PLAN • COORDINATE • PROTECT • REBUILD) ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0B1F16]/50 border border-[#164E3D]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-mono font-bold text-[#E05A1B] tracking-widest uppercase">
              END-TO-END EXECUTION CYCLE
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
              Plan • Coordinate • Protect • Rebuild
            </h2>
            <p className="text-xs text-slate-300 mt-2">
              A closed-loop operational workflow bridging ISRO satellite telemetry with on-ground panchayat response.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'PLAN',
                desc: 'ISRO RISAT-2BR1 C-Band SAR radar data & 14 delta river gauges feed the offline flood simulator to compute exact road submersions.',
                tag: 'Predictive Horizon',
                color: '#2DD4BF',
              },
              {
                step: '02',
                title: 'COORDINATE',
                desc: 'Automated simultaneous dispatch of passenger buses and hydraulic ramp trailers, pairing each family with their livestock token.',
                tag: 'Synchronized Convoys',
                color: '#E05A1B',
              },
              {
                step: '03',
                title: 'PROTECT',
                desc: 'Real-time adaptive rerouting when river bridges breach, steering evacuees along elevated bunds with verified water clearance.',
                tag: 'Dijkstra Lifelines',
                color: '#2DD4BF',
              },
              {
                step: '04',
                title: 'REBUILD',
                desc: 'Zero cattle loss and zero family separation enables immediate post-disaster livelihood restoration without generational debt.',
                tag: 'Resilient Rural India',
                color: '#4ADE80',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 bg-[#07140E] border border-[#164E3D] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-black text-2xl" style={{ color: p.color }}>
                      {p.step}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0F3E2E] text-[#E8F3ED] border border-[#164E3D]">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono font-semibold" style={{ color: p.color }}>
                  <CheckCircle2 size={13} />
                  <span>OPERATIONAL IN RUNTIME</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CALL-TO-ACTION SECTION ── */}
        <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0F3E2E] via-[#0B1F16] to-[#0F3E2E] border-2 border-[#E05A1B]/50 shadow-[0_15px_60px_rgba(224,90,27,0.3)] text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#E05A1B] flex items-center justify-center p-1 mb-4 shadow-xl">
            <img src="/sahachar-logo.png" alt="SAHACHAR" className="w-full h-full object-contain rounded-xl" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white max-w-2xl">
            Ready to Experience the Evacuation Radar in Action?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl">
            Explore how multi-agent coordination, Dijkstra offline routing, and twin-token livestock protection transform disaster mitigation for rural communities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setAppView('mission_control')}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-mono font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] via-[#EA580C] to-[#F97316] hover:from-[#EA580C] hover:to-[#F97316] shadow-[0_0_35px_rgba(224,90,27,0.6)] border border-[#F97316] cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <Play size={16} fill="currentColor" />
              <span>LAUNCH LIVE RADAR</span>
            </button>

            <button
              onClick={() => triggerBoot()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCw size={15} />
              <span>REPLAY BOOT INITIALIZATION</span>
            </button>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 w-full py-6 border-t border-[#164E3D]/40 bg-[#06100B] text-slate-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white">SAHACHAR-DRR</span>
            <span>•</span>
            <span>SMART INDIA HACKATHON 2025</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>NATIONAL DISASTER MANAGEMENT AUTHORITY</span>
            <span>•</span>
            <span>GOVT. OF ODISHA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
