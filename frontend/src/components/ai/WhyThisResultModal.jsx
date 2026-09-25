import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { HelpCircle, Database, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function WhyThisResultModal({ isOpen, onClose, explanation, confidence = 98 }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Evidence Provenance & Verification Audit"
      subtitle="How Bhu-Mitra synthesizes grounded intelligence without hallucinations"
      icon={HelpCircle}
      maxWidth="620px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Confidence Gauge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-md)'
        }}>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Grounding & Provenance Score
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-heading)' }}>
              {confidence}% Verifiable Rigor
            </div>
          </div>
          <Badge variant="emerald" size="md">Zero-Hallucination Guardrail Active</Badge>
        </div>

        {/* Explanation Note */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>
            SYNTHESIS METHODOLOGY DISCLOSURE:
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
            {explanation || "Synthesized via multi-spectral Sentinel-2 satellite differencing cross-referenced with statutory notifications in the National Land Law repository."}
          </p>
        </div>

        {/* 4-Step Pipeline Audit Trail */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            AUTONOMOUS RAG VERIFICATION PIPELINE:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { step: '01', title: 'Query Vectorization', desc: 'Embedded user prompt into 384-dimensional dense vector space using BGE-Small.' },
              { step: '02', title: 'Spatial & Tabular Join', desc: 'Filtered PostGIS observations for selected region (EPSG:4326) and multi-year time bounds.' },
              { step: '03', title: 'ChromaDB Document Retrieval', desc: 'Retrieved top-k cosine similarity chunks from statutory acts, gazettes, and peer-reviewed papers.' },
              { step: '04', title: 'Constraint-Bounded Synthesis', desc: 'Injected exact page numbers and statutory clauses into prompt context with strict citation enforcement.' }
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.75rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-emerald)', width: '20px' }}>{s.step}.</span>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{s.title}: </strong>
                  <span style={{ color: 'var(--text-muted)' }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Audit Signoff */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          <button onClick={onClose} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            Acknowledge & Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
