// TIRTOL FLOOD EMERGENCY — DEMO SCENARIO
// All data is deterministic fixture data for hackathon demo.

export type SettlementStatus = 'NORMAL' | 'WATCH' | 'AT_RISK' | 'MONITORING';
export type RoadStatus = 'OPEN' | 'CONDITIONAL' | 'BLOCKED' | 'THREATENED';
export type VehicleStatus = 'AVAILABLE' | 'RESERVED' | 'DRIVER_ACK_PENDING' | 'DISPATCHED' | 'EN_ROUTE_TO_PICKUP' | 'AT_PICKUP' | 'LOADING' | 'EN_ROUTE' | 'ARRIVED' | 'UNLOADING' | 'TURNAROUND' | 'UNAVAILABLE' | 'RESERVE';
export type MissionStatus = 'PLANNED' | 'APPROVED' | 'RESERVED' | 'DISPATCHED' | 'AT_PICKUP' | 'LOADING' | 'IN_TRANSIT' | 'CRITICAL_EDGE_PASSED' | 'ARRIVED' | 'UNLOADING' | 'COMPLETED' | 'BLOCKED';
export type MissionCategory = 'HUMAN' | 'LIVESTOCK';
export type DemoStage =
  | 'NORMAL'
  | 'FLOOD_ALERT'
  | 'ANALYZING'
  | 'PLAN_READY'
  | 'APPROVED'
  | 'DISPATCHED'
  | 'EVACUATING'
  | 'DISRUPTION'
  | 'REPLANNING'
  | 'PLAN_V2'
  | 'RESOURCE_GAP'
  | 'ESCALATION'
  | 'EVACUATING_V2'
  | 'COMPLETED';

export interface Settlement {
  id: string;
  name: string;
  odiaName?: string;
  gramPanchayat?: string;
  wardNo?: string;
  coordinates: [number, number];
  people: number;
  assistedPeople: number;
  vulnerablePeople: number;
  cattle: number;
  goats: number;
  poultry: number;
  accessDeadline: string;
  status: SettlementStatus;
  humanEvacuation: number; // 0–100%
  animalEvacuation: number; // 0–100%
  ashaWorker?: string;
  pregnantMothers?: number;
  bedriddenElderly?: number;
  kutchaHouses?: number;
  elevationMeters?: number;
  roadType?: 'kutcha' | 'pucca' | string;
  riverProximityKm?: number;
}

export interface RiverGauge {
  id: string;
  name: string;
  odiaName?: string;
  river: string;
  coordinates: [number, number];
  waterLevel: number;
  dangerLevel: number;
  warningLevel: number;
  trend: 'RISING_FAST' | 'RISING' | 'STEADY' | 'RECEDING';
  dischargeCusecs: string;
  currentLevelM?: number;
  status?: string;
}

export interface Shelter {
  id: string;
  name: string;
  coordinates: [number, number];
  capacity: number;
  occupancy: number;
  incoming: number;
}

export interface AnimalCamp {
  id: string;
  name: string;
  coordinates: [number, number];
  cattleCapacity: number;
  cattleOccupancy: number;
  incoming: number;
  water: string;
  fodder: string;
  veterinary: string;
}

export interface Vehicle {
  id: string;
  type: 'BUS' | 'LIVESTOCK_CARRIER' | 'AMBULANCE' | 'JEEP' | 'MINIBUS';
  label: string;
  coordinates: [number, number];
  capacity?: number;
  usableFloorArea?: number;
  configuredGrossLimit?: number;
  status: VehicleStatus;
  driver: string;
  currentMissionId?: string;
  progress?: number; // 0–100 for telemetry
  speed?: number; // km/h display
  animalCompat?: string[];
  assignedLocation?: string;
}

export interface Road {
  id: string;
  name: string;
  status: RoadStatus;
  accessUntil?: string;
  critical: boolean;
  coordinates: [number, number][];
  isElevated?: boolean;
}

