# Backend, Edge & Database Infrastructure — Mohamed Maamar

## Technologies
- Node.js
- Python (FastAPI, Uvicorn)
- PostgreSQL (Supabase)
- AWS S3
- Cloudflare Pages & Wrangler
- Pydantic & Zod

## Experience
I architect robust, scalable, and secure backend systems designed for edge performance and high throughput. 

My primary runtime environments are **Node.js** for Next.js API routes and Edge Middleware, and **Python (FastAPI)** for modular, compute-heavy REST APIs. I strictly enforce type safety and input validation across the stack using **Pydantic** in Python and **Zod** in TypeScript, physically preventing IDOR and malformed payloads.

For data and storage, I utilize **Supabase (PostgreSQL)** as a real-time remote database solution, heavily leveraging WebSockets for state synchronization. I treat the database engine as the ultimate security boundary, using **PostgreSQL Row Level Security (RLS)** and read-only RPC functions to isolate tenants and physically prevent destructive injections. I integrate **AWS S3** for scalable, secure object storage for media and application assets.

Finally, I deploy architectures at the edge using **Cloudflare Pages** and Workers (via `@opennextjs/cloudflare`), drastically reducing Time-To-First-Byte (TTFB) and ensuring TikTok-level latency for consumer applications.
