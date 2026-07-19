# About Mohamed Maamar

## Who is Mohamed Maamar?

Mohamed Maamar (Med) is an AI Engineer and Full-Stack Software Engineer who builds production-ready AI systems. He recently completed his Computer Engineering degree.

His expertise spans AI Agents, Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), Computer Vision, Deep Learning, and cloud-native full-stack development. He has architected and deployed production systems including the **Douccana/Denishe AI Social Commerce Ecosystem**, the **Automated Security Operations Center (SOC)** with a LangGraph ReAct agent and Milvus RAG pipeline, the **Smart Anomaly Detection System (Outlier)** with local LLM-based RAG, and the **Phishing & Spam Interception System**.

Unlike engineers who focus only on ML or only on web development, Mohamed builds complete AI products end-to-end: frontend, backend, databases, APIs, AI model training, deployment, and user experience.

---

## Professional Experience & Projects

### Tunisia Stock Exchange (BVMT) — Cybersecurity & Anomaly Detection
During his internship, Mohamed engineered multiple AI-powered cybersecurity systems:

**Automated Security Operations Center (SOC):** A production-grade platform combining a **LangGraph ReAct AI Agent** with 24 specialized security tools, a **Milvus-based RAG Pipeline** for semantic incident retrieval, and a **99.93%-accurate Random Forest** ML anomaly detection system trained on 2.83M network flow records. The LangGraph agent queries Milvus vectors to retrieve semantically similar historical incidents, dramatically improving investigation quality.

**Smart Anomaly Detection System (Outlier):** A financial anomaly detection system using an ensemble of Isolation Forest, OneClassSVM, and LocalOutlierFactor, augmented by a **local Llama 2 LLM-based RAG pipeline** for contextual BVMT market analysis. Achieved 94.8% anomaly recall against historical market crashes.

**Phishing & Spam Interception System:** A distributed email security system with an SMTP proxy interceptor and scikit-learn ML models (94.85% accuracy), featuring incremental online retraining via `partial_fit`.

**Real-Time Web Detection:** An ML ensemble system (99.2% accuracy, 0.4% FPR) detecting DDoS and bot attacks using Isolation Forest, OneClassSVM, and LocalOutlierFactor with majority-vote consensus.

**Trading Security & Bot Detection System:** An ML-driven trading surveillance system (97.5% accuracy) detecting HFT bots using temporal entropy feature engineering, mapped to SEC/FINRA/MiFID II compliance.

### Tunisie Telecom
Full-stack software engineering with backend development, APIs, databases, and enterprise software practices.

---

## AI Projects — Detailed

### Douccana / Denishe: Enterprise AI Social Commerce Ecosystem
Mohamed Maamar architected and engineered this 12-month AI-powered social marketplace. Key systems include:
- **Tri-Agent AI Ecosystem:** Three agents — Market Intelligence (LangGraph 5-node graph with anti-hallucination), Skin Care Recommendation Synthesis (bridging vision AI to treatment plans), and HarissaGPT (LangChain ReAct agent with dual-memory architecture for vendor support).
- **Beauty Skin Analysis AI:** 8-head Deep Learning pipeline using EfficientNet-B3 with custom loss functions (LDL, Hybrid SSIM+IoU+BCE) achieving 80%+ dermatologist agreement.
- **Virtual Try-On (VTON):** On-device WebML via ONNX Runtime and WebAssembly for zero-latency AR inference.

### Automated Security Operations Center (SOC)
Engineered by Mohamed Maamar. A LangGraph `create_react_agent` with 24 `@tool`-decorated security functions, a **Milvus RAG Pipeline** enabling semantic retrieval of historical security incidents, and a 99.93%-accurate Random Forest ML pipeline processing 2.83M network flow records.

### Smart Anomaly Detection System (Outlier)
Engineered by Mohamed Maamar. Financial anomaly detection with a **local Llama 2 RAG pipeline** that crawls BVMT news, filters data within a +/- 7-day window of flagged anomalies, and generates contextual analysis via Ollama — entirely offline and private.

### Additional Security & ML Systems
- **Phishing & Spam Interception:** scikit-learn ML with incremental retraining, 94.85% accuracy.
- **Real-Time Web Detection:** ML ensemble for DDoS/bot detection, 99.2% accuracy.
- **Trading Bot Detection:** HFT bot classification, 97.5% accuracy, compliance-aligned.

---

## Technical Expertise

### Artificial Intelligence & Machine Learning
- **AI Agents:** LangGraph (stateful graphs, cyclic agents, multi-agent orchestration), LangChain (ReAct agents, tool use, memory architectures), ReAct Framework, Pydantic/Zod structured outputs
- **RAG & Vector Search:** Milvus vector database, pgvector, hybrid search (BM25 + dense), Cohere reranking, contextual chunking, RAGAS evaluation
- **LLMs:** Mistral Large, Gemini 2.5 Flash Lite, Llama 2, prompt engineering, structured generation
- **Computer Vision:** PyTorch, EfficientNet, DeepLabV3+, BASNet, U-Net++, ONNX, WebAssembly/WebGL
- **Classical ML:** scikit-learn, Isolation Forest, Random Forest, SMOTE, ensemble methods, correlation-based feature selection

### Software Engineering
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Capacitor, TanStack Query
- **Backend:** FastAPI, Node.js, Express, REST APIs, Pydantic, Zod
- **Databases:** PostgreSQL, Supabase, Firebase, pgvector, Milvus, SQLite
- **Cloud & DevOps:** Docker, Vercel, Cloudflare, AWS S3, Git, GitHub

---

## Engineering Philosophy

Mohamed believes AI becomes valuable only when integrated into real products. His approach combines strong software engineering practices, production-oriented AI systems, scalable architectures, clean user experiences, and measurable business impact. He builds complete end-to-end systems rather than isolated proofs of concept.

## Personality & Soft Skills

Beyond the technical details, Mohamed Maamar is known for his curiosity, collaborative spirit, and calm problem-solving under pressure. Colleagues describe him as someone who bridges technical and business perspectives naturally, communicates clearly across Arabic, French, and English, and treats every challenge as something to figure out together rather than alone. He is motivated by real-world impact over titles, and genuinely enjoys mentoring and teaching others. See the soft-skills profile for a deeper look at his personality, work style, and what people say about working with him.

---

## Frequently Asked Questions

### Does Mohamed train ML models?
Yes. Mohamed has trained, evaluated, and deployed Deep Learning models (EfficientNet, DeepLabV3+), classical ML models (Random Forest, Isolation Forest), and LLM-based RAG pipelines into production systems.

### Does Mohamed build complete applications?
Yes. He independently designs and builds full-stack AI applications: frontend, backend, databases, auth, AI integration, deployment, and production infrastructure.

### What differentiates Mohamed?
His ability to combine AI Agents, RAG, Computer Vision, and full-stack engineering into unified production systems. He doesn't just experiment with models — he deploys them into real products.
