import { create } from 'zustand';
import {
  DemoStage, Settlement, Shelter, AnimalCamp, Vehicle, Road, Mission, RiverGauge,
  initialSettlements, initialShelters, initialAnimalCamps, initialVehicles,
  initialRoads, initialMissions, initialFieldChecks, initialRiverGauges,
} from '../data/scenario';

export type ActivePanel =
  | 'none'
  | 'access_horizon'
  | 'route_comparison'
  | 'vehicle_inspector'
  | 'capacity_calc'
  | 'plan'
  | 'approval'
  | 'dispatch'
  | 'driver_notification'
  | 'household_notification'
  | 'resource_gap'
  | 'escalation'
  | 'field_tasks'
  | 'after_action'
  | 'citizen_request';

export type AppView = 'mission_control' | 'driver' | 'citizen' | 'field';
export type MapBasemap = 'satellite' | 'terrain' | 'streets' | 'tactical';
export type Language = 'en' | 'or';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'critical' | 'driver' | 'household';
  title: string;
  message: string;
  time: string;
  vehicleId?: string;
  missionId?: string;
}

export interface Escalation {
  id: string;
  status: 'SENT' | 'ACKNOWLEDGED' | 'RESOURCE_IDENTIFIED' | 'APPROVED' | 'RESOLVED';
  requestId: string;
  need: string;
  requiredBefore: string;
  createdAt: string;
}

export interface FieldCheck {
  id: string;
  task: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'REQUESTED' | 'VERIFIED';
}

export interface TransportRequest {
  id: string;
  people: number;
  seniors: number;
  cattle: number;
  goats: number;
  pickupPoint: string;
  status: 'PENDING' | 'PROCESSING' | 'ASSIGNED';
  humanVehicleId?: string;
  livestockVehicleId?: string;
  eta?: number;
}

