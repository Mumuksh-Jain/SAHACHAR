import { useDemoStore } from '../store/useDemoStore';
import { startVehicleAnimation, stopAllAnimations } from './telemetryEngine';

export interface ScriptStage {
  id: string;
  stageName: string;
  startSecond: number;
  endSecond: number;
  hindiScript: string;
  englishSummary: string;
}

export const SCRIPT_STAGES: ScriptStage[] = [
  {
    id: 'STAGE_0',
    stageName: 'STAGE 0: SYSTEM INITIALIZATION (0:00 – 0:10)',
    startSecond: 0,
    endSecond: 10,
    hindiScript: 'SAHACHAR-DRR — Rural Evacuation Assurance and Ground Action System Initialization.',
    englishSummary: 'Full-Screen Cinematic Boot Telemetry • Odisha Disaster Management Corridor',
  },
  {
    id: 'STAGE_1',
    stageName: 'STAGE 1: THE HUMANITARIAN PROBLEM (0:10 – 0:35)',
    startSecond: 10,
    endSecond: 35,
    hindiScript: 'आपदा के समय warning मिल जाना और वास्तव में evacuate कर पाना — ये दोनों एक जैसी बातें नहीं हैं। कागज़ पर plan हो सकता है, लेकिन अगर road बंद हो जाए या vehicle fail हो जाए, तो वही plan impossible हो सकता है।',
    englishSummary: 'The Abandonment Paradox: Why traditional warnings fail when livestock & rural realities are ignored.',
  },
  {
    id: 'STAGE_2',
    stageName: 'STAGE 2: MISSION CONTROL & DECOUPLED TRANSPORT (0:35 – 1:05)',
    startSecond: 35,
    endSecond: 65,
    hindiScript: 'यह है हमारा Mission Control layer. हम family को एक unit की तरह track करते हैं, लेकिन human और livestock को एक ही transport में force नहीं करते। बस में लोग, carrier में cattle — livelihood पीछे छोड़ना complete evacuation नहीं है।',
    englishSummary: 'Tirtol Corridor Radar • Decoupled Transport: Passenger Bus (B04) & Livestock Trailer (T07).',
  },
  {
    id: 'STAGE_3',
    stageName: 'STAGE 3: ACCESS HORIZON ENGINE (1:05 – 1:35)',
    startSecond: 65,
    endSecond: 95,
    hindiScript: 'आम route planner पूछता है: सबसे छोटा रास्ता कौन-सा है? SAHACHAR पूछता है: जो रास्ता अभी खुला है, क्या evacuation पूरा होने तक usable रहेगा? Latest Safe Departure = closure time − travel time − safety buffer.',
    englishSummary: 'Access Horizon: Shortest Route R1 (Paika Bridge Submergence 13:05) vs Elevated Bund Route R3 (+38 min margin).',
  },
  {
    id: 'STAGE_4',
    stageName: 'STAGE 4: CONSTRAINT OPTIMIZATION — HUMAN FIRST (1:35 – 2:05)',
    startSecond: 95,
    endSecond: 125,
    hindiScript: 'CP-SAT optimizer hard constraints satisfy करता है with a lexicographic objective: सबसे पहले vulnerable humans, फिर assisted movement, फिर safety margin, और फिर livestock coverage. Human safety is our first objective.',
    englishSummary: 'Google OR-Tools CP-SAT Solver • NetworkX Multigraph • Lexicographic Priority Hierarchy.',
  },
  {
    id: 'STAGE_5',
    stageName: 'STAGE 5: AUTHORIZATION & LIVE TELEMETRY (2:05 – 2:30)',
    startSecond: 125,
    endSecond: 150,
    hindiScript: 'Optimization के बाद human officer authorization होता है। फिर dispatch शुरू होता है। यहाँ T07 livestock carrier की location, pickup ETA और water cutoff के against उसकी safe crossing time monitor हो रही है।',
    englishSummary: 'Human-in-the-Loop Authorization • Live Telemetry tracking T07 crossing Paika River within safe window.',
  },
  {
    id: 'STAGE_6',
    stageName: 'STAGE 6: FAILURE INJECTION — ADAPTIVE REPLANNING (2:30 – 3:05)',
    startSecond: 150,
    endSecond: 185,
    hindiScript: 'Manijanga Connector / Paika Bridge breach हो जाता है। जो movement पूरा हो चुका है उसे freeze करो, जो सही चल रहा है उसे preserve करो, और सिर्फ़ affected unfinished work को replan करो। यही है Adaptive Plan V2.',
    englishSummary: 'Stability-Aware Adaptive Replanning: Frozen completed sorties, dynamic Dijkstra reroute via North Bund.',
  },
  {
    id: 'STAGE_7',
    stageName: 'STAGE 7: RESOURCE GAP & OSDMA ESCALATION (3:05 – 3:30)',
    startSecond: 185,
    endSecond: 210,
    hindiScript: 'हमारा livestock carrier fail हो जाता है। SAHACHAR gap को छिपाता नहीं, explicitly expose करता है as Resource Gap. compatible carrier request किया जाता है, approve होता है और T11 allocate होता है।',
    englishSummary: 'Fault Exposure: 18 Cattle Stranded Deficit • State OSDMA Requisition • District Carrier T11 Allocated.',
  },
  {
    id: 'STAGE_8',
    stageName: 'STAGE 8: FINAL RESULT — 100% SANCTUARIES ASSURED (3:30 – 3:48)',
    startSecond: 210,
    endSecond: 228,
    hindiScript: 'SAHACHAR-DRR एक evidence-bound evacuation assurance system है। warning से execution और failure से adaptive replanning तक पूरा operational chain connect करता है। No family left behind, no cattle abandoned.',
    englishSummary: '100% Sanctuaries Assured: 428/428 Citizens, 194/194 Cattle, 0 Casualties, 0 Deadlines Missed.',
  },
];

