import { useEffect } from "react"
import { motion } from "framer-motion"

export interface ProjectDetails {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  architecture: string;
  metrics: string[];
  stack: string[];
}

interface ProjectModalProps {
  project: ProjectDetails;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <div className="flex-none p-8 md:p-12 pb-6 border-b border-neutral-100 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-semibold tracking-widest text-neutral-400 uppercase">{project.year}</span>
              <span className="w-8 h-[1px] bg-neutral-200"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium text-neutral-900 mb-4">{project.title}</h2>
            <p className="text-lg text-neutral-600 max-w-2xl">{project.subtitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors text-neutral-500 hover:text-neutral-900"
          >
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Scrollable Body Section */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
          
          <section>
            <h3 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase mb-6">Overview</h3>
            <p className="text-neutral-600 leading-relaxed text-lg">
              {project.description}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase mb-6">Architecture</h3>
            <p className="text-neutral-600 leading-relaxed text-lg">
              {project.architecture}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase mb-6">Core Metrics & Engineering Feats</h3>
            <ul className="space-y-4">
              {project.metrics.map((metric, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-900 flex-none" />
                  <span className="text-neutral-700">{metric}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-bold tracking-[0.2em] text-neutral-900 uppercase mb-6">Technical Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  )
}