export interface DemoStore {
  // ── View & Localization ───────────────
  appView: AppView;
  setAppView: (view: AppView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isBooting: boolean;
  setIsBooting: (b: boolean) => void;
  triggerBoot: () => void;

  // ── Demo State ────────────────────────
  demoStage: DemoStage;
  setDemoStage: (stage: DemoStage) => void;
  scenarioTime: string;
  setScenarioTime: (t: string) => void;

  // ── Auto Demo ─────────────────────────
  autoDemoRunning: boolean;
  autoDemoPaused: boolean;
  autoDemoSpeed: 1 | 2 | 4;
  startAutoDemo: () => void;
  pauseAutoDemo: () => void;
  resumeAutoDemo: () => void;
  stopAutoDemo: () => void;
  setAutoDemoSpeed: (s: 1 | 2 | 4) => void;

  // ── Map & Geographical State ──────────
  mapBasemap: MapBasemap;
  setMapBasemap: (m: MapBasemap) => void;
  floodVisible: boolean;
  floodLevel: 0 | 1 | 2;
  satelliteMode: boolean;
  showLayers: {
    flood: boolean;
    settlements: boolean;
    shelters: boolean;
    camps: boolean;
    vehicles: boolean;
    routes: boolean;
    blocked: boolean;
    fieldReports: boolean;
    rivers: boolean;
    embankments: boolean;
    gauges: boolean;
    kutchaTracks: boolean;
  };
  setFloodVisible: (v: boolean) => void;
  setFloodLevel: (l: 0 | 1 | 2) => void;
  setSatelliteMode: (v: boolean) => void;
  toggleLayer: (key: keyof DemoStore['showLayers']) => void;

  // ── Scenario Data ─────────────────────
  settlements: Settlement[];
  shelters: Shelter[];
  animalCamps: AnimalCamp[];
  vehicles: Vehicle[];
  roads: Road[];
  missions: Mission[];
  fieldChecks: FieldCheck[];
  riverGauges: RiverGauge[];

  // ── Plan State ────────────────────────
  activePlanVersion: 'NONE' | 'V1' | 'V2';
  planStatus: 'NONE' | 'GENERATING' | 'READY' | 'APPROVED' | 'ACTIVE' | 'PARTIALLY_INVALID' | 'REPLANNING' | 'COMPLETED';

  // ── Selection ─────────────────────────
  selectedSettlementId: string | null;
  selectedVehicleId: string | null;
  selectedMissionId: string | null;
  activePanel: ActivePanel;

  setSelectedSettlement: (id: string | null) => void;
  setSelectedVehicle: (id: string | null) => void;
  setSelectedMission: (id: string | null) => void;
  setActivePanel: (panel: ActivePanel) => void;

  // ── Notifications ─────────────────────
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  clearNotifications: () => void;

  // ── Escalation ────────────────────────
  escalation: Escalation | null;
  setEscalation: (e: Escalation | null) => void;
  advanceEscalation: () => void;

  // ── Resource Gap ──────────────────────
  resourceGapActive: boolean;
  setResourceGapActive: (v: boolean) => void;

  // ── Transport Request ─────────────────
  transportRequest: TransportRequest | null;
  setTransportRequest: (r: TransportRequest | null) => void;

  // ── Vehicle Telemetry ─────────────────
  vehicleProgress: Record<string, number>;
  updateVehicleProgress: (id: string, progress: number) => void;
  vehicleSpeed: Record<string, number>;
  updateVehicleSpeed: (id: string, speed: number) => void;
  vehicleCoords: Record<string, [number, number]>;
  updateVehicleCoords: (id: string, coords: [number, number]) => void;

  // ── Mission Actions ───────────────────
  updateMissionStatus: (id: string, status: Mission['status']) => void;
  updateVehicleStatus: (id: string, status: Vehicle['status']) => void;
  updateSettlementEvacuation: (id: string, human: number, animal: number) => void;
  updateShelterOccupancy: (id: string, delta: number) => void;
  updateCampOccupancy: (id: string, delta: number) => void;

  // ── Demo Actions ──────────────────────
  triggerFloodAlert: () => void;
  advanceFlood: () => void;
  generatePlanV1: () => void;
  approvePlanV1: () => void;
  reserveVehicles: () => void;
  startEvacuation: () => void;
  blockEC2: () => void;
  generatePlanV2: () => void;
  approvePlanV2: () => void;
  failT09: () => void;
  showResourceGap: () => void;
  createEscalation: () => void;
  allocateT11: () => void;
  completeDemo: () => void;
  resetDemo: () => void;

  // ── T07 specific mission events ───────
  t07ArrivePickup: () => void;
  t07DepartLoaded: () => void;
  t07PassCriticalEdge: () => void;
  t07ArriveCamp: () => void;
  t07Release: () => void;
  assignT07SecondMission: () => void;
}

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const useDemoStore = create<DemoStore>((set, get) => ({
  // ── View & Localization ───────────────
  appView: 'mission_control',
  setAppView: (view) => set({ appView: view }),
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  isBooting: true,
  setIsBooting: (b) => set({ isBooting: b }),
  triggerBoot: () => set({ isBooting: true }),

  // ── Demo State ────────────────────────
  demoStage: 'NORMAL',
  setDemoStage: (stage) => set({ demoStage: stage }),
  scenarioTime: '11:30',
  setScenarioTime: (t) => set({ scenarioTime: t }),

  // ── Auto Demo ─────────────────────────
  autoDemoRunning: false,
  autoDemoPaused: false,
  autoDemoSpeed: 1,
  startAutoDemo: () => set({ autoDemoRunning: true, autoDemoPaused: false }),
  pauseAutoDemo: () => set({ autoDemoPaused: true }),
  resumeAutoDemo: () => set({ autoDemoPaused: false }),
  stopAutoDemo: () => set({ autoDemoRunning: false, autoDemoPaused: false }),
  setAutoDemoSpeed: (s) => set({ autoDemoSpeed: s }),

  // ── Map & Geographical State ──────────
  mapBasemap: 'satellite', // High-resolution satellite basemap default!
  setMapBasemap: (m) => set({ mapBasemap: m }),
  floodVisible: false,
  floodLevel: 0,
  satelliteMode: true,
  showLayers: {
    flood: true, settlements: true, shelters: true, camps: true,
    vehicles: true, routes: true, blocked: true, fieldReports: true,
    rivers: true, embankments: true, gauges: true, kutchaTracks: true,
  },
  setFloodVisible: (v) => set({ floodVisible: v }),
  setFloodLevel: (l) => set({ floodLevel: l }),
  setSatelliteMode: (v) => set({ satelliteMode: v }),
  toggleLayer: (key) => set((s) => ({
    showLayers: { ...s.showLayers, [key]: !s.showLayers[key] }
  })),

  // ── Scenario Data ─────────────────────
  settlements: deepClone(initialSettlements),
  shelters: deepClone(initialShelters),
  animalCamps: deepClone(initialAnimalCamps),
  vehicles: deepClone(initialVehicles),
  roads: deepClone(initialRoads),
  missions: deepClone(initialMissions),
  fieldChecks: deepClone(initialFieldChecks),
  riverGauges: deepClone(initialRiverGauges),

  // ── Plan State ────────────────────────
  activePlanVersion: 'NONE',
  planStatus: 'NONE',

  // ── Selection ─────────────────────────
  selectedSettlementId: null,
  selectedVehicleId: null,
  selectedMissionId: null,
  activePanel: 'none',

  setSelectedSettlement: (id) => set({ selectedSettlementId: id }),
  setSelectedVehicle: (id) => set({ selectedVehicleId: id }),
  setSelectedMission: (id) => set({ selectedMissionId: id }),
  setActivePanel: (panel) => set({ activePanel: panel }),

  // ── Notifications ─────────────────────
  notifications: [],
  addNotification: (n) => set((s) => ({
    notifications: [n, ...s.notifications].slice(0, 20)
  })),
  clearNotifications: () => set({ notifications: [] }),

  // ── Escalation ────────────────────────
  escalation: null,
  setEscalation: (e) => set({ escalation: e }),
  advanceEscalation: () => set((s) => {
    if (!s.escalation) return {};
    const transitions: Record<Escalation['status'], Escalation['status']> = {
      SENT: 'ACKNOWLEDGED',
      ACKNOWLEDGED: 'RESOURCE_IDENTIFIED',
      RESOURCE_IDENTIFIED: 'APPROVED',
      APPROVED: 'RESOLVED',
      RESOLVED: 'RESOLVED',
    };
    return { escalation: { ...s.escalation, status: transitions[s.escalation.status] } };
  }),

  // ── Resource Gap ──────────────────────
  resourceGapActive: false,
  setResourceGapActive: (v) => set({ resourceGapActive: v }),

  // ── Transport Request ─────────────────
  transportRequest: null,
  setTransportRequest: (r) => set({ transportRequest: r }),

  // ── Vehicle Telemetry ─────────────────
  vehicleProgress: {},
  updateVehicleProgress: (id, progress) => set((s) => ({
    vehicleProgress: { ...s.vehicleProgress, [id]: progress }
  })),
  vehicleSpeed: {},
  updateVehicleSpeed: (id, speed) => set((s) => ({
    vehicleSpeed: { ...s.vehicleSpeed, [id]: speed }
  })),
  vehicleCoords: {},
  updateVehicleCoords: (id, coords) => set((s) => ({
    vehicleCoords: { ...s.vehicleCoords, [id]: coords }
  })),

  // ── Mission/Vehicle update helpers ────
  updateMissionStatus: (id, status) => set((s) => ({
    missions: s.missions.map(m => m.id === id ? { ...m, status } : m)
  })),
  updateVehicleStatus: (id, status) => set((s) => ({
    vehicles: s.vehicles.map(v => v.id === id ? { ...v, status } : v)
  })),
  updateSettlementEvacuation: (id, human, animal) => set((s) => ({
    settlements: s.settlements.map(st =>
      st.id === id ? { ...st, humanEvacuation: human, animalEvacuation: animal } : st
    )
  })),
  updateShelterOccupancy: (id, delta) => set((s) => ({
    shelters: s.shelters.map(sh =>
      sh.id === id ? { ...sh, occupancy: sh.occupancy + delta } : sh
    )
  })),
  updateCampOccupancy: (id, delta) => set((s) => ({
    animalCamps: s.animalCamps.map(c =>
      c.id === id ? { ...c, cattleOccupancy: c.cattleOccupancy + delta } : c
    )
  })),

  // ════════════════════════════════════════
  // DEMO ACTIONS
  // ════════════════════════════════════════

  triggerFloodAlert: () => {
    set({
      demoStage: 'FLOOD_ALERT',
      floodVisible: true,
      floodLevel: 1,
      scenarioTime: '11:47',
    });
    get().addNotification({
      id: 'n1', type: 'critical',
      title: 'FLOOD ALERT RECEIVED',
      message: 'Tirtol Corridor — 4 settlements at risk. SAHACHAR revalidating evacuation plan.',
      time: '11:47',
    });
    // Mark settlements at risk
    set((s) => ({
      settlements: s.settlements.map(st =>
        ['S01', 'S02', 'S04'].includes(st.id) ? { ...st, status: 'AT_RISK' } :
        ['S03', 'S06', 'S08'].includes(st.id) ? { ...st, status: 'WATCH' } : st
      )
    }));
    setTimeout(() => set({ demoStage: 'ANALYZING', scenarioTime: '11:49' }), 1500);
  },

  advanceFlood: () => {
    set({ floodLevel: 2, scenarioTime: '12:05' });
    // EC2 becomes threatened
    set((s) => ({
      roads: s.roads.map(r => r.id === 'EC2' ? { ...r, status: 'CONDITIONAL' } : r)
    }));
    get().addNotification({
      id: 'n2', type: 'warning',
      title: 'FLOOD ADVANCING',
      message: 'EC2 (Manijanga Connector) now CONDITIONAL. Access windows tightening.',
      time: '12:05',
    });
  },

  generatePlanV1: () => {
    set({
      demoStage: 'PLAN_READY',
      activePlanVersion: 'V1',
      planStatus: 'READY',
      activePanel: 'plan',
      scenarioTime: '12:08',
    });
    // Set all missions to PLANNED (they already are)
    get().addNotification({
      id: 'n3', type: 'info',
      title: 'PLAN V1 GENERATED',
      message: '8 human missions, 6 animal missions. 7 vehicles required. Ready for review.',
      time: '12:08',
    });
  },

  approvePlanV1: () => {
    set({
      demoStage: 'APPROVED',
      planStatus: 'APPROVED',
      activePanel: 'dispatch',
      scenarioTime: '12:11',
    });
    // Update missions to APPROVED
    set((s) => ({
      missions: s.missions.map(m => ({ ...m, status: 'APPROVED' as Mission['status'] }))
    }));
    get().addNotification({
      id: 'n4', type: 'success',
      title: 'PLAN V1 APPROVED',
      message: 'District Incident Command has approved Plan V1. Initiating vehicle reservation.',
      time: '12:11',
    });
  },

  reserveVehicles: () => {
    set((s) => ({
      vehicles: s.vehicles.map(v =>
        ['B04', 'B06', 'T07', 'T09', 'M01'].includes(v.id)
          ? { ...v, status: 'RESERVED' }
          : v
      ),
      missions: s.missions.map(m => ({ ...m, status: 'RESERVED' as Mission['status'] }))
    }));
    get().addNotification({
      id: 'n5', type: 'success',
      title: 'VEHICLES RESERVED',
      message: '7/7 vehicles reserved. Dispatching driver notifications.',
      time: '12:12',
    });
  },

  startEvacuation: () => {
    set({
      demoStage: 'EVACUATING',
      planStatus: 'ACTIVE',
      scenarioTime: '12:15',
    });
    set((s) => ({
      vehicles: s.vehicles.map(v =>
        ['B04', 'T07', 'B06'].includes(v.id) ? { ...v, status: 'EN_ROUTE_TO_PICKUP' } : v
      ),
      missions: s.missions.map(m =>
        ['M12', 'A27', 'M31'].includes(m.id) ? { ...m, status: 'DISPATCHED' as Mission['status'] } : m
      )
    }));
    get().addNotification({
      id: 'n6', type: 'info',
      title: 'EVACUATION STARTED',
      message: 'Vehicles en route. T07, B04, B06 dispatched. Tracking active.',
      time: '12:15',
    });
  },

  // T07 journey milestones
  t07ArrivePickup: () => {
    get().updateVehicleStatus('T07', 'AT_PICKUP');
    get().updateMissionStatus('A27', 'AT_PICKUP');
    set({ scenarioTime: '12:24' });
    get().addNotification({
      id: 'n7', type: 'info',
      title: 'T07 ARRIVED AT PICKUP',
      message: 'T07 at Manijanga Assembly Point — 12:24. Initiating livestock loading.',
      time: '12:24', vehicleId: 'T07', missionId: 'A27',
    });
  },

  t07DepartLoaded: () => {
    get().updateVehicleStatus('T07', 'EN_ROUTE');
    get().updateMissionStatus('A27', 'IN_TRANSIT');
    set({ scenarioTime: '12:44' });
    get().addNotification({
      id: 'n8', type: 'info',
      title: 'T07 DEPARTING LOADED',
      message: 'T07 loaded with 6 cattle (1,510 kg). En route to Camp C1 via R3.',
      time: '12:44', vehicleId: 'T07',
    });
  },

  t07PassCriticalEdge: () => {
    get().updateMissionStatus('A27', 'CRITICAL_EDGE_PASSED');
    set({ scenarioTime: '12:54' });
    get().addNotification({
      id: 'n9', type: 'success',
      title: 'T07 CRITICAL EDGE PASSED ✓',
      message: 'Tartol Bridge cleared at 12:54. Deadline: 13:05. Margin: 11 min.',
      time: '12:54', vehicleId: 'T07',
    });
  },

  t07ArriveCamp: () => {
    get().updateVehicleStatus('T07', 'ARRIVED');
    get().updateMissionStatus('A27', 'ARRIVED');
    get().updateCampOccupancy('C1', 6);
    get().updateSettlementEvacuation('S01', 70, 38);
    set({ scenarioTime: '13:12' });
    get().addNotification({
      id: 'n10', type: 'success',
      title: 'MISSION A27 ARRIVED',
      message: '6 cattle delivered to Camp C1 at 13:12. Camp C1 occupancy: 40/80.',
      time: '13:12', vehicleId: 'T07', missionId: 'A27',
    });
  },

  t07Release: () => {
    get().updateVehicleStatus('T07', 'AVAILABLE');
    get().updateMissionStatus('A27', 'COMPLETED');
    get().updateSettlementEvacuation('S01', 70, 100);
    set({ scenarioTime: '13:20' });
    get().addNotification({
      id: 'n11', type: 'success',
      title: 'T07 AVAILABLE',
      message: 'T07 turnaround complete. Ready for next mission. A41 (Nimakana) pending.',
      time: '13:20', vehicleId: 'T07',
    });
  },

  assignT07SecondMission: () => {
    set((s) => ({
      missions: s.missions.map(m =>
        m.id === 'A41' ? { ...m, vehicleId: 'T07', status: 'DISPATCHED' as Mission['status'] } : m
      ),
      vehicles: s.vehicles.map(v =>
        v.id === 'T07' ? { ...v, status: 'EN_ROUTE_TO_PICKUP', currentMissionId: 'A41' } : v
      ),
    }));
    get().addNotification({
      id: 'n12', type: 'info',
      title: 'T07 SECOND MISSION',
      message: 'T07 assigned to Mission A41 — Nimakana → Camp C2. Departing.',
      time: '13:22', vehicleId: 'T07', missionId: 'A41',
    });
  },

  // Road failure
  blockEC2: () => {
    set({
      demoStage: 'DISRUPTION',
      scenarioTime: '13:17',
    });
    set((s) => ({
      roads: s.roads.map(r => r.id === 'EC2' ? { ...r, status: 'BLOCKED' } : r)
    }));
    get().addNotification({
      id: 'n13', type: 'critical',
      title: 'FIELD UPDATE — EC2 BLOCKED',
      message: 'Manijanga Connector Bridge (EC2) is BLOCKED. 3 missions affected. Replan required.',
      time: '13:17',
    });
  },

  generatePlanV2: () => {
    set({
      demoStage: 'REPLANNING',
      planStatus: 'REPLANNING',
      scenarioTime: '13:19',
    });
    setTimeout(() => {
      set({
        demoStage: 'PLAN_V2',
        activePlanVersion: 'V2',
        planStatus: 'READY',
        activePanel: 'plan',
        scenarioTime: '13:20',
      });
      // Update affected missions to V2 routes
      set((s) => ({
        missions: s.missions.map(m => {
          if (m.id === 'M31') return { ...m, routeId: 'R4', planVersion: 'V2' };
          if (m.id === 'A41') return { ...m, vehicleId: 'T07', routeId: 'R4', planVersion: 'V2' };
          if (m.id === 'M44') return { ...m, departure: '13:27', planVersion: 'V2' };
          return m;
        })
      }));
      get().addNotification({
        id: 'n14', type: 'info',
        title: 'PLAN V2 GENERATED',
        message: '8 missions preserved. 3 missions rerouted via R4. 0 blocked. Ready for approval.',
        time: '13:20',
      });
    }, 2000);
  },

  approvePlanV2: () => {
    set({
      demoStage: 'EVACUATING_V2',
      planStatus: 'ACTIVE',
      scenarioTime: '13:22',
    });
    get().addNotification({
      id: 'n15', type: 'success',
      title: 'PLAN V2 APPROVED',
      message: 'Plan V2 is now active. 3 affected drivers notified with route updates.',
      time: '13:22',
    });
  },

  failT09: () => {
    get().updateVehicleStatus('T09', 'UNAVAILABLE');
    set({ resourceGapActive: true });
    get().addNotification({
      id: 'n16', type: 'critical',
      title: 'T09 VEHICLE FAILURE',
      message: 'T09 (Livestock Carrier) is unavailable. Resource gap identified. 24 animals unassigned.',
      time: '13:36',
    });
  },

  showResourceGap: () => {
    set({
      demoStage: 'RESOURCE_GAP',
      activePanel: 'resource_gap',
      scenarioTime: '13:38',
    });
  },

  createEscalation: () => {
    set({
      demoStage: 'ESCALATION',
      activePanel: 'escalation',
      escalation: {
        id: 'ESC-1',
        requestId: 'RG-102',
        status: 'SENT',
        need: '1 additional livestock carrier (min 7.0 m² floor area)',
        requiredBefore: '13:40',
        createdAt: '13:38',
      },
      scenarioTime: '13:38',
    });
    // Auto-advance escalation
    const advance = (delay: number, stages: Escalation['status'][]) => {
      stages.forEach((s, i) => {
        setTimeout(() => get().advanceEscalation(), delay * (i + 1));
      });
    };
    advance(2500, ['ACKNOWLEDGED', 'RESOURCE_IDENTIFIED', 'APPROVED']);
  },

  allocateT11: () => {
    set((s) => ({
      vehicles: s.vehicles.map(v =>
        v.id === 'T11' ? { ...v, status: 'AVAILABLE' } : v
      ),
      scenarioTime: '13:54',
    }));
    get().addNotification({
      id: 'n17', type: 'success',
      title: 'T11 ALLOCATED',
      message: 'District Reserve Carrier T11 (M. Jena) is now available. Resource gap resolved.',
      time: '13:54',
    });
  },

  completeDemo: () => {
    set({
      demoStage: 'COMPLETED',
      planStatus: 'COMPLETED',
      activePanel: 'after_action',
      scenarioTime: '14:42',
    });
    // Complete all missions
    set((s) => ({
      missions: s.missions.map(m => ({ ...m, status: 'COMPLETED' as Mission['status'] })),
      settlements: s.settlements.map(st => ({
        ...st, humanEvacuation: 100, animalEvacuation: 100
      })),
    }));
    get().addNotification({
      id: 'n18', type: 'success',
      title: 'EVACUATION COMPLETE',
      message: 'All 12 settlements processed. 0 critical deadlines missed. After-action review ready.',
      time: '14:42',
    });
  },

  // ── RESET ─────────────────────────────
  resetDemo: () => {
    set({
      demoStage: 'NORMAL',
      scenarioTime: '11:30',
      floodVisible: false,
      floodLevel: 0,
      satelliteMode: false,
      autoDemoRunning: false,
      autoDemoPaused: false,
      activePlanVersion: 'NONE',
      planStatus: 'NONE',
      activePanel: 'none',
      selectedSettlementId: null,
      selectedVehicleId: null,
      selectedMissionId: null,
      notifications: [],
      escalation: null,
      resourceGapActive: false,
      transportRequest: null,
      vehicleProgress: {},
      vehicleSpeed: {},
      vehicleCoords: {},
      settlements: deepClone(initialSettlements),
      shelters: deepClone(initialShelters),
      animalCamps: deepClone(initialAnimalCamps),
      vehicles: deepClone(initialVehicles),
      roads: deepClone(initialRoads),
      missions: deepClone(initialMissions),
      fieldChecks: deepClone(initialFieldChecks),
      riverGauges: deepClone(initialRiverGauges),
    });
  },
}));