export interface DemoChoreographyEvent {
  atSecond: number;
  label: string;
  cursor?: { x: number; y: number; label?: string; click?: boolean };
  action: () => void;
}

let tickerTimer: ReturnType<typeof setInterval> | null = null;
let eventTimeouts: ReturnType<typeof setTimeout>[] = [];
let scriptStartTime = 0;
let pausedAtElapsed = 0;

export const getChoreographedEvents = (): DemoChoreographyEvent[] => {
  const store = useDemoStore.getState();

  return [
    // ══════════════════════════════════════════════════════════════════════
    // STAGE 0: BOOTING VIDEO (0s to 10s)
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 0,
      label: 'Booting Video Sequence',
      cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2, label: 'System Initializing...' },
      action: () => {
        store.setIsBooting(true);
        store.setAppView('landing');
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[0].stageName,
          hindi: SCRIPT_STAGES[0].hindiScript,
          english: SCRIPT_STAGES[0].englishSummary,
        });
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 1: THE HUMANITARIAN PROBLEM (10s to 35s) — LANDING PAGE
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 10,
      label: 'Transition to Landing Page',
      cursor: { x: window.innerWidth / 2, y: 350, label: 'No Family Left Behind' },
      action: () => {
        store.setIsBooting(false);
        store.setAppView('landing');
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[1].stageName,
          hindi: SCRIPT_STAGES[1].hindiScript,
          english: SCRIPT_STAGES[1].englishSummary,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      atSecond: 17,
      label: 'Smooth Scroll: Live Impact Metrics Strip',
      cursor: { x: window.innerWidth * 0.45, y: 480, label: '428 Citizens • 194 Cattle Verified' },
      action: () => {
        document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      },
    },
    {
      atSecond: 23,
      label: 'Smooth Scroll: The Abandonment Paradox',
      cursor: { x: window.innerWidth * 0.35, y: 520, label: '84% Refuse Evacuation Without Cattle' },
      action: () => {
        document.getElementById('challenges')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      },
    },
    {
      atSecond: 28,
      label: 'Smooth Scroll: 4 Pillars of Rural Resilience',
      cursor: { x: window.innerWidth * 0.55, y: 500, label: 'Livelihood Protection & Twin-Tokens' },
      action: () => {
        document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      },
    },
    {
      atSecond: 33,
      label: 'Glide Cursor to Launch Mission Control',
      cursor: { x: window.innerWidth - 120, y: 28, label: 'Entering SEOC Radar...', click: true },
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 2: ENTER MISSION CONTROL (35s to 65s) — SEOC RADAR
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 35,
      label: 'Enter Mission Control GIS Surface',
      cursor: { x: window.innerWidth * 0.5, y: 350, label: 'Tirtol Corridor • Kendrapara Basin' },
      action: () => {
        store.setAppView('mission_control');
        store.setDemoStage('NORMAL');
        store.setActivePanel('none');
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[2].stageName,
          hindi: SCRIPT_STAGES[2].hindiScript,
          english: SCRIPT_STAGES[2].englishSummary,
        });
        store.setMapCameraTarget({ center: [86.275, 20.320], zoom: 12.6, pitch: 25, duration: 2500 });
      },
    },
    {
      atSecond: 44,
      label: 'Inspect Decoupled Fleet: B04 Bus & T07 Livestock Ramp',
      cursor: { x: window.innerWidth - 150, y: 160, label: 'Decoupled Fleet Telemetry', click: true },
      action: () => {
        store.setSelectedVehicle('T07');
        store.setMapCameraTarget({ center: [86.262, 20.308], zoom: 13.2, pitch: 30, duration: 2000 });
      },
    },
    {
      atSecond: 54,
      label: 'Select Tarapur Village Manifest',
      cursor: { x: window.innerWidth * 0.48, y: 380, label: 'Tarapur: 428 Pax + 194 Cattle', click: true },
      action: () => {
        store.setSelectedSettlement('S01');
        store.setSelectedVehicle(null);
        store.setActivePanel('none');
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 3: ACCESS HORIZON ENGINE (65s to 95s)
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 65,
      label: 'Trigger Flood Inundation Rise & Open Access Horizon',
      cursor: { x: 260, y: 220, label: 'Paika River Rising (8.82m)', click: true },
      action: () => {
        store.triggerFloodAlert();
        store.setFloodVisible(true);
        store.setSelectedSettlement('S01');
        store.setActivePanel('access_horizon');
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[3].stageName,
          hindi: SCRIPT_STAGES[3].hindiScript,
          english: SCRIPT_STAGES[3].englishSummary,
        });
        store.setMapCameraTarget({ center: [86.280, 20.312], zoom: 13.5, pitch: 35, duration: 2000 });
      },
    },
    {
      atSecond: 76,
      label: 'Advance River Elevation Curve & Paika Countdown',
      cursor: { x: window.innerWidth * 0.38, y: 340, label: 'Paika Bridge Cutoff: 13:05 hrs' },
      action: () => {
        store.advanceFlood();
        store.setMapCameraTarget({ center: [86.255, 20.298], zoom: 14.0, pitch: 40, duration: 2000 });
      },
    },
    {
      atSecond: 85,
      label: 'Compare Shortest Route R1 vs High-Bund Route R3',
      cursor: { x: window.innerWidth * 0.32, y: 420, label: 'Comparing Route R1 vs R3', click: true },
      action: () => {
        store.setActivePanel('route_comparison');
        store.setSelectedSettlement('S01');
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 4: CONSTRAINT OPTIMIZATION — HUMAN FIRST (95s to 125s)
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 95,
      label: 'Open CP-SAT Constraint Optimization Engine',
      cursor: { x: window.innerWidth * 0.5, y: 320, label: 'Running CP-SAT Lexicographic Solver...', click: true },
      action: () => {
        store.setActivePanel('none');
        store.setActiveSolverModal(true);
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[4].stageName,
          hindi: SCRIPT_STAGES[4].hindiScript,
          english: SCRIPT_STAGES[4].englishSummary,
        });
      },
    },
    {
      atSecond: 114,
      label: 'Confirm Lexicographic Plan V1 Solution',
      cursor: { x: window.innerWidth * 0.5 + 180, y: window.innerHeight * 0.5 + 190, label: 'Authorize Plan V1', click: true },
      action: () => {
        store.generatePlanV1();
        store.setActiveSolverModal(false);
        store.setActivePanel('approval');
        store.setMapCameraTarget({ center: [86.275, 20.320], zoom: 12.4, pitch: 20, duration: 1800 });
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 5: AUTHORIZATION & LIVE TELEMETRY (125s to 150s)
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 125,
      label: 'District Officer Authorizes Plan & Dispatches Convoys',
      cursor: { x: window.innerWidth * 0.38, y: 440, label: 'Official Operational Approval', click: true },
      action: () => {
        store.approvePlanV1();
        store.reserveVehicles();
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[5].stageName,
          hindi: SCRIPT_STAGES[5].hindiScript,
          english: SCRIPT_STAGES[5].englishSummary,
        });
      },
    },
    {
      atSecond: 131,
      label: 'Convoys En Route Along Route R3',
      cursor: { x: window.innerWidth * 0.46, y: 360, label: 'Dispatching T07 & B04...', click: true },
      action: () => {
        store.startEvacuation();
        store.setActivePanel('none');
        startVehicleAnimation('T07', 'R3', 60000);
        startVehicleAnimation('B04', 'R3', 50000);
      },
    },
    {
      atSecond: 138,
      label: 'Open T07 Telemetry: Live Water Margin vs 13:05 Cutoff',
      cursor: { x: window.innerWidth * 0.58, y: 380, label: 'Tracking T07 Water Margin (+17 min)', click: true },
      action: () => {
        store.setSelectedVehicle('T07');
        store.setMapCameraTarget({ center: [86.265, 20.306], zoom: 13.8, pitch: 35, duration: 1800 });
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 6: FAILURE INJECTION — ADAPTIVE REPLANNING (150s to 185s)
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 150,
      label: 'Inundation Breach: Paika Bridge Submerged',
      cursor: { x: window.innerWidth * 0.48, y: 310, label: '🚨 PAIKA BRIDGE 4 SUBMERGED', click: true },
      action: () => {
        store.blockEC2();
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[6].stageName,
          hindi: SCRIPT_STAGES[6].hindiScript,
          english: SCRIPT_STAGES[6].englishSummary,
        });
        store.setMapCameraTarget({ center: [86.255, 20.298], zoom: 14.5, pitch: 45, duration: 1800 });
      },
    },
    {
      atSecond: 162,
      label: 'Stability-Aware Replanning: Freeze B04, Compute Adaptive Plan V2',
      cursor: { x: window.innerWidth * 0.35, y: 380, label: 'Preserving Completed Work • Rerouting R3', click: true },
      action: () => {
        store.generatePlanV2();
        store.setMapCameraTarget({ center: [86.275, 20.320], zoom: 12.8, pitch: 25, duration: 2000 });
      },
    },
    {
      atSecond: 172,
      label: 'District Officer Authorizes Adaptive Plan V2',
      cursor: { x: window.innerWidth * 0.38, y: 440, label: 'Approving Plan V2 Reroute', click: true },
      action: () => {
        store.approvePlanV2();
        store.setActivePanel('none');
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 7: RESOURCE GAP & OSDMA ESCALATION (185s to 210s)
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 185,
      label: 'Mechanical Breakdown: Truck T09 Fails',
      cursor: { x: window.innerWidth * 0.44, y: 390, label: '⚠️ T09 Broken Down • 18 Cattle At Risk', click: true },
      action: () => {
        store.failT09();
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[7].stageName,
          hindi: SCRIPT_STAGES[7].hindiScript,
          english: SCRIPT_STAGES[7].englishSummary,
        });
      },
    },
    {
      atSecond: 191,
      label: 'Expose Resource Deficit in Resource Gap Panel',
      cursor: { x: 260, y: 320, label: 'Resource Gap: 18 Cattle Deficit', click: true },
      action: () => {
        store.showResourceGap();
      },
    },
    {
      atSecond: 198,
      label: 'Requisition State OSDMA Spare Carrier',
      cursor: { x: 260, y: 450, label: 'Dispatching OSDMA Requisition...', click: true },
      action: () => {
        store.createEscalation();
      },
    },
    {
      atSecond: 204,
      label: 'State Allocates Reserve Carrier T11',
      cursor: { x: 260, y: 420, label: 'Allocating T11: Deficit Resolved', click: true },
      action: () => {
        store.allocateT11();
        store.setActivePanel('none');
      },
    },

    // ══════════════════════════════════════════════════════════════════════
    // STAGE 8: FINAL RESULT — 100% SANCTUARIES ASSURED (210s to 228s)
    // ══════════════════════════════════════════════════════════════════════
    {
      atSecond: 210,
      label: 'All Convoys Reach Multi-Hazard Havens',
      cursor: { x: window.innerWidth * 0.5, y: 350, label: '100% Evacuation Quota Secured!' },
      action: () => {
        store.completeDemo();
        store.setDemoSubtitles({
          stage: SCRIPT_STAGES[8].stageName,
          hindi: SCRIPT_STAGES[8].hindiScript,
          english: SCRIPT_STAGES[8].englishSummary,
        });
        store.setMapCameraTarget({ center: [86.275, 20.320], zoom: 11.5, pitch: 0, duration: 2500 });
      },
    },
    {
      atSecond: 228,
      label: 'Official Demo Complete',
      cursor: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, label: 'SAHACHAR-DRR Assurance Validated' },
      action: () => {
        stopAutoDemo();
      },
    },
  ];
};

