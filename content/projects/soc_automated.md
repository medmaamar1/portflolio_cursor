# Automated Security Operations Center (SOC) — AI Agent & RAG Platform

**Architected, engineered, and deployed by Mohamed Maamar (Med).** A production-grade, containerized SOC platform combining a LangGraph ReAct AI Agent, a Milvus-based RAG Pipeline for semantic incident retrieval, and a 99.93%-accurate Random Forest ML anomaly detection system.

---

## 1. Tech Stack (verified from source code)

**Engineered by Mohamed Maamar.** Full-stack cybersecurity AI platform with the following verified stack:
- **Frontend:** Next.js 14.2.5 (App Router, TypeScript), React 18.2.0
- **Backend:** FastAPI 0.95.2, Uvicorn 0.22.0 (ASGI)
- **AI Agent & RAG:** LangChain >= 0.2.0, LangGraph (`create_react_agent`), Milvus (Vector DB for RAG)
- **ML Runtime:** scikit-learn 1.3.2, joblib 1.2.0, numpy 1.26.4
- **Infrastructure:** Docker Compose orchestrating Wazuh Manager, Wazuh Indexer (OpenSearch), Milvus (Vector DB), Neo4j (Graph DB), MinIO (S3 Object Storage)

---

## 2. Full-Stack Architecture & System Design

**Architected by Mohamed Maamar.** A decoupled Next.js frontend with a FastAPI backend exposing 60+ async REST routes, backed by a heavy-duty ML anomaly detection pipeline.
- **Frontend (Next.js 14):** 14 distinct pages (`/alerts`, `/agents`, `/incidents`, `/milvus`, etc.), 30+ purpose-built React components including MilvusDataManager for RAG-powered semantic search.
- **Backend (FastAPI):** Modular `routers/` pattern with 9 domain-isolated routers. Shared AppState singleton managing WazuhClient, thread-safe ML model loading, and audit log queue.
- **Wazuh Client Integration:** A 30,000+ byte dedicated client abstracting all Wazuh REST API operations — agents CRUD, alert fetching, FIM, SCA, syscheck, vulnerabilities, active response, MITRE ATT&CK.

---

## 3. LangGraph-Powered AI Agent Architecture (Autonomous SOC Agent)

**Engineered by Mohamed Maamar.** The core AI Threat Hunter is built on LangGraph's `create_react_agent` — a stateful, graph-based ReAct (Reasoning + Acting) agent loop. This is NOT a simple prompt chain but a production-grade autonomous agent.

### How the AI Agent Works
`ai_agent.py` implements the ReAct loop using LangGraph's prebuilt graph:
1. **Agent Node:** The LLM (Groq) receives conversation state and decides to answer or call a tool.
2. **Tools Node:** LangGraph executes the selected tool, captures results, appends to state.
3. **Graph Loop:** Loops back to agent node with enriched state until a final answer is generated.

This persistent, inspectable state across multi-turn investigations is impossible with standard LangChain AgentExecutor.

### The 24 Specialized Security Tools (Agent Tool Functions)
Mohamed Maamar engineered 24 `@tool`-decorated functions directly interfacing with WazuhClient:
- **SOC Monitoring:** `get_recent_alerts`, `get_soc_stats`, `get_manager_status`, `get_manager_logs`
- **Agent Intelligence:** `get_agent_list`, `get_agent_details`, `get_agent_config`, `get_agent_inventory`
- **Threat Investigation:** FIM (File Integrity Monitoring), SCA (Security Configuration Assessment), Syscheck, Vulnerability Scanner, MITRE ATT&CK Mapping
- **Active Response:** Firewall blocks, agent restarts, active response scripts for autonomous mitigation

---

## 4. RAG Pipeline (Milvus Vector Store)

**Engineered by Mohamed Maamar.** The SOC agent is augmented by a production RAG (Retrieval-Augmented Generation) pipeline built around Milvus vector database for semantic incident retrieval:
- **`/api/milvus` (Next.js API Route):** Server-side proxy keeping Milvus credentials off the client.
- **`MilvusDataManager.tsx`:** Frontend component for browsing and searching vector-stored security incident embeddings.
- **`test_rag_attack_flow.py`:** End-to-end test validating the full RAG pipeline — alert ingestion to vector embedding to similarity retrieval.
- **How RAG Augments the Agent:** When the LangGraph agent investigates an alert, it queries Milvus to semantically retrieve the most similar historical incidents, giving the LLM context about past threat handling — dramatically improving investigation quality.

---

## 5. ML Anomaly Detection — Full Training Pipeline

**Built by Mohamed Maamar.** A complete ML pipeline training a Random Forest classifier on 2.83 million labeled network flow records (ISCX 2012 MachineLearningCVE).
- **6-Step Cleaning Pipeline:** Rare-attack-aware preprocessing preserving signals for low-frequency threats.
- **SMOTE + Balanced Weights:** Belt-and-suspenders approach handling extreme class imbalance (rare attacks < 1%).
- **Performance:** 99.93% global accuracy, validated on 566K held-out stratified samples with full per-class metrics.

---

## 6. Performance & Impact

- **AI Agent:** LangGraph `create_react_agent` with 24 fully-instrumented `@tool` functions.
- **RAG Pipeline:** Milvus vector store enabling semantic retrieval of historical incidents.
- **ML:** 99.93% accuracy, 566K test samples, per-class classification report.
- **Backend:** 60+ async REST routes across 9 routers.
- **Frontend:** 14 pages, 30+ components, 3 custom Next.js API routes.
- **Test Suite:** 12 backend test files covering Wazuh, MITRE, FIM, SCA, RAG attack flow, and more.
