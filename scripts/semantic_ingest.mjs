import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { createClient } from "@supabase/supabase-js";
import { Document } from "@langchain/core/documents";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const mistralApiKey = process.env.MISTRAL_API_KEY;

const client = createClient(supabaseUrl, supabaseKey);

// Semantic/Structure-Aware Chunking: One chunk per logical unit
const docs = [
  new Document({
    pageContent: "SUMMARY: Med Maamar is a Senior AI & Cybersecurity Engineer. Specializes in Agentic RAG architectures, financial anomaly detection, and FinSec. Proficient in integrating advanced Large Language Models into high-security pipelines.",
    metadata: { type: "summary", cluster: "profile" }
  }),
  new Document({
    pageContent: "PROJECT: Smart SOC Platform. Repository: 'finsec-agentic-soc'. A financial anomaly detection engine for banking environments. Architecture uses Isolation Forests for statistical outliers and Ollama for local LLM reasoning. Prevents data exfiltration by running models on-premise.",
    metadata: { type: "project", cluster: "security", repo: "finsec-agentic-soc" }
  }),
  new Document({
    pageContent: "PROJECT: Trading Bot Classifier. Repository: 'trading-bot-classifier'. A robust machine learning pipeline built with Flask and Scikit-Learn. Detects malicious High-Frequency Trading (HFT) bots and ensures compliance with FINRA Rule 3110 and SEC Rule 15c3-5.",
    metadata: { type: "project", cluster: "finsec", repo: "trading-bot-classifier" }
  }),
  new Document({
    pageContent: "PROJECT: Web Anomaly Dashboard. Repository: 'web-anomaly-dashboard'. Real-time web telemetry and DDoS monitoring platform. Ingests traffic logs and identifies scraping patterns and brute-force attempts in real-time.",
    metadata: { type: "project", cluster: "monitoring", repo: "web-anomaly-dashboard" }
  }),
  new Document({
    pageContent: "PROJECT: SMTP Phishing Proxy. Repository: 'smtp-phishing-proxy'. An AI-powered email proxy acting as a secure gateway. Intercepts SMTP traffic, extracts payloads, and classifies phishing attempts using LLMs before emails reach the user inbox.",
    metadata: { type: "project", cluster: "security", repo: "smtp-phishing-proxy" }
  }),
  new Document({
    pageContent: "SKILLS: Backend Engineering (Python, TypeScript, Node.js, Flask, Next.js). AI Orchestration (LangChain, LangGraph, Mistral, Ollama). Data Science (Scikit-Learn, Pandas, pgvector). Infrastructure (Docker, Kubernetes, Supabase).",
    metadata: { type: "skills", cluster: "technical" }
  })
];

async function run() {
  console.log("Initializing Mistral Embeddings...");
  const embeddings = new MistralAIEmbeddings({ apiKey: mistralApiKey });

  console.log("Wiping existing DB records to prevent duplication...");
  await client.from("portfolio_documents").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Semantic Ingestion: Loading structured chunks into Supabase...");
  await SupabaseVectorStore.fromDocuments(
    docs,
    embeddings,
    {
      client,
      tableName: "portfolio_documents",
      queryName: "match_portfolio_documents", // Note: Dense search function
    }
  );
  
  console.log("Ingestion Complete! Postgres triggers automatically generated BM25 tsvectors.");
}

run();
