import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, MapPin, Navigation, Compass, Waves, ShieldAlert,
  Gauge, Eye, Check, ChevronDown, Sparkles
} from 'lucide-react';
import { useDemoStore, MapBasemap } from '../store/useDemoStore';
import {
  routes, floodPolygons, MAP_CENTER, MAP_ZOOM,
  riverLines, embankmentLines, initialRiverGauges
} from '../data/scenario';

// ─── MapLibre Geographical Styles ───────────────────────────────────────────
const SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'esri-satellite': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      attribution: '© Esri, Maxar, Earthstar Geographics'
    }
  },
  layers: [
    {
      id: 'esri-satellite-layer',
      type: 'raster',
      source: 'esri-satellite',
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

const TOPO_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'esri-topo': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      attribution: '© Esri, USGS, CGIAR'
    }
  },
  layers: [
    {
      id: 'esri-topo-layer',
      type: 'raster',
      source: 'esri-topo',
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

const STREETS_STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
const DARK_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// Lifeline bridges
const LIFELINE_BRIDGES = [
  {
    id: 'BR-01',
    name: 'Paika Siphon Culvert',
    odiaName: 'ପାଇକା ସାଇଫନ କଲଭର୍ଟ',
    coords: [86.265, 20.308] as [number, number],
    clearance: '0.28m',
    submergenceTime: '13:05 hrs',
    status: 'WARNING',
    road: 'EC2 Connecting Embankment',
  },
  {
    id: 'BR-04',
    name: 'Bridge 4 (Manijanga Connector)',
    odiaName: 'ମଣିଜଙ୍ଗା ପୋଲ-୪',
    coords: [86.255, 20.298] as [number, number],
    clearance: '0.08m',
    submergenceTime: '12:45 hrs',
    status: 'CRITICAL',
    road: 'Old Canal Embankment',
  },
];

function calculateBearing(start: [number, number], end: [number, number]): number {
  const startLat = (start[1] * Math.PI) / 180;
  const startLng = (start[0] * Math.PI) / 180;
  const endLat = (end[1] * Math.PI) / 180;
  const endLng = (end[0] * Math.PI) / 180;
  const dLng = endLng - startLng;
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

function getCompassHeading(deg: number): string {
  const headings = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return headings[index];
}

export const MissionMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const {
    settlements, vehicles, roads, animalCamps, shelters, riverGauges,
    floodVisible, floodLevel, showLayers, demoStage, activePlanVersion,
    vehicleCoords, selectedSettlementId, selectedVehicleId,
    setSelectedSettlement, setSelectedVehicle, setActivePanel,
    toggleLayer, mapBasemap, setMapBasemap, language
  } = useDemoStore();

  const [mapLoaded, setMapLoaded] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [selectedGaugeId, setSelectedGaugeId] = useState<string | null>(null);

  // Markers ref to track active MapLibre markers
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const vehicleMarkersRef = useRef<Record<string, maplibregl.Marker>>({});
  const prevCoordsRef = useRef<Record<string, [number, number]>>({});

  // Active MapLibre Style source
  const getStyleForBasemap = (basemap: MapBasemap): string | maplibregl.StyleSpecification => {
    switch (basemap) {
      case 'satellite': return SATELLITE_STYLE;
      case 'terrain': return TOPO_STYLE;
      case 'streets': return STREETS_STYLE;
      case 'tactical':
      default: return DARK_STYLE;
    }
  };

  // ── GeoJSON Data Memoization ──────────────────────────────────────────────
  const riversGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: riverLines.map(r => ({
      type: 'Feature' as const,
      geometry: { type: 'LineString' as const, coordinates: r.coordinates },
      properties: { id: r.id, name: r.name, width: r.width, discharge: r.discharge }
    }))
  }), []);

  const embankmentsGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: embankmentLines.map(e => ({
      type: 'Feature' as const,
      geometry: { type: 'LineString' as const, coordinates: e.coordinates },
      properties: {
        id: e.id,
        name: e.name,
        color: e.status === 'BREACHED' ? '#ef4444' : e.status === 'VULNERABLE' ? '#f59e0b' : '#10b981'
      }
    }))
  }), []);

  const floodGeoJSON = useMemo(() => {
    const coords = floodPolygons[floodLevel] || floodPolygons[0];
    return {
      type: 'FeatureCollection' as const,
      features: [{
        type: 'Feature' as const,
        geometry: { type: 'Polygon' as const, coordinates: [coords] },
        properties: { floodLevel }
      }]
    };
  }, [floodLevel]);

  const roadsGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: roads.map(r => {
      const isBreached = r.id === 'EC2' && (demoStage === 'DISRUPTION' || demoStage === 'REPLANNING' || demoStage === 'PLAN_V2' || demoStage === 'EVACUATING_V2');
      return {
        type: 'Feature' as const,
        geometry: { type: 'LineString' as const, coordinates: r.coordinates },
        properties: {
          id: r.id,
          name: r.name,
          color: isBreached ? '#ef4444' : r.status === 'BLOCKED' ? '#ef4444' : r.status === 'THREATENED' ? '#f97316' : '#10b981',
          width: isBreached ? 5 : r.isElevated ? 4 : 2.5,
          isBreached
        }
      };
    })
  }), [roads, demoStage]);

  const routesGeoJSON = useMemo(() => {
    const routeList = Object.values(routes);
    return {
      type: 'FeatureCollection' as const,
      features: routeList.map(r => {
        const isR3 = r.id === 'R3';
        const isR1 = r.id === 'R1';
        return {
          type: 'Feature' as const,
          geometry: { type: 'LineString' as const, coordinates: r.coordinates },
          properties: {
            id: r.id,
            name: r.name,
            color: isR3 ? '#0284C7' : isR1 ? '#E04838' : '#64748b',
            width: isR3 ? 6 : 3,
            opacity: isR3 ? 1.0 : 0.65,
            isR3,
            isR1
          }
        };
      })
    };
  }, [activePlanVersion]);

  // ── Sync MapLibre Vector Layers ───────────────────────────────────────────
  const syncMapLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // 1. Rivers Source & Layers
    if (!map.getSource('rivers-src')) {
      map.addSource('rivers-src', { type: 'geojson', data: riversGeoJSON });
      map.addLayer({
        id: 'rivers-glow',
        type: 'line',
        source: 'rivers-src',
        paint: {
          'line-color': '#0284c7',
          'line-width': ['*', ['get', 'width'], 2],
          'line-opacity': 0.5,
          'line-blur': 2
        }
      });
      map.addLayer({
        id: 'rivers-core',
        type: 'line',
        source: 'rivers-src',
        paint: {
          'line-color': '#38bdf8',
          'line-width': ['get', 'width'],
          'line-opacity': 0.95
        }
      });
    } else {
      (map.getSource('rivers-src') as maplibregl.GeoJSONSource).setData(riversGeoJSON);
    }
    if (map.getLayer('rivers-core')) {
      map.setLayoutProperty('rivers-core', 'visibility', showLayers.rivers ? 'visible' : 'none');
      map.setLayoutProperty('rivers-glow', 'visibility', showLayers.rivers ? 'visible' : 'none');
    }

    // 2. Embankments Source & Layers
    if (!map.getSource('embankments-src')) {
      map.addSource('embankments-src', { type: 'geojson', data: embankmentsGeoJSON });
      map.addLayer({
        id: 'embankments-line',
        type: 'line',
        source: 'embankments-src',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 3,
          'line-dasharray': [3, 1],
          'line-opacity': 0.9
        }
      });
    } else {
      (map.getSource('embankments-src') as maplibregl.GeoJSONSource).setData(embankmentsGeoJSON);
    }
    if (map.getLayer('embankments-line')) {
      map.setLayoutProperty('embankments-line', 'visibility', showLayers.embankments ? 'visible' : 'none');
    }

    // 3. Flood Polygon Source & Layers
    if (!map.getSource('flood-src')) {
      map.addSource('flood-src', { type: 'geojson', data: floodGeoJSON });
      map.addLayer({
        id: 'flood-fill',
        type: 'fill',
        source: 'flood-src',
        paint: {
          'fill-color': '#0284c7',
          'fill-opacity': floodLevel === 2 ? 0.48 : 0.32
        }
      });
      map.addLayer({
        id: 'flood-outline',
        type: 'line',
        source: 'flood-src',
        paint: {
          'line-color': '#00e5ff',
          'line-width': 2.5,
          'line-dasharray': [4, 2],
          'line-opacity': 0.85
        }
      });
    } else {
      (map.getSource('flood-src') as maplibregl.GeoJSONSource).setData(floodGeoJSON);
      if (map.getLayer('flood-fill')) {
        map.setPaintProperty('flood-fill', 'fill-opacity', floodLevel === 2 ? 0.48 : 0.32);
      }
    }
    if (map.getLayer('flood-fill')) {
      const vis = floodVisible && showLayers.flood ? 'visible' : 'none';
      map.setLayoutProperty('flood-fill', 'visibility', vis);
      map.setLayoutProperty('flood-outline', 'visibility', vis);
    }

    // 4. Roads Source & Layers
    if (!map.getSource('roads-src')) {
      map.addSource('roads-src', { type: 'geojson', data: roadsGeoJSON });
      map.addLayer({
        id: 'roads-casing',
        type: 'line',
        source: 'roads-src',
        paint: {
          'line-color': '#000000',
          'line-width': ['+', ['get', 'width'], 3],
          'line-opacity': 0.8
        }
      });
      map.addLayer({
        id: 'roads-line',
        type: 'line',
        source: 'roads-src',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': ['get', 'width'],
          'line-opacity': 0.95
        }
      });
    } else {
      (map.getSource('roads-src') as maplibregl.GeoJSONSource).setData(roadsGeoJSON);
    }
    if (map.getLayer('roads-line')) {
      map.setLayoutProperty('roads-line', 'visibility', showLayers.routes ? 'visible' : 'none');
      map.setLayoutProperty('roads-casing', 'visibility', showLayers.routes ? 'visible' : 'none');
    }

    // 5. Evacuation Corridors Source & Layers
    if (!map.getSource('routes-src')) {
      map.addSource('routes-src', { type: 'geojson', data: routesGeoJSON });
      map.addLayer({
        id: 'routes-glow',
        type: 'line',
        source: 'routes-src',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': ['*', ['get', 'width'], 2],
          'line-opacity': 0.35,
          'line-blur': 4
        }
      });
      map.addLayer({
        id: 'routes-line',
        type: 'line',
        source: 'routes-src',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': ['get', 'width'],
          'line-opacity': ['get', 'opacity']
        }
      });
      map.addLayer({
        id: 'routes-direction-arrows',
        type: 'symbol',
        source: 'routes-src',
        filter: ['==', ['get', 'id'], 'R3'],
        layout: {
          'symbol-placement': 'line',
          'symbol-spacing': 80,
          'text-field': '▶',
          'text-size': 13,
          'text-keep-upright': false,
          'text-allow-overlap': true,
          'text-ignore-placement': true
        },
        paint: {
          'text-color': '#E0A53B',
          'text-halo-color': '#0A130E',
          'text-halo-width': 2
        }
      });
    } else {
      (map.getSource('routes-src') as maplibregl.GeoJSONSource).setData(routesGeoJSON);
    }
    if (map.getLayer('routes-line')) {
      map.setLayoutProperty('routes-line', 'visibility', showLayers.routes ? 'visible' : 'none');
      map.setLayoutProperty('routes-glow', 'visibility', showLayers.routes ? 'visible' : 'none');
      if (map.getLayer('routes-direction-arrows')) {
        map.setLayoutProperty('routes-direction-arrows', 'visibility', showLayers.routes ? 'visible' : 'none');
      }
    }
  }, [riversGeoJSON, embankmentsGeoJSON, floodGeoJSON, roadsGeoJSON, routesGeoJSON, floodVisible, floodLevel, showLayers]);

  // ── Sync MapLibre HTML Markers ────────────────────────────────────────────
  const syncMarkers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old non-vehicle markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // 1. Settlements Markers
    if (showLayers.settlements) {
      settlements.forEach(s => {
        const isSelected = selectedSettlementId === s.id;
        const isCritical = s.status === 'AT_RISK';
        const isWatch = s.status === 'WATCH';
        const statusBg = isCritical ? '#ef4444' : isWatch ? '#f59e0b' : '#0ea5e9';

        const el = document.createElement('div');
        el.className = 'cursor-pointer select-none transition-transform hover:scale-105';
        el.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; pointer-events: auto;">
            <div style="
              display: flex; align-items: center; gap: 6px;
              padding: 4px 8px; border-radius: 9999px;
              background: ${isSelected ? '#FAF8F5' : '#121620'};
              color: ${isSelected ? '#0A0D14' : '#FAF8F5'};
              border: 1.5px solid ${isSelected ? '#D4AF37' : isCritical ? '#DC2626' : 'rgba(220,195,165,0.25)'};
              box-shadow: 0 4px 14px rgba(0,0,0,0.6);
            ">
              <div style="
                width: 7px; height: 7px; border-radius: 9999px;
                background: ${statusBg};
                box-shadow: 0 0 8px ${statusBg};
              "></div>
              <span style="font-family: monospace; font-weight: 800; font-size: 11px;">${s.name}</span>
              <span style="font-size: 9px; font-weight: 700; padding: 1px 4px; border-radius: 4px; background: ${statusBg}25; color: ${statusBg};">
                ${s.status.replace('_', ' ')}
              </span>
            </div>
            <div style="
              margin-top: 2px; display: flex; gap: 6px; font-family: monospace; font-size: 9px;
              color: #FAF8F5; background: rgba(10,13,20,0.9); padding: 2px 6px; border-radius: 6px;
              border: 1px solid rgba(255,255,255,0.08);
            ">
              <span>👥 ${s.people}</span>
              <span>🐄 ${s.cattle}</span>
              <span style="color: #f97316;">⏱️ ${s.accessDeadline}</span>
            </div>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedSettlement(s.id);
          setSelectedVehicle(null);
          setActivePanel('access_horizon');
        });

        const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat(s.coordinates)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }

    // 2. Lifeline Bridges Markers
    LIFELINE_BRIDGES.forEach(bridge => {
      const isBreached = bridge.id === 'BR-04' && (demoStage === 'DISRUPTION' || demoStage === 'REPLANNING' || demoStage === 'PLAN_V2' || demoStage === 'EVACUATING_V2');
      const el = document.createElement('div');
      el.className = 'cursor-pointer select-none';
      el.innerHTML = `
        <div style="
          padding: 4px 8px; border-radius: 8px;
          background: ${isBreached ? '#7f1d1d' : '#18202F'};
          border: 1.5px solid ${isBreached ? '#DC2626' : '#D4AF37'};
          color: #FAF8F5; font-family: monospace; font-size: 10px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.7);
        ">
          <div style="display: flex; align-items: center; gap: 4px; font-weight: 800;">
            <span>🌉</span>
            <span>${bridge.name}</span>
            ${isBreached ? '<span style="color:#ef4444; font-weight:900;">[SUBMERGED]</span>' : ''}
          </div>
          <div style="font-size: 9px; color: ${isBreached ? '#fca5a5' : '#D4AF37'}; margin-top: 1px;">
            ${isBreached ? 'WATER OVERTOPPED • ROAD BLOCKED' : `CLR: ${bridge.clearance} • CLOSES ${bridge.submergenceTime}`}
          </div>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(bridge.coords)
        .addTo(map);

      markersRef.current.push(marker);
    });

    // 3. Cyclone Shelters Markers
    if (showLayers.shelters) {
      shelters.forEach(sh => {
        const el = document.createElement('div');
        el.className = 'select-none';
        el.innerHTML = `
          <div style="
            display: flex; align-items: center; gap: 4px; padding: 3px 6px; border-radius: 6px;
            background: #0284C7; color: white; font-family: monospace; font-size: 10px; font-weight: 800;
            border: 1px solid #38BDF8; box-shadow: 0 2px 10px rgba(0,0,0,0.5);
          ">
            <span>🏫</span>
            <span>${sh.id}: ${sh.name}</span>
            <span style="font-size: 8px; opacity: 0.85;">(${sh.occupancy}/${sh.capacity} pax)</span>
          </div>
        `;

        const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat(sh.coordinates)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }

    // 4. Animal Relief Camps (Go-Sadans)
    if (showLayers.shelters) {
      animalCamps.forEach(ac => {
        const el = document.createElement('div');
        el.className = 'select-none';
        el.innerHTML = `
          <div style="
            display: flex; align-items: center; gap: 4px; padding: 3px 6px; border-radius: 6px;
            background: #D97706; color: white; font-family: monospace; font-size: 10px; font-weight: 800;
            border: 1px solid #FDE047; box-shadow: 0 2px 10px rgba(0,0,0,0.5);
          ">
            <span>🌾</span>
            <span>${ac.id}: ${ac.name}</span>
            <span style="font-size: 8px; opacity: 0.85;">(${ac.cattleOccupancy}/${ac.cattleCapacity} cattle)</span>
          </div>
        `;

        const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat(ac.coordinates)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }

    // 5. Hydrological Telemetry Gauges
    if (showLayers.gauges) {
      riverGauges.forEach(g => {
        const isDanger = g.waterLevel >= g.dangerLevel;
        const el = document.createElement('div');
        el.className = 'select-none';
        el.innerHTML = `
          <div style="
            display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 6px;
            background: ${isDanger ? 'rgba(220,38,38,0.9)' : 'rgba(18,22,32,0.9)'};
            color: white; font-family: monospace; font-size: 9px;
            border: 1px solid ${isDanger ? '#ef4444' : 'rgba(2,132,199,0.5)'};
          ">
            <span>💧</span>
            <span>${g.id}: <strong>${g.waterLevel.toFixed(2)}m</strong></span>
            <span style="color: ${isDanger ? '#fef08a' : '#86efac'}; font-size: 8px;">
              ${isDanger ? 'DANGER' : 'NORMAL'}
            </span>
          </div>
        `;

        const marker = new maplibregl.Marker({ element: el, anchor: 'top' })
          .setLngLat(g.coordinates)
          .addTo(map);

        markersRef.current.push(marker);
      });
    }
  }, [settlements, shelters, animalCamps, riverGauges, showLayers, selectedSettlementId, demoStage, setSelectedSettlement, setSelectedVehicle, setActivePanel]);

  // ── Sync Vehicle Markers & GPS Telemetry ──────────────────────────────────
  const syncVehicles = useCallback(() => {
    const map = mapRef.current;
    if (!map || !showLayers.vehicles) return;

    vehicles.forEach((v, index) => {
      // Don't show reserve unless escalated
      if (v.status === 'RESERVE' && !['ESCALATION', 'EVACUATING_V2', 'COMPLETED'].includes(demoStage)) {
        if (vehicleMarkersRef.current[v.id]) {
          vehicleMarkersRef.current[v.id].remove();
          delete vehicleMarkersRef.current[v.id];
        }
        return;
      }

      let coords = vehicleCoords[v.id] || v.coordinates;
      const isSelected = selectedVehicleId === v.id;
      const isMoving = ['EN_ROUTE_TO_PICKUP', 'EN_ROUTE', 'IN_TRANSIT'].includes(v.status);
      const icon = v.type === 'LIVESTOCK_CARRIER' ? '🚛' : v.type === 'BUS' ? '🚌' : v.type === 'AMBULANCE' ? '🚑' : '🚙';

      // Stagger resting depot vehicles in an orderly fleet grid so badges don't overlap
      if (!isMoving && (!vehicleCoords[v.id] || (v.coordinates[0] === coords[0] && v.coordinates[1] === coords[1]))) {
        const col = index % 3;
        const row = Math.floor(index / 3);
        coords = [coords[0] + (col - 1) * 0.006, coords[1] + (row - 0.5) * 0.0035];
      }

      // Calculate travel direction if moving
      const prev = prevCoordsRef.current[v.id];
      let bearing = 142; // default southeast towards Camp C1
      if (prev && (prev[0] !== coords[0] || prev[1] !== coords[1])) {
        bearing = Math.round(calculateBearing(prev, coords));
      }
      prevCoordsRef.current[v.id] = coords;
      const cardinal = getCompassHeading(bearing);
      const destName = v.type === 'LIVESTOCK_CARRIER' ? 'CAMP C1' : 'SHELTER H1';

      const markerContent = `
        <div style="
          display: flex; align-items: center; gap: 5px; padding: 4px 8px; border-radius: 9999px;
          background: ${v.type === 'LIVESTOCK_CARRIER' ? '#E0A53B' : '#0284C7'};
          color: white; font-family: monospace; font-size: 11px; font-weight: 800;
          border: 2px solid ${isSelected ? '#FFFFFF' : v.type === 'LIVESTOCK_CARRIER' ? '#FDE047' : '#38BDF8'};
          box-shadow: 0 0 18px ${v.type === 'LIVESTOCK_CARRIER' ? 'rgba(224,165,59,0.85)' : 'rgba(2,132,199,0.85)'};
        ">
          <span style="font-size: 13px;">${icon}</span>
          <span>${v.id}</span>
          ${isMoving ? `
            <span style="
              font-size: 9px; padding: 1px 6px; border-radius: 4px;
              background: rgba(10,19,14,0.75); color: #FAF8F5;
              display: flex; align-items: center; gap: 3px; border: 1px solid rgba(255,255,255,0.15);
            ">
              <span style="display:inline-block; transform: rotate(${bearing - 45}deg); font-size: 10px; color: #FDE047;">➤</span>
              <span>${cardinal} ${bearing}°</span>
              <span style="color:#86EFAC;">→ ${destName}</span>
            </span>
            <span style="width:6px;height:6px;border-radius:9999px;background:#86efac;animation:ping 1.5s infinite;"></span>
          ` : ''}
        </div>
      `;

      if (!vehicleMarkersRef.current[v.id]) {
        const el = document.createElement('div');
        el.className = 'cursor-pointer select-none';
        el.id = `veh-marker-${v.id}`;
        el.innerHTML = markerContent;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedVehicle(v.id);
          setSelectedSettlement(null);
          setActivePanel('none');
        });

        const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat(coords)
          .addTo(map);

        vehicleMarkersRef.current[v.id] = marker;
      } else {
        vehicleMarkersRef.current[v.id].setLngLat(coords);
        const el = vehicleMarkersRef.current[v.id].getElement();
        if (el) {
          el.innerHTML = markerContent;
        }
      }
    });
  }, [vehicles, vehicleCoords, selectedVehicleId, showLayers.vehicles, demoStage, setSelectedVehicle, setSelectedSettlement, setActivePanel]);

  // ── Initialize Native MapLibre GL ─────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialStyle = getStyleForBasemap(mapBasemap);

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left');

    map.on('load', () => {
      setMapLoaded(true);
      mapRef.current = map;
      syncMapLayers();
      syncMarkers();
      syncVehicles();
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach(m => m.remove());
      Object.values(vehicleMarkersRef.current).forEach(m => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle Basemap Switch
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const newStyle = getStyleForBasemap(mapBasemap);
    map.setStyle(newStyle);

    map.once('style.load', () => {
      syncMapLayers();
      syncMarkers();
      syncVehicles();
    });
  }, [mapBasemap]);

  // Re-sync layers & markers when store changes
  useEffect(() => {
    if (mapLoaded) {
      syncMapLayers();
      syncMarkers();
      syncVehicles();
    }
  }, [mapLoaded, syncMapLayers, syncMarkers, syncVehicles]);

  // Auto-fly camera on key workflow stages
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (demoStage === 'FLOOD_ALERT') {
      map.flyTo({ center: [86.268, 20.318], zoom: 12.5, duration: 1800 });
    } else if (demoStage === 'COMPLETED') {
      map.flyTo({ center: MAP_CENTER, zoom: 11.2, duration: 1800 });
    }
  }, [demoStage, mapLoaded]);

  // Fly to selected village
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !selectedSettlementId) return;

    const s = settlements.find(st => st.id === selectedSettlementId);
    if (s) {
      map.flyTo({ center: s.coordinates, zoom: 13.2, duration: 1000 });
    }
  }, [selectedSettlementId, mapLoaded, settlements]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A0D14] select-none">
      {/* ── Native MapLibre GL WebGL Canvas Container ── */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* ── Floating Basemap Selector HUD ── */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 rounded-2xl crisis-card shadow-2xl backdrop-blur-md">
        {(['satellite', 'terrain', 'streets', 'tactical'] as MapBasemap[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setMapBasemap(mode)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              mapBasemap === mode
                ? 'bg-[#FAF8F5] text-[#0A0D14] shadow-md'
                : 'text-[#E2D9CE]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{mode === 'satellite' ? '🛰️' : mode === 'terrain' ? '⛰️' : mode === 'streets' ? '🗺️' : '⬛'}</span>
            <span>{mode}</span>
          </button>
        ))}
      </div>

      {/* ── Layers & Intelligence Filter Menu ── */}
      <div className="absolute top-16 left-4 z-20">
        <button
          onClick={() => setShowLayerMenu(!showLayerMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold crisis-card hover:bg-white/10 transition-all text-[#FAF8F5]"
        >
          <Layers size={14} className="text-[#0284C7]" />
          <span>LAYERS & FILTERS</span>
          <ChevronDown size={12} className={`transition-transform ${showLayerMenu ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showLayerMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 p-3 rounded-2xl crisis-card shadow-2xl w-56 flex flex-col gap-2"
            >
              {[
                { key: 'settlements', label: 'Village Communities', icon: '🏘️' },
                { key: 'routes', label: 'Roads & Corridors', icon: '🛣️' },
                { key: 'flood', label: 'Flood Inundation', icon: '🌊' },
                { key: 'rivers', label: 'River Distributaries', icon: '💧' },
                { key: 'embankments', label: 'Flood Bunds', icon: '🛡️' },
                { key: 'shelters', label: 'Shelters & Go-Sadans', icon: '🏫' },
                { key: 'vehicles', label: 'Rescue Fleet GPS', icon: '🚛' },
                { key: 'gauges', label: 'River Telemetry Gauges', icon: '📊' },
              ].map(item => (
                <label
                  key={item.key}
                  className="flex items-center justify-between text-xs font-mono text-[#E2D9CE]/80 hover:text-white cursor-pointer py-1"
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={(showLayers as any)[item.key]}
                    onChange={() => toggleLayer(item.key as any)}
                    className="accent-[#0284C7] rounded"
                  />
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MapLibre GL Attribution Badge ── */}
      <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="px-2.5 py-1 rounded-lg bg-[#0A0D14]/90 border border-white/10 text-[9px] font-mono text-[#E2D9CE]/60 flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
          <span>MAPLIBRE GL v6.7 • HIGH RESOLUTION DISASTER RADAR</span>
        </div>
      </div>
    </div>
  );
};
