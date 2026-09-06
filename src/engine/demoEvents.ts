import { useDemoStore } from '../store/useDemoStore';

// Scripted events for the auto demo
export interface DemoEvent {
  id: string;
  atSeconds: number;
  label: string;
  action: () => void;
}

let autoDemoTimer: ReturnType<typeof setTimeout> | null = null;
let autoDemoStartTime: number | null = null;
let autoDemoPauseTime: number | null = null;
let autoDemoElapsed = 0;
let eventTimeouts: ReturnType<typeof setTimeout>[] = [];

export const getDemoEvents = (): DemoEvent[] => {
  const store = useDemoStore.getState();
  return [
    {
      id: 'EVENT_01',
      atSeconds: 4,
      label: 'Flood Alert Received',
      action: () => store.triggerFloodAlert(),
    },
    {
      id: 'EVENT_02',
      atSeconds: 10,
      label: 'Flood Layer Visible',
      action: () => {
        store.setFloodVisible(true);
        store.setSelectedSettlement('S01');
        store.setActivePanel('access_horizon');
      },
    },
    {
      id: 'EVENT_03',
      atSeconds: 14,
      label: 'Access Horizon Shown',
      action: () => {
        store.advanceFlood();
      },
    },
    {
      id: 'EVENT_04',
      atSeconds: 20,
      label: 'Route Comparison',
      action: () => {
        store.setActivePanel('route_comparison');
        store.setSelectedSettlement('S01');
      },
    },
    {
      id: 'EVENT_05',
      atSeconds: 27,
      label: 'Vehicle Capacity Check',
      action: () => {
        store.setActivePanel('vehicle_inspector');
        store.setSelectedVehicle('T07');
      },
    },
    {
      id: 'EVENT_06',
      atSeconds: 34,
      label: 'Generate Plan V1',
      action: () => {
        store.setActivePanel('capacity_calc');
      },
    },
    {
      id: 'EVENT_07',
      atSeconds: 38,
      label: 'Plan V1 Generated',
      action: () => {
        store.generatePlanV1();
      },
    },
    {
      id: 'EVENT_08',
      atSeconds: 43,
      label: 'Approve Plan V1',
      action: () => {
        store.setActivePanel('approval');
      },
    },
    {
      id: 'EVENT_09',
      atSeconds: 47,
      label: 'Plan Approved',
      action: () => {
        store.approvePlanV1();
        store.reserveVehicles();
      },
    },
    {
      id: 'EVENT_10',
      atSeconds: 52,
      label: 'Start Evacuation',
      action: () => {
        store.setActivePanel('driver_notification');
        store.setSelectedVehicle('T07');
      },
    },
    {
      id: 'EVENT_11',
      atSeconds: 57,
      label: 'Vehicles Dispatched',
      action: () => {
        store.startEvacuation();
        store.setActivePanel('none');
      },
    },
    {
      id: 'EVENT_12',
      atSeconds: 68,
      label: 'T07 Arrives at Pickup',
      action: () => {
        store.t07ArrivePickup();
        store.setSelectedVehicle('T07');
      },
    },
    {
      id: 'EVENT_13',
      atSeconds: 80,
      label: 'T07 Departs Loaded',
      action: () => {
        store.t07DepartLoaded();
      },
    },
    {
      id: 'EVENT_14',
      atSeconds: 90,
      label: 'T07 Passes Critical Edge',
      action: () => {
        store.t07PassCriticalEdge();
      },
    },
    {
      id: 'EVENT_15',
      atSeconds: 100,
      label: 'T07 Arrives at Camp',
      action: () => {
        store.t07ArriveCamp();
      },
    },
    {
      id: 'EVENT_16',
      atSeconds: 110,
      label: 'T07 Released for Second Mission',
      action: () => {
        store.t07Release();
      },
    },
    {
      id: 'EVENT_17',
      atSeconds: 116,
      label: 'T07 Second Mission Assigned',
      action: () => {
        store.assignT07SecondMission();
      },
    },
    {
      id: 'EVENT_18',
      atSeconds: 122,
      label: 'EC2 Bridge Blocked',
      action: () => {
        store.blockEC2();
      },
    },
    {
      id: 'EVENT_19',
      atSeconds: 126,
      label: 'Generate Plan V2',
      action: () => {
        store.generatePlanV2();
      },
    },
    {
      id: 'EVENT_20',
      atSeconds: 133,
      label: 'Approve Plan V2',
      action: () => {
        store.approvePlanV2();
      },
    },
    {
      id: 'EVENT_21',
      atSeconds: 140,
      label: 'T09 Vehicle Failure',
      action: () => {
        store.failT09();
      },
    },
    {
      id: 'EVENT_22',
      atSeconds: 144,
      label: 'Show Resource Gap',
      action: () => {
        store.showResourceGap();
      },
    },
    {
      id: 'EVENT_23',
      atSeconds: 149,
      label: 'Create Government Escalation',
      action: () => {
        store.createEscalation();
      },
    },
    {
      id: 'EVENT_24',
      atSeconds: 160,
      label: 'Allocate T11',
      action: () => {
        store.allocateT11();
      },
    },
    {
      id: 'EVENT_25',
      atSeconds: 175,
      label: 'Evacuation Complete',
      action: () => {
        store.completeDemo();
      },
    },
  ];
};

export const startAutoDemo = (speedMultiplier: 1 | 2 | 4 = 1) => {
  const store = useDemoStore.getState();
  store.resetDemo();
  store.startAutoDemo();

  const events = getDemoEvents();
  autoDemoStartTime = Date.now();
  autoDemoElapsed = 0;

  eventTimeouts = events.map((event) => {
    const delay = (event.atSeconds * 1000) / speedMultiplier;
    return setTimeout(() => {
      if (!useDemoStore.getState().autoDemoPaused) {
        event.action();
      }
    }, delay);
  });

  // Auto stop after last event + 5s
  const lastEvent = events[events.length - 1];
  const stopDelay = ((lastEvent.atSeconds + 5) * 1000) / speedMultiplier;
  autoDemoTimer = setTimeout(() => {
    useDemoStore.getState().stopAutoDemo();
  }, stopDelay);
};

export const stopAutoDemo = () => {
  eventTimeouts.forEach(clearTimeout);
  eventTimeouts = [];
  if (autoDemoTimer) clearTimeout(autoDemoTimer);
  autoDemoTimer = null;
  autoDemoStartTime = null;
  autoDemoElapsed = 0;
  useDemoStore.getState().stopAutoDemo();
};

export const pauseAutoDemo = () => {
  autoDemoPauseTime = Date.now();
  useDemoStore.getState().pauseAutoDemo();
};

export const resumeAutoDemo = () => {
  useDemoStore.getState().resumeAutoDemo();
  autoDemoPauseTime = null;
};

// Trigger a specific event by ID manually
export const triggerEvent = (eventId: string) => {
  const events = getDemoEvents();
  const event = events.find(e => e.id === eventId);
  if (event) event.action();
};
