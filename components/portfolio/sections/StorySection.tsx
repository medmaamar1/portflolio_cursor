import { motion } from "framer-motion"

export function StorySection() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 mb-8 uppercase">The Philosophy</h2>
        <p className="text-3xl md:text-5xl font-medium leading-tight text-neutral-900 mb-12 max-w-4xl">
          Building full-stack platforms where artificial intelligence isn't an afterthought—it's the core of the user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-neutral-800">Full-Stack Architecture</h3>
            <p className="text-neutral-600 leading-relaxed">
              I engineer end-to-end platforms from the ground up. Whether it's a complex social marketplace with virtual try-ons or a real-time financial security dashboard, I build scalable, robust frontend and backend architectures that serve as the perfect foundation for intelligent systems.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-neutral-800">Deep AI Integration</h3>
            <p className="text-neutral-600 leading-relaxed">
              My true passion lies in elevating the user experience by seamlessly weaving AI into the product. I don't just plug in basic APIs—I train custom machine learning models, orchestrate advanced RAG pipelines, and build autonomous agents using frameworks like LangChain and LangGraph to fundamentally change how users interact with software.
            </p>
          </div>
        </div>

        {/* Dynamic Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-24 border-t border-neutral-200 pt-12">
          {[
            { metric: "End-to-End", label: "Full-Stack Platforms" },
            { metric: "Custom Models", label: "AI Integration" },
            { metric: "LangGraph", label: "Autonomous Agents" },
            { metric: "Next-Level", label: "User Experience" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-default"
            >
              <div className="text-lg sm:text-xl lg:text-2xl font-light text-neutral-900 mb-1.5 group-hover:translate-x-1 transition-transform tracking-tight">{item.metric}</div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-400 uppercase">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
