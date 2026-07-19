/**
 * lib/rag/retrievers.ts
 * Dense (pgvector) + Sparse (BM25) retrievers, and RRF fusion.
 */
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { BaseRetriever } from "@langchain/core/retrievers";
import { Document } from "@langchain/core/documents";
import type { SupabaseClient } from "@supabase/supabase-js";

const RRF_K = 60; // Standard RRF constant


// ---------------------------------------------------------------------------
// Dense Retriever — wraps Supabase pgvector with Mistral embeddings
// ---------------------------------------------------------------------------
export function buildDenseRetriever(supabase: SupabaseClient, topK = 10) {
  const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
  });
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "portfolio_documents",
    queryName: "match_portfolio_documents",
  });
  return vectorStore.asRetriever(topK);
}

// ---------------------------------------------------------------------------
// Reciprocal Rank Fusion — merges ranked lists from multiple retrievers
// ---------------------------------------------------------------------------
export function reciprocalRankFusion(
  rankedLists: Document[][],
  topN = 20,
  weights?: number[]
): Document[] {
  const scoreMap = new Map<string, { doc: Document; score: number }>();

  for (let listIdx = 0; listIdx < rankedLists.length; listIdx++) {
    const list = rankedLists[listIdx];
    const weight = weights?.[listIdx] ?? 1;

    list.forEach((doc, rank) => {
      const key = doc.pageContent;
      const entry = scoreMap.get(key) ?? { doc, score: 0 };
      entry.score += weight / (rank + RRF_K);
      scoreMap.set(key, entry);
    });
  }

  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((e) => e.doc);
}
