import React, { useState } from 'react';
import { Sliders, Cpu, AlertTriangle, TrendingUp, TrendingDown, DollarSign, Droplets, CheckCircle, FileText } from 'lucide-react';
import Badge from '../common/Badge';
import { useApp } from '../../context/AppContext';

export default function PolicySimulator() {
  const { currentRegionMeta, setOpenReportModal } = useApp();

  const [diversionQuota, setDiversionQuota] = useState(8); // % of rainfed agrarian land allowed for conversion
  const [wetlandBuffer, setWetlandBuffer] = useState(300); // meters
  const [mandatorySolarAcreage, setMandatorySolarAcreage] = useState(15); // %

  // Simulated Impact Calculations
  const projectedJobs = Math.round(diversionQuota * 14200);
  const projectedGrainLossTonnes = Math.round(diversionQuota * 8450);
  const aquiferRiskIndex = Math.min(100, Math.round((diversionQuota * 6.5) - (wetlandBuffer * 0.08)));
  const resettlementBudgetCr = Math.round(diversionQuota * 124.5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-rose) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Sliders size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                What-If Policy Simulation Sandbox
              </h3>
              <Badge variant="amber">Predictive Twin</Badge>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Simulate ecological trade-offs, fiscal liabilities, and food security impacts prior to gazette notification for <strong>{currentRegionMeta.name}</strong>.
            </p>
          </div>
        </div>

        <button 
          onClick={() => setOpenReportModal(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.8rem' }}
        >
          <FileText size={15} /> Export Simulation into Dossier
        </button>
      </div>

      {/* Main Grid: Sliders Controls + Simulated Projections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Left Column: Parameter Sliders */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            Adjust Regulatory Levers
          </div>

          {/* Lever 1: Diversion Quota */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Agrarian Conversion Ceiling Quota
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                {diversionQuota}% of dry land
              </span>
            </div>
            <input 
              type="range"
              min="2"
              max="20"
              step="1"
              value={diversionQuota}
              onChange={(e) => setDiversionQuota(Number(e.target.value))}
              aria-label="Agrarian conversion quota slider"
              style={{ width: '100%', accentColor: 'var(--accent-amber)', cursor: 'pointer' }}
            />
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Permissible threshold for non-agricultural industrial SEZ diversion without Cabinet clearance.
            </div>
          </div>

          {/* Lever 2: Wetland Buffer */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Statutory Wetland Eco-Buffer Radius
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {wetlandBuffer} meters
              </span>
            </div>
            <input 
              type="range"
              min="100"
              max="1000"
              step="50"
              value={wetlandBuffer}
              onChange={(e) => setWetlandBuffer(Number(e.target.value))}
              aria-label="Wetland eco-buffer slider"
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Statutory exclusion perimeter around Ramsar & state-notified waterbodies.
            </div>
          </div>

          {/* Lever 3: Renewable Solar Mandate */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Mandatory Rooftop / Solar Canopy Share
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {mandatorySolarAcreage}% of layout
              </span>
            </div>
            <input 
              type="range"
              min="5"
              max="40"
              step="5"
              value={mandatorySolarAcreage}
              onChange={(e) => setMandatorySolarAcreage(Number(e.target.value))}
              aria-label="Solar share slider"
              style={{ width: '100%', accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
            />
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Compulsory clean energy zoning mandated for greenfield industrial parks.
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Outcomes */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            Simulated Macro Projections (5-Year Horizon)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {/* Projected Jobs */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={12} color="var(--accent-emerald)" />
                Direct Employment Creation
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '4px 0' }}>
                +{projectedJobs.toLocaleString('en-IN')} Jobs
              </div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Across electronics, warehousing, and auto clusters
              </div>
            </div>

            {/* Grain Loss */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingDown size={12} color="var(--accent-rose)" />
                Food Crop Loss Risk
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-rose)', margin: '4px 0' }}>
                -{projectedGrainLossTonnes.toLocaleString('en-IN')} T/yr
              </div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Deficit in millets and rainfed pulses harvest
              </div>
            </div>

            {/* Aquifer Risk */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Droplets size={12} color="var(--accent-cyan)" />
                Aquifer Depletion Index
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: aquiferRiskIndex > 50 ? 'var(--accent-amber)' : 'var(--accent-cyan)', margin: '4px 0' }}>
                {aquiferRiskIndex} / 100
              </div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                {aquiferRiskIndex > 50 ? 'High vulnerability buffer alert' : 'Sustainable recharge balance'}
              </div>
            </div>

            {/* Resettlement Liability */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DollarSign size={12} color="var(--accent-amber)" />
                RFCTLARR Sec 26 Fiscal Outlay
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '4px 0' }}>
                ₹{resettlementBudgetCr.toLocaleString('en-IN')} Cr
              </div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Mandatory solatium + multiplication compensation
              </div>
            </div>
          </div>

          {/* AI Executive Summary of Scenario */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
              EXECUTIVE COMPLIANCE ASSESSMENT:
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
              Setting the diversion ceiling to <strong>{diversionQuota}%</strong> delivers substantial industrial employment gains (+{projectedJobs} jobs) but requires statutory compensation allocation of <strong>₹{resettlementBudgetCr} Cr</strong> under Section 26 of RFCTLARR Act 2013. Maintaining a <strong>{wetlandBuffer}m</strong> wetland buffer keeps aquifer stress within manageable limits.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
