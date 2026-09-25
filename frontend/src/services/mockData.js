export const INITIAL_REGIONS = [
  {
    id: "ind",
    name: "National (All India)",
    code: "IND",
    level: "National",
    lat: 21.0,
    lng: 78.5,
    zoom: 5,
    total_area_sqkm: 3287263,
    monitored_parcels: "142.8M",
    digitization_pct: 94.2,
    active_anomalies: 28,
    districts: []
  },
  {
    id: "tn",
    name: "Tamil Nadu",
    code: "TN",
    level: "State",
    lat: 11.1271,
    lng: 78.6569,
    zoom: 7,
    total_area_sqkm: 130060,
    monitored_parcels: "18.4M",
    digitization_pct: 98.7,
    active_anomalies: 4,
    districts: [
      { id: "tn-kri", name: "Krishnagiri", lat: 12.5266, lng: 78.2146, growth: "+16.8%", status: "Critical Anomaly", risk: "CRITICAL", desc: "Electronics industrial SEZ diversion along NH-44" },
      { id: "tn-cbe", name: "Coimbatore", lat: 11.0168, lng: 76.9558, growth: "+14.2%", status: "High Growth", risk: "HIGH", desc: "Bypass logistics and warehousing expansion" },
      { id: "tn-chn", name: "Chennai Fringe", lat: 13.0827, lng: 80.2707, growth: "+8.9%", status: "Moderate Sprawl", risk: "MODERATE", desc: "Sriperumbudur corridor industrial conversion" },
      { id: "tn-mdu", name: "Madurai", lat: 9.9252, lng: 78.1198, growth: "+6.3%", status: "Stable Agrarian", risk: "LOW", desc: "Vaigai basin agricultural equilibrium" }
    ]
  },
  {
    id: "mh",
    name: "Maharashtra",
    code: "MH",
    level: "State",
    lat: 19.7515,
    lng: 75.7139,
    zoom: 7,
    total_area_sqkm: 307713,
    monitored_parcels: "26.4M",
    digitization_pct: 96.1,
    active_anomalies: 6,
    districts: [
      { id: "mh-pun", name: "Pune (Chakan)", lat: 18.7597, lng: 73.8567, growth: "+15.3%", status: "High Growth", risk: "HIGH", desc: "Auto manufacturing corridor absorbing black soil farmlands" },
      { id: "mh-rai", name: "Raigad", lat: 18.5158, lng: 73.1822, growth: "+12.1%", status: "Buffer Breach", risk: "CRITICAL", desc: "Port terminal expansion impinging on coastal mangrove belt" }
    ]
  },
  {
    id: "ka",
    name: "Karnataka",
    code: "KA",
    level: "State",
    lat: 15.3173,
    lng: 75.7139,
    zoom: 7,
    total_area_sqkm: 191791,
    monitored_parcels: "21.1M",
    digitization_pct: 95.8,
    active_anomalies: 5,
    districts: [
      { id: "ka-blr", name: "Bengaluru Urban", lat: 12.9352, lng: 77.6744, growth: "+19.4%", status: "Wetland Breach", risk: "CRITICAL", desc: "14 construction infringements detected inside 30m lake buffer" }
    ]
  }
];

