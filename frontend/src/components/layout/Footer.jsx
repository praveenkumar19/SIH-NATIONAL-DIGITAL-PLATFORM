import React from 'react';
import Badge from '../common/Badge';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '16px 24px',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-secondary)',
      fontSize: '0.75rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: 'var(--text-secondary)' }}>BHU-VEDA Platform</strong>
          <span>•</span>
          <span>National Digital Platform for Research, Policy Innovation & Evidence-Based Land Governance</span>
          <span>•</span>
          <Badge variant="cyan" size="xs">OGC WMS / EPSG:4326</Badge>
          <Badge variant="emerald" size="xs">DILRMP Aligned</Badge>
        </div>

        {/* Right Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Ministry of Rural Development</span>
          <span>•</span>
          <span>National Informatics Centre (NIC)</span>
          <span>•</span>
          <span>Government of India</span>
        </div>
      </div>
    </footer>
  );
}
