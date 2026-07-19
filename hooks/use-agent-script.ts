"use client"

import { useEffect, useState } from "react"

/**
 * A block is either something that types out character-by-character (has `text`)
 * or a timed reveal (just a `delay`). `kind` is used by the renderer.
 */
export type ScriptBlock = {
  kind: string
  text?: string
  delay?: number
  [key: string]: unknown
}

const TYPE_MS = 14

/**
 * Drives a looping "agent working in realtime" transcript.
 * Returns how many blocks are visible (`index`) and how many characters of the
 * current typing block have been revealed (`typed`).
 */
export function useAgentScript(blocks: ScriptBlock[], restartMs = 3400) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    const block = blocks[index]

    // Reached the end -> hold, then loop from the top.
    if (!block) {
      const t = setTimeout(() => {
        setIndex(0)
        setTyped(0)
      }, restartMs)
      return () => clearTimeout(t)
    }

    // Typewriter blocks.
    if (block.text) {
      if (typed < block.text.length) {
        const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS + Math.random() * 24)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => {
        setIndex((i) => i + 1)
        setTyped(0)
      }, block.delay ?? 500)
      return () => clearTimeout(t)
    }

    // Timed reveal blocks (tool reads, thinking, file cards).
    const t = setTimeout(() => setIndex((i) => i + 1), block.delay ?? 480)
    return () => clearTimeout(t)
  }, [index, typed, blocks, restartMs])

  return { index, typed }
}
