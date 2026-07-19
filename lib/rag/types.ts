/**
 * lib/rag/types.ts
 * Shared types for the RAG pipeline.
 */
import type { Document } from "@langchain/core/documents";

export interface RagResult {
  content: string;
  citations: string[];
  rawContexts?: string[];
}

export interface TelemetrySession {
  sessionId: string | null;
}

export type { Document };
