import { motion } from "framer-motion"

export function ContactSection() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row gap-16 justify-between items-start"
      >
        <div className="flex-1">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 mb-8 uppercase">The Next Step</h2>
          <p className="text-4xl md:text-6xl font-medium leading-tight text-neutral-900 mb-8 max-w-2xl">
            Let's build the next intelligent platform.
          </p>
          <a 
            href="mailto:almohamedmaamar@gmail.com"
            className="inline-flex items-center gap-2 text-lg font-medium text-[#2f6df6] hover:text-[#1a4bba] transition-colors"
          >
            almohamedmaamar@gmail.com
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>

        <div className="flex-none grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-neutral-600">
              <li>+216 51 056 204</li>
              <li>Soukra, Tunis, Tunisia</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">Network</h4>
            <ul className="space-y-3 text-neutral-600">
              <li>
                <a href="https://linkedin.com/in/maamarmohamed" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">GitHub</a>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 pt-4">
            <button className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/20">
              Download Full CV
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
