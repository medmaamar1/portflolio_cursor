import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectModal, ProjectDetails } from "./ProjectModal"

const PROJECTS: ProjectDetails[] = [
  { 
    id: "denishe",
    year: "2026", 
    title: "Denishe", 
    subtitle: "AI-Powered Social Marketplace (Capstone)",
    description: "Architected and developed a full-stack AI-powered social marketplace from scratch, featuring an integrated virtual try-on system and AI vendor intelligence.",
    architecture: "Built on Next.js and Node.js with a Supabase/Firebase backend. Deployed cross-platform via Capacitor. Designed scalable ML microservices optimized for ONNX Runtime and TensorFlow Lite. Integrated a Two-Tower recommendation model using pgvector HNSW indexing for sub-5 ms retrieval.",
    metrics: [
      "Designed and trained a custom DeepLabV3+ (ResNet-101) semantic segmentation model on a 12,448-image dataset.",
      "Built a custom MNasNet-based body measurement estimation model.",
      "Developed a multi-task EfficientNet-B3 model achieving 88.65% skin-type accuracy.",
      "Built a FashionCLIP-powered reverse image search engine using FAISS vector indexing."
    ],
    stack: ["Next.js", "Python", "PyTorch", "pgvector", "FAISS", "ONNX Runtime", "Capacitor", "HuggingFace"]
  },
  { 
    id: "soc",
    year: "2026", 
    title: "Smart SOC Platform", 
    subtitle: "Real-Time Financial Anomaly Detection",
    description: "An AI-assisted Security Operations Center integrating Wazuh SIEM with autonomous incident response workflows to detect real-time financial anomalies.",
    architecture: "Real-time data ingestion pipeline from the Bourse des Valeurs Mobilières de Tunis (BVMT) via FastAPI and Selenium. Utilizes local Ollama LLMs orchestrated by LangChain and LangGraph for automated root-cause analysis.",
    metrics: [
      "Deployed machine learning models (Isolation Forest, One-Class SVM) for financial network monitoring.",
      "Compressed agent decision tree generation from days to hours using AI-assisted prompt engineering.",
      "Integrated Wazuh SIEM with autonomous incident response workflows."
    ],
    stack: ["FastAPI", "Streamlit", "Selenium", "LangGraph", "Ollama", "Isolation Forest", "Wazuh SIEM"]
  },
  { 
    id: "bot",
    year: "2026", 
    title: "Trading Security System", 
    subtitle: "AI-Powered Bot Detection for Market Compliance",
    description: "A financial compliance security system designed to classify real-time trading events and calculate human vs. bot probability scores.",
    architecture: "Flask-based REST API handling real-time trading event feature extraction. Ingests raw trading data, computes behavioral metrics (max_time_diff, events_per_sec), and feeds them into a custom Scikit-learn predictive model.",
    metrics: [
      "Engineered specifically to support SEC Rule 15c3-5, FINRA Rule 3110, and MiFID II compliance.",
      "Built automated feature extraction for complex trading movement analysis.",
      "Provides granular probabilistic classification (Moderate Bot vs Advanced Bot) for automated account freezing."
    ],
    stack: ["Flask", "Scikit-Learn", "NumPy", "Pandas", "Joblib"]
  },
  { 
    id: "phishing",
    year: "2026", 
    title: "Phishing Detection Engine", 
    subtitle: "Real-Time Email Interception & Classification",
    description: "A production-grade email security tool that intercepts and analyzes emails in real-time to detect sophisticated phishing and spam campaigns.",
    architecture: "Custom SMTP proxy built with FastAPI and Supabase. Parses HTML emails using BeautifulSoup, extracts vectorized features via custom TF-IDF pipelines, and applies a multi-stage classification model.",
    metrics: [
      "Achieved 94.85% Accuracy, 98.67% Precision, and 94.96% F1-Score on phishing classification.",
      "Implemented an automated ETL retraining pipeline using feedback loops.",
      "Features advanced text sanitization and heuristics (special char density, URL counts)."
    ],
    stack: ["FastAPI", "Supabase", "Scikit-Learn", "BeautifulSoup", "SMTP Proxy"]
  },
  { 
    id: "web-detect",
    year: "2026", 
    title: "Real-Time Web Detection", 
    subtitle: "High-Throughput Traffic Anomaly Dashboard",
    description: "A high-performance dashboard UI for monitoring live web traffic, system health, and detecting malicious scraping or DDoS events.",
    architecture: "Built with Python, Poetry, and Streamlit. Simulates real-time telemetry ingestion and provides granular incident filtering based on synthetic ML Baseline models (XGBoost, Transformer v1).",
    metrics: [
      "Visualizes requests per minute, mitigation capacity, and live latency.",
      "Segments incidents dynamically (DDoS, Credential Stuffing, Scraping).",
      "Built resilient, scalable UI scaffolding for plugging into actual distributed streaming backends."
    ],
    stack: ["Python", "Streamlit", "Pandas", "Numpy", "Poetry"]
  }
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  return (
    <>
      <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 mb-16 uppercase">The Artifacts</h2>
        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col md:flex-row gap-4 md:gap-12 py-10 border-b border-neutral-200 cursor-pointer hover:bg-neutral-50 px-4 -mx-4 rounded-xl transition-colors"
            >
              <div className="text-sm font-semibold tracking-widest text-neutral-400 flex-none w-24">
                {project.year}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-neutral-900 group-hover:text-[#2f6df6] transition-colors">{project.title}</h3>
                <p className="text-neutral-500 mt-2">{project.subtitle}</p>
              </div>
              <div className="flex-none flex items-center justify-end md:w-12 text-neutral-300 group-hover:text-[#2f6df6] transition-colors">
                <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-2 transition-transform">
                  <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}