export const MOCK_LULC_DATABASE = {
  ind: {
    2018: { built_up: 6.8, agriculture: 54.2, forest: 23.4, wetlands: 5.1, barren: 10.5 },
    2020: { built_up: 7.4, agriculture: 53.8, forest: 23.5, wetlands: 4.9, barren: 10.4 },
    2022: { built_up: 8.1, agriculture: 53.2, forest: 23.6, wetlands: 4.8, barren: 10.3 },
    2024: { built_up: 8.9, agriculture: 52.6, forest: 23.6, wetlands: 4.7, barren: 10.2 },
    2026: { built_up: 9.7, agriculture: 52.0, forest: 23.5, wetlands: 4.6, barren: 10.2 }
  },
  tn: {
    2018: { built_up: 11.2, agriculture: 51.5, forest: 20.2, wetlands: 6.8, barren: 10.3 },
    2020: { built_up: 12.3, agriculture: 50.8, forest: 20.3, wetlands: 6.6, barren: 10.0 },
    2022: { built_up: 13.8, agriculture: 49.9, forest: 20.4, wetlands: 6.4, barren: 9.5 },
    2024: { built_up: 16.0, agriculture: 48.7, forest: 20.4, wetlands: 6.1, barren: 8.8 },
    2026: { built_up: 17.8, agriculture: 47.4, forest: 20.3, wetlands: 5.9, barren: 8.6 }
  },
  mh: {
    2018: { built_up: 9.5, agriculture: 56.4, forest: 17.8, wetlands: 4.2, barren: 12.1 },
    2020: { built_up: 10.4, agriculture: 55.8, forest: 17.9, wetlands: 4.1, barren: 11.8 },
    2022: { built_up: 11.6, agriculture: 55.0, forest: 17.9, wetlands: 4.0, barren: 11.5 },
    2024: { built_up: 13.1, agriculture: 53.9, forest: 18.0, wetlands: 3.9, barren: 11.1 },
    2026: { built_up: 14.5, agriculture: 53.0, forest: 18.0, wetlands: 3.8, barren: 10.7 }
  },
  ka: {
    2018: { built_up: 8.2, agriculture: 55.1, forest: 22.0, wetlands: 4.5, barren: 10.2 },
    2020: { built_up: 9.1, agriculture: 54.5, forest: 22.1, wetlands: 4.4, barren: 9.9 },
    2022: { built_up: 10.3, agriculture: 53.8, forest: 22.1, wetlands: 4.2, barren: 9.6 },
    2024: { built_up: 11.8, agriculture: 52.8, forest: 22.2, wetlands: 4.0, barren: 9.2 },
    2026: { built_up: 13.0, agriculture: 52.0, forest: 22.2, wetlands: 3.9, barren: 8.9 }
  }
};

export const MOCK_POLICIES = [
  {
    id: "pol-001",
    title: "Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act (RFCTLARR), 2013",
    type: "National Legislation",
    authority: "Ministry of Rural Development, Govt. of India",
    year: 2013,
    status: "Statutory Law",
    confidence: "100% Grounded",
    keywords: ["acquisition", "SIA", "compensation", "rehabilitation", "consent"],
    summary: "Guarantees mandatory Social Impact Assessment (SIA) within 6 months, 70-80% consent thresholds, and up to 4x rural market valuation.",
    key_clauses: [
      "Section 4: Mandatory Social Impact Assessment study prior to preliminary notification.",
      "Section 10: Special restriction on acquiring multi-cropped irrigated agrarian land.",
      "Section 26: Determination of market value with rural multiplier factor."
    ],
    empirical_evidence: "Kumar et al. (2023) demonstrated 32% faster dispute settlement in districts adhering strictly to Section 15 objection timelines.",
    citations_count: 482
  },
  {
    id: "pol-002",
    title: "Wetlands (Conservation and Management) Rules, 2017",
    type: "Statutory Rules",
    authority: "Ministry of Environment, Forest & Climate Change (MoEFCC)",
    year: 2017,
    status: "Active Notification",
    confidence: "98% Grounded",
    keywords: ["wetland", "buffer", "ecological", "encroachment", "Ramsar"],
    summary: "Prohibits reclamation of wetlands and industrial effluents within designated buffer zones. Mandates State Wetland Authorities for spatial boundary notification.",
    key_clauses: [
      "Rule 4(1): Absolute prohibition on conversion for non-wetland uses including industrial expansion.",
      "Rule 5: Powers of State Wetland Authorities to identify and notify zone boundaries."
    ],
    empirical_evidence: "ISRO SAC Wetland Atlas 2022 confirmed 14% higher flood resilience in urban catchments maintaining the 500m green buffer.",
    citations_count: 215
  },
  {
    id: "pol-003",
    title: "Digital India Land Records Modernization Programme (DILRMP) Core Framework",
    type: "National Mission Policy",
    authority: "Department of Land Resources (DoLR)",
    year: 2022,
    status: "National Mission",
    confidence: "99% Grounded",
    keywords: ["DILRMP", "cadastral", "georeferencing", "RoR", "Bhu-Aadhaar"],
    summary: "National roadmap for 100% spatial cadastral digitization, Sub-Registrar Deed synchronization, and Bhu-Aadhaar (ULPIN) assignment.",
    key_clauses: [
      "Pillar 1: Modern geodetic survey using DGPS and ETS with GIS georeferencing.",
      "Pillar 2: Automatic cadastral mutation trigger upon deed registration."
    ],
    empirical_evidence: "World Bank Ease of Doing Business Report noted title verification delays plummeted from 42 days to 3.8 days post-DILRMP.",
    citations_count: 310
  },
  {
    id: "res-001",
    title: "Empirical Assessment of Peri-Urban Agrarian Land Diversion in Tamil Nadu (2018–2024)",
    type: "Peer-Reviewed Research Paper",
    authority: "Journal of Indian Spatial Sciences / Kumar, P. et al.",
    year: 2024,
    status: "Peer Reviewed",
    confidence: "96% Grounded",
    keywords: ["peri-urban", "Coimbatore", "Krishnagiri", "LULC", "Sentinel-2"],
    summary: "High-resolution satellite change detection across 4,200 ha of agricultural tracts converted into electronics manufacturing hubs.",
    key_clauses: [
      "Finding: Krishnagiri recorded a 16.8% expansion in industrial built-up area between 2020 and 2023.",
      "Recommendation: Establish statutory agricultural preservation zones along NH corridors."
    ],
    empirical_evidence: "Based on 10m Sentinel-2 multi-spectral imagery and Tamil Nilam revenue mutation records.",
    citations_count: 34
  }
];

