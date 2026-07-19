"use client"

import { useEffect, useRef } from "react"
import { useAgentScript, type ScriptBlock } from "@/hooks/use-agent-script"
import { Caret, FileCard, TrafficLights } from "@/components/cursor-ui"

const BLOCKS: ScriptBlock[] = [
  {
    kind: "text",
    text: "I pulled the raw event stream and reshaped it into a per-user daily frame that combines the key metrics:",
    delay: 500,
  },
  { kind: "file", name: "report.py", added: 40, removed: 0, delay: 480 },
  {
    kind: "text",
    text: "I'll add tests to lock in the behaviour using a representative sample from last week's export:",
    delay: 520,
  },
  { kind: "file", name: "test_usage.py", added: 90, delay: 560 },
  {
    kind: "text",
    text: "All set! We now track focus share, switching rates, and rolling engagement so PMs can compare tab-first and agent-first workflows in seconds.",
    delay: 2400,
  },
]

export function CursorCli() {
  const { index, typed } = useAgentScript(BLOCKS)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [index, typed])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl shadow-black/20">
      {/* window chrome */}
      <div className="relative flex shrink-0 items-center border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
        <TrafficLights />
        <p className="absolute left-1/2 -translate-x-1/2 text-[12px] text-neutral-500">Cursor CLI</p>
      </div>

      {/* streaming transcript */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-neutral-700"
      >
        <div className="space-y-3">
          {BLOCKS.slice(0, index + 1).map((block, i) => {
            const active = i === index
            if (block.kind === "file") {
              return (
                <FileCard
                  key={i}
                  name={block.name as string}
                  added={block.added as number}
                  removed={block.removed as number | undefined}
                  className="font-mono"
                />
              )
            }
            return (
              <p key={i} className="text-neutral-700">
                {active ? (block.text as string).slice(0, typed) : block.text}
                {active && typed < (block.text as string).length && <Caret />}
              </p>
            )
          })}

          {/* follow-up input */}
          <div className="rounded-lg border border-neutral-200 px-3 py-2.5 text-neutral-400">
            {"\u2192"} Add a follow-up
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex shrink-0 items-center justify-between border-t border-neutral-100 px-4 py-2 font-mono text-[11px] text-neutral-400">
        <span>Composer 2.5</span>
        <span>/ for commands &nbsp; @ for files</span>
      </div>
    </div>
  )
}