export const startAutoDemo = (speedMultiplier: 1 | 2 | 4 = 1) => {
  const store = useDemoStore.getState();
  stopAutoDemo();

  store.resetDemo();
  store.startAutoDemo();
  store.setShowDemoSubtitles(true);
  store.setDemoElapsedSeconds(0);

  const events = getChoreographedEvents();
  scriptStartTime = Date.now();
  pausedAtElapsed = 0;

  // Start real-time 1-second interval ticker for HUD timer & progress bar
  tickerTimer = setInterval(() => {
    const s = useDemoStore.getState();
    if (!s.autoDemoPaused && s.autoDemoRunning) {
      const nextSec = s.demoElapsedSeconds + 1;
      s.setDemoElapsedSeconds(nextSec);

      // Auto update subtitles based on current elapsed second
      const currentStage = SCRIPT_STAGES.find(st => nextSec >= st.startSecond && nextSec < st.endSecond);
      if (currentStage) {
        s.setDemoSubtitles({
          stage: currentStage.stageName,
          hindi: currentStage.hindiScript,
          english: currentStage.englishSummary,
        });
      }
    }
  }, 1000 / speedMultiplier);

  // Schedule all discrete choreographed events
  eventTimeouts = events.map((event) => {
    const delayMs = (event.atSecond * 1000) / speedMultiplier;
    return setTimeout(() => {
      if (!useDemoStore.getState().autoDemoPaused) {
        // Move virtual cursor if event specifies cursor target
        if (event.cursor) {
          useDemoStore.getState().setVirtualCursor({
            x: event.cursor.x,
            y: event.cursor.y,
            visible: true,
            label: event.cursor.label,
            clicking: !!event.cursor.click,
          });

          // Reset click ripple after 400ms
          if (event.cursor.click) {
            setTimeout(() => {
              useDemoStore.getState().setVirtualCursor({ clicking: false });
            }, 450);
          }
        }

        // Execute tactical action
        event.action();
      }
    }, delayMs);
  });
};

