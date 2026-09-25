import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function SprawlChart({ timeSeries = [] }) {
  const data = timeSeries.length > 0 ? timeSeries : [
    { year: 2018, built_up: 11.2, agriculture: 51.5, forest: 20.2, wetlands: 6.8 },
    { year: 2020, built_up: 12.3, agriculture: 50.8, forest: 20.3, wetlands: 6.6 },
    { year: 2022, built_up: 13.8, agriculture: 49.9, forest: 20.4, wetlands: 6.4 },
    { year: 2024, built_up: 16.0, agriculture: 48.7, forest: 20.4, wetlands: 6.1 },
    { year: 2026, built_up: 17.8, agriculture: 47.4, forest: 20.3, wetlands: 5.9 }
  ];

  const svgWidth = 500;
  const svgHeight = 180;
  const padding = { top: 20, right: 30, bottom: 30, left: 35 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // X coordinate mapper
  const getX = (index) => padding.left + (index / (data.length - 1)) * plotWidth;

  // Y coordinate mapper (scaled 0% to 60%)
  const getY = (val) => padding.top + plotHeight - (val / 60) * plotHeight;

  // Build path strings
  const builtUpPoints = data.map((d, i) => `${getX(i)},${getY(d.built_up)}`).join(' ');
  const agriPoints = data.map((d, i) => `${getX(i)},${getY(d.agriculture)}`).join(' ');
  const wetlandsPoints = data.map((d, i) => `${getX(i)},${getY(d.wetlands)}`).join(' ');

  return (
    <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} color="var(--accent-amber)" />
            Decadal Sprawl & Divergence Trajectory (2018–2026)
          </h4>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Comparative trajectory of Built-Up vs. Agrarian vs. Wetland cover
          </span>
        </div>

        {/* Mini Legend */}
        <div style={{ display: 'flex', gap: '10px', fontSize: '0.675rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-rose)' }}>
            <div style={{ width: '8px', height: '3px', background: 'var(--accent-rose)' }} /> Built-Up
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)' }}>
            <div style={{ width: '8px', height: '3px', background: 'var(--accent-emerald)' }} /> Agriculture
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-cyan)' }}>
            <div style={{ width: '8px', height: '3px', background: 'var(--accent-cyan)' }} /> Wetlands
          </span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', maxHeight: '180px' }}>
          {/* Horizontal Grid Lines */}
          {[10, 20, 30, 40, 50].map(yVal => {
            const y = getY(yVal);
            return (
              <g key={yVal}>
                <line 
                  x1={padding.left} 
                  y1={y} 
                  x2={svgWidth - padding.right} 
                  y2={y} 
                  stroke="rgba(255,255,255,0.06)" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={padding.left - 6} 
                  y={y + 3} 
                  fill="var(--text-muted)" 
                  fontSize="9" 
                  textAnchor="end"
                >
                  {yVal}%
                </text>
              </g>
            );
          })}

          {/* Polylines */}
          <polyline fill="none" stroke="var(--accent-rose)" strokeWidth="2.5" points={builtUpPoints} />
          <polyline fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5" points={agriPoints} />
          <polyline fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeDasharray="3 3" points={wetlandsPoints} />

          {/* Data Points & X Axis Labels */}
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <g key={d.year}>
                {/* Year Label */}
                <text x={x} y={svgHeight - 10} fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontWeight="600">
                  {d.year}
                </text>

                {/* Built-Up Point */}
                <circle cx={x} cy={getY(d.built_up)} r="4" fill="var(--accent-rose)" stroke="#ffffff" strokeWidth="1" />
                <text x={x} y={getY(d.built_up) - 8} fill="var(--accent-rose)" fontSize="9" textAnchor="middle" fontWeight="700">
                  {d.built_up}%
                </text>

                {/* Agri Point */}
                <circle cx={x} cy={getY(d.agriculture)} r="4" fill="var(--accent-emerald)" stroke="#ffffff" strokeWidth="1" />

                {/* Wetland Point */}
                <circle cx={x} cy={getY(d.wetlands)} r="3" fill="var(--accent-cyan)" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
