import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import the GitHubCalendar component with SSR disabled to prevent hydration mismatches
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false, loading: () => <div className="h-[150px] w-full max-w-4xl bg-neutral-100 rounded-xl animate-pulse" /> }
)

export function GithubSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 mb-12 uppercase text-center">Engineering Consistency</h2>
        
        <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-sm overflow-x-auto w-full max-w-5xl flex justify-center">
          <GitHubCalendar 
            username="medmaamar1" 
            colorScheme="light"
            blockSize={14}
            blockMargin={5}
            fontSize={14}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
