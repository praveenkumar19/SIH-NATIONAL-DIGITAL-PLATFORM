import React from 'react';
import MapContainer from '../components/gis/MapContainer';
import Badge from '../components/common/Badge';
import { useApp } from '../context/AppContext';
import { REGIONS } from '../utils/constants';
import { Map, Layers, Download, Compass, FileText } from 'lucide-react';

export default function GisExplorerPage() {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    currentRegionMeta,
    setOpenReportModal
  } = useApp();

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Top Filter and Controls Bar */}
      <div className="glass-panel" style={{
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Map size={18} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
              4D Geospatial Intelligence Explorer
            </h3>
          </div>

          {/* Region Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Jurisdiction:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label="Select state jurisdiction"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {REGIONS.map(r => (
                <option key={r.id} value={r.id} style={{ background: 'var(--bg-secondary)' }}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <Badge variant="cyan" size="xs">EPSG:4326 (WGS84)</Badge>
          <Badge variant="emerald" size="xs">DILRMP Vector Layer Active</Badge>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setOpenReportModal(true)}
            className="btn btn-primary"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <FileText size={14} />
            <span>Generate Spatial Dossier</span>
          </button>
        </div>
      </div>

      {/* Map Explorer Full Frame */}
      <div style={{ flex: 1, minHeight: '500px' }}>
        <MapContainer minHeight="100%" />
      </div>
    </div>
  );
}
