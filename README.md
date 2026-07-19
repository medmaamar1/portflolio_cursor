# Mohamed Maamar — Portfolio Platform

A Next.js 16 portfolio built as a **Cursor IDE-inspired desktop environment**, featuring an AI agent chat powered by RAG over portfolio content (projects, skills, and experience).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** Tailwind CSS v4, Framer Motion, shadcn/ui
- **AI/ML:** LangChain, LangGraph, Cohere embeddings, pgvector
- **Backend:** Supabase (PostgreSQL, RLS, pgvector)
- **Agents:** LangGraph ReAct agent, HarissaGPT
- **Panels:** react-resizable-panels (Cursor IDE layout)

## Project Structure

```
├── app/
│   ├── api/chat/       # RAG chat API route
│   ├── globals.css     # Tailwind v4 + theme
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page (CursorDesktop)
├── components/
│   ├── agent-chat.tsx   # AI agent chat UI
│   ├── browser-preview.tsx  # Live browser preview panel
│   ├── cursor-cli.tsx   # Floating CLI terminal
│   ├── cursor-desktop.tsx   # Main IDE layout (panels)
│   ├── cursor-ui.tsx    # Shared UI primitives
│   ├── portfolio/       # Portfolio content cards
│   └── ui/              # shadcn/ui components
├── content/
│   ├── bio/             # About, soft-skills
│   ├── projects/        # Project descriptions (MD)
│   └── skills/          # Skill breakdowns (MD)
├── hooks/
│   └── use-agent-script.ts  # Streaming typewriter hook
├── lib/
│   ├── rag/             # RAG pipeline (embeddings, search)
│   └── utils.ts         # Shared utilities
├── public/              # Static assets
├── scripts/             # DB ingestion, eval scripts
├── supabase/
│   └── migrations/      # DB schema + RLS policies
├── .env.local           # Environment variables
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- Supabase project (PostgreSQL + pgvector)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
COHERE_API_KEY=your_cohere_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Run database migrations

Apply schema and RLS policies from `supabase/migrations/` via the Supabase dashboard or CLI.

### 4. Ingest portfolio content

```bash
pnpm db:ingest
```

This chunks and embeds the markdown files from `content/` into Supabase with pgvector.

### 5. Run the dev server

```bash
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Features

### Cursor IDE Layout
Three-panel resizable desktop: task sidebar, AI agent chat, and live browser preview.

### AI Portfolio Agent
RAG-based chat assistant that answers recruiter questions using your portfolio content. Powered by LangChain, Cohere embeddings, and Gemini 2.5 Flash.

### Floating CLI
Draggable terminal overlay for running commands — a visual touch inspired by Cursor's Composer.

### RAG Pipeline
Hybrid search (vector + full-text) over embedded markdown content, with citation tracking.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:ingest` | Ingest content into Supabase |

## Deployment

Deploy to **Vercel** with the `@vercel/analytics` package included. Set the environment variables above in your Vercel project dashboard.
