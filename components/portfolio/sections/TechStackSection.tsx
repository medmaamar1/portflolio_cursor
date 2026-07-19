import { motion } from "framer-motion"

const SKILLS = [
  "Python", "TypeScript", "Next.js", "Node.js", "FastAPI", "Streamlit",
  "PyTorch", "HuggingFace", "TensorFlow Lite", "ONNX Runtime", "YOLOv8",
  "LangChain", "LangGraph", "Supabase", "Firebase", "Docker", "PostgreSQL", "pgvector"
]

export function TechStackSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 mb-12 uppercase text-center">Core Infrastructure</h2>
        
        {/* Simple flex wrap for tags */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-neutral-50 border border-neutral-200 rounded-full text-xs sm:text-sm font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
