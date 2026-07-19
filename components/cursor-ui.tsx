"use client"

export function TrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
      <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
      <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
    </div>
  )
}

export function Caret() {
  return (
    <span
      className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-neutral-500 align-baseline"
      style={{ animation: "caret-blink 1.05s steps(1) infinite" }}
      aria-hidden="true"
    />
  )
}

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block size-3.5 rounded-full border-2 border-neutral-300 border-t-neutral-500 ${className}`}
      style={{ animation: "agent-spin 0.7s linear infinite" }}
      aria-hidden="true"
    />
  )
}

export function CheckCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function FileIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}

/** A file diff card: name + green additions / muted-or-red deletions. */
export function FileCard({
  name,
  added,
  removed,
  className = "",
}: {
  name: string
  added: number
  removed?: number
  className?: string
}) {
  return (
    <div
      className={`flex animate-[agent-rise_0.25s_ease-out] items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 ${className}`}
    >
      <FileIcon className="size-4 shrink-0 text-neutral-400" />
      <span className="truncate text-neutral-700">{name}</span>
      <span className="ml-auto flex items-center gap-2 font-medium tabular-nums">
        <span className="text-green-600">+{added}</span>
        {removed !== undefined && (
          <span className={removed > 0 ? "text-red-500" : "text-neutral-400"}>-{removed}</span>
        )}
      </span>
    </div>
  )
}
