// Vehicle telemetry engine — interpolates vehicle positions along routes
import { routes } from '../data/scenario';
import { useDemoStore } from '../store/useDemoStore';

type Coord = [number, number];

// Interpolate a position along an array of coordinates given progress 0-1
export const interpolateRoute = (coords: Coord[], progress: number): Coord => {
  if (!coords || coords.length === 0) return [86.248, 20.280];
  if (progress <= 0) return coords[0];
  if (progress >= 1) return coords[coords.length - 1];

  // Calculate total length
  const segments: number[] = [];
  let totalLength = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const len = Math.sqrt(
      Math.pow(coords[i + 1][0] - coords[i][0], 2) +
      Math.pow(coords[i + 1][1] - coords[i][1], 2)
    );
    segments.push(len);
    totalLength += len;
  }

  let targetDist = progress * totalLength;
  for (let i = 0; i < segments.length; i++) {
    if (targetDist <= segments[i]) {
      const t = targetDist / segments[i];
      return [
        coords[i][0] + t * (coords[i + 1][0] - coords[i][0]),
        coords[i][1] + t * (coords[i + 1][1] - coords[i][1]),
      ];
    }
    targetDist -= segments[i];
  }
  return coords[coords.length - 1];
};

// Map vehicle missions to routes
const vehicleMissionRoutes: Record<string, { routeId: string; phases: { name: string; start: number; end: number }[] }> = {
  T07: {
    routeId: 'R3',
    phases: [
      { name: 'EN_ROUTE_TO_PICKUP', start: 0, end: 0.25 },
      { name: 'AT_PICKUP', start: 0.25, end: 0.35 },
      { name: 'LOADING', start: 0.35, end: 0.45 },
      { name: 'IN_TRANSIT', start: 0.45, end: 0.70 },
      { name: 'CRITICAL_EDGE_PASSED', start: 0.70, end: 0.85 },
      { name: 'ARRIVED', start: 0.85, end: 1.0 },
    ],
  },
  B04: {
    routeId: 'R3',
    phases: [
      { name: 'EN_ROUTE_TO_PICKUP', start: 0, end: 0.3 },
      { name: 'AT_PICKUP', start: 0.3, end: 0.4 },
      { name: 'IN_TRANSIT', start: 0.4, end: 0.9 },
      { name: 'ARRIVED', start: 0.9, end: 1.0 },
    ],
  },
  B06: {
    routeId: 'R1',
    phases: [
      { name: 'EN_ROUTE_TO_PICKUP', start: 0, end: 0.35 },
      { name: 'IN_TRANSIT', start: 0.35, end: 0.9 },
      { name: 'ARRIVED', start: 0.9, end: 1.0 },
    ],
  },
};

// Active animation intervals
const animationIntervals: Record<string, ReturnType<typeof setInterval>> = {};

export const startVehicleAnimation = (
  vehicleId: string,
  routeId: string,
  durationMs: number,
  onComplete?: () => void
) => {
  const store = useDemoStore.getState();
  const route = routes[routeId];
  if (!route) return;

  // Clear any existing animation for this vehicle
  stopVehicleAnimation(vehicleId);

  const startTime = Date.now();
  const coords = route.coordinates;

  const tick = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / durationMs, 1);

    const position = interpolateRoute(coords, progress);
    store.updateVehicleCoords(vehicleId, position);
    store.updateVehicleProgress(vehicleId, progress * 100);

    // Simulate speed variation
    const baseSpeed = route.distanceKm / (route.durationMin / 60);
    const jitter = (Math.sin(elapsed / 1000) * 3);
    store.updateVehicleSpeed(vehicleId, Math.round(baseSpeed + jitter));

    if (progress >= 1) {
      clearInterval(animationIntervals[vehicleId]);
      delete animationIntervals[vehicleId];
      onComplete?.();
    }
  };

  animationIntervals[vehicleId] = setInterval(tick, 100);
};

export const stopVehicleAnimation = (vehicleId: string) => {
  if (animationIntervals[vehicleId]) {
    clearInterval(animationIntervals[vehicleId]);
    delete animationIntervals[vehicleId];
  }
};

export const stopAllAnimations = () => {
  Object.keys(animationIntervals).forEach(stopVehicleAnimation);
};

// Get status text from progress
export const getVehicleStatusFromProgress = (progress: number): string => {
  if (progress < 25) return 'EN ROUTE TO PICKUP';
  if (progress < 30) return 'APPROACHING PICKUP';
  if (progress < 35) return 'AT PICKUP';
  if (progress < 45) return 'LOADING';
  if (progress < 65) return 'EN ROUTE';
  if (progress < 72) return 'APPROACHING CRITICAL EDGE';
  if (progress < 80) return 'CRITICAL EDGE PASSED';
  if (progress < 95) return 'EN ROUTE TO DESTINATION';
  if (progress < 99) return 'ARRIVING';
  return 'ARRIVED';
};

// Compute ETA display from progress
export const computeETA = (progress: number, totalMinutes: number): number => {
  const remaining = Math.round(totalMinutes * (1 - progress / 100));
  return Math.max(0, remaining);
};
