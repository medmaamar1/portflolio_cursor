# Agentic AI & LLM Orchestration — Mohamed Maamar

## Technologies
- LangGraph & LangChain (Python/JS)
- Gemini 2.5 Pro/Flash, OpenAI GPT-4o
- Structured Outputs (Pydantic / Zod)
- Parallel Tool Execution (Asyncio / Promise.all)
- Token Stream Routing (SSE / WebSockets)
- Context Window Management (Tiktoken)
- LangSmith (Tracing & Evaluation)
- Token-Aware Memory Compression

## Experience
I engineer deterministic, stateful LLM architectures utilizing advanced directed acyclic graphs and strict function-calling schemas, moving beyond basic chat wrappers into production-grade autonomous systems.

Using **LangGraph**, I architect complex, stateful multi-agent workflows (Orchestrator → Planner → Executor → Validator) governed by robust `GraphState` channels and custom reducers. To handle sensitive database mutations, I implement **Human-in-the-Loop (HITL)** interrupt nodes, explicitly freezing graph execution to await cryptographic user authorization before continuing traversal.

I enforce absolute type-safety on LLM outputs by binding **Structured Outputs** directly to the model's inference engine. I map LLM responses strictly to **Pydantic** (Python) or **Zod** (TypeScript) schemas, physically preventing the model from returning unparseable or hallucinated JSON strings. When an output fails validation, I engineer self-healing loops that automatically inject the stack trace back into the LLM context, forcing a deterministic retry.

For high-performance tool execution, I implement **Parallel Tool Calling**, intercepting multi-tool LLM requests and dispatching them concurrently via `asyncio.gather` or `Promise.all` to drastically slash latency. To ensure a highly responsive UX, I stream generation deltas utilizing **Server-Sent Events (SSE)** directly from the graph execution layer to the client.

At the **Memory Layer**, I replace standard, heavy chat histories with **stateful graph-based memory (LangGraph)**. By structuring the AI's memory into dedicated channels—storing only key findings, validation logs, and errors—I allow the agents to dynamically 'self-heal' from errors without repeating past mistakes. This optimized architecture **slashes token costs by 30-40%** and prevents context bloat, enabling fast, highly accurate, and cost-efficient multi-step reasoning.

To guarantee deterministic agent behavior, I implement **LangSmith** for full-stack observability. I leverage its tracing capabilities to visualize deeply nested multi-agent graph trajectories, debug token-level latency bottlenecks, and systematically evaluate agent accuracy and tool-calling success rates against automated datasets before shipping to production.
