import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendType = 'positive', // 'positive' (green), 'negative' (red), 'neutral' (amber)
  icon: Icon,
  progress = null
}) {
  return (
    <div className="glass-panel" style={{
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-emerald)'
          }}>
            <Icon size={16} />
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.02em'
        }}>
          {value}
        </div>

        {trend && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: trendType === 'positive' ? 'var(--accent-emerald)' : (trendType === 'negative' ? 'var(--accent-rose)' : 'var(--accent-amber)')
          }}>
            {trendType === 'positive' ? <TrendingUp size={12} /> : (trendType === 'negative' ? <TrendingDown size={12} /> : <Minus size={12} />)}
            {trend}
          </div>
        )}
      </div>

      {/* Subtitle / Context Note */}
      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
        {subtitle}
      </div>

      {/* Progress Sparkline if provided */}
      {progress !== null && (
        <div style={{
          height: '4px',
          width: '100%',
          background: 'var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginTop: '10px'
        }}>
          <div style={{
            height: '100%',
            width: `${Math.min(100, Math.max(0, progress))}%`,
            background: 'var(--accent-emerald)',
            transition: 'width 0.6s ease'
          }} />
        </div>
      )}
    </div>
  );
}