export interface Route {
  id: string;
  name: string;
  distanceKm: number;
  durationMin: number;
  accessMarginMin: number;
  status: 'RECOMMENDED' | 'RISKY' | 'ALTERNATIVE' | 'BLOCKED';
  coordinates: [number, number][];
  bridgeIds?: string[];
}

export interface Mission {
  id: string;
  category: MissionCategory;
  settlementId: string;
  vehicleId: string;
  destinationId: string;
  routeId: string;
  passengers?: number;
  cattle?: number;
  goats?: number;
  departure: string;
  status: MissionStatus;
  planVersion: 'V1' | 'V2';
  driverAcknowledged?: boolean;
  householdNotified?: boolean;
  affectedByEC2?: boolean;
}

export interface AnimalLoad {
  id: string;
  species: 'COW' | 'GOAT' | 'POULTRY';
  weightKg: number;
  label: string;
}

// ==================== SETTLEMENTS ====================

export const initialSettlements: Settlement[] = [
  {
    id: 'S01', name: 'Manijanga', odiaName: 'ମଣିଜଙ୍ଗା',
    gramPanchayat: 'Manijanga GP', wardNo: 'Ward 03, 04, 07',
    coordinates: [86.244, 20.314],
    people: 82, assistedPeople: 42, vulnerablePeople: 9,
    cattle: 6, goats: 11, poultry: 13,
    accessDeadline: '13:05', status: 'AT_RISK',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Pravati Swain (ASHA #41)',
    pregnantMothers: 3, bedriddenElderly: 4, kutchaHouses: 28, elevationMeters: 2.8,
    roadType: 'kutcha', riverProximityKm: 0.4,
  },
  {
    id: 'S02', name: 'Nimakana', odiaName: 'ନିମକଣା',
    gramPanchayat: 'Nimakana GP', wardNo: 'Ward 01, 02',
    coordinates: [86.263, 20.326],
    people: 61, assistedPeople: 23, vulnerablePeople: 5,
    cattle: 12, goats: 18, poultry: 24,
    accessDeadline: '13:24', status: 'AT_RISK',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Minati Sethi (ASHA #19)',
    pregnantMothers: 2, bedriddenElderly: 2, kutchaHouses: 19, elevationMeters: 3.1,
    roadType: 'kutcha', riverProximityKm: 0.6,
  },
  {
    id: 'S03', name: 'Jagannathpur', odiaName: 'ଜଗନ୍ନାଥପୁର',
    gramPanchayat: 'Jagannathpur GP', wardNo: 'Ward 02, 05',
    coordinates: [86.219, 20.332],
    people: 49, assistedPeople: 17, vulnerablePeople: 4,
    cattle: 9, goats: 14, poultry: 20,
    accessDeadline: '13:40', status: 'WATCH',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Kabita Das (ASHA #08)',
    pregnantMothers: 1, bedriddenElderly: 3, kutchaHouses: 14, elevationMeters: 3.8,
    roadType: 'pucca', riverProximityKm: 1.2,
  },
  {
    id: 'S04', name: 'Tarajanga', odiaName: 'ତାରାଜଙ୍ଗା',
    gramPanchayat: 'Tarajanga GP', wardNo: 'Ward 04, 06',
    coordinates: [86.282, 20.301],
    people: 71, assistedPeople: 26, vulnerablePeople: 7,
    cattle: 15, goats: 20, poultry: 31,
    accessDeadline: '13:18', status: 'AT_RISK',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Sujata Mohanty (ASHA #14)',
    pregnantMothers: 2, bedriddenElderly: 3, kutchaHouses: 22, elevationMeters: 2.9,
    roadType: 'kutcha', riverProximityKm: 0.5,
  },
  {
    id: 'S05', name: 'Kanimul', odiaName: 'କାନିମୂଳ',
    gramPanchayat: 'Kanimul GP', wardNo: 'Ward 01, 03',
    coordinates: [86.232, 20.287],
    people: 44, assistedPeople: 11, vulnerablePeople: 3,
    cattle: 8, goats: 12, poultry: 18,
    accessDeadline: '14:05', status: 'MONITORING',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Anita Behera (ASHA #32)',
    pregnantMothers: 1, bedriddenElderly: 1, kutchaHouses: 11, elevationMeters: 4.5,
    roadType: 'pucca', riverProximityKm: 1.8,
  },
  {
    id: 'S06', name: 'Tulanga', odiaName: 'ତୁଳଙ୍ଗା',
    gramPanchayat: 'Tulanga GP', wardNo: 'Ward 02, 04',
    coordinates: [86.295, 20.335],
    people: 56, assistedPeople: 16, vulnerablePeople: 4,
    cattle: 11, goats: 16, poultry: 21,
    accessDeadline: '13:52', status: 'WATCH',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Rashmita Barik (ASHA #27)',
    pregnantMothers: 1, bedriddenElderly: 2, kutchaHouses: 16, elevationMeters: 3.5,
    roadType: 'pucca', riverProximityKm: 1.1,
  },
  {
    id: 'S07', name: 'Bodhei', odiaName: 'ବୋଧେଇ',
    gramPanchayat: 'Bodhei GP', wardNo: 'Ward 01',
    coordinates: [86.207, 20.304],
    people: 39, assistedPeople: 9, vulnerablePeople: 2,
    cattle: 5, goats: 9, poultry: 15,
    accessDeadline: '14:10', status: 'MONITORING',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Mamata Nayak (ASHA #05)',
    pregnantMothers: 1, bedriddenElderly: 1, kutchaHouses: 9, elevationMeters: 4.2,
    roadType: 'pucca', riverProximityKm: 2.1,
  },
  {
    id: 'S08', name: 'Krushnanandapur', odiaName: 'କୃଷ୍ଣାନନ୍ଦପୁର',
    gramPanchayat: 'Krushnanandapur GP', wardNo: 'Ward 03',
    coordinates: [86.308, 20.315],
    people: 53, assistedPeople: 14, vulnerablePeople: 4,
    cattle: 10, goats: 13, poultry: 22,
    accessDeadline: '13:48', status: 'WATCH',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Sabita Rout (ASHA #11)',
    pregnantMothers: 1, bedriddenElderly: 2, kutchaHouses: 15, elevationMeters: 3.6,
    roadType: 'pucca', riverProximityKm: 1.4,
  },
  {
    id: 'S09', name: 'Ibrisingh', odiaName: 'ଇବ୍ରିସିଂହ',
    gramPanchayat: 'Ibrisingh GP', wardNo: 'Ward 02',
    coordinates: [86.225, 20.351],
    people: 42, assistedPeople: 12, vulnerablePeople: 3,
    cattle: 7, goats: 11, poultry: 17,
    accessDeadline: '13:58', status: 'WATCH',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Deepa Mallick (ASHA #16)',
    pregnantMothers: 1, bedriddenElderly: 1, kutchaHouses: 12, elevationMeters: 3.4,
    roadType: 'pucca', riverProximityKm: 1.6,
  },
  {
    id: 'S10', name: 'Kanakpur', odiaName: 'କନକପୁର',
    gramPanchayat: 'Kanakpur GP', wardNo: 'Ward 01',
    coordinates: [86.274, 20.354],
    people: 36, assistedPeople: 8, vulnerablePeople: 2,
    cattle: 6, goats: 8, poultry: 14,
    accessDeadline: '14:18', status: 'MONITORING',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Padma Jena (ASHA #21)',
    pregnantMothers: 0, bedriddenElderly: 1, kutchaHouses: 8, elevationMeters: 4.0,
    roadType: 'pucca', riverProximityKm: 2.0,
  },
  {
    id: 'S11', name: 'Gopalpur', odiaName: 'ଗୋପାଳପୁର',
    gramPanchayat: 'Gopalpur GP', wardNo: 'Ward 02',
    coordinates: [86.191, 20.323],
    people: 34, assistedPeople: 7, vulnerablePeople: 2,
    cattle: 4, goats: 7, poultry: 12,
    accessDeadline: '14:25', status: 'MONITORING',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Laxmi Patra (ASHA #03)',
    pregnantMothers: 1, bedriddenElderly: 1, kutchaHouses: 7, elevationMeters: 4.7,
    roadType: 'pucca', riverProximityKm: 2.4,
  },
  {
    id: 'S12', name: 'Biritol', odiaName: 'ବିରିତୋଳ',
    gramPanchayat: 'Biritol GP', wardNo: 'Ward 01',
    coordinates: [86.319, 20.287],
    people: 33, assistedPeople: 7, vulnerablePeople: 2,
    cattle: 5, goats: 8, poultry: 11,
    accessDeadline: '14:12', status: 'MONITORING',
    humanEvacuation: 0, animalEvacuation: 0,
    ashaWorker: 'Jharna Sahoo (ASHA #18)',
    pregnantMothers: 0, bedriddenElderly: 1, kutchaHouses: 6, elevationMeters: 4.8,
    roadType: 'pucca', riverProximityKm: 2.2,
  },
];

// ==================== SHELTERS ====================

export const initialShelters: Shelter[] = [
  { id: 'H1', name: 'Tirtol Cyclone Shelter', coordinates: [86.250, 20.276], capacity: 200, occupancy: 68, incoming: 0 },
  { id: 'H2', name: 'Manijanga Relief Shelter', coordinates: [86.201, 20.271], capacity: 180, occupancy: 92, incoming: 0 },
  { id: 'H3', name: 'Kujang Emergency Shelter', coordinates: [86.321, 20.346], capacity: 220, occupancy: 104, incoming: 0 },
];

// ==================== ANIMAL CAMPS ====================

export const initialAnimalCamps: AnimalCamp[] = [
  {
    id: 'C1', name: 'Tirtol Livestock Relief Camp',
    coordinates: [86.228, 20.263],
    cattleCapacity: 80, cattleOccupancy: 34, incoming: 0,
    water: 'AVAILABLE', fodder: 'AVAILABLE', veterinary: 'AVAILABLE',
  },
  {
    id: 'C2', name: 'Kujang Animal Relief Camp',
    coordinates: [86.314, 20.365],
    cattleCapacity: 100, cattleOccupancy: 41, incoming: 0,
    water: 'AVAILABLE', fodder: 'AVAILABLE', veterinary: 'AVAILABLE',
  },
];

// ==================== VEHICLES ====================

export const initialVehicles: Vehicle[] = [
  {
    id: 'B04', type: 'BUS', label: 'Human Evacuation Bus',
    coordinates: [86.250, 20.280], capacity: 42,
    status: 'AVAILABLE', driver: 'S. Behera',
    progress: 0, speed: 0,
    assignedLocation: 'Tirtol HQ Staging',
  },
  {
    id: 'B06', type: 'BUS', label: 'Human Evacuation Bus',
    coordinates: [86.258, 20.281], capacity: 36,
    status: 'AVAILABLE', driver: 'A. Nayak',
    progress: 0, speed: 0,
    assignedLocation: 'Manijanga Station',
  },
  {
    id: 'T07', type: 'LIVESTOCK_CARRIER', label: 'Livestock Carrier',
    coordinates: [86.246, 20.283],
    usableFloorArea: 7.9, configuredGrossLimit: 5.8,
    status: 'AVAILABLE', driver: 'R. Das',
    animalCompat: ['Cattle', 'Goats'],
    progress: 0, speed: 0,
    assignedLocation: 'Relief Staging Depot',
  },
  {
    id: 'T09', type: 'LIVESTOCK_CARRIER', label: 'Livestock Carrier',
    coordinates: [86.254, 20.285],
    usableFloorArea: 7.2, configuredGrossLimit: 5.5,
    status: 'AVAILABLE', driver: 'P. Sahoo',
    animalCompat: ['Cattle', 'Goats'],
    progress: 0, speed: 0,
    assignedLocation: 'Tirtol HQ Staging',
  },
  {
    id: 'T11', type: 'LIVESTOCK_CARRIER', label: 'District Reserve Carrier',
    coordinates: [86.330, 20.375],
    usableFloorArea: 8.4, configuredGrossLimit: 6.0,
    status: 'RESERVE', driver: 'M. Jena',
    animalCompat: ['Cattle', 'Goats', 'Poultry'],
    progress: 0, speed: 0,
    assignedLocation: 'District Reserve Yard',
  },
  {
    id: 'A02', type: 'AMBULANCE', label: 'Medical Response',
    coordinates: [86.239, 20.281],
    status: 'RESERVED', driver: 'K. Rout',
    progress: 0, speed: 0,
    assignedLocation: 'CHC Tirtol Standby',
  },
  {
    id: 'M01', type: 'MINIBUS', label: 'Assisted Evacuation',
    coordinates: [86.260, 20.278], capacity: 20,
    status: 'AVAILABLE', driver: 'B. Swain',
    progress: 0, speed: 0,
    assignedLocation: 'Tirtol Transit Post',
  },
  {
    id: 'J03', type: 'JEEP', label: 'Field Verification',
    coordinates: [86.243, 20.279],
    status: 'AVAILABLE', driver: 'D. Mohanty',
    progress: 0, speed: 0,
    assignedLocation: 'Field Command Base',
  },
];

// ==================== ROADS ====================

export const initialRoads: Road[] = [
  {
    id: 'EC1', name: 'Tartol Bridge',
    status: 'OPEN', accessUntil: '14:20', critical: true, isElevated: true,
    coordinates: [[86.228, 20.291], [86.230, 20.275]],
  },
  {
    id: 'EC2', name: 'Manijanga Connector Bridge',
    status: 'OPEN', accessUntil: '14:05', critical: true, isElevated: true,
    coordinates: [[86.263, 20.316], [86.265, 20.299]],
  },
  {
    id: 'EC3', name: 'Tarajanga Overpass',
    status: 'OPEN', accessUntil: '13:50', critical: true, isElevated: true,
    coordinates: [[86.282, 20.293], [86.280, 20.278]],
  },
  {
    id: 'R1-E1', name: 'Manijanga Short Corridor',
    status: 'CONDITIONAL', critical: false,
    coordinates: [[86.244, 20.314], [86.238, 20.305], [86.232, 20.296], [86.228, 20.287], [86.224, 20.278]],
  },
  {
    id: 'R3-E1', name: 'Tirtol Relief Corridor',
    status: 'OPEN', critical: false,
    coordinates: [[86.244, 20.314], [86.252, 20.306], [86.260, 20.299], [86.254, 20.289], [86.244, 20.279], [86.228, 20.263]],
  },
  {
    id: 'R4-E1', name: 'Emergency Diversion North',
    status: 'OPEN', critical: false,
    coordinates: [[86.263, 20.326], [86.275, 20.321], [86.287, 20.313], [86.296, 20.301], [86.284, 20.289], [86.267, 20.278], [86.250, 20.276]],
  },
];

// ==================== ROUTES ====================

export const routes: Record<string, Route> = {
  R1: {
    id: 'R1', name: 'Short Corridor',
    distanceKm: 7.8, durationMin: 19, accessMarginMin: 4,
    status: 'RISKY',
    coordinates: [
      [86.244, 20.314],
      [86.238, 20.305],
      [86.232, 20.296],
      [86.228, 20.287],
      [86.224, 20.278],
    ],
    bridgeIds: ['EC1'],
  },
  R3: {
    id: 'R3', name: 'Assured Relief Corridor',
    distanceKm: 9.4, durationMin: 24, accessMarginMin: 38,
    status: 'RECOMMENDED',
    coordinates: [
      [86.244, 20.314],
      [86.249, 20.308],
      [86.254, 20.300],
      [86.250, 20.291],
      [86.240, 20.282],
      [86.232, 20.271],
      [86.228, 20.263],
    ],
    bridgeIds: ['EC1'],
  },
  R4: {
    id: 'R4', name: 'Emergency Diversion',
    distanceKm: 11.2, durationMin: 31, accessMarginMin: 21,
    status: 'ALTERNATIVE',
    coordinates: [
      [86.263, 20.326],
      [86.272, 20.320],
      [86.281, 20.312],
      [86.290, 20.300],
      [86.281, 20.288],
      [86.268, 20.279],
      [86.256, 20.276],
      [86.250, 20.276],
    ],
    bridgeIds: ['EC3'],
  },
};

// ==================== RIVER HYDROLOGY & EMBANKMENTS ====================

export const initialRiverGauges: RiverGauge[] = [
  {
    id: 'G01',
    name: 'Paika Siphon Gauge (Tirtol)',
    odiaName: 'ପାଇକା ସାଇଫନ୍ ଗେଜ୍',
    river: 'Paika Distributary',
    coordinates: [86.255, 20.312],
    waterLevel: 9.35,
    currentLevelM: 9.35,
    status: 'RISING FAST',
    dangerLevel: 8.90,
    warningLevel: 8.20,
    trend: 'RISING_FAST',
    dischargeCusecs: '2.45 Lakh Cusecs',
  },
  {
    id: 'G02',
    name: 'Alipingal River Gauge',
    odiaName: 'ଆଳିପିଙ୍ଗଳ ମହାନଦୀ ଗେଜ୍',
    river: 'Mahanadi Main Stem',
    coordinates: [86.235, 20.345],
    waterLevel: 12.15,
    currentLevelM: 12.15,
    status: 'RISING FAST',
    dangerLevel: 11.76,
    warningLevel: 10.80,
    trend: 'RISING_FAST',
    dischargeCusecs: '8.80 Lakh Cusecs',
  },
  {
    id: 'G03',
    name: 'Chitrotpala Outfall Gauge',
    odiaName: 'ଚିତ୍ରୋତ୍ପଳା ଗେଜ୍',
    river: 'Chitrotpala Delta Channel',
    coordinates: [86.288, 20.285],
    waterLevel: 7.80,
    currentLevelM: 7.80,
    status: 'RISING',
    dangerLevel: 7.95,
    warningLevel: 7.30,
    trend: 'RISING',
    dischargeCusecs: '1.60 Lakh Cusecs',
  },
];

export interface RiverLine {
  id: string;
  name: string;
  odiaName: string;
  coordinates: [number, number][];
  width: number;
  discharge: string;
}

export const riverLines: RiverLine[] = [
  {
    id: 'RIV-01',
    name: 'Mahanadi River Basin',
    odiaName: 'ମହାନଦୀ ମୁଖ୍ୟ ଶାଖା',
    coordinates: [
      [86.180, 20.355],
      [86.205, 20.350],
      [86.235, 20.345],
      [86.265, 20.348],
      [86.295, 20.355],
      [86.325, 20.365],
      [86.345, 20.370],
    ],
    width: 6,
    discharge: '8.80 Lakh Cusecs',
  },
  {
    id: 'RIV-02',
    name: 'Paika River Distributary',
    odiaName: 'ପାଇକା ଶାଖା ନଦୀ',
    coordinates: [
      [86.230, 20.342],
      [86.242, 20.328],
      [86.255, 20.312],
      [86.268, 20.298],
      [86.280, 20.285],
      [86.300, 20.272],
      [86.325, 20.260],
    ],
    width: 4,
    discharge: '2.45 Lakh Cusecs',
  },
  {
    id: 'RIV-03',
    name: 'Chitrotpala Delta Channel',
    odiaName: 'ଚିତ୍ରୋତ୍ପଳା କେନାଲ',
    coordinates: [
      [86.210, 20.335],
      [86.225, 20.310],
      [86.240, 20.290],
      [86.258, 20.275],
      [86.288, 20.265],
    ],
    width: 3,
    discharge: '1.60 Lakh Cusecs',
  },
];

export interface EmbankmentLine {
  id: string;
  name: string;
  odiaName: string;
  status: 'STABLE' | 'VULNERABLE' | 'BREACHED';
  saturationPercent: number;
  coordinates: [number, number][];
}

export const embankmentLines: EmbankmentLine[] = [
  {
    id: 'EMB-01',
    name: 'Paika Right Flood Embankment',
    odiaName: 'ପାଇକା ଡାହାଣ ବନ୍ୟା ବନ୍ଧ',
    status: 'VULNERABLE',
    saturationPercent: 88,
    coordinates: [
      [86.238, 20.330],
      [86.250, 20.315],
      [86.263, 20.301],
      [86.275, 20.288],
    ],
  },
  {
    id: 'EMB-02',
    name: 'Manijanga Protection Ring Bund',
    odiaName: 'ମଣିଜଙ୍ଗା ସୁରକ୍ଷା ରିଙ୍ଗ ବନ୍ଧ',
    status: 'STABLE',
    saturationPercent: 62,
    coordinates: [
      [86.235, 20.320],
      [86.245, 20.310],
      [86.252, 20.305],
    ],
  },
];

// ==================== INITIAL MISSIONS ====================

export const initialMissions: Mission[] = [
  {
    id: 'M12', category: 'HUMAN',
    settlementId: 'S01', vehicleId: 'B04',
    destinationId: 'H2', routeId: 'R3',
    passengers: 42, departure: '12:10',
    status: 'PLANNED', planVersion: 'V1',
  },
  {
    id: 'A27', category: 'LIVESTOCK',
    settlementId: 'S01', vehicleId: 'T07',
    destinationId: 'C1', routeId: 'R3',
    cattle: 6, departure: '12:20',
    status: 'PLANNED', planVersion: 'V1',
  },
  {
    id: 'M31', category: 'HUMAN',
    settlementId: 'S02', vehicleId: 'B06',
    destinationId: 'H1', routeId: 'R1',
    passengers: 23, departure: '12:48',
    status: 'PLANNED', planVersion: 'V1',
    affectedByEC2: true,
  },
  {
    id: 'A41', category: 'LIVESTOCK',
    settlementId: 'S02', vehicleId: 'T09',
    destinationId: 'C2', routeId: 'R1',
    cattle: 12, departure: '13:42',
    status: 'PLANNED', planVersion: 'V1',
    affectedByEC2: true,
  },
  {
    id: 'M15', category: 'HUMAN',
    settlementId: 'S04', vehicleId: 'M01',
    destinationId: 'H1', routeId: 'R3',
    passengers: 26, departure: '12:30',
    status: 'PLANNED', planVersion: 'V1',
  },
  {
    id: 'A32', category: 'LIVESTOCK',
    settlementId: 'S04', vehicleId: 'T09',
    destinationId: 'C1', routeId: 'R3',
    cattle: 15, departure: '12:50',
    status: 'PLANNED', planVersion: 'V1',
  },
  {
    id: 'M44', category: 'HUMAN',
    settlementId: 'S03', vehicleId: 'B04',
    destinationId: 'H2', routeId: 'R3',
    passengers: 17, departure: '13:15',
    status: 'PLANNED', planVersion: 'V1',
    affectedByEC2: true,
  },
  {
    id: 'M55', category: 'HUMAN',
    settlementId: 'S06', vehicleId: 'B06',
    destinationId: 'H3', routeId: 'R4',
    passengers: 16, departure: '13:30',
    status: 'PLANNED', planVersion: 'V1',
  },
];

// ==================== ANIMAL LOAD DEMO ====================

export const animalLoadDemo = {
  missionId: 'A27',
  animals: [
    { id: 'COW-01', species: 'COW' as const, weightKg: 220, label: 'Cow 1' },
    { id: 'COW-02', species: 'COW' as const, weightKg: 270, label: 'Cow 2' },
    { id: 'COW-03', species: 'COW' as const, weightKg: 310, label: 'Cow 3' },
    { id: 'COW-04', species: 'COW' as const, weightKg: 180, label: 'Cow 4' },
    { id: 'COW-05', species: 'COW' as const, weightKg: 240, label: 'Cow 5' },
    { id: 'COW-06', species: 'COW' as const, weightKg: 290, label: 'Cow 6' },
  ],
  totalAnimalWeightKg: 1510,
  vehicleEmptyWeightT: 3.8,
  loadedVehicleGrossT: 5.31,
  requiredFloorArea: 7.2,
  availableFloorArea: 7.9,
  floorAreaResult: 'PASS' as const,
  weightResult: 'PASS' as const,
  routeR1Check: {
    vehicleClass: 'PASS', load: 'PASS', bridge: 'FAIL', time: 'FAIL',
    result: 'REJECTED' as const,
    reason: 'Bridge EC1 weight limit exceeded under flood conditions',
  },
  routeR3Check: {
    vehicleClass: 'PASS', load: 'PASS', roadCompat: 'PASS', time: 'PASS',
    result: 'APPROVED' as const,
    reason: 'All constraints satisfied. Access margin: 38 min.',
  },
};

// ==================== FIELD CHECKS ====================

export const initialFieldChecks = [
  { id: 'FC1', task: 'Verify EC1 (Tartol Bridge) road state', priority: 'HIGH' as const, status: 'PENDING' as const },
  { id: 'FC2', task: 'Confirm T11 driver availability', priority: 'HIGH' as const, status: 'PENDING' as const },
  { id: 'FC3', task: 'Check Camp C1 water supply', priority: 'MEDIUM' as const, status: 'PENDING' as const },
  { id: 'FC4', task: 'Refresh Shelter H2 occupancy count', priority: 'MEDIUM' as const, status: 'PENDING' as const },
  { id: 'FC5', task: 'Inspect Manijanga assembly point', priority: 'HIGH' as const, status: 'PENDING' as const },
];

// ==================== RESOURCE GAP (precomputed) ====================

export const resourceGapData = {
  pendingLivestockCount: 24,
  requiredCarrierAreaM2: 14.8,
  availableAreaM2: 7.9,
  shortfallM2: 6.9,
  options: [
    { label: 'Request additional livestock carrier from District', recommended: true },
    { label: 'Reuse T07 after Mission A27 completes', recommended: false },
    { label: 'Split livestock movement into two separate trips', recommended: false },
  ],
};

// ==================== AFTER-ACTION DATA ====================

export const afterActionData = {
  missions: [
    {
      id: 'M12',
      plannedDeparture: '12:10', actualDeparture: '12:14', departureDiff: '+4 min',
      plannedBridge: '12:41', actualBridge: '12:44', bridgeDiff: '+3 min',
      plannedArrival: '12:34', actualArrival: '12:38', arrivalDiff: '+4 min',
      status: 'COMPLETE',
    },
    {
      id: 'A27',
      plannedDeparture: '12:20', actualDeparture: '12:24', departureDiff: '+4 min',
      plannedBridge: '12:51', actualBridge: '12:54', bridgeDiff: '+3 min',
      plannedArrival: '13:08', actualArrival: '13:12', arrivalDiff: '+4 min',
      status: 'COMPLETE',
    },
  ],
  turnaroundExpectedMin: 16,
  turnaroundActualMin: 20,
  turnaroundDiff: '+4 min',
  recommendations: [
    'Increase livestock loading buffer by 4 min in future plans',
    'Pre-position carriers at assembly points before flood alerts',
    'EC2 bridge monitoring interval reduced from 30 min to 10 min',
  ],
  totalMissionsCompleted: 8,
  totalMissionsPlanned: 8,
  criticalDeadlinesMissed: 0,
  vehiclesUsed: 7,
};

// ==================== FLOOD POLYGON ====================

export const floodPolygons = {
  initial: [
    [86.255, 20.332], [86.275, 20.340], [86.290, 20.328],
    [86.285, 20.312], [86.270, 20.305], [86.258, 20.318],
    [86.250, 20.328], [86.255, 20.332],
  ] as [number, number][],
  advanced: [
    [86.240, 20.342], [86.265, 20.352], [86.295, 20.345],
    [86.310, 20.330], [86.300, 20.310], [86.285, 20.298],
    [86.268, 20.294], [86.255, 20.300], [86.242, 20.310],
    [86.235, 20.325], [86.240, 20.342],
  ] as [number, number][],
};

// Staging area (where vehicles start)
export const STAGING_POINT: [number, number] = [86.248, 20.280];
export const MAP_CENTER: [number, number] = [86.258, 20.308];
export const MAP_ZOOM = 12.2;
