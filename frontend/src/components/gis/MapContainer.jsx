import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import LayerControl from './LayerControl';
import MapLegend from './MapLegend';
import TimeSlider from './TimeSlider';
import { useApp } from '../../context/AppContext';

export default function MapContainer({ minHeight = '520px', onSelectHotspot }) {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    selectedYear, 
    setSelectedYear, 
    lulcData,
    currentRegionMeta
  } = useApp();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  const [basemapType, setBasemapType] = useState('dark');
  const [activeLayers, setActiveLayers] = useState({
    builtUp: true,
    wetlands: true,
    anomalies: true
  });
  const [isDiffMode, setIsDiffMode] = useState(false);

  const HOTSPOTS = [
    {
      id: 'tn-kri',
      name: 'Krishnagiri (NH-44)',
      state: 'Tamil Nadu',
      stateId: 'tn',
      lat: 12.5266,
      lng: 78.2146,
      type: 'ANOMALY',
      growth: '+16.8% Built-Up',
      detail: 'Rapid dry-agrarian conversion for electronics SEZ and logistics hub.'
    },
    {
      id: 'tn-cbe',
      name: 'Coimbatore Peri-Urban',
      state: 'Tamil Nadu',
      stateId: 'tn',
      lat: 11.0168,
      lng: 76.9558,
      type: 'URBAN_SPRAWL',
      growth: '+14.2% Built-Up',
      detail: 'Industrial ring road bypass conversion of agricultural holdings.'
    },
    {
      id: 'ka-blr',
      name: 'Bengaluru Bellandur Basin',
      state: 'Karnataka',
      stateId: 'ka',
      lat: 12.9352,
      lng: 77.6744,
      type: 'WETLAND_BUFFER',
      growth: '-3.8% Water Buffer',
      detail: 'Encroachment flagged within the 30m statutory lake buffer zone.'
    },
    {
      id: 'mh-pun',
      name: 'Pune Chakan Hub',
      state: 'Maharashtra',
      stateId: 'mh',
      lat: 18.7597,
      lng: 73.8567,
      type: 'URBAN_SPRAWL',
      growth: '+15.3% Built-Up',
      detail: 'Automotive industrial land bank expansion into fertile black soil.'
    },
    {
      id: 'mh-rai',
      name: 'Raigad Coastal Zone',
      state: 'Maharashtra',
      stateId: 'mh',
      lat: 18.5158,
      lng: 73.1822,
      type: 'ANOMALY',
      growth: '-2.1% Mangrove',
      detail: 'Port development reclamation near eco-sensitive CRZ-I area.'
    }
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [currentRegionMeta.lat || 15.5, currentRegionMeta.lng || 78.5],
      zoom: currentRegionMeta.zoom || 6,
      zoomControl: false,
      attributionControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    const tileUrl = basemapType === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, { maxZoom: 18, subdomains: 'abcd' }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    layerGroupRef.current = layerGroup;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    const tileUrl = basemapType === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, { maxZoom: 18, subdomains: 'abcd' }).addTo(mapInstanceRef.current);
  }, [basemapType]);

  // Center on Region
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const lat = currentRegionMeta.lat || 15.5;
    const lng = currentRegionMeta.lng || 78.5;
    const zoom = currentRegionMeta.zoom || 6;
    mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.0 });
  }, [selectedRegion, currentRegionMeta]);

  // Render Hotspots & Dynamic LULC Overlays
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    layerGroupRef.current.clearLayers();

    const progress = (selectedYear - 2018) / 8; // 0.0 to 1.0

    HOTSPOTS.forEach(spot => {
      let color = '#3b82f6';
      let radius = 18000;

      if (spot.type === 'ANOMALY') {
        color = '#f43f5e';
        radius = 24000 * (1 + progress * 0.4);
      } else if (spot.type === 'URBAN_SPRAWL') {
        color = '#f59e0b';
        radius = 20000 * (1 + progress * 0.6);
      } else if (spot.type === 'WETLAND_BUFFER') {
        color = '#0284c7';
        radius = 16000 * (1 - progress * 0.2);
      }

      if (spot.type === 'ANOMALY' && !activeLayers.anomalies) return;
      if (spot.type === 'URBAN_SPRAWL' && !activeLayers.builtUp) return;
      if (spot.type === 'WETLAND_BUFFER' && !activeLayers.wetlands) return;

      const circle = L.circle([spot.lat, spot.lng], {
        color: color,
        fillColor: color,
        fillOpacity: isDiffMode ? 0.45 : (0.2 + progress * 0.15),
        radius: radius,
        weight: isDiffMode ? 3 : 2,
        dashArray: isDiffMode ? '6, 6' : null
      }).addTo(layerGroupRef.current);

      const marker = L.circleMarker([spot.lat, spot.lng], {
        radius: 7,
        color: '#ffffff',
        fillColor: color,
        fillOpacity: 1,
        weight: 2
      }).addTo(layerGroupRef.current);

      const popupHtml = `
        <div style="font-family: var(--font-body); padding: 4px; min-width: 210px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <strong style="color: #f8fafc; font-size: 0.9rem;">${spot.name}</strong>
            <span style="font-size: 0.65rem; font-weight: 800; color: ${color}; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">${spot.type}</span>
          </div>
          <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 4px;">State: <strong>${spot.state}</strong></div>
          <div style="font-size: 0.8rem; color: #34d399; font-weight: 700; margin-bottom: 6px;">
            Trend (${selectedYear}): ${spot.growth}
          </div>
          <p style="font-size: 0.75rem; color: #cbd5e1; line-height: 1.3; margin-bottom: 8px;">${spot.detail}</p>
          <div style="text-align: right;">
            <button id="btn-hotspot-${spot.id}" style="background: #10b981; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; cursor: pointer;">
              Focus Region
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      circle.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-hotspot-${spot.id}`);
        if (btn) {
          btn.onclick = () => {
            setSelectedRegion(spot.stateId);
            if (onSelectHotspot) onSelectHotspot(spot);
          };
        }
      });
    });
  }, [selectedYear, activeLayers, isDiffMode]);

  return (
    <div className="glass-panel" style={{
      position: 'relative',
      height: '100%',
      minHeight: minHeight,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top Floating Layer Controls */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        right: '14px',
        zIndex: 500,
        pointerEvents: 'none'
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <LayerControl 
            basemapType={basemapType}
            setBasemapType={setBasemapType}
            activeLayers={activeLayers}
            setActiveLayers={setActiveLayers}
            isDiffMode={isDiffMode}
            setIsDiffMode={setIsDiffMode}
          />
        </div>
      </div>

      {/* Map DOM Element */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '380px' }} />

      {/* Bottom Floating Legend & Temporal Slider */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        left: '14px',
        right: '14px',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none'
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <MapLegend currentDist={lulcData?.distribution_to} />
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <TimeSlider 
            selectedYear={selectedYear}
            onChangeYear={setSelectedYear}
          />
        </div>
      </div>
    </div>
  );
}
