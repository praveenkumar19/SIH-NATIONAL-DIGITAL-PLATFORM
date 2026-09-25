import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, BookOpen, HelpCircle, Compass, ShieldCheck } from 'lucide-react';
import CitationCard from './CitationCard';
import WhyThisResultModal from './WhyThisResultModal';
import Badge from '../common/Badge';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function BhuMitraAssistant({ isOpen, onClose }) {
  const { selectedRegion, setSelectedRegion, setActiveTab } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [whyModalData, setWhyModalData] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Namaste! I am **Bhu-Mitra**, the National Land Intelligence & Policy Copilot. I synthesize multi-spectral satellite remote sensing data with statutory land policies and empirical research to deliver evidence-based answers with page-level citations.",
      citations: [
        { source: "National Land Governance Policy Framework 2024", page: "Executive Summary", relevance: 0.99, clause: "General Mandate" }
      ],
      confidence: 99,
      why: "Initial introductory session parameters initialized with national policy lakehouse context."
    }
  ]);

  const QUICK_PROMPTS = [
    "Show land-use change in Tamil Nadu during the selected period.",
    "Which districts show significant anomalies or rapid diversion?",
    "Summarize RFCTLARR Act 2013 and compensation formulas.",
    "Find research related to urban land expansion in southern India."
  ];

  const handleSend = async (customQuery) => {
    const q = customQuery || inputQuery;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await api.askAssistant(q, selectedRegion);
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: response.answer,
        citations: response.citations,
        confidence: response.confidence_score || 95,
        why: response.why_this_result,
        suggestedAction: response.suggested_action
      }]);
    } catch {
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: "Could not retrieve live response. Please check network connectivity.",
        citations: [],
        confidence: 50
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAction = (action) => {
    if (action === 'FILTER_TN' || action === 'FILTER_MAP_TAMIL_NADU') {
      setSelectedRegion('tn');
      setActiveTab('analyze');
      onClose();
    } else if (action === 'OPEN_POLICY_HUB') {
      setActiveTab('evidence');
      onClose();
    } else if (action === 'EXPLORE_MAP') {
      setActiveTab('analyze');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        role="complementary"
        aria-label="Bhu-Mitra AI Copilot"
        style={{
          position: 'fixed',
          top: '64px',
          right: '16px',
          width: '450px',
          maxWidth: 'calc(100vw - 32px)',
          height: 'calc(100vh - 84px)',
          background: 'var(--bg-secondary)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-glow)',
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-glass)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-cyan) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Bot size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  Bhu-Mitra Copilot
                </span>
                <Badge variant="emerald" size="xs">Grounded RAG</Badge>
              </div>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Evidence-Based Policy & Spatial Intelligence
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close Assistant"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Log */}
        <div style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {messages.map((m, idx) => (
            <div 
              key={idx}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '92%',
                background: m.sender === 'user' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
                border: m.sender === 'user' ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                fontSize: '0.825rem',
                color: 'var(--text-primary)',
                lineHeight: 1.5
              }}
            >
              <div style={{ whiteSpace: 'pre-wrap', marginBottom: m.citations?.length ? '10px' : 0 }}>
                {m.text}
              </div>

              {/* Citations Block */}
              {m.citations && m.citations.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <BookOpen size={11} /> Verified Statutory & Empirical Citations:
                    </span>
                    {m.confidence && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                        {m.confidence}% Confidence
                      </span>
                    )}
                  </div>
                  {m.citations.map((c, i) => (
                    <CitationCard key={i} citation={c} />
                  ))}
                </div>
              )}

              {/* Action Buttons & Why This Result */}
              {m.sender === 'assistant' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <button
                    onClick={() => setWhyModalData({ why: m.why, confidence: m.confidence })}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '0.675rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <HelpCircle size={12} color="var(--accent-cyan)" />
                    <span>Why this result?</span>
                  </button>

                  {m.suggestedAction && (
                    <button
                      onClick={() => handleExecuteAction(m.suggestedAction)}
                      className="btn btn-primary"
                      style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                    >
                      <Compass size={12} /> Sync Interactive GIS
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{
              alignSelf: 'flex-start',
              background: 'var(--bg-card)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.775rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={14} className="pulse-indicator" color="var(--accent-emerald)" />
              Synthesizing PostGIS observations & statutory clauses...
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-glass)' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Recommended Queries:
          </div>
          <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
            {QUICK_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.65rem',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {p.slice(0, 32)}...
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '12px 14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '8px',
          background: 'var(--bg-secondary)'
        }}>
          <input 
            type="text"
            placeholder="Ask about LULC changes, RFCTLARR, or district anomalies..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
          <button 
            onClick={() => handleSend()}
            aria-label="Send query"
            className="btn btn-primary"
            style={{ padding: '8px 12px' }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Why This Result Modal */}
      <WhyThisResultModal 
        isOpen={Boolean(whyModalData)}
        onClose={() => setWhyModalData(null)}
        explanation={whyModalData?.why}
        confidence={whyModalData?.confidence}
      />
    </>
  );
}
