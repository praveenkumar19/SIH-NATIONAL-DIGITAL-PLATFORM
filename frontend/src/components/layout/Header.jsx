import React from 'react';
import { 
  Compass, 
  Map, 
  BookOpen, 
  Sliders, 
  ShieldAlert, 
  UploadCloud, 
  FileText, 
  Bot, 
  Sun, 
  Moon, 
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WORKFLOW_STAGES, PERSONAS } from '../../utils/constants';
import Badge from '../common/Badge';

export default function Header() {
  const { 
    theme, 
    toggleTheme, 
    persona, 
    setPersona, 
    activeTab, 
    setActiveTab, 
    openChat, 
    setOpenChat, 
    setOpenIngestModal, 
    setOpenReportModal, 
    anomalies 
  } = useApp();

  const iconMap = {
    Compass,
    Map,
    BookOpen,
    Sliders,
    ShieldAlert
  };

  const unresolvedCount = anomalies.filter(a => !a.is_resolved).length;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Subtle National Tricolor Ribbon */}
      <div style={{ height: '3px', width: '100%', display: 'flex' }}>
        <div style={{ flex: 1, background: '#ff9933' }} />
        <div style={{ flex: 1, background: '#ffffff' }} />
        <div style={{ flex: 1, background: '#138808' }} />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 24px',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Brand & Gov Emblem */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Compass size={24} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(90deg, var(--text-primary) 0%, var(--accent-emerald) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}>
                BHU-VEDA
              </span>
              <Badge variant="emerald" size="xs">National Portal</Badge>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Govt. of India</span>
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>National Land Intelligence & Policy Platform</span>
              <span>•</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Department of Land Resources (DoLR)</span>
            </div>
          </div>
        </div>

        {/* Workflow Stages: Discover -> Analyze -> Evidence -> Simulate -> Decide */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'var(--bg-secondary)',
          padding: '4px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          {WORKFLOW_STAGES.map(stage => {
            const Icon = iconMap[stage.icon] || Compass;
            const isActive = activeTab === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveTab(stage.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'var(--accent-emerald)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                title={stage.subtitle}
              >
                <Icon size={14} />
                <span>{stage.label}</span>
                {stage.id === 'decide' && unresolvedCount > 0 && (
                  <span style={{
                    background: '#f43f5e',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0 5px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {unresolvedCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Smart Ingestion */}
          <button 
            onClick={() => setOpenIngestModal(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.775rem', padding: '6px 12px' }}
          >
            <UploadCloud size={14} color="var(--accent-cyan)" />
            <span>Ingest & OCR</span>
          </button>

          {/* Bhu-Mitra AI Copilot */}
          <button 
            onClick={() => setOpenChat(!openChat)}
            className="btn btn-secondary"
            style={{ 
              fontSize: '0.775rem',
              padding: '6px 12px',
              borderColor: openChat ? 'var(--accent-emerald)' : 'var(--border-subtle)',
              background: openChat ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)'
            }}
          >
            <Bot size={15} color={openChat ? 'var(--accent-emerald)' : 'var(--text-secondary)'} />
            <span>Bhu-Mitra AI</span>
          </button>

          {/* 1-Click Executive Policy Dossier */}
          <button 
            onClick={() => setOpenReportModal(true)}
            className="btn btn-primary"
            style={{ fontSize: '0.775rem', padding: '6px 12px' }}
          >
            <FileText size={14} />
            <span>Executive Dossier</span>
          </button>

          {/* Role Persona Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-secondary)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <ShieldCheck size={14} color="var(--accent-emerald)" />
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              aria-label="User role persona"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {PERSONAS.map(p => (
                <option key={p.id} value={p.id} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="btn btn-secondary"
            style={{ padding: '6px', borderRadius: 'var(--radius-md)' }}
          >
            {theme === 'dark' ? <Sun size={15} color="var(--accent-amber)" /> : <Moon size={15} color="var(--accent-cyan)" />}
          </button>
        </div>
      </div>
    </header>
  );
}
