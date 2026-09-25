import React from 'react';
import { ShieldAlert, ArrowRight, MapPin } from 'lucide-react';
import Badge from '../common/Badge';

export default function DistrictRankings({ onSelectDistrict }) {
  const RANKED_DISTRICTS = [
    { id: 'tn-kri', name: 'Krishnagiri', state: 'Tamil Nadu', stateId: 'tn', growth: '+16.8% Built-Up', loss: '-5.4% Agri', risk: 'CRITICAL', reason: 'High-speed electronics corridor diversion (NH-44)' },
    { id: 'ka-blr', name: 'Bengaluru Urban', state: 'Karnataka', stateId: 'ka', growth: '+19.4% Built-Up', loss: '-3.8% Lake Buffer', risk: 'CRITICAL', reason: 'Bellandur feeder wetland buffer infringements' },
    { id: 'tn-cbe', name: 'Coimbatore', state: 'Tamil Nadu', stateId: 'tn', growth: '+14.2% Built-Up', loss: '-4.1% Agri', risk: 'HIGH', reason: 'Peripheral logistics bypass conversion' },
    { id: 'mh-pun', name: 'Pune (Chakan)', state: 'Maharashtra', stateId: 'mh', growth: '+15.3% Built-Up', loss: '-4.6% Agri', risk: 'HIGH', reason: 'Automotive SEZ absorption of prime agrarian soil' },
    { id: 'mh-rai', name: 'Raigad', state: 'Maharashtra', stateId: 'mh', growth: '+12.1% Built-Up', loss: '-2.1% Mangrove', risk: 'MEDIUM', reason: 'Port terminal reclamation near coastal zone' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} color="var(--accent-rose)" />
            Vulnerability & Conversion Velocity Index
          </h4>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Districts exceeding 3-year standard deviation threshold
          </span>
        </div>
        <Badge variant="rose" size="xs">Auto-Ranked</Badge>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {RANKED_DISTRICTS.map((d, index) => (
          <div 
            key={d.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              gap: '10px',
              transition: 'border-color var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                color: 'var(--text-muted)',
                width: '18px'
              }}>
                0{index + 1}
              </span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {d.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    ({d.state})
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  {d.reason}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'right' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-rose)', fontFamily: 'var(--font-heading)' }}>
                  {d.growth}
                </div>
                <div style={{ fontSize: '0.675rem', color: 'var(--accent-cyan)' }}>
                  {d.loss}
                </div>
              </div>

              <Badge variant={d.risk === 'CRITICAL' ? 'rose' : (d.risk === 'HIGH' ? 'amber' : 'cyan')} size="xs">
                {d.risk}
              </Badge>

              {onSelectDistrict && (
                <button
                  onClick={() => onSelectDistrict(d)}
                  className="btn btn-secondary"
                  style={{ padding: '4px', borderRadius: 'var(--radius-sm)' }}
                  title="Drill-down into district in GIS"
                >
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
