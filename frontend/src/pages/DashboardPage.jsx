import React from 'react';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import MapContainer from '../components/gis/MapContainer';
import LulcMatrix from '../components/analytics/LulcMatrix';
import SprawlChart from '../components/analytics/SprawlChart';
import DistrictRankings from '../components/analytics/DistrictRankings';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Bot, 
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import { formatArea } from '../utils/formatters';

export default function DashboardPage() {
  const { 
    currentRegionMeta, 
    selectedYear, 
    lulcData, 
    anomalies, 
    activityLog,
    setOpenChat,
    setSelectedRegion,
    setActiveTab
  } = useApp();

  const builtUpDelta = lulcData?.delta_matrix?.built_up?.delta_pct || +4.8;
  const unresolvedAnomalies = anomalies.filter(a => !a.is_resolved).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top KPI Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <StatCard 
          title="Monitored Territory"
          value={currentRegionMeta.name}
          subtitle={`Area: ${formatArea(currentRegionMeta.total_area_sqkm)} • ${currentRegionMeta.monitored_parcels || '18.4M'} Parcels`}
          icon={MapPin}
          progress={100}
        />

        <StatCard 
          title="Built-Up Footprint Expansion"
          value={`${builtUpDelta > 0 ? `+${builtUpDelta}` : builtUpDelta}%`}
          subtitle="Net agrarian diversion into logistics & industrial SEZs"
          trend={`${builtUpDelta}%`}
          trendType={builtUpDelta > 5 ? 'negative' : 'neutral'}
          icon={TrendingUp}
          progress={Math.min(100, Math.abs(builtUpDelta) * 5)}
        />

        <StatCard 
          title="Cadastral Georeferencing"
          value={`${currentRegionMeta.digitization_pct || 98.7}%`}
          subtitle="Bhu-Aadhaar (ULPIN) Deeds Synchronization"
          trend="Complete"
          trendType="positive"
          icon={ShieldCheck}
          progress={currentRegionMeta.digitization_pct || 98.7}
        />

        <StatCard 
          title="Active Watchdog Incidents"
          value={`${unresolvedAnomalies} Critical`}
          subtitle="Buffer infringements & unauthorized conversions"
          trend={`${unresolvedAnomalies} Pending`}
          trendType="negative"
          icon={AlertTriangle}
          progress={unresolvedAnomalies * 20}
        />
      </div>

      {/* AI Automated Insight Banner */}
      <div className="glass-panel glass-panel-glow" style={{
        padding: '16px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={20} color="var(--accent-emerald)" className="pulse-indicator" />
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Autonomous Spatial Intelligence Synthesis:
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginLeft: '8px' }}>
              Rapid agrarian diversion detected in <strong>Krishnagiri District (+16.8% built-up expansion)</strong> along the NH-44 Hosur corridor. Recommending immediate review under Section 11 of RFCTLARR Act 2013.
            </span>
          </div>
        </div>

        <button 
          onClick={() => setOpenChat(true)}
          className="btn btn-secondary"
          style={{ fontSize: '0.775rem', whiteSpace: 'nowrap' }}
        >
          <Bot size={15} color="var(--accent-emerald)" />
          <span>Investigate with Bhu-Mitra</span>
        </button>
      </div>

      {/* Core Split: Interactive GIS Map + LULC Matrix & Rankings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', minHeight: '520px' }}>
        <MapContainer 
          minHeight="520px"
          onSelectHotspot={(spot) => {
            setSelectedRegion(spot.stateId);
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <LulcMatrix lulcData={lulcData} totalAreaSqKm={currentRegionMeta.total_area_sqkm} />
          <DistrictRankings onSelectDistrict={(d) => setSelectedRegion(d.stateId)} />
        </div>
      </div>

      {/* Decadal Sprawl Trend Line Chart */}
      <SprawlChart timeSeries={lulcData?.time_series} />

      {/* Recent Activity Audit Log */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--accent-cyan)" />
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
              Recent Administrative Land Governance Audit Trail
            </h4>
          </div>
          <Badge variant="cyan" size="xs">Live Telemetry</Badge>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {activityLog.slice(0, 4).map(act => (
            <div 
              key={act.id}
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  {act.type} • {act.user}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {act.time}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
                {act.event}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
