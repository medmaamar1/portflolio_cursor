import { motion } from "framer-motion"

export function AgenticWorkflowSection() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 mb-8 uppercase">AI-Augmented Engineering</h2>
        <p className="text-3xl md:text-5xl font-medium leading-tight text-neutral-900 mb-12 max-w-4xl">
          The throughput of a team, the judgment of an engineer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-neutral-800">Tool Selection & Execution</h3>
            <p className="text-neutral-600 leading-relaxed">
              I don't just build AI—I use it to build. I leverage advanced AI coding editors like Antigravity, Cursor, and Claude Code independently to drive implementation across 100k+ line codebases. By deploying the optimal editor for specific architectural chunks—whether it's frontend components or complex backend logic—I drastically reduce time-to-ship while maintaining strict human-in-the-loop oversight across the unified project.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-neutral-800">Structured Execution States</h3>
            <p className="text-neutral-600 leading-relaxed">
              To manage complex development cycles, I structure agent workflows using strict execution states. I seamlessly transition between <i>Plan Mode</i> for deep architectural research, <i>Ask Mode</i> for resolving ambiguous requirements, and <i>Execute Mode</i> to write the actual code. The AI generates the implementation, but I validate the outputs and make the hard architectural calls.
            </p>
          </div>
        </div>

        {/* Editor visualization/badges */}
        <div className="mt-16 p-8 bg-neutral-50 rounded-2xl border border-neutral-200">
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="text-sm font-semibold tracking-wider text-neutral-500 uppercase mr-4">Active Editors:</div>
            {["Antigravity", "Cursor", "Claude Code"].map((agent, i) => (
              <span key={agent} className="px-3 py-1 bg-white border border-neutral-300 rounded text-sm font-medium text-neutral-700 shadow-sm">
                {agent}
              </span>
            ))}
          </div>
          <p className="text-sm text-neutral-500 font-mono">
            &gt; // Session 1 [Cursor]: Building Next.js UI components... Done.<br/>
            &gt; // Session 2 [Antigravity]: Engineering FastAPI backend logic... Done.<br/>
            &gt; // Session 3 [Claude Code]: Refactoring CV pipeline... Done.<br/>
            &gt; [HUMAN] Assembling modular chunks. Codebase unified and deployed.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
