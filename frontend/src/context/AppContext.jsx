import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { MOCK_ACTIVITY_LOG } from '../services/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [persona, setPersona] = useState('policymaker');
  const [activeTab, setActiveTab] = useState('discover'); // 'discover', 'analyze', 'evidence', 'simulate', 'decide'
  const [selectedRegion, setSelectedRegion] = useState('tn');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const [openChat, setOpenChat] = useState(false);
  const [openIngestModal, setOpenIngestModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

  const [regions, setRegions] = useState([]);
  const [lulcData, setLulcData] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [activityLog, setActivityLog] = useState(MOCK_ACTIVITY_LOG);
  const [loading, setLoading] = useState(true);

  // Sync Theme with Root Element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Initial Data Fetching
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const [rList, pList, aList] = await Promise.all([
        api.getRegions(),
        api.getPolicies(),
        api.getAnomalies()
      ]);
      setRegions(rList);
      setPolicies(pList);
      setAnomalies(aList);
      setLoading(false);
    }
    loadInitialData();
  }, []);

  // Fetch LULC matrix whenever Region or Year changes
  useEffect(() => {
    async function updateLulc() {
      const data = await api.getLulcMatrix(selectedRegion, 2018, selectedYear);
      setLulcData(data);
    }
    updateLulc();
  }, [selectedRegion, selectedYear]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const resolveAnomaly = (id) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, is_resolved: !a.is_resolved } : a));
    setActivityLog(prev => [
      {
        id: `act-${Date.now()}`,
        time: 'Just now',
        event: `Triage status toggled for incident #${id}`,
        user: persona === 'policymaker' ? 'Joint Secretary (IAS)' : 'Field Officer',
        type: 'WATCHDOG'
      },
      ...prev
    ]);
  };

  const currentRegionMeta = regions.find(r => r.id === selectedRegion) || regions[1] || {
    name: 'Tamil Nadu',
    code: 'TN',
    total_area_sqkm: 130060,
    monitored_parcels: '18.4M',
    digitization_pct: 98.7
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      persona,
      setPersona,
      activeTab,
      setActiveTab,
      selectedRegion,
      setSelectedRegion,
      selectedYear,
      setSelectedYear,
      activeDistrict,
      setActiveDistrict,
      openChat,
      setOpenChat,
      openIngestModal,
      setOpenIngestModal,
      openReportModal,
      setOpenReportModal,
      regions,
      lulcData,
      policies,
      anomalies,
      resolveAnomaly,
      activityLog,
      loading,
      currentRegionMeta
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