export const MOCK_ANOMALIES = [
  {
    id: "ano-101",
    district: "Krishnagiri",
    state: "Tamil Nadu",
    severity: "CRITICAL",
    type: "RAPID_AGRI_DIVERSION",
    delta: "+16.8% Built-Up vs. -5.4% Agriculture",
    confidence: 0.94,
    detected_at: "2026-08-14T10:30:00Z",
    description: "Agricultural land conversion rate along NH-44 corridor exceeds 3-year standard deviation by 2.8x. 18 unauthorized logistics footprints detected.",
    recommended_action: "Issue formal inspection warrant to Special District Revenue Officer (Land Acquisition).",
    is_resolved: false
  },
  {
    id: "ano-102",
    district: "Bengaluru Urban",
    state: "Karnataka",
    severity: "HIGH",
    type: "LAKE_BUFFER_ENCROACHMENT",
    delta: "-3.8% Waterbody Surface Area",
    confidence: 0.91,
    detected_at: "2026-09-02T14:15:00Z",
    description: "Satellite radar variance indicates construction activities within the 30-meter statutory buffer of Bellandur and Varthur feeder channels.",
    recommended_action: "Cross-reference Karnataka Tank Conservation and Development Authority (KTCDA) spatial boundaries.",
    is_resolved: false
  },
  {
    id: "ano-103",
    district: "Raigad",
    state: "Maharashtra",
    severity: "MEDIUM",
    type: "MANGROVE_ECO_BREACH",
    delta: "-2.1% Coastal Mangrove Density",
    confidence: 0.88,
    detected_at: "2026-09-18T09:45:00Z",
    description: "Incipient reclamation spotted adjacent to Dighi port expansion. Probable non-conformance with Coastal Regulation Zone (CRZ-I) notification.",
    recommended_action: "Notify Maharashtra Coastal Zone Management Authority (MCZMA).",
    is_resolved: false
  }
];

export const MOCK_ACTIVITY_LOG = [
  { id: "act-1", time: "12 mins ago", event: "Automated OCR extracted 4 Survey Numbers from G.O. Ms 412 (Hosur)", user: "Smart Ingestion Engine", type: "OCR" },
  { id: "act-2", time: "1 hour ago", event: "Isolation Forest flagged Critical Anomaly #ANO-101 in Krishnagiri", user: "Watchdog Engine", type: "ALERT" },
  { id: "act-3", time: "3 hours ago", event: "Bhu-Mitra synthesized empirical evidence for RFCTLARR SIA objection", user: "Joint Secretary (IAS)", type: "AI" },
  { id: "act-4", time: "Yesterday", event: "Cadastral vector topology repaired: 142 sliver polygons pruned (EPSG:4326)", user: "PostGIS Auto-Clean", type: "GIS" }
];
