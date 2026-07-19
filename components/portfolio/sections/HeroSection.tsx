import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="h-screen flex flex-col items-center justify-center relative px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-4xl text-center"
      >
        <blockquote className="text-3xl md:text-5xl font-serif italic text-neutral-800 leading-tight">
          "The best way to predict the future is to invent it."
        </blockquote>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 text-neutral-500 font-medium tracking-widest uppercase text-sm"
        >
          — Alan Kay
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-widest text-neutral-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-300 to-transparent" />
      </motion.div>
    </section>
  )
}
