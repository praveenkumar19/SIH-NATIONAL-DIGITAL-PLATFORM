import React from 'react';

export default function Badge({ children, variant = 'emerald', size = 'sm', icon: Icon }) {
  const variantStyles = {
    emerald: { bg: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', border: 'rgba(16, 185, 129, 0.3)' },
    amber: { bg: 'rgba(245, 158, 11, 0.12)', color: 'var(--accent-amber)', border: 'rgba(245, 158, 11, 0.3)' },
    rose: { bg: 'rgba(244, 63, 94, 0.12)', color: 'var(--accent-rose)', border: 'rgba(244, 63, 94, 0.3)' },
    cyan: { bg: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)', border: 'rgba(6, 182, 212, 0.3)' },
    gray: { bg: 'rgba(148, 163, 184, 0.12)', color: 'var(--text-secondary)', border: 'rgba(148, 163, 184, 0.25)' }
  };

  const style = variantStyles[variant] || variantStyles.emerald;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: size === 'xs' ? '1px 6px' : (size === 'md' ? '4px 10px' : '2px 8px'),
      borderRadius: 'var(--radius-full)',
      fontSize: size === 'xs' ? '0.65rem' : (size === 'md' ? '0.775rem' : '0.7rem'),
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      lineHeight: 1.2
    }}>
      {Icon && <Icon size={size === 'xs' ? 10 : 12} />}
      {children}
    </span>
  );
}
