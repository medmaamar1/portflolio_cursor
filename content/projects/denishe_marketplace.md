# Douccana / Denishe: Enterprise AI Social Commerce Ecosystem

**Project Scale & Role:** 12-Month Monolithic Engineering Effort | Lead Full-Stack & ML Engineer | **Architected and engineered by Mohamed Maamar (Med)**

---

## 1. Core Architecture & Infrastructure

**Architected by Mohamed Maamar.** A cross-platform Next.js 15 PWA compiled to native iOS/Android via Capacitor, unifying web and mobile under a single codebase.
- **API Security:** Engineered a zero-trust Next.js middleware enforcing JWT validation, dynamic CORS, and Rate Limiting. All payloads validated via Zod for strict type safety against injection attacks.
- **PostgreSQL RLS:** Database-level access control enforcing `auth.uid()` verification — even if an API endpoint is compromised, queries are physically rejected at the row level.
- **Real-Time State:** Supabase WebSockets for distributed cart sync and instant messaging, replacing HTTP polling entirely.

---

## 2. Beauty Skin Analysis Vision AI (Computer Vision Pipeline)

**Engineered by Mohamed Maamar.** An 8-head Deep Learning pipeline using a shared EfficientNet-B3 backbone extracting a 1536-dim feature vector for dermatological analysis.
- **Acne Detection (DSDH):** Feature Pyramid Network feeding a Decoupled Sequential Detection Head with Label Distribution Learning (LDL) for severity grading.
- **Structural Models:** BASNet and U-Net++ trained with Hybrid Loss (SSIM + IoU + BCE) for wrinkle and pore segmentation.
- **Fairness:** Custom skin tone fairness penalty and CIE-Lab ITA mapping to prevent demographic bias across Fitzpatrick Skin Types I-VI.
- **Performance:** Over 80% agreement with professional dermatologists on holdout tests.

---

## 3. Virtual Try-On (VTON) & On-Device WebML

**Built by Mohamed Maamar.** A zero-latency AR pipeline for live cosmetics try-on in the browser.
- **Segmentation Model:** Trained DeepLabV3+ with ResNet-101 encoder from scratch for pixel-perfect nail segmentation.
- **Multi-GPU Training:** PyTorch DDP + AMP with Cosine Annealing, gradient clipping, and early stopping across multiple GPUs.
- **Client-Side Inference:** Models exported to ONNX and executed via `onnxruntime-web` and WebAssembly — zero server compute, 30fps AR tracking on-device.

---

## 4. The Tri-Agent AI Ecosystem (LangGraph, ReAct, RAG-Adjacent)

**Engineered by Mohamed Maamar.** Three specialized AI agents within a single platform, showcasing autonomous agent architecture, Retrieval-Augmented Generation techniques, and LLM orchestration.

### Agent 1: Market Intelligence (LangGraph Orchestration)
A stateful cyclic directed graph built with LangGraph.js for multi-step analytics on live PostgreSQL.
- **5-Node Graph:** Orchestrator → Planner → Analyst ⇄ Validator → Insight with 4 execution modes (Research, Insight, Diagnostic, Competitive).
- **Dynamic Schema Discovery:** Planner queries `information_schema` at runtime to adapt to database migrations instantly.
- **Anti-Hallucination:** Validator node checks SQL syntax and logic, forcing recursive self-healing loops before queries hit production.
- **Security:** Locked-down Supabase RPC + PostgreSQL RLS physically prevents prompt injection from executing destructive commands.

### Agent 2: Skin Care Recommendation Synthesis
A pipeline bridging raw Deep Learning vision tensors to dermatological treatment plans.
- **Normalization:** Ingests outputs from the 8-head Vision AI, normalizes clinical findings against a cosmetic catalog.
- **Synthesis Engine:** Generates hyper-personalized skincare routines with hard constraint logic (e.g., blocking Salicylic Acid for compromised barriers).

### Agent 3: HarissaGPT (LangChain ReAct Agent)
An autonomous conversational agent for high-throughput vendor and client support, built by Mohamed Maamar using LangChain ReAct and Gemini 2.5 Flash Lite.
- **ReAct Grounding:** All factual claims grounded by successful tool invocations — mathematically prevents conversational hallucination.
- **Dual-Memory Architecture:** LangChain ConversationSummaryBufferMemory preserving recent turns verbatim while compressing older history into vector summaries. Slashes token costs by 30-40%.
- **Pydantic Security:** Strict schemas with Vendor ID filters preventing IDOR; static parsing bans all dangerous SQL mutations outside authenticated endpoints.

---

## 5. RAG & Agent Engineering Impact

Over 12 months, Mohamed Maamar single-handedly architected, trained, and deployed this AI ecosystem combining LangGraph agent orchestration, computer vision Deep Learning, on-device WebML inference, and real-time vector search via pgvector. The platform demonstrates production-grade AI agent engineering with anti-hallucination, prompt injection defense, and autonomous multi-step reasoning capabilities.
