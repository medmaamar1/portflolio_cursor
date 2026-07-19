"use client"

import { useState, useEffect, useRef } from "react"
import { Caret, FileCard, FileIcon, Spinner, TrafficLights } from "@/components/cursor-ui"

type ScriptBlock = {
  kind: "user" | "read" | "thought" | "text" | "done" | "file";
  text?: string;
  target?: string;
  seconds?: number;
  name?: string;
  added?: number;
  removed?: number;
};

export function AgentChat() {
  const [blocks, setBlocks] = useState<ScriptBlock[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fingerprint, setFingerprint] = useState("");
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let fp = localStorage.getItem("portfolio_visitor_fp");
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem("portfolio_visitor_fp", fp);
    }
    setFingerprint(fp);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [blocks, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input;
    setInput("");
    setIsLoading(true);

    const start = Date.now();

    setBlocks((prev) => [...prev, { kind: "user", text: userQuery }, { kind: "thought", seconds: 0 }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: userQuery }],
          visitorFingerprint: fingerprint,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      const elapsedSeconds = parseFloat(((Date.now() - start) / 1000).toFixed(1));

      setHistory((prev) => [...prev, { role: "user", content: userQuery }, { role: "assistant", content: data.content }]);

      const newBlocks: ScriptBlock[] = [
        { kind: "read", target: "Knowledge base" },
        { kind: "thought", seconds: elapsedSeconds },
        { kind: "done", text: data.content },
      ];

      if (data.citations && data.citations.length > 0) {
        data.citations.forEach((c: string) => {
          const added = (c.length * 3) % 150;
          const removed = (c.length * 2) % 50;
          newBlocks.push({ kind: "file", name: c, added, removed });
        });
      }

      setBlocks((prev) => {
        const withoutThought = prev.slice(0, -1);
        return [...withoutThought, ...newBlocks];
      });
    } catch (error) {
      console.error(error);
      setBlocks((prev) => [...prev.slice(0, -1), { kind: "text", text: "Error connecting to Agent." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts = [
    "Give me a 60-second summary of Mohamed's profile",
    "Which AI agent projects did Mohamed build?",
    "What are Mohamed's strongest soft skills?",
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* window chrome */}
      <div className="relative flex shrink-0 items-center border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 rounded-t-lg">
        <TrafficLights />
        <p className="absolute left-1/2 -translate-x-1/2 text-[12px] text-neutral-500">Portfolio Agent</p>
      </div>

      {/* transcript */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-neutral-700"
      >
        <div className="space-y-2.5">
          {blocks.length === 0 && (
            <div className="space-y-6 py-4 font-sans">
              <div className="space-y-2">
                <h3 className="text-[15px] font-semibold text-neutral-800 tracking-tight">Portfolio Assistant</h3>
                <p className="text-[12px] leading-relaxed text-neutral-400">
                  Answers recruiter-style questions using Mohamed's portfolio (projects, skills, and experience). Ask for role-fit, summaries, or tech details.
                </p>
              </div>

              <div className="space-y-2.5">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setInput(prompt)}
                    className="flex w-full items-center gap-3 rounded-lg border border-neutral-200/80 bg-neutral-50/50 px-3.5 py-3 text-left transition-all hover:bg-neutral-50 hover:border-neutral-300 group"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-[11px] font-semibold text-neutral-400 shadow-sm group-hover:text-neutral-600 transition-colors">
                      ⌘
                    </span>
                    <span className="text-[12px] font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                      {prompt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {blocks.map((block, i) => {
            const active = isLoading && i === blocks.length - 1;
            return <ChatBlock key={i} block={block} active={active} />
          })}
        </div>
      </div>

      {/* composer input */}
      <div className="shrink-0 border-t border-neutral-100 px-4 py-3 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 focus-within:border-neutral-300 focus-within:ring-1 focus-within:ring-neutral-200 transition-shadow">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-neutral-400 font-mono">@</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about Mohamed..."
            className="min-w-0 flex-1 bg-transparent text-[12px] text-neutral-800 placeholder:text-neutral-400 outline-none font-mono disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex shrink-0 items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-[11px] text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700 disabled:opacity-40 font-mono"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

function ChatBlock({ block, active }: { block: ScriptBlock; active: boolean }) {
  switch (block.kind) {
    case "user":
      return (
        <p className="animate-[agent-rise_0.25s_ease-out] text-neutral-600">
          {block.text}
          {active && <Caret />}
        </p>
      )

    case "read":
      return (
        <p className="animate-[agent-rise_0.25s_ease-out] text-neutral-400">
          read {block.target as string}
        </p>
      )

    case "thought":
      return (
        <div className="flex animate-[agent-rise_0.25s_ease-out] items-center gap-2 text-neutral-400">
          {active ? (
            <>
              <Spinner />
              <span>thinking...</span>
            </>
          ) : (
            <span className="tabular-nums">thought {block.seconds as number}s</span>
          )}
        </div>
      )

    case "text":
    case "done":
      return (
        <p className="text-neutral-700 whitespace-pre-wrap">
          {block.text}
          {active && <Caret />}
        </p>
      )

    case "file":
      return <FileCard name={block.name as string} added={block.added as number} removed={block.removed as number} className="font-mono" />

    default:
      return null
  }
}
