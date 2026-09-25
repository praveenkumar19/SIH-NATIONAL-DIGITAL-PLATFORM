export const LULC_CATEGORIES = [
  { key: 'built_up', label: 'Built-Up / Urban', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)' },
  { key: 'agriculture', label: 'Agricultural Land', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' },
  { key: 'forest', label: 'Forest & Canopy', color: '#059669', bg: 'rgba(5, 150, 105, 0.15)', border: 'rgba(5, 150, 105, 0.4)' },
  { key: 'wetlands', label: 'Wetlands & Waterbodies', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.15)', border: 'rgba(2, 132, 199, 0.4)' },
  { key: 'barren', label: 'Barren / Fallow', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)', border: 'rgba(100, 116, 139, 0.4)' }
];

export const WORKFLOW_STAGES = [
  { id: 'discover', label: '1. Discover', subtitle: 'National Overview & Ingestion', icon: 'Compass' },
  { id: 'analyze', label: '2. Analyze', subtitle: '4D Spatial LULC Analytics', icon: 'Map' },
  { id: 'evidence', label: '3. Evidence', subtitle: 'Statutory Policies & Research', icon: 'BookOpen' },
  { id: 'simulate', label: '4. Simulate', subtitle: 'What-If Policy Sandbox', icon: 'Sliders' },
  { id: 'decide', label: '5. Decide', subtitle: 'Watchdog & Executive Dossier', icon: 'ShieldAlert' }
];

export const PERSONAS = [
  { id: 'policymaker', label: 'Policymaker (IAS / MoRD)', badge: 'Admin Tier' },
  { id: 'researcher', label: 'Research Scholar (IISC/IIT)', badge: 'Analytical Tier' },
  { id: 'officer', label: 'District Land Officer', badge: 'Enforcement Tier' },
  { id: 'citizen', label: 'Citizen / Agrarian Rights', badge: 'Public Tier' }
];

export const REGIONS = [
  { id: 'ind', name: 'National (All India)', code: 'IND', total_area_sqkm: 3287263, lat: 21.0, lng: 78.5, zoom: 5 },
  { id: 'tn', name: 'Tamil Nadu', code: 'TN', total_area_sqkm: 130060, lat: 11.1271, lng: 78.6569, zoom: 7 },
  { id: 'mh', name: 'Maharashtra', code: 'MH', total_area_sqkm: 307713, lat: 19.7515, lng: 75.7139, zoom: 7 },
  { id: 'ka', name: 'Karnataka', code: 'KA', total_area_sqkm: 191791, lat: 15.3173, lng: 75.7139, zoom: 7 }
];
