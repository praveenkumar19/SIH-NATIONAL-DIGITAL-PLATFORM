import React from 'react';
import { LULC_CATEGORIES } from '../../utils/constants';

export default function MapLegend({ currentDist = {} }) {
  return (
    <div className="glass-panel" style={{
      padding: '8px 12px',
      background: 'var(--bg-glass)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      border: '1px solid var(--border-subtle)'
    }}>
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
        LULC Classification:
      </span>
      {LULC_CATEGORIES.map(cat => (
        <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '2px',
            background: cat.color,
            boxShadow: `0 0 6px ${cat.color}60`
          }} />
          <span style={{ fontSize: '0.725rem', color: 'var(--text-primary)' }}>
            {cat.label}
          </span>
          {currentDist[cat.key] !== undefined && (
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              ({currentDist[cat.key]}%)
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
