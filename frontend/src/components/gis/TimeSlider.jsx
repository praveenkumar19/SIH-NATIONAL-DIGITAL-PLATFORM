import React, { useState, useEffect } from 'react';
import { Calendar, Play, Pause, RotateCcw } from 'lucide-react';

export default function TimeSlider({ selectedYear, onChangeYear }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const years = [2018, 2020, 2022, 2024, 2026];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        onChangeYear(prev => {
          const idx = years.indexOf(prev);
          if (idx >= years.length - 1) {
            setIsPlaying(false);
            return 2018;
          }
          return years[idx + 1];
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onChangeYear]);

  return (
    <div className="glass-panel" style={{
      background: 'var(--bg-glass)',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      border: '1px solid var(--border-accent)',
      boxShadow: 'var(--shadow-glow)'
    }}>
      {/* Year Label & Play Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause timelapse' : 'Play timelapse'}
          className="btn btn-primary"
          style={{ width: '32px', height: '32px', padding: 0, borderRadius: 'var(--radius-full)' }}
          title={isPlaying ? 'Pause auto-play' : 'Play multi-temporal transition timelapse'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
        </button>

        <button
          onClick={() => onChangeYear(2018)}
          aria-label="Reset to base year 2018"
          className="btn btn-secondary"
          style={{ width: '30px', height: '30px', padding: 0, borderRadius: 'var(--radius-full)' }}
          title="Reset to baseline 2018"
        >
          <RotateCcw size={12} />
        </button>

        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Temporal Satellite Window:
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-heading)' }}>
            {selectedYear} {selectedYear === 2018 ? '(Baseline)' : (selectedYear === 2026 ? '(Projection)' : '(Observed)')}
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <input 
          type="range"
          min="2018"
          max="2026"
          step="2"
          value={selectedYear}
          onChange={(e) => {
            setIsPlaying(false);
            onChangeYear(Number(e.target.value));
          }}
          aria-label="Temporal slider"
          style={{
            width: '100%',
            accentColor: 'var(--accent-emerald)',
            cursor: 'pointer'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          {years.map(y => (
            <span 
              key={y}
              onClick={() => {
                setIsPlaying(false);
                onChangeYear(y);
              }}
              style={{
                cursor: 'pointer',
                fontWeight: selectedYear === y ? 800 : 500,
                color: selectedYear === y ? 'var(--accent-emerald)' : 'var(--text-muted)'
              }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
