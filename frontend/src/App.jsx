import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DashboardPage from './pages/DashboardPage';
import GisExplorerPage from './pages/GisExplorerPage';
import PolicyHubPage from './pages/PolicyHubPage';
import PolicySimulator from './components/simulation/PolicySimulator';
import WatchdogPage from './pages/WatchdogPage';
import BhuMitraAssistant from './components/ai/BhuMitraAssistant';
import SmartIngestModal from './components/ingestion/SmartIngestModal';
import ExecutiveDossierModal from './components/report/ExecutiveDossierModal';
import SkeletonLoader from './components/common/SkeletonLoader';

function MainLayout() {
  const { activeTab, loading, openChat, setOpenChat } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Official Government Header */}
      <Header />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '20px 24px', maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
        {loading ? (
          <div style={{ padding: '40px 0' }}>
            <SkeletonLoader rows={6} height="32px" />
          </div>
        ) : (
          <>
            {activeTab === 'discover' && <DashboardPage />}
            {activeTab === 'analyze' && <GisExplorerPage />}
            {activeTab === 'evidence' && <PolicyHubPage />}
            {activeTab === 'simulate' && <PolicySimulator />}
            {activeTab === 'decide' && <WatchdogPage />}
          </>
        )}
      </main>

      {/* Official Government Footer */}
      <Footer />

      {/* Bhu-Mitra Evidence-Based AI Copilot */}
      <BhuMitraAssistant 
        isOpen={openChat}
        onClose={() => setOpenChat(false)}
      />

      {/* Smart Ingestion & Regional OCR Modal */}
      <SmartIngestModal />

      {/* Executive Policy Briefing Dossier Modal */}
      <ExecutiveDossierModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
