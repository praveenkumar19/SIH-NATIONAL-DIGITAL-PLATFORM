import React, { useState } from 'react';
import { BookOpen, Search, FileCheck, Layers, Bot, ExternalLink, ShieldCheck } from 'lucide-react';
import Badge from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export default function PolicyHubPage() {
  const { policies, setOpenChat, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = policies.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.keywords?.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterType === 'ALL') return matchesSearch;
    return matchesSearch && p.type.toLowerCase().includes(filterType.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-emerald) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                Statutory Policy & Empirical Research Repository
              </h3>
              <Badge variant="cyan">Evidence Hub</Badge>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Validated repository of central legislations, gazette notifications, and peer-reviewed empirical spatial research.
            </p>
          </div>
        </div>

        <button 
          onClick={() => setOpenChat(true)}
          className="btn btn-secondary"
          style={{ fontSize: '0.775rem' }}
        >
          <Bot size={14} color="var(--accent-emerald)" />
          <span>Ask Bhu-Mitra to Cross-Reference</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search acts (e.g. RFCTLARR 2013), buffer rules, or author names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'Legislation', 'Rules', 'Research'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                background: filterType === type ? 'var(--accent-emerald)' : 'var(--bg-secondary)',
                color: filterType === type ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Policy and Research Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
        {filtered.map(p => (
          <div 
            key={p.id}
            className="glass-panel"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                <Badge variant={p.type.includes('Research') ? 'cyan' : 'emerald'} size="xs">
                  {p.type}
                </Badge>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Year: {p.year}</span>
              </div>

              <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.3 }}>
                {p.title}
              </h4>

              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '10px', fontWeight: 600 }}>
                {p.authority}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px' }}>
                {p.summary}
              </p>

              {/* Key Statutory Clauses */}
              {p.key_clauses && (
                <div style={{ background: 'var(--bg-glass)', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Key Statutory Clauses:
                  </div>
                  {p.key_clauses.map((c, i) => (
                    <div key={i} style={{ fontSize: '0.725rem', color: 'var(--text-primary)', marginBottom: '3px' }}>
                      • {c}
                    </div>
                  ))}
                </div>
              )}

              {/* Empirical Evidence Note */}
              {p.empirical_evidence && (
                <div style={{ fontSize: '0.725rem', color: 'var(--accent-emerald)', marginBottom: '14px', background: 'rgba(16, 185, 129, 0.08)', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Empirical Grounding: </strong>{p.empirical_evidence}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <FileCheck size={14} color="var(--accent-emerald)" />
                <span>{p.citations_count} Empirical Citations</span>
              </div>

              <button 
                onClick={() => setActiveTab('analyze')}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                <Layers size={12} /> Link to GIS
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
