import { getSupabaseAdmin } from "../lib/rag/db.ts";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Document } from "@langchain/core/documents";
import { chunkMarkdownFile } from "../lib/rag/chunker.ts";
import type { ContentFile } from "../lib/rag/chunker.ts";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CONTENT_DIR = path.join(process.cwd(), "content");

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function embedWithRetry(
  embeddings: MistralAIEmbeddings,
  texts: string[],
  maxAttempts = 5
): Promise<number[][]> {
  let attempt = 0;
  let delayMs = 500;

  while (attempt < maxAttempts) {
    try {
      return await embeddings.embedDocuments(texts);
    } catch (err) {
      attempt += 1;
      if (attempt >= maxAttempts) {
        throw err;
      }
      console.warn(
        `Embedding attempt ${attempt}/${maxAttempts} failed. Retrying in ${delayMs}ms...`
      );
      await sleep(delayMs);
      delayMs *= 2;
    }
  }

  return [];
}

async function ingest() {
  console.log("Starting SOTA ingestion with contextual chunking...");

  const supabase = getSupabaseAdmin();
  const embeddings = new MistralAIEmbeddings({ apiKey: process.env.MISTRAL_API_KEY });

  // 1. Wipe existing data
  console.log("Wiping existing knowledge base...");
  const { error: deleteError } = await supabase
    .from("portfolio_documents")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    console.error("Failed to clear old data:", deleteError);
    return;
  }

  // 2. Collect all content files
  const categories: { dir: string; docType: string }[] = [
    { dir: "projects", docType: "project" },
    { dir: "skills", docType: "skill" },
    { dir: "bio", docType: "bio" },
  ];

  const contentFiles: ContentFile[] = [];

  for (const { dir, docType } of categories) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      if (file === "_template.md") continue;
      const filePath = path.join(dirPath, file);
      const rawText = fs.readFileSync(filePath, "utf-8").trim();
      if (!rawText) continue;

      contentFiles.push({ docType, sourceFile: file, rawText });
    }
  }

  console.log(`Found ${contentFiles.length} content files to ingest.`);

  // 3. Chunk all files
  const allChunks = contentFiles.flatMap((file) => {
    const chunks = chunkMarkdownFile(file);
    // DEBUG: Log chunks from specific files
    if (file.sourceFile === "agentic_ai.md" || file.sourceFile === "machine_learning.md" || file.sourceFile === "retrieval_augmented_generation.md") {
      console.log(`\n📊 DEBUG: File "${file.sourceFile}" (docType: ${file.docType})`);
      console.log(`   Generated ${chunks.length} chunks:`);
      chunks.forEach((chunk, idx) => {
        const preview = chunk.content.slice(0, 150).replace(/\n/g, " ");
        console.log(`   [Chunk ${idx}] ${chunk.metadata.section || "ROOT"} > ${chunk.metadata.subsection || ""}`);
        console.log(`      Preview: ${preview}...`);
      });
    }
    return chunks;
  });
  console.log(`\n✅ Generated ${allChunks.length} contextual chunks total.`);

  // 4. Embed and store in batches
  const BATCH_SIZE = 10;
  let totalStored = 0;

  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const docs = batch.map(
      (c) =>
        new Document({
          pageContent: c.content,
          metadata: c.metadata as unknown as Record<string, unknown>,
        })
    );

    const { data: inserted, error: insertError } = await supabase
      .from("portfolio_documents")
      .insert(
        docs.map((doc) => ({
          content: doc.pageContent,
          metadata: doc.metadata,
        }))
      )
      .select("id, content");

    if (insertError) {
      console.error(`Batch ${i / BATCH_SIZE} insert error:`, insertError.message);
      continue;
    }

    if (!inserted || inserted.length === 0) {
      console.warn(`Batch ${i / BATCH_SIZE}: no rows returned, retrying with vector insert...`);
      continue;
    }

    const embeddingTexts = batch.map((c) => c.content);
    
    // DEBUG: Log what's being embedded from key files
    batch.forEach((chunk, idx) => {
      if (chunk.metadata.title.includes("Agentic") || chunk.metadata.title.includes("Machine Learning") || chunk.metadata.title.includes("Retrieval")) {
        console.log(`\n🧠 EMBEDDING[${i + idx}]: "${chunk.metadata.title}" > "${chunk.metadata.section}"`);
        console.log(`   Content to embed (FULL):`);
        console.log(`   ${chunk.content.replace(/\n/g, "\n   ")}`);
        console.log(`   ---`);
      }
    });
    
    const embeddingBatch: number[][] = [];

    for (let j = 0; j < embeddingTexts.length; j += 5) {
      const textBatch = embeddingTexts.slice(j, j + 5);
      try {
        const embs = await embedWithRetry(embeddings, textBatch);
        embeddingBatch.push(...embs);
      } catch (err) {
        console.error(`Embedding error at batch-local index ${j}:`, err);
      }
    }

    if (embeddingBatch.length !== inserted.length) {
      console.warn(
        `Embedding count mismatch: expected ${inserted.length}, got ${embeddingBatch.length}. Missing rows will remain null.`
      );
    }

    for (let j = 0; j < inserted.length; j++) {
      const record = inserted[j];
      if (j >= embeddingBatch.length) break;

      const { error: updateError } = await supabase
        .from("portfolio_documents")
        .update({ embedding: embeddingBatch[j] })
        .eq("id", record.id);

      if (updateError) {
        console.error(`Embedding update error for ${record.id}:`, updateError.message);
      }
    }

    totalStored += batch.length;
    console.log(
      `Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allChunks.length / BATCH_SIZE)}: ${batch.length} chunks stored + embedded`
    );

    await sleep(250);
  }

  console.log(`\nDone! ${totalStored} chunks ingested with contextual headers + rich metadata.`);
}

ingest().catch(console.error);
