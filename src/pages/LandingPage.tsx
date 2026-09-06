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
  ChevronRight,
  Sparkles,
  ExternalLink,
  Cpu,
  PhoneCall,
  Volume2,
  VolumeX,
  Lock,
  FileText,
  Eye,
  Info
} from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
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
    <div className="min-h-screen w-full bg-[#0B132B] text-slate-100 flex flex-col selection:bg-[#E05A1B] selection:text-white relative overflow-x-hidden font-sans">
      {/* Subtle Tactical Grid Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-[#1E3A8A]/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-[#E05A1B]/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#0284C7]/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      {/* ── TOPBAR NAVIGATION ── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B132B]/95 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <SahacharLogo clickable={false} />
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
            KENDRAPARA SECTOR • FLOOD DISASTER DECISION ENGINE ACTIVE
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#hero-overview" className="hover:text-[#E05A1B] transition-colors">Overview</a>
          <a href="#operational-engine" className="hover:text-[#E05A1B] transition-colors">Live Engine</a>
          <a href="#four-pillars" className="hover:text-[#E05A1B] transition-colors">Resilience Pillars</a>
          <a href="#privacy-charter" className="hover:text-[#E05A1B] transition-colors">Privacy & Safety</a>
          <a href="#emergency-directory" className="hover:text-[#E05A1B] transition-colors">24x7 Helplines</a>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'EN' ? 'OD' : 'EN')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
            title="Toggle Language / ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ"
          >
            {lang === 'EN' ? 'ଓଡ଼ିଆ' : 'ENGLISH'}
          </button>

          <button
            onClick={() => triggerBoot()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer shadow-sm"
            title="Replay System Boot Sequence"
          >
            <RefreshCw size={13} />
            <span className="hidden sm:inline">Re-Boot</span>
          </button>

          <button
            onClick={() => setAppView('mission_control')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono text-white bg-gradient-to-r from-[#E05A1B] to-[#F97316] hover:from-[#d04f14] hover:to-[#ea580c] transition-all shadow-md shadow-orange-950/40 cursor-pointer"
          >
            <span>LAUNCH CONSOLE</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* ── HERO FOLD: THE BREATHTAKING BASE BANNER WITH TACTICAL INTERACTIVITY ── */}
      <section id="hero-overview" className="relative w-full border-b border-slate-800/80 bg-[#0B132B] pt-4 pb-10 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Banner Hero Showcase Stage */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
            {/* The Clean Base Banner Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] md:aspect-[16/8] lg:aspect-[16/7.5] overflow-hidden">
              <img
                src="/sahachar-banner-clean.jpg"
                alt="SAHACHAR - Co-Evacuation Disaster Decision Support System Banner"
                className="w-full h-full object-cover object-top select-none transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Seamless Vignette & Bottom Blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/60 via-transparent to-[#0B132B]/50 pointer-events-none" />

              {/* Dynamic Interactive Hotspots on the Base Image */}
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
                    {/* Hotspot Radar Pulse Ring */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-9 h-9 rounded-full bg-[#E05A1B]/40 animate-ping" />
                      <span className="absolute w-6 h-6 rounded-full bg-[#2DD4BF]/50 animate-pulse" />
                      <button
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all transform hover:scale-125 shadow-lg ${
                          isSelected
                            ? 'bg-[#E05A1B] border-white text-white scale-110 shadow-orange-500/50'
                            : 'bg-[#0B132B]/90 border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-[#0B132B]'
                        }`}
                        title={hs.label}
                      >
                        <IconComponent size={14} className="font-bold" />
                      </button>

                      {/* Hotspot Hover Card Tooltip */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.18 }}
                            className="absolute bottom-11 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-slate-900/95 border border-slate-600 shadow-2xl backdrop-blur-xl z-30 pointer-events-none text-left"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E05A1B]/20 text-[#F97316] font-bold uppercase tracking-wider">
                                {hs.tag}
                              </span>
                              <span className="text-[10px] font-mono text-[#2DD4BF]">{hs.metric}</span>
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

              {/* Bottom Glass Overlay Bar inside the Hero with Mission Metrics */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-6 right-3 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <div className="text-xs font-mono font-bold text-white tracking-wide">
                      {lang === 'EN' ? 'ODISHA STATE DISASTER MANAGEMENT AUTHORITY (OSDMA)' : 'ଓଡ଼ିଶା ରାଜ୍ୟ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା ପ୍ରାଧିକରଣ (OSDMA)'}
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      Kendrapara Flood Surge Operation • Paika River Sector 4
                    </div>
                  </div>
                </div>

                {/* Live Rapid Metrics */}
                <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">EVACUATION STATUS</div>
                    <div className="text-emerald-400 font-bold flex items-center gap-1 justify-end">
                      <CheckCircle2 size={13} /> 1,420 SECURED
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">CO-LIVESTOCK</div>
                    <div className="text-[#2DD4BF] font-bold">890 PROTECTED</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">ROUTE CLEARANCE</div>
                    <div className="text-[#F97316] font-bold">98.4% HIGH-WATER</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Bar directly under the Hero Banner */}
            <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setAppView('mission_control')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-850 border border-slate-700/80 hover:border-[#E05A1B]/60 transition-all cursor-pointer group/btn text-left"
              >
                <div>
                  <div className="text-xs font-bold text-white font-mono group-hover/btn:text-[#E05A1B]">
                    MISSION CONTROL
                  </div>
                  <div className="text-[10px] text-slate-400">Main Tactical Map & Command</div>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-[#E05A1B] transition-transform" />
              </button>

              <button
                onClick={() => setAppView('driver')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-850 border border-slate-700/80 hover:border-[#2DD4BF]/60 transition-all cursor-pointer group/btn text-left"
              >
                <div>
                  <div className="text-xs font-bold text-white font-mono group-hover/btn:text-[#2DD4BF]">
                    DRIVER CONSOLE
                  </div>
                  <div className="text-[10px] text-slate-400">Truck T-07 Bypass GPS</div>
                </div>
                <Truck size={14} className="text-slate-400 group-hover/btn:text-[#2DD4BF] transition-colors" />
              </button>

              <button
                onClick={() => setAppView('citizen')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-850 border border-slate-700/80 hover:border-amber-400/60 transition-all cursor-pointer group/btn text-left"
              >
                <div>
                  <div className="text-xs font-bold text-white font-mono group-hover/btn:text-amber-400">
                    CITIZEN RESCUE PASS
                  </div>
                  <div className="text-[10px] text-slate-400">Twin-Token H-27 (Human + Cow)</div>
                </div>
                <Users size={14} className="text-slate-400 group-hover/btn:text-amber-400 transition-colors" />
              </button>

              <button
                onClick={() => setAppView('field')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-850 border border-slate-700/80 hover:border-emerald-400/60 transition-all cursor-pointer group/btn text-left"
              >
                <div>
                  <div className="text-xs font-bold text-white font-mono group-hover/btn:text-emerald-400">
                    FIELD MARSHAL SCANNER
                  </div>
                  <div className="text-[10px] text-slate-400">Offline QR & Cattle Pen Intake</div>
                </div>
                <Radio size={14} className="text-slate-400 group-hover/btn:text-emerald-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLL SECTION 1: LIVE OPERATIONAL THEATER & HOVER VIDEO BOX ── */}
      <section id="operational-engine" className="py-16 border-b border-slate-800/80 bg-[#0B132B]/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-[#2DD4BF] mb-3">
              <Activity size={12} />
              TACTICAL SIMULATION & RECON ENGINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Next-Gen Flood Evacuation & Route Intelligence
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Built specifically to overcome real-world flood challenges in Odisha’s coastal delta, 
              preventing human casualties and preserving rural agrarian livelihoods.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: CRITICAL OPERATIONAL STRATEGIES */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#E05A1B] shrink-0 mt-0.5">
                    <HeartHandshake size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">
                      1. Twin-Token Human-Cattle Co-Evacuation
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Farmers frequently refuse life-saving rescue when ordered to abandon their livestock. 
                      SAHACHAR solves this socio-economic bottleneck by cryptographically binding the family’s 
                      emergency wristband with cattle ear-tags. Relief shelters are pre-allocated with matched cattle pens, 
                      fodder stores, and veterinary triage.
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="text-emerald-400 font-bold">✓ Zero Resistance Evacuation</span>
                      <span>•</span>
                      <span>Token H-27 Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#2DD4BF] shrink-0 mt-0.5">
                    <Navigation size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">
                      2. Dynamic Hydrological Inundation & Paika Bridge Bypass
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Static GPS routing leads rescue trucks directly into flash-flood chokepoints. 
                      Our hydraulic calculation engine models Brahmani river gauge surges in real-time, 
                      detecting Paika Bridge submergence 45 minutes ahead and rerouting heavy transporter T-07 
                      via safe elevated rural embankments.
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="text-amber-400 font-bold">▲ Alert: Paika 11.2m vs 11.5m Danger</span>
                      <span>•</span>
                      <span>Bypass Route Engaged</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Radio size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">
                      3. Offline Mesh Verification for Field Marshals
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      When cellular towers collapse, field workers cannot rely on cloud databases. 
                      SAHACHAR tokens utilize self-contained, signed QR barcodes that scan instantly offline 
                      on low-cost Android handsets, queuing intake logs for local peer-to-peer sync.
                    </p>
                    <div className="mt-2.5 flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="text-[#2DD4BF] font-bold">⚡ 100% Offline Capable</span>
                      <span>•</span>
                      <span>Zero Data Loss Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: VIDEO BOX PLAYING AUTOMATICALLY ON HOVER */}
            <div className="lg:col-span-6">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-2xl group/videobox cursor-pointer transition-all hover:border-[#E05A1B] hover:shadow-orange-950/40"
                onMouseEnter={handleMouseEnterVideo}
                onMouseLeave={handleMouseLeaveVideo}
                onClick={toggleVideoPlayback}
              >
                {/* Tactical Corner Reticle Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#2DD4BF] z-30 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#2DD4BF] z-30 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#2DD4BF] z-30 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#2DD4BF] z-30 pointer-events-none" />

                {/* Video HUD Top Bar */}
                <div className="absolute top-0 inset-x-0 z-20 px-4 py-2.5 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isVideoPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-[#E05A1B]'}`} />
                    <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                      {isVideoPlaying ? 'LIVE RECON PLAYBACK ACTIVE' : 'HOVER CURSOR TO PLAY RECON VIDEO'}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700">
                    REC • KENDRAPARA
                  </div>
                </div>

                {/* The Video Element */}
                <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
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
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#E05A1B]/90 text-white flex items-center justify-center shadow-xl mb-3 transform group-hover/videobox:scale-110 transition-transform">
                        <Play size={26} className="ml-1" />
                      </div>
                      <span className="text-sm font-bold font-mono text-white">
                        HOVER OVER THIS BOX TO PLAY
                      </span>
                      <span className="text-xs text-slate-300 mt-1 max-w-xs font-mono">
                        Move your mouse over this panel to preview the booting and tactical simulation engine
                      </span>
                    </div>
                  )}
                </div>

                {/* Video Bottom Telemetry Controls */}
                <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideoPlayback();
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-white font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      {isVideoPlaying ? <Pause size={12} /> : <Play size={12} />}
                      <span>{isVideoPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAudio();
                      }}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
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
                    <span className="text-emerald-400">1080P TELEMETRY</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SCROLL SECTION 2: FOUR PILLARS OF SAHACHAR RESILIENCE ── */}
      <section id="four-pillars" className="py-16 border-b border-slate-800/80 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-orange-400 mb-3">
              <Sparkles size={12} />
              DESIGNED FROM GROUND UP FOR ZERO CASUALTY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              Four Core Pillars of SAHACHAR
            </h2>
            <p className="text-slate-300 text-sm mt-2 font-mono">
              Translating disaster management theory into life-saving tactical coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/40 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#E05A1B] mb-4">
                  <Users size={24} />
                </div>
                <div className="text-[11px] font-mono text-orange-400 font-bold uppercase">Pillar 01</div>
                <h3 className="text-lg font-bold text-white font-mono mt-1">People Safety</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Prioritized evacuation of vulnerable demographic groups (infants, expectant mothers, elderly, disabled) 
                  with real-time headcounts and verified delivery into elevated multi-hazard shelters.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Casualty Target</span>
                <span className="text-emerald-400 font-bold">0 Casualties</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#2DD4BF] mb-4">
                  <HeartHandshake size={24} />
                </div>
                <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase">Pillar 02</div>
                <h3 className="text-lg font-bold text-white font-mono mt-1">Livelihood Protection</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Protecting agrarian assets by treating cattle as non-negotiable co-evacuees. 
                  Prevents catastrophic rural bankruptcy and ensures rapid post-cyclone economic recovery.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Livestock Survival</span>
                <span className="text-[#2DD4BF] font-bold">100% Tracking</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sky-400 mb-4">
                  <Cpu size={24} />
                </div>
                <div className="text-[11px] font-mono text-sky-400 font-bold uppercase">Pillar 03</div>
                <h3 className="text-lg font-bold text-white font-mono mt-1">Smarter Response</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Live sensor fusion correlating river hydro-gauges, radar rainfall forecasts, 
                  and road elevation topographies to guide rescue drivers away from submerged bridges.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Hydraulic Horizon</span>
                <span className="text-sky-400 font-bold">T+60m Predictive</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Shield size={24} />
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase">Pillar 04</div>
                <h3 className="text-lg font-bold text-white font-mono mt-1">Stronger Communities</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Empowering Gram Panchayats and Aapda Mitras with transparent bilingual coordination tools, 
                  eliminating panic and rumors through verified official advisories.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Local Volunteers</span>
                <span className="text-emerald-400 font-bold">Aapda Mitra Ready</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SCROLL SECTION 3: PRIVACY, DATA SECURITY & DRR ARCHITECTURE ── */}
      <section id="privacy-charter" className="py-16 border-b border-slate-800/80 bg-[#0B132B]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400">
                <Lock size={12} />
                SECURITY & PRIVACY GUARANTEE
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                Citizen Data Sovereignty & Privacy Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In disaster environments, citizen safety must never compromise privacy. 
                SAHACHAR adheres strictly to the Digital Personal Data Protection (DPDP) Act, 
                implementing zero-knowledge ephemeral tokens that safeguard personal identities.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2 font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={14} /> Ephemeral Tokens (48h Auto-Purge)
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={14} /> Zero Aadhaar / Biometric Persistence
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={14} /> AES-256 Encrypted Field Mesh Radio
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <Lock size={16} className="text-[#E05A1B]" />
                  <span>Zero Permanent PII Storage</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Citizen identities are tokenized into transient cryptographic hashes (e.g. H-27). 
                  No personal phone numbers, addresses, or biometric profiles are stored on cloud servers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <FileText size={16} className="text-[#2DD4BF]" />
                  <span>NDMA / OSDMA Aligned</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Conforms fully to the National Disaster Management Guidelines and Odisha State 
                  Disaster Management Authority protocols for multi-hazard community evacuation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <Eye size={16} className="text-sky-400" />
                  <span>Anonymized Route Logs</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vehicle telemetry and family muster logs are scrubbed of identifying telemetry once 
                  evacuees are securely registered at their designated relief centers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-bold font-mono text-sm mb-2">
                  <Shield size={16} className="text-emerald-400" />
                  <span>ISO 22301 Resilient Core</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered to maintain uninterrupted service continuity across catastrophic grid failure, 
                  sat-link dropouts, and total mobile carrier blackout.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SCROLL SECTION 4: 24X7 EMERGENCY DIRECTORY & HELPLINES ── */}
      <section id="emergency-directory" className="py-16 border-b border-slate-800/80 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/60 text-xs font-mono text-red-400 mb-2">
                <PhoneCall size={12} />
                ODISHA 24x7 EMERGENCY ASSISTANCE DIRECTORY
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
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
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all group block shadow-md"
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
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all group block shadow-md"
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
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group block shadow-md"
            >
              <div className="flex items-center justify-between text-slate-400 group-hover:text-[#2DD4BF] transition-colors mb-2">
                <span className="text-xs font-mono font-bold">NATIONAL EMERGENCY</span>
                <PhoneCall size={16} />
              </div>
              <div className="text-2xl font-black font-mono text-white group-hover:text-[#2DD4BF] transition-colors">
                112
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Police, Fire, and Ambulance Unified Link
              </p>
            </a>

            <a
              href="tel:1962"
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all group block shadow-md"
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
        </div>
      </section>

      {/* ── COMPLETE OFFICIAL FOOTER ("EXTRA THAT COMES IN ALL SITES") ── */}
      <footer className="w-full bg-[#070D1E] border-t border-slate-800 text-slate-400 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Column 1: Brand & Mandate */}
            <div className="lg:col-span-2 space-y-4">
              <SahacharLogo clickable={false} />
              <p className="text-xs text-slate-400 leading-relaxed pr-6">
                SAHACHAR is an advanced Human-Livestock Co-Evacuation Disaster Decision Support System 
                developed to safeguard coastal delta populations, prevent agrarian livelihood decimation, 
                and furnish first responders with real-time hydrological and route intelligence.
              </p>
              <div className="text-[11px] font-mono text-slate-400">
                Operated in conjunction with Odisha State Disaster Management Authority (OSDMA).
              </div>
            </div>

            {/* Column 2: System Portals */}
            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider mb-3">
                Tactical Portals
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setAppView('mission_control')} className="hover:text-white transition-colors cursor-pointer">
                    Mission Control (SEOC)
                  </button>
                </li>
                <li>
                  <button onClick={() => setAppView('driver')} className="hover:text-white transition-colors cursor-pointer">
                    Driver Console (T-07)
                  </button>
                </li>
                <li>
                  <button onClick={() => setAppView('citizen')} className="hover:text-white transition-colors cursor-pointer">
                    Citizen Evacuation Pass
                  </button>
                </li>
                <li>
                  <button onClick={() => setAppView('field')} className="hover:text-white transition-colors cursor-pointer">
                    Field Intake Scanner
                  </button>
                </li>
                <li>
                  <button onClick={() => triggerBoot()} className="hover:text-white transition-colors cursor-pointer">
                    Re-Run Boot Diagnostic
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Tech & Standards */}
            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider mb-3">
                Standards & Compliance
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">NDMA Guidelines 2024</a></li>
                <li><a href="#" className="hover:text-white transition-colors">OSDMA Cyclone SOP</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DPDP Act Data Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">OpenTelemetry Hydro APM</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Offline Mesh Sync Spec</a></li>
              </ul>
            </div>

            {/* Column 4: Institutional Links */}
            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider mb-3">
                Institutional Links
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="https://www.osdma.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">OSDMA Odisha <ExternalLink size={10} /></a></li>
                <li><a href="https://ndma.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">NDMA India <ExternalLink size={10} /></a></li>
                <li><a href="https://imd.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">IMD Weather Radar <ExternalLink size={10} /></a></li>
                <li><a href="https://cwc.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Central Water Comm. <ExternalLink size={10} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy & Terms</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Security Certification */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
            <div>
              © 2025 SAHACHAR-DRR DECISION SUPPORT SYSTEM • ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center gap-4">
              <span>SECURITY AUDIT: PASSED</span>
              <span>•</span>
              <span className="text-emerald-400">ENCRYPTION: AES-256</span>
              <span>•</span>
              <span className="text-[#E05A1B]">ODISHA DISASTER RADAR READY</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
