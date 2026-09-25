import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, MapPin, Bot, Bell } from 'lucide-react';
import Badge from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export default function WatchdogPage() {
  const { anomalies, resolveAnomaly, setSelectedRegion, setActiveTab, setOpenChat } = useApp();

  const unresolvedCount = anomalies.filter(a => !a.is_resolved).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(244, 63, 94, 0.2)',
            border: '1px solid var(--accent-rose)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-rose)'
          }}>
            <Bell size={22} className="pulse-indicator" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                Autonomous Spatial & Policy Watchdog
              </h3>
              <Badge variant="rose">Enforcement Feed</Badge>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Real-time anomaly isolation flagging unauthorized agricultural diversion, wetland buffer infringements, and coastal regulation non-conformance.
            </p>
          </div>
        </div>

        <Badge variant={unresolvedCount > 0 ? 'rose' : 'emerald'} size="md">
          {unresolvedCount} Active Incidents Requiring Triage
        </Badge>
      </div>

      {/* Anomaly Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {anomalies.map(a => (
          <div 
            key={a.id}
            className="glass-panel"
            style={{
              padding: '20px',
              borderLeft: `4px solid ${a.severity === 'CRITICAL' ? 'var(--accent-rose)' : (a.severity === 'HIGH' ? 'var(--accent-amber)' : 'var(--accent-cyan)')}`,
              opacity: a.is_resolved ? 0.6 : 1,
              transition: 'opacity var(--transition-normal)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge variant={a.severity === 'CRITICAL' ? 'rose' : (a.severity === 'HIGH' ? 'amber' : 'cyan')} size="xs">
                  {a.severity}
                </Badge>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={15} color="var(--accent-emerald)" />
                  {a.district}, {a.state}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  • Delta: {a.delta}
                </span>
              </div>

              <button 
                onClick={() => resolveAnomaly(a.id)}
                className={`btn ${a.is_resolved ? 'btn-secondary' : 'btn-primary'}`}
                style={{ fontSize: '0.725rem', padding: '4px 10px' }}
              >
                {a.is_resolved ? (
                  <>
                    <CheckCircle2 size={13} color="var(--accent-emerald)" /> Resolved
                  </>
                ) : (
                  <>
                    <ShieldAlert size={13} /> Mark Enforcement Triage
                  </>
                )}
              </button>
            </div>

            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
              {a.description}
            </p>

            {/* Directive Box */}
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              fontSize: '0.775rem',
              color: 'var(--accent-cyan)',
              marginBottom: '14px'
            }}>
              <strong>Automated Remediation Directive: </strong>{a.recommended_action}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => {
                  setSelectedRegion(a.state === 'Tamil Nadu' ? 'tn' : (a.state === 'Maharashtra' ? 'mh' : 'ka'));
                  setActiveTab('analyze');
                }}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 12px' }}
              >
                <MapPin size={13} /> Inspect Coordinates in GIS
              </button>

              <button 
                onClick={() => setOpenChat(true)}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 12px' }}
              >
                <Bot size={13} /> Ask Bhu-Mitra for Evidence & Precedents
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
