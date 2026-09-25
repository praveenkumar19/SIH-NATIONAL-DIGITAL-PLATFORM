import React from 'react';
import { Layers, Eye, ShieldAlert, Sparkles } from 'lucide-react';

export default function LayerControl({
  basemapType,
  setBasemapType,
  activeLayers,
  setActiveLayers,
  isDiffMode,
  setIsDiffMode
}) {
  return (
    <div className="glass-panel" style={{
      background: 'var(--bg-glass)',
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
      border: '1px solid var(--border-subtle)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
        <Layers size={14} color="var(--accent-emerald)" />
        <span>Layers:</span>
      </div>

      {/* Layer Toggles */}
      <button
        onClick={() => setActiveLayers(p => ({ ...p, builtUp: !p.builtUp }))}
        style={{
          background: activeLayers.builtUp ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
          border: activeLayers.builtUp ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
          color: activeLayers.builtUp ? 'var(--accent-rose)' : 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Built-Up
      </button>

      <button
        onClick={() => setActiveLayers(p => ({ ...p, wetlands: !p.wetlands }))}
        style={{
          background: activeLayers.wetlands ? 'rgba(2, 132, 199, 0.2)' : 'transparent',
          border: activeLayers.wetlands ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
          color: activeLayers.wetlands ? 'var(--accent-cyan)' : 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Wetlands Buffer
      </button>

      <button
        onClick={() => setActiveLayers(p => ({ ...p, anomalies: !p.anomalies }))}
        style={{
          background: activeLayers.anomalies ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
          border: activeLayers.anomalies ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
          color: activeLayers.anomalies ? 'var(--accent-amber)' : 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Anomalies
      </button>

      {/* Basemap Switch */}
      <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
        <button
          onClick={() => setBasemapType('dark')}
          className={`btn ${basemapType === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '2px 8px', fontSize: '0.675rem' }}
        >
          Dark Vector
        </button>
        <button
          onClick={() => setBasemapType('satellite')}
          className={`btn ${basemapType === 'satellite' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '2px 8px', fontSize: '0.675rem' }}
        >
          Satellite
        </button>
      </div>

      {/* Diff Mode Toggle */}
      <button
        onClick={() => setIsDiffMode(!isDiffMode)}
        style={{
          background: isDiffMode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 41, 59, 0.6)',
          border: isDiffMode ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
          color: isDiffMode ? 'var(--accent-emerald)' : 'var(--text-secondary)',
          fontSize: '0.675rem',
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <Sparkles size={12} />
        <span>Diff Overlay Mode</span>
      </button>
    </div>
  );
}
