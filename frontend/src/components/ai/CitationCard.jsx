import React from 'react';
import { BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
import Badge from '../common/Badge';

export default function CitationCard({ citation, onOpenDoc }) {
  if (!citation) return null;

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.6)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 10px',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <BookOpen size={14} color="var(--accent-cyan)" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {citation.source}
          </div>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
            {citation.page} {citation.clause && `• ${citation.clause}`}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {citation.relevance && (
          <Badge variant="emerald" size="xs">
            {Math.round(citation.relevance * 100)}% Match
          </Badge>
        )}
      </div>
    </div>
  );
}
