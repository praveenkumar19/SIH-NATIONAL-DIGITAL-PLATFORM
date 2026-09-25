import React from 'react';

export default function SkeletonLoader({ rows = 3, height = '24px' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div 
          key={i} 
          style={{
            height: height,
            width: '100%',
            background: 'linear-gradient(90deg, var(--bg-card) 25%, var(--bg-card-hover) 50%, var(--bg-card) 75%)',
            backgroundSize: '200% 100%',
            animation: 'alertPulse 1.8s infinite',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      ))}
    </div>
  );
}
