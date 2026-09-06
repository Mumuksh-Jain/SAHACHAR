import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Truck,
  Users,
  Radio,
  Navigation,
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  Activity,
  Sparkles,
  ExternalLink,
  Cpu,
  PhoneCall,
  Volume2,
  VolumeX,
  Lock,
  FileText,
  Eye,
  MapPin,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { useDemoStore, AppView } from '../store/useDemoStore';
import { SahacharLogo } from '../components/SahacharLogo';

interface Hotspot {
  id: string;
  x: string;
  y: string;
  label: string;
  subtitle: string;
  description: string;
  icon: any;
  metric: string;
  tag: string;
}

export const LandingPage: React.FC = () => {
  const { setAppView, triggerBoot } = useDemoStore();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'mission_control' | 'driver' | 'citizen' | 'field'>('mission_control');
  const [lang, setLang] = useState<'EN' | 'OD'>('EN');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnterVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {});
    }
  };

  const handleMouseLeaveVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const hotspots: Hotspot[] = [
    {
      id: 'boat',
      x: '28%',
      y: '58%',
      label: 'Rapid Flotilla Rescue',
      subtitle: 'Inflatable Jet-Boats & NDRF Teams',
      description: 'Navigating active flood surges in Brahmani-Baitarani delta with real-time GPS telemetry and sonar depth sounding.',
      icon: Navigation,
      metric: '8 Knots Max Surge Velocity',
      tag: 'Waterborne Unit'
    },
    {
      id: 'livestock',
      x: '46%',
      y: '72%',
      label: 'Human-Livestock Co-Evacuation',
      subtitle: 'Twin-Token Family & Cattle Pairing',
      description: 'Eliminating farmer evacuation hesitation by guaranteeing linked cattle transport, fodder, and elevated pen allocation.',
      icon: HeartHandshake,
      metric: '890 Cattle Safely Relocated',
      tag: 'Livelihood Safe'
    },
    {
      id: 'truck',
      x: '64%',
      y: '62%',
      label: 'Heavy Logistics Transporter',
      subtitle: 'Tactical High-Water Truck Fleet',
      description: 'Fleet T-07 routed dynamically around submerged bridges like Paika River with automated clearance alerts.',
      icon: Truck,
      metric: '3.8 Ton Payload Capacity',
      tag: 'Ground Transport'
    },
    {
      id: 'shelter',
      x: '82%',
      y: '48%',
      label: 'Elevated Cyclone Shelter',
      subtitle: 'Multi-Hazard Resilient Center',
      description: 'Solar-powered community sanctuary equipped with automated medical triage, water purification, and feed depots.',
      icon: Shield,
      metric: '450 Person / 200 Livestock Cap',
      tag: 'Relief Sanctuary'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#070D18] text-slate-100 flex flex-col selection:bg-[#E05A1B] selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Tactical Grid Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-[#1E3A8A]/12 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-[#E05A1B]/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#0284C7]/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
      </div>

      {/* ── TOPBAR NAVIGATION ── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/90 bg-[#070D18]/95 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <SahacharLogo clickable={false} />
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1929] border border-slate-700/80 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-pulse" />
            ZERO CASUALTY EVACUATION RADAR • FLOOD RISK DECISION ENGINE ACTIVE
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setLang(lang === 'EN' ? 'OD' : 'EN')}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-700 bg-[#0D1929] hover:bg-slate-800 text-slate-200 transition-all cursor-pointer"
            title="Toggle Language / ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ"
          >
            {lang === 'EN' ? 'ଓଡ଼ିଆ' : 'ENGLISH'}
          </button>

          <button
            onClick={() => triggerBoot()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-[#0D1929] hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer shadow-sm"
            title="Replay System Boot Sequence"
          >
            <RefreshCw size={13} />
            <span className="hidden sm:inline">REPLAY BOOT</span>
          </button>

          <button
            onClick={() => setAppView('mission_control')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono text-white bg-gradient-to-r from-[#E05A1B] via-[#EA580C] to-[#F97316] hover:from-[#d04f14] hover:to-[#ea580c] transition-all shadow-md shadow-orange-950/50 cursor-pointer"
          >
            <span>LAUNCH RADAR</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* ── MAIN BODY CONTENT CONTAINER ── */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-14">

        {/* ── HERO SECTION: NO FAMILY LEFT BEHIND. NO CATTLE ABANDONED ── */}
        <section className="relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#0B1728] via-[#0F1E2E] to-[#08101C] border border-slate-700/80 shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Subtle watermark background emblem */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full border-[20px] border-white/[0.02] pointer-events-none select-none flex items-center justify-center">
            <span className="text-8xl font-black text-white/[0.02] font-mono">DRR</span>
          </div>

          <div className="relative z-10 max-w-4xl">
            {/* Tag / Category */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1929] border border-[#2DD4BF]/40 text-slate-200 text-xs font-mono font-bold mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E05A1B] animate-pulse" />
              {lang === 'EN' 
                ? 'ODISHA STATE DISASTER MANAGEMENT CORRIDOR • KENDRAPARA BASIN' 
                : 'ଓଡ଼ିଶା ରାଜ୍ୟ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା କରିଡର • କେନ୍ଦ୍ରାପଡ଼ା ଅବବାହିକା'}
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

            {/* Humanitarian Manifesto Callout Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#070D18]/90 border-l-4 border-l-[#E05A1B] border-y border-r border-slate-700/80 mb-8 max-w-2xl shadow-inner">
              <p className="italic text-sm sm:text-base text-slate-200 font-serif leading-relaxed">
                &ldquo;No rural family should have to choose between immediate personal safety and their future survival.&rdquo;
              </p>
              <div className="text-[11px] font-mono text-[#E05A1B] font-bold mt-1.5 tracking-wider uppercase">
                — SAHACHAR Humanitarian Charter • Disaster Risk Reduction Framework
              </div>
            </div>

            {/* Primary Hero Action Buttons */}
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
                className="flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-[#E8F3ED] bg-[#0D1929] hover:bg-slate-850 border border-[#2DD4BF]/40 hover:border-[#2DD4BF] transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
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

          {/* Clean Base Banner Stage Mounted Inside the Hero with Interactive Radar Hotspots */}
          <div className="mt-10 pt-8 border-t border-slate-700/60">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-ping" />
                TACTICAL SECTOR OVERVIEW • LIVE FLOTILLA & CONVOY RADAR
              </span>
              <span className="text-[#2DD4BF] hidden sm:inline font-bold">
                CLICK / HOVER RADAR HOTSPOTS FOR REAL-TIME TELEMETRY
              </span>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 group">
              <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7.5] overflow-hidden">
                <img
                  src="/sahachar-banner-clean.jpg"
                  alt="SAHACHAR Co-Evacuation Operational Theater"
                  className="w-full h-full object-cover object-top select-none transition-transform duration-700 group-hover:scale-[1.01]"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070D18]/50 via-transparent to-[#070D18]/40 pointer-events-none" />

                {/* Interactive Hotspots */}
                {hotspots.map((hs) => {
                  const IconComponent = hs.icon;
                  const isSelected = activeHotspot === hs.id;
                  return (
                    <div
                      key={hs.id}
                      style={{ left: hs.x, top: hs.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                      onClick={() => setActiveHotspot(isSelected ? null : hs.id)}
                      onMouseEnter={() => setActiveHotspot(hs.id)}
                      onMouseLeave={() => setActiveHotspot(null)}
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-8 h-8 rounded-full bg-[#E05A1B]/40 animate-ping" />
                        <span className="absolute w-5 h-5 rounded-full bg-[#2DD4BF]/50 animate-pulse" />
                        <button
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all transform hover:scale-125 shadow-lg ${
                            isSelected
                              ? 'bg-[#E05A1B] border-white text-white scale-110 shadow-orange-500/50'
                              : 'bg-[#070D18]/90 border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-[#070D18]'
                          }`}
                          title={hs.label}
                        >
                          <IconComponent size={13} className="font-bold" />
                        </button>

                        {/* Hotspot Tooltip */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.95 }}
                              transition={{ duration: 0.18 }}
                              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-[#0D1929]/95 border border-slate-600 shadow-2xl backdrop-blur-xl z-30 pointer-events-none text-left"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E05A1B]/20 text-[#F97316] font-bold uppercase tracking-wider">
                                  {hs.tag}
                                </span>
                                <span className="text-[10px] font-mono text-[#2DD4BF] font-bold">{hs.metric}</span>
                              </div>
                              <h4 className="text-xs font-bold text-white font-mono">{hs.label}</h4>
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">{hs.description}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom Glass Overlay Bar inside the Hero */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#070D18]/90 border border-slate-700/80 backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white tracking-wide">
                        ODISHA STATE DISASTER MANAGEMENT AUTHORITY (OSDMA)
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Kendrapara Flood Surge Sector • Paika River Corridor
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
                    <div className="text-right">
                      <div className="text-slate-400 text-[10px]">EVACUATION</div>
                      <div className="text-emerald-400 font-bold flex items-center gap-1 justify-end">
                        <CheckCircle2 size={12} /> 428 / 428
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-[10px]">LIVESTOCK</div>
                      <div className="text-[#2DD4BF] font-bold">194 SECURED</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-[10px]">CLEARANCE</div>
                      <div className="text-[#F97316] font-bold">98.4% HIGH-WATER</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LIVE IMPACT METRICS STRIP (THE 5 PROPERLY ALIGNED BOXES) ── */}
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
                className="rounded-2xl p-4 bg-[#0D1929]/90 border border-slate-700/80 backdrop-blur-md flex flex-col justify-between shadow-lg hover:border-slate-500 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400">
                    {stat.label}
                  </span>
                  <Icon size={15} style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-mono font-black" style={{ color: stat.color }}>
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

        {/* ── THE REAL-WORLD PROBLEM: WHY TRADITIONAL EVACUATIONS FAIL ── */}
        <section className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-[#0D1929]/80 border border-slate-700/80 shadow-xl">
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
            <div className="rounded-2xl p-5 bg-[#070D18] border border-red-500/30 flex flex-col justify-between shadow-md">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 font-bold mb-4 font-mono">
                  01
                </div>
                <h3 className="font-bold text-white text-base mb-2">The Abandonment Paradox</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For smallholder farmers, dairy cows and oxen represent their lifetime savings and generational livelihood. When rescue teams refuse animals, over <strong className="text-red-400">84% of families refuse to evacuate</strong>, choosing to stay in flooded huts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-[#E05A1B] font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>SAHACHAR Fix: Twin-Token Livestock Ramp Trucks (T07)</span>
              </div>
            </div>

            {/* Dilemma 2 */}
            <div className="rounded-2xl p-5 bg-[#070D18] border border-amber-500/30 flex flex-col justify-between shadow-md">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold mb-4 font-mono">
                  02
                </div>
                <h3 className="font-bold text-white text-base mb-2">The Shortcut Cutoff Trap</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Standard GPS apps route convoys along the shortest road (Route R1). But river siphon culverts submerge hours before peak flood, leaving loaded buses trapped in flash floodwaters without turning space.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-[#2DD4BF] font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>SAHACHAR Fix: Predictive Access Horizon & Dijkstra Rerouting</span>
              </div>
            </div>

            {/* Dilemma 3 */}
            <div className="rounded-2xl p-5 bg-[#070D18] border border-cyan-500/30 flex flex-col justify-between shadow-md">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-[#2DD4BF] font-bold mb-4 font-mono">
                  03
                </div>
                <h3 className="font-bold text-white text-base mb-2">The Information Void</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When telecom towers drown, generic siren alarms cause blind panic. Citizens have no proof that shelter beds are available, or where their animals are being held, leading to chaotic crowd crushes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>SAHACHAR Fix: Offline LoRa Mesh & Bilingual SMS</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── LIVE TACTICAL THEATER & HOVER VIDEO BOX (SIDE-BY-SIDE EXECUTION) ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0D1929]/90 border border-slate-700/80 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070D18] border border-slate-700 text-xs font-mono text-[#2DD4BF] mb-2 font-bold">
              <Activity size={12} />
              LIVE SIMULATION & GROUND ACTION ENGINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Tactical Co-Evacuation & Autonomous Rerouting in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Experience how SAHACHAR couples vehicle dispatch with real-time hydro-telemetry to execute zero-casualty evacuations across coastal delta zones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: 3 Structured Strategy Boxes */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 hover:border-orange-500/50 transition-all shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-950/60 border border-orange-500/40 flex items-center justify-center text-[#E05A1B] shrink-0 font-mono font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm font-mono">
                      Twin-Token Human-Cattle Co-Evacuation
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Farmers refuse evacuation when ordered to abandon cattle. SAHACHAR binds family wristbands with cattle ear-tags. Relief shelters are pre-allocated with matched cattle pens, dry fodder, and veterinary care.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>Zero Resistance • Token H-27 Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 hover:border-cyan-500/50 transition-all shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-[#2DD4BF] shrink-0 font-mono font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm font-mono">
                      Dynamic Paika Bridge Inundation Bypass
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Models Brahmani-Baitarani river gauges in real-time, detecting Paika Bridge submergence 45 minutes ahead and rerouting heavy transporters (T-07) via elevated rural embankments.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
                      <AlertTriangle size={11} />
                      <span>Paika River 11.2m vs 11.5m Danger • Bypass Route Engaged</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 hover:border-emerald-500/50 transition-all shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 font-mono font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm font-mono">
                      Offline Mesh Verification for Field Marshals
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      When cellular networks fail, signed QR barcodes scan offline on low-cost Android handsets, queuing intake logs for local peer-to-peer LoRa synchronization without cloud dependence.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-[#2DD4BF] font-bold flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>100% Offline Capable • Zero Data Loss Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hover Video Telemetry Box */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-2xl group/videobox cursor-pointer transition-all hover:border-[#E05A1B] hover:shadow-[0_0_35px_rgba(224,90,27,0.3)] h-full flex flex-col justify-between"
                onMouseEnter={handleMouseEnterVideo}
                onMouseLeave={handleMouseLeaveVideo}
                onClick={toggleVideoPlayback}
              >
                {/* Tactical Corner Reticles */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#2DD4BF] z-30 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#2DD4BF] z-30 pointer-events-none" />
                <div className="absolute bottom-12 left-2 w-4 h-4 border-b-2 border-l-2 border-[#2DD4BF] z-30 pointer-events-none" />
                <div className="absolute bottom-12 right-2 w-4 h-4 border-b-2 border-r-2 border-[#2DD4BF] z-30 pointer-events-none" />

                {/* Video HUD Top Bar */}
                <div className="absolute top-0 inset-x-0 z-20 px-4 py-2.5 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isVideoPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-[#E05A1B]'}`} />
                    <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                      {isVideoPlaying ? 'LIVE RECON PLAYBACK ACTIVE' : 'HOVER CURSOR TO PLAY RECON VIDEO'}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 font-bold">
                    KENDRAPARA SECTOR 4
                  </div>
                </div>

                {/* Video Frame */}
                <div className="relative w-full aspect-video sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden flex-1">
                  <video
                    ref={videoRef}
                    src="/BOOTING PAGE.mp4"
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay when paused */}
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#E05A1B] text-white flex items-center justify-center shadow-2xl mb-3 transform group-hover/videobox:scale-110 transition-transform">
                        <Play size={26} className="ml-1" fill="currentColor" />
                      </div>
                      <span className="text-sm font-bold font-mono text-white tracking-wider">
                        HOVER OVER THIS BOX TO PLAY
                      </span>
                      <span className="text-xs text-slate-300 mt-1 max-w-xs font-mono">
                        Move your cursor over this panel to preview the evacuation simulation engine
                      </span>
                    </div>
                  )}
                </div>

                {/* Video Bottom Telemetry Controls */}
                <div className="p-3.5 bg-[#070D18] border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideoPlayback();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      {isVideoPlaying ? <Pause size={12} /> : <Play size={12} />}
                      <span>{isVideoPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAudio();
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-3">
                    <span>FPS: 60</span>
                    <span>•</span>
                    <span className="text-[#2DD4BF]">LATENCY: 14ms</span>
                    <span>•</span>
                    <span className="text-emerald-400">1080P RECON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE 4 PILLARS OF RURAL RESILIENCE (THE 4 PROPERLY ALIGNED BOXES) ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0D1929]/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-700/80 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E05A1B] tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#E05A1B]" />
                ARCHITECTURAL FOUNDATION
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-1">
                The Four Pillars of Rural Resilience
              </h2>
            </div>
            <div className="text-xs font-mono text-[#2DD4BF] font-bold">
              BUILT FOR ODISHA DISASTER MITIGATION
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 hover:border-[#2DD4BF]/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D1929] border border-[#2DD4BF]/40 flex items-center justify-center text-2xl mb-4 shadow-md">
                  👥
                </div>
                <h3 className="font-bold text-white text-lg mb-1">People Safety</h3>
                <div className="text-[11px] font-mono text-[#2DD4BF] font-semibold mb-2">Vulnerable Cohort First</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Expectant mothers, infants, and bedridden elders are geocoded with ASHA frontline cadres. Dedicated passenger buses (B04) ensure expedited direct transit to multi-purpose cyclone shelters.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                • Zero evacuation stampedes • Medical kit onboard
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 hover:border-[#E05A1B]/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D1929] border border-[#E05A1B]/40 flex items-center justify-center text-2xl mb-4 shadow-md">
                  🐄
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Livelihood Protection</h3>
                <div className="text-[11px] font-mono text-[#E05A1B] font-semibold mb-2">Go-Sadan Cattle Sanctuaries</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Specialized ramp trailers (Truck T07) accommodate cattle alongside human convoys. Animals are transferred directly to elevated Go-Sadans stocked with dry fodder, water, and veterinary doctors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                • 194 Cattle safely sheltered • No farmer debt cycle
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 hover:border-sky-400/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D1929] border border-sky-400/40 flex items-center justify-center text-2xl mb-4 shadow-md">
                  🛣️
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Smarter Response</h3>
                <div className="text-[11px] font-mono text-sky-400 font-semibold mb-2">Predictive Graph Solver</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our offline Dijkstra graph engine calculates elevation margins on every road segment. When Paika Bridge approaches its 13:05 cutoff, the system dynamically reroutes convoys to elevated Route R3.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                • 38 min safety margin • 0ms server latency
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 hover:border-emerald-400/50 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0D1929] border border-emerald-400/50 flex items-center justify-center text-2xl mb-4 shadow-md">
                  🛡️
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Stronger Communities</h3>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-2">Twin Token Assurance (H27)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every rural family receives a matching physical and SMS token (H27). It locks their passenger seat with their animal carrier, guaranteeing they will be reunited at the destination haven.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                • Bilingual Odia/English • Trust-verified protocol
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE VIEWPORT SWITCHER (EXPLORE 4 VIEWPORTS) ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0D1929]/95 border border-slate-700/80 shadow-2xl flex flex-col gap-6">
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
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#070D18] border border-slate-700/80">
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
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E05A1B] to-[#EA580C] text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Viewport Showcase Box */}
          <div className="rounded-2xl p-6 bg-[#070D18] border border-slate-700/80 flex flex-col lg:flex-row items-center justify-between gap-6">
            {activeTab === 'mission_control' && (
              <>
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1929] border border-[#2DD4BF]/40 text-[#2DD4BF] text-[11px] font-mono font-bold">
                    PRIMARY SEOC COMMAND SURFACE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Mission Control GIS Radar & Execution Spine
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Real-time operational dashboard for Emergency Operations Centers (EOC). Features interactive GIS map, dynamic flood water level gauges, offline evacuation convoys, and synchronized execution spine tracking with automated, state-of-the-art barrier alerts.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">GIS ENGINE</div>
                      <div className="text-white font-bold">Real-Time Vector</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">ACTIVE ASSETS</div>
                      <div className="text-[#2DD4BF] font-bold">14 Fleet Flotillas</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">ZONE</div>
                      <div className="text-emerald-400 font-bold">Kendrapara Sector 4</div>
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
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0D1929] border border-slate-700/80 font-mono text-xs shadow-inner">
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-2 border-b border-white/5 pb-1">
                    RADAR TELEMETRY SPECIFICATION
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Telemetry Refresh:</span>
                      <span className="text-emerald-400 font-bold">60Hz Realtime</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Flood Solver:</span>
                      <span className="text-white font-bold">Offline Dijkstra</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mesh Cryptography:</span>
                      <span className="text-[#2DD4BF] font-bold">AES-256</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">System State:</span>
                      <span className="text-emerald-400 font-bold">Active (T-00:02)</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'driver' && (
              <>
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1929] border border-[#E05A1B]/40 text-[#E05A1B] text-[11px] font-mono font-bold">
                    IN-CAB TACTICAL NAVIGATOR (TRUCK T07)
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Driver High-Water Navigation & Route Bypass
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Designed for rescue convoy drivers facing active flash flooding. Provides turn-by-turn routing with dynamic road submergence countdowns, Paika River culvert bypasses, and capacity manifests.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">VEHICLE</div>
                      <div className="text-white font-bold">Truck T-07</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">PAYLOAD</div>
                      <div className="text-[#E05A1B] font-bold">8 Cattle + 14 Pax</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">ROUTE SAFETY</div>
                      <div className="text-emerald-400 font-bold">High-Bund Clear</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppView('driver')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-lg border border-[#F97316]/50 cursor-pointer"
                  >
                    <span>OPEN DRIVER CONSOLE</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0D1929] border border-slate-700/80 font-mono text-xs shadow-inner">
                  <div className="text-[10px] text-orange-400 font-bold uppercase mb-2 border-b border-white/5 pb-1">
                    ACTIVE ROUTE TELEMETRY
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Waypoint:</span>
                      <span className="text-white font-bold">Paika Bund R3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Water Depth Clearance:</span>
                      <span className="text-emerald-400 font-bold">+18cm Safe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Arrival:</span>
                      <span className="text-[#2DD4BF] font-bold">14:12 IST</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'citizen' && (
              <>
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1929] border border-amber-500/40 text-amber-400 text-[11px] font-mono font-bold">
                    CITIZEN REASSURANCE & TWIN-TOKEN
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Citizen Evacuation Pass & Livestock Verification
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Accessible mobile pass for evacuated families. Displays twin-token identification (Token H-27), matched cattle ear-tag numbers, assigned multi-purpose shelter beds, and fodder distribution tickets.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">PASS TOKEN</div>
                      <div className="text-amber-400 font-bold">H-27 (Family of 4)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">LIVESTOCK</div>
                      <div className="text-[#2DD4BF] font-bold">2 Cows (TAG #914)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">SHELTER</div>
                      <div className="text-emerald-400 font-bold">Paika High Haven</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppView('citizen')}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E05A1B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] shadow-lg border border-[#F97316]/50 cursor-pointer"
                  >
                    <span>VIEW CITIZEN PASS</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0D1929] border border-slate-700/80 font-mono text-xs shadow-inner">
                  <div className="text-[10px] text-amber-400 font-bold uppercase mb-2 border-b border-white/5 pb-1">
                    TWIN-TOKEN IDENTITY VERIFICATION
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Token ID:</span>
                      <span className="text-white font-bold">H27-914-OD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Hash:</span>
                      <span className="text-[#2DD4BF] font-bold">SHA-256 Valid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Offline Status:</span>
                      <span className="text-emerald-400 font-bold">Signed QR Ready</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'field' && (
              <>
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1929] border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-bold">
                    FIELD AUDIT & RESCUE SCANNER
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Field Marshal Intake & Road Culvert Scanner
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Designed for Aapda Mitra volunteers and field intake officers. Scans offline QR codes at shelter gates, tracks cattle pen occupancy, logs medical requirements, and reports road passability audits.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">FIELD UNIT</div>
                      <div className="text-white font-bold">Kendrapara Sector 4</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">SCAN MODE</div>
                      <div className="text-emerald-400 font-bold">100% Offline</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0D1929] border border-slate-700/80">
                      <div className="text-[10px] text-slate-400">PENS CAPACITY</div>
                      <div className="text-[#2DD4BF] font-bold">84% Occupied</div>
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
                <div className="w-full lg:w-80 rounded-2xl p-4 bg-[#0D1929] border border-slate-700/80 font-mono text-xs shadow-inner">
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
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0D1929]/60 border border-slate-700/80 shadow-xl">
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
                color: '#38BDF8',
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
                className="rounded-2xl p-5 bg-[#070D18] border border-slate-700/80 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-black text-2xl" style={{ color: p.color }}>
                      {p.step}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0D1929] text-slate-200 border border-slate-700">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs font-mono font-semibold" style={{ color: p.color }}>
                  <CheckCircle2 size={13} />
                  <span>OPERATIONAL IN RUNTIME</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRIVACY, DATA SECURITY & DRR ARCHITECTURE ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0D1929]/80 border border-slate-700/80 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070D18] border border-slate-700 text-xs font-mono text-emerald-400 font-bold">
                <Lock size={12} />
                SECURITY & PRIVACY GUARANTEE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Citizen Data Sovereignty & Privacy Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In disaster environments, citizen safety must never compromise privacy. SAHACHAR adheres strictly to the Digital Personal Data Protection (DPDP) Act, implementing zero-knowledge ephemeral tokens that safeguard personal identities.
              </p>

              <div className="p-4 rounded-xl bg-[#070D18] border border-slate-700 text-xs space-y-2 font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={14} /> Ephemeral Tokens (48h Auto-Purge Post Crisis)
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={14} /> Zero Aadhaar / Biometric Storage
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={14} /> AES-256 Encrypted Field Mesh Radio
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 shadow-md">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <Lock size={16} className="text-[#E05A1B]" />
                  <span>Zero Permanent PII Storage</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Citizen identities are tokenized into transient cryptographic hashes (Token H-27). No personal contact numbers or permanent biometric records are stored on central cloud servers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 shadow-md">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <FileText size={16} className="text-[#2DD4BF]" />
                  <span>NDMA / OSDMA Aligned</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fully adheres to the National Disaster Management Authority Guidelines and Odisha State Disaster Management Authority SOPs for multi-hazard community evacuation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 shadow-md">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <Eye size={16} className="text-sky-400" />
                  <span>Anonymized Route Logs</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Vehicle telemetry and family muster logs are automatically scrubbed once evacuees are securely registered at destination multi-purpose cyclone shelters.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 shadow-md">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <Shield size={16} className="text-emerald-400" />
                  <span>ISO 22301 Resilient Core</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered to maintain uninterrupted service continuity across catastrophic grid failures, satellite link interruptions, and mobile carrier blackout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 24X7 EMERGENCY ASSISTANCE DIRECTORY & HELPLINES ── */}
        <section className="rounded-3xl p-6 sm:p-10 bg-[#0D1929]/80 border border-slate-700/80 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/60 text-xs font-mono text-red-400 mb-2 font-bold">
                <PhoneCall size={12} />
                ODISHA 24x7 EMERGENCY ASSISTANCE DIRECTORY
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                Disaster Control Helplines
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2 sm:mt-0">
              Toll-Free Government Emergency Dispatch Links
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="tel:1070"
              className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 hover:border-red-500/50 transition-all group block shadow-md"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-red-400 transition-colors mb-2">
                <span className="text-xs font-mono font-bold">SEOC ODISHA</span>
                <PhoneCall size={16} />
              </div>
              <div className="text-2xl font-black font-mono text-white group-hover:text-red-400 transition-colors">
                1070
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                State Emergency Operations Centre (24x7)
              </p>
            </a>

            <a
              href="tel:1077"
              className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 hover:border-orange-500/50 transition-all group block shadow-md"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-orange-400 transition-colors mb-2">
                <span className="text-xs font-mono font-bold">DEOC KENDRAPARA</span>
                <PhoneCall size={16} />
              </div>
              <div className="text-2xl font-black font-mono text-white group-hover:text-orange-400 transition-colors">
                1077
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                District Emergency Operations Centre
              </p>
            </a>

            <a
              href="tel:112"
              className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 hover:border-cyan-500/50 transition-all group block shadow-md"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-[#2DD4BF] transition-colors mb-2">
                <span className="text-xs font-mono font-bold">NATIONAL EMERGENCY</span>
                <PhoneCall size={16} />
              </div>
              <div className="text-2xl font-black font-mono text-white group-hover:text-[#2DD4BF] transition-colors">
                112
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Unified Police, Fire, and Ambulance
              </p>
            </a>

            <a
              href="tel:1962"
              className="p-5 rounded-2xl bg-[#070D18] border border-slate-700/80 hover:border-emerald-500/50 transition-all group block shadow-md"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400 transition-colors mb-2">
                <span className="text-xs font-mono font-bold">LIVESTOCK AMBULANCE</span>
                <PhoneCall size={16} />
              </div>
              <div className="text-2xl font-black font-mono text-white group-hover:text-emerald-400 transition-colors">
                1962
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Mobile Veterinary Units & Cattle Rescue
              </p>
            </a>
          </div>
        </section>

        {/* ── BOTTOM CALL-TO-ACTION SECTION (THE GRAND EMBLEM CARD) ── */}
        <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0B1E33] via-[#0D1929] to-[#0B1E33] border-2 border-[#E05A1B]/60 shadow-[0_15px_60px_rgba(224,90,27,0.3)] text-center flex flex-col items-center">
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
      <footer className="relative z-10 w-full py-8 border-t border-slate-800 bg-[#050A14] text-slate-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white">SAHACHAR-DRR</span>
            <span>•</span>
            <span>DISASTER MITIGATION CORRIDOR</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>ODISHA STATE DISASTER MANAGEMENT AUTHORITY</span>
            <span>•</span>
            <span>GOVT. OF ODISHA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
