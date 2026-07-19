import { Document } from "@langchain/core/documents";
import { marked, Token } from 'marked';

const TECH_PATTERN =
  /\b(?:[A-Z][a-z]+(?:\.(?:js|ts|py|rb|go|rs|vue|svelte|net))?|[A-Z][A-Za-z0-9+#.-]*(?:\s[A-Z][A-Za-z0-9+#.-]*)?)\b/g;

const SKIP_TECH = new Set([
  "The", "This", "That", "These", "Those", "I", "We", "You", "He", "She",
  "It", "They", "A", "An", "For", "With", "From", "Each", "Both", "All",
  "On", "In", "At", "By", "To", "Of", "And", "Or", "But", "Not", "If",
  "Than", "Then", "When", "Where", "What", "Why", "How", "Who", "Whom",
  "Which", "Has", "Had", "Was", "Were", "Will", "Would", "Could", "Should",
  "May", "Might", "Shall", "Can", "Do", "Does", "Did", "Is", "Are", "Am",
  "Being", "Been", "Be", "Into", "Over", "Under", "After", "Before",
  "Between", "Also", "Even", "Still", "Already", "Just", "Very", "Often",
  "About", "Than", "More", "Most", "Less", "Least", "Some", "Any", "Every",
  "No", "Yes", "So", "Because", "Since", "While", "Until", "Therefore",
  "However", "Moreover", "Furthermore", "Nevertheless", "Consequently",
  "Additionally", "User", "Users", "System", "Data", "Model", "Models",
  "Feature", "Features", "Pipeline", "Pipeline", "Training", "Testing",
  "Performance", "Accuracy", "Latency", "Scale", "Production", "Deployment",
  "Frontend", "Backend", "Full-Stack", "Engineer", "Engineering",
  "Software", "Machine", "Learning", "Deep", "Computer", "Vision",
  "Natural", "Language", "Processing", "Large", "Language",
  "Retrieval", "Augmented", "Generation", "Recommendation", "Search",
  "Security", "Cloud", "Edge", "Real-Time", "Time",
]);

interface TechToken {
  match: string;
  position: number;
}

function extractTechnologies(text: string): string[] {
  const tokens: TechToken[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(TECH_PATTERN.source, "g");

  while ((m = re.exec(text)) !== null) {
    const word = m[0].trim();
    if (
      word.length >= 2 &&
      !SKIP_TECH.has(word) &&
      !word.endsWith(".") &&
      !word.endsWith(",") &&
      !word.match(/^[A-Z][a-z]{1,2}$/)
    ) {
      tokens.push({ match: word, position: m.index });
    }
  }

  const techs = [...new Set(tokens.map((t) => t.match))];
  const knownTechKeywords = [
    "PyTorch", "TensorFlow", "ONNX", "Scikit-learn", "Scikit-Learn",
    "Next.js", "React", "TypeScript", "Node.js", "FastAPI", "Express",
    "PostgreSQL", "Supabase", "Firebase", "pgvector", "Docker", "Vercel",
    "AWS", "Cloudflare", "Git", "GitHub", "Capacitor", "Tailwind CSS",
    "LangChain", "LangGraph", "LangSmith", "Cohere", "Mistral", "OpenAI",
    "Gemini", "WebAssembly", "WebGL", "Streamlit", "Gradio", "TanStack Query",
    "Pydantic", "Zod", "DDP", "AMP", "DDP", "HNSW", "RRF", "RAGAS",
    "DeepLabV3", "EfficientNet", "BASNet", "U-Net", "MediaPipe",
    "MobileSAM", "ResNet", "SVD", "timm", "Scikit-learn",
    "PostCSS", "shadcn", "Framer Motion", "Lucide", "CVA",
    "Milvus", "Wazuh", "Flask", "Random Forest", "Isolation Forest",
    "LocalOutlierFactor", "OneClassSVM",
    "REST", "SQL", "API", "JSON", "JSONB",
    "INSEP", "BVMT", "Tunisie Telecom",
  ];

  const found: string[] = [];
  for (const keyword of knownTechKeywords) {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      found.push(keyword);
    }
  }

  const fromPattern = techs
    .filter((t) => t.match(/[.+]/) || (t.length >= 4 && t !== t.toLowerCase()))
    .slice(0, 20);

  return [...new Set([...fromPattern, ...found])];
}

export interface ChunkMetadata {
  docType: string;
  title: string;
  section: string;
  subsection: string;
  sourceFile: string;
  technologies: string[];
  chunkIndex: number;
  totalChunks: number;
}

export interface ChunkResult {
  content: string;
  metadata: ChunkMetadata;
}

export interface ContentFile {
  docType: string;
  sourceFile: string;
  rawText: string;
}

export function chunkMarkdownFile(file: ContentFile): ChunkResult[] {
  const { docType, sourceFile, rawText } = file;

  // 1. Use marked AST lexer
  const tokens = marked.lexer(rawText);

  // 2. Find title (h1)
  let title = sourceFile.replace(".md", "");
  const h1 = tokens.find((t) => t.type === 'heading' && t.depth === 1);
  if (h1 && 'text' in h1) {
    title = h1.text;
  }

  const results: ChunkResult[] = [];
  let currentSection = "";
  let currentSubsection = "";
  let currentChunkText = "";

  function saveCurrentChunk() {
    if (currentChunkText.trim().length > 0) {
      const text = currentChunkText.trim();
      const techs = extractTechnologies(text);

      let headerStr = `[Document: ${title}`;
      if (currentSection) {
        headerStr += ` > ${currentSection}`;
        if (currentSubsection) {
          headerStr += ` > ${currentSubsection}`;
        } else {
          // If we have a section but no subsection, it's the section intro
          headerStr += ` > Intro`;
        }
      }
      if (techs.length > 0) {
        headerStr += ` | Tech: ${techs.join(", ")}`;
      }
      headerStr += `]`;

      results.push({
        content: `${headerStr}\n${text}`,
        metadata: {
          docType,
          title,
          section: currentSection,
          subsection: currentSubsection || (currentSection ? "Intro" : ""),
          sourceFile,
          technologies: techs,
          chunkIndex: results.length,
          totalChunks: 0,
        },
      });
    }
    currentChunkText = "";
  }

  // 3. Traverse the AST mathematically
  for (const token of tokens) {
    if (token.type === 'heading') {
      if (token.depth === 1) {
        // Skip H1, we already extracted it for the title
        continue;
      }
      if (token.depth === 2) {
        saveCurrentChunk();
        currentSection = token.text;
        currentSubsection = "";
        currentChunkText += token.raw;
        continue;
      }
      if (token.depth === 3) {
        saveCurrentChunk();
        currentSubsection = token.text;
        currentChunkText += token.raw;
        continue;
      }
    }

    // For paragraphs, lists, code blocks, tables, append to the active chunk safely
    currentChunkText += token.raw;
  }

  // Save the final chunk
  saveCurrentChunk();

  // 4. Handle completely flat files
  if (results.length === 0) {
    const text = rawText.trim();
    const techs = extractTechnologies(text);
    results.push({
      content: `[Document: ${title}]\n${text}`,
      metadata: {
        docType,
        title,
        section: "",
        subsection: "",
        sourceFile,
        technologies: techs,
        chunkIndex: 0,
        totalChunks: 1,
      },
    });
  } else {
    for (const r of results) {
      r.metadata.totalChunks = results.length;
    }
  }

  return results;
}

