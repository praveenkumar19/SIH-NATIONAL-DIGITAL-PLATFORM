# BHU-VEDA (भू-VEDA)
### National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance
**Smart India Hackathon (SIH 2026) — Final Submission**
* **Problem Statement ID:** `SIH26019`
* **Theme:** Smart Automation
* **Team ID:** `PDK-T14`
* **Institution:** PDKVCET
* **Team Lead:** PRAVEEN KUMAR A

---

## 📌 Executive Summary
**BHU-VEDA** (*Virtual Ecosystem for Decision Automation & Land Analytics*) is a next-generation national spatial-intelligence platform. It bridges the critical divide between **fragmented state land administration databases**, **multi-temporal satellite remote sensing**, and **statutory land policies**. 

Rather than serving as a passive informational portal, BHU-VEDA provides **proactive Smart Automation**—featuring autonomous PostGIS spatial topology auto-repair, Regional OCR for historical revenue gazettes, pixel-wise LULC change detection matrices, an autonomous encroachment watchdog, a grounded RAG AI Copilot (Bhu-Mitra) with verifiable page-level citations, and 1-click executive policy dossier generation.

---

## 🏗️ System Architecture

```
[ Data Ingestion Layer ]
   ├── Bhuvan / ISRO LULC Satellite Vectors
   ├── Open Government Data (data.gov.in CSVs)
   └── Regional Scanned Gazette PDFs (Hindi / Tamil / English)
            │
            ▼
[ Smart Automation & OCR Engine ]
   ├── ST_MakeValid Topology Auto-Repair & Sliver Pruning
   ├── Adaptive Binarization + EasyOCR Text Stream Extraction
   └── Transformer Named Entity Recognition (NER: Survey No, Extent, Taluk)
            │
            ▼
[ Unified Persistence Layer ]
   ├── PostgreSQL 16 + PostGIS Spatial Indexing (GIST)
   └── ChromaDB / Vector Store (384-dim BGE Embeddings)
            │
            ▼
[ AI Decision & Analytics Tier ]
   ├── Multi-Year LULC Matrix Differencing (Delta Calculator)
   ├── Isolation Forest Anomaly & Buffer Breach Watchdog
   └── Bhu-Mitra Grounded Conversational Copilot (RAG)
            │
            ▼
[ Multi-Stakeholder UI (React 18 + Leaflet + Vite) ]
   ├── 4D Interactive GIS Map with 2018–2026 Temporal Slider
   ├── Policy Knowledge Hub & Research Linker
   ├── Real-time Watchdog Alert Feed
   └── 1-Click Official Executive PDF Briefing Dossier
```

---

## 🚀 Key Modules & Smart Automation Features

1. **4D Multi-Temporal GIS Engine:** Interactive Leaflet & MapLibre map featuring dynamic time-slider (2018–2026), layer toggles (Built-up, Agriculture, Wetlands, Forest), and satellite vs. dark vector basemaps.
2. **Autonomous LULC Delta Matrix:** Instant calculation of net land shifts between any two years with district vulnerability rankings.
3. **Bhu-Mitra AI Copilot:** RAG-powered natural language query engine that answers complex land governance questions with exact source and page citations.
4. **Smart Ingestion & Regional OCR:** Drag-and-drop ingestion with multi-stage automation (De-skewing $\rightarrow$ OCR $\rightarrow$ NER $\rightarrow$ Summarization $\rightarrow$ Topology check).
5. **Encroachment & Anomaly Watchdog:** Autonomous feeds flagging buffer infringements and unauthorized agrarian diversions with triage resolution workflows.
6. **1-Click Executive PDF Dossier:** Autogenerates an official Government of India policy briefing dossier ready for print or PDF download.

---

## 💻 Tech Stack

* **Frontend:** React 18, Vite, Vanilla CSS Variables + Glassmorphism, Leaflet.js, Lucide Icons, Canvas/SVG Charts.
* **Backend:** Python 3.11, FastAPI (async high-performance REST APIs), Pydantic v2.
* **Database & Spatial:** PostgreSQL 16 with PostGIS extension (`ST_MakeValid`, spatial joins).
* **AI & NLP:** ChromaDB, `sentence-transformers/all-MiniLM-L6-v2`, EasyOCR, LangChain RAG pipeline.
* **DevOps:** Docker Compose, Nginx.

---

## ⚡ Quick Start Guide

### Option 1: 1-Click Startup (Windows)
Double-click `start.bat` in the root folder. It will start both the FastAPI backend and the Vite frontend automatically.

### Option 2: Manual Terminal Execution

#### 1. Start the Backend:
```bash
cd backend
# Create virtual environment if not already present
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Backend API will be running at: `http://localhost:8000` (Swagger docs: `http://localhost:8000/docs`)

#### 2. Start the Frontend:
```bash
cd frontend
npm install
npm run dev
```
Frontend will be running at: `http://localhost:5173`

### Option 3: Docker Compose
```bash
docker-compose up --build
```

---

## 👥 Team PDK-T14 (PDKVCET)

* **PRAVEEN KUMAR A** — *Team Lead, System Architect & Full-Stack Lead*
* **Member 2** — *Geospatial / GIS Engineer*
* **Member 3** — *AI / NLP & RAG Engineer*
* **Member 4** — *Backend & Database Developer*
* **Member 5** — *Frontend UI/UX Developer*
* **Member 6** — *Data Pipeline & QA Specialist*

---
*Developed for Smart India Hackathon (SIH 2026) | Problem Statement: SIH26019*