export const stopAutoDemo = () => {
  if (tickerTimer) clearInterval(tickerTimer);
  tickerTimer = null;

  eventTimeouts.forEach(clearTimeout);
  eventTimeouts = [];

  const store = useDemoStore.getState();
  store.stopAutoDemo();
  store.setVirtualCursor({ visible: false, clicking: false });
  store.setActiveSolverModal(false);
  stopAllAnimations();
};

export const pauseAutoDemo = () => {
  useDemoStore.getState().pauseAutoDemo();
  pausedAtElapsed = useDemoStore.getState().demoElapsedSeconds;
};

export const resumeAutoDemo = () => {
  useDemoStore.getState().resumeAutoDemo();
};

export const skipToNextStage = () => {
  const currentSec = useDemoStore.getState().demoElapsedSeconds;
  const nextStage = SCRIPT_STAGES.find(s => s.startSecond > currentSec);
  if (nextStage) {
    jumpToSecond(nextStage.startSecond);
  }
};

export const jumpToSecond = (targetSecond: number) => {
  const store = useDemoStore.getState();
  const events = getChoreographedEvents();

  // Find all events up to targetSecond and execute them sequentially
  const pastEvents = events.filter(e => e.atSecond <= targetSecond);
  pastEvents.forEach(e => e.action());

  store.setDemoElapsedSeconds(targetSecond);
  const currentStage = SCRIPT_STAGES.find(st => targetSecond >= st.startSecond && targetSecond < st.endSecond);
  if (currentStage) {
    store.setDemoSubtitles({
      stage: currentStage.stageName,
      hindi: currentStage.hindiScript,
      english: currentStage.englishSummary,
    });
  }
};
