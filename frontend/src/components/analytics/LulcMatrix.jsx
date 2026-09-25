import React from 'react';
import { LULC_CATEGORIES } from '../../utils/constants';
import { formatPercent } from '../../utils/formatters';
import Badge from '../common/Badge';
import { Table, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function LulcMatrix({ lulcData, totalAreaSqKm = 130060 }) {
  const distFrom = lulcData?.distribution_from || { built_up: 11.2, agriculture: 51.5, forest: 20.2, wetlands: 6.8, barren: 10.3 };
  const distTo = lulcData?.distribution_to || { built_up: 16.0, agriculture: 48.7, forest: 20.4, wetlands: 6.1, barren: 8.8 };
  const delta = lulcData?.delta_matrix || {};

  return (
    <div className="glass-panel" style={{ padding: '18px 20px', overflowX: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Table size={16} color="var(--accent-emerald)" />
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
            Quantitative Transition Matrix
          </h4>
        </div>
        <Badge variant="cyan" size="xs">Pixel-Wise Differencing</Badge>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.775rem', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
            <th style={{ padding: '8px 6px', fontWeight: 600 }}>Classification</th>
            <th style={{ padding: '8px 6px', fontWeight: 600 }}>2018 Base</th>
            <th style={{ padding: '8px 6px', fontWeight: 600 }}>{lulcData?.to_year || 2024} Observed</th>
            <th style={{ padding: '8px 6px', fontWeight: 600 }}>Net Delta</th>
            <th style={{ padding: '8px 6px', fontWeight: 600 }}>Approx Area Shift</th>
          </tr>
        </thead>
        <tbody>
          {LULC_CATEGORIES.map(cat => {
            const fromPct = distFrom[cat.key] || 0;
            const toPct = distTo[cat.key] || 0;
            const d = delta[cat.key]?.delta_pct ?? (toPct - fromPct);
            const isPos = d > 0;
            const areaShiftSqKm = Math.round((Math.abs(d) / 100) * totalAreaSqKm);

            return (
              <tr key={cat.key} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '10px 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cat.label}</span>
                </td>
                <td style={{ padding: '10px 6px', color: 'var(--text-secondary)' }}>
                  {fromPct.toFixed(1)}%
                </td>
                <td style={{ padding: '10px 6px', color: 'var(--text-primary)', fontWeight: 700 }}>
                  {toPct.toFixed(1)}%
                </td>
                <td style={{ padding: '10px 6px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontWeight: 700,
                    color: cat.key === 'built_up' ? (isPos ? 'var(--accent-amber)' : 'var(--accent-emerald)') : (isPos ? 'var(--accent-emerald)' : 'var(--accent-rose)')
                  }}>
                    {isPos ? <TrendingUp size={12} /> : (d < 0 ? <TrendingDown size={12} /> : <Minus size={12} />)}
                    {formatPercent(d)}
                  </span>
                </td>
                <td style={{ padding: '10px 6px', color: 'var(--text-muted)' }}>
                  {d > 0 ? `+${areaShiftSqKm.toLocaleString('en-IN')}` : `-${areaShiftSqKm.toLocaleString('en-IN')}`} km²
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
