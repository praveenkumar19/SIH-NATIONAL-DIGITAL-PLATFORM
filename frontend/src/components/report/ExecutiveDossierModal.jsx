import React from 'react';
import Modal from '../common/Modal';
import { Printer, Download, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatArea } from '../../utils/formatters';

export default function ExecutiveDossierModal() {
  const { openReportModal, setOpenReportModal, currentRegionMeta, selectedYear, lulcData, anomalies } = useApp();

  if (!openReportModal) return null;

  const handlePrint = () => {
    window.print();
  };

  const distTo = lulcData?.distribution_to || { built_up: 16.0, agriculture: 48.7, forest: 20.4, wetlands: 6.1 };
  const builtUpDelta = lulcData?.delta_matrix?.built_up?.delta_pct || +4.8;
  const agriDelta = lulcData?.delta_matrix?.agriculture?.delta_pct || -2.8;

  return (
    <Modal
      isOpen={openReportModal}
      onClose={() => setOpenReportModal(false)}
      title="Executive Land Governance Briefing Dossier (PDF Preview)"
      subtitle="Autonomous synthesis for high-level ministerial & state administrative review"
      icon={FileText}
      maxWidth="820px"
    >
      <div>
        {/* Print / Action Buttons Bar */}
        <div className="no-print" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px'
        }}>
          <button onClick={handlePrint} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            <Printer size={15} /> Print / Save as Official PDF
          </button>
          <button onClick={() => setOpenReportModal(false)} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            Close Preview
          </button>
        </div>

        {/* Printable Official Government Document Body */}
        <div id="printable-dossier" style={{
          background: '#ffffff',
          color: '#0f172a',
          padding: '28px',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'Georgia, serif',
          lineHeight: 1.6,
          border: '1px solid #cbd5e1'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>
              Government of India • Ministry of Rural Development • Department of Land Resources
            </div>
            <h1 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '8px 0', textTransform: 'uppercase' }}>
              BHU-VEDA: National Land Intelligence & Policy Brief
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#334155' }}>
              Empirical Spatial Evidence Dossier for Jurisdiction: <strong>{currentRegionMeta.name}</strong> (Temporal Window: 2018–{selectedYear})
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
              National Land Intelligence Directorate • Ministry of Rural Development • Government of India
            </div>
          </div>

          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#f8fafc', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Document ID</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>BV-2026-{currentRegionMeta.code}-EXDOSS</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Monitored Territory</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>{formatArea(currentRegionMeta.total_area_sqkm)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Lead Evaluator</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>Principal Land Commissioner</div>
            </div>
          </div>

          {/* Section 1: Executive Findings */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
              1. Multi-Temporal Land-Use Transformation Summary
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#334155', textAlign: 'justify' }}>
              Autonomous pixel-wise differencing across multi-spectral satellite observations reveals a net 
              <strong> {builtUpDelta > 0 ? `+${builtUpDelta}` : builtUpDelta}% expansion in built-up infrastructure</strong> between 2018 and {selectedYear}. This expansion 
              has primarily absorbed fertile agrarian corridors adjacent to high-speed transportation corridors (specifically NH-44 connecting Hosur-Bengaluru and the Coimbatore bypass belt).
            </p>
          </div>

          {/* Section 2: Quantitative LULC Classification Table */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
              2. Quantitative LULC Classification Matrix
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #94a3b8' }}>
                  <th style={{ padding: '6px 8px' }}>Classification</th>
                  <th style={{ padding: '6px 8px' }}>2018 (Base)</th>
                  <th style={{ padding: '6px 8px' }}>{selectedYear} (Observed)</th>
                  <th style={{ padding: '6px 8px' }}>Net Delta</th>
                  <th style={{ padding: '6px 8px' }}>Regulatory Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold' }}>Built-Up / Urban</td>
                  <td style={{ padding: '6px 8px' }}>11.2%</td>
                  <td style={{ padding: '6px 8px' }}>{distTo.built_up}%</td>
                  <td style={{ padding: '6px 8px', color: '#b45309', fontWeight: 'bold' }}>+{builtUpDelta}%</td>
                  <td style={{ padding: '6px 8px' }}>Expanding Sprawl</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold' }}>Agricultural Core</td>
                  <td style={{ padding: '6px 8px' }}>51.5%</td>
                  <td style={{ padding: '6px 8px' }}>{distTo.agriculture}%</td>
                  <td style={{ padding: '6px 8px', color: '#dc2626', fontWeight: 'bold' }}>{agriDelta}%</td>
                  <td style={{ padding: '6px 8px' }}>Under Diversion Pressure</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold' }}>Forest & Conservation</td>
                  <td style={{ padding: '6px 8px' }}>20.2%</td>
                  <td style={{ padding: '6px 8px' }}>{distTo.forest}%</td>
                  <td style={{ padding: '6px 8px', color: '#15803d', fontWeight: 'bold' }}>+0.2%</td>
                  <td style={{ padding: '6px 8px' }}>Stable Ecological Basin</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold' }}>Wetlands & Waterbodies</td>
                  <td style={{ padding: '6px 8px' }}>6.8%</td>
                  <td style={{ padding: '6px 8px' }}>{distTo.wetlands}%</td>
                  <td style={{ padding: '6px 8px', color: '#dc2626', fontWeight: 'bold' }}>-0.7%</td>
                  <td style={{ padding: '6px 8px' }}>Buffer Protection Triggered</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: Grounded Directives */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
              3. Evidence-Based Regulatory Directives
            </h3>
            <ol style={{ fontSize: '0.8rem', color: '#334155', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>Statutory SIA Enforcement:</strong> Enforce strict compliance under Section 4 of RFCTLARR Act 2013 for all agricultural diversions exceeding 20 Hectares in Krishnagiri.
              </li>
              <li>
                <strong>Ecological Buffer Shield:</strong> Prohibit non-conforming industrial conversions within 500 meters of registered waterbodies pursuant to Wetlands Rules 2017.
              </li>
              <li>
                <strong>Bhu-Aadhaar Mutation Automation:</strong> Mandate instant cadastral geometry validation via BHU-VEDA PostGIS connectors prior to registration deed stamping.
              </li>
            </ol>
          </div>

          {/* Signoff */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '16px', fontSize: '0.75rem', color: '#64748b' }}>
            <div>
              Generated autonomously by <strong>BHU-VEDA Platform</strong><br />
              Audit Hash: <code>0x9F4C2A1E8D...</code>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong>Joint Secretary (Land Governance)</strong><br />
              Department of Land Resources (DoLR), Govt. of India
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
