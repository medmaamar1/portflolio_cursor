"use client"

import { useState, useEffect } from "react"
import { Menu, Play, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels"
import { BrowserPreview } from "@/components/browser-preview"
import { AgentChat } from "@/components/agent-chat"
import { CursorCli } from "@/components/cursor-cli"
import { CheckCircleIcon, Spinner, TrafficLights } from "@/components/cursor-ui"

export function CursorDesktop() {
  const [selectedTask, setSelectedTask] = useState<string>("Build Landing Page")
  const [isCliVisible, setIsCliVisible] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* ===== Main window ===== */}
      <div className="flex flex-col flex-1 overflow-hidden bg-white">
        {/* title bar */}
        <div className="relative flex h-11 items-center border-b border-neutral-200 bg-neutral-50 px-4 justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-1.5 -ml-1.5 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded-md transition-colors"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="hidden md:block">
              <TrafficLights />
            </div>
          </div>
          
          <p className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-neutral-600">Mohamed Maamar Portfolio</p>
          
          <div className="flex items-center gap-2">
            {/* Mobile Play Button for UI */}
            <button 
              className="md:hidden p-1.5 -mr-1.5 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded-md transition-colors flex items-center gap-1"
              onClick={() => setIsMobilePreviewOpen(true)}
            >
              <Play className="w-4 h-4" fill="currentColor" />
            </button>

            <button 
              onClick={() => setIsCliVisible(!isCliVisible)}
              className="hidden md:block text-[12px] font-medium text-neutral-500 hover:text-neutral-800 transition-colors bg-neutral-200/50 hover:bg-neutral-200 px-2 py-1 rounded"
            >
              {isCliVisible ? "Hide CLI" : "Show CLI"}
            </button>
          </div>
        </div>

        {/* content area */}
        <div className="flex-1 overflow-hidden relative">
          {isMobile ? (
            // Mobile Layout
            <div className="w-full h-full">
              <AgentChat />

              {/* Mobile Sidebar Overlay */}
              <AnimatePresence>
                {isMobileSidebarOpen && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    className="absolute inset-y-0 left-0 w-64 bg-white shadow-2xl z-40 flex flex-col border-r border-neutral-200"
                  >
                    <div className="h-11 flex items-center justify-between px-4 border-b border-neutral-200 bg-neutral-50 shrink-0">
                      <span className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Tasks</span>
                      <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <TaskSidebar selectedTask={selectedTask} onSelectTask={(t) => { setSelectedTask(t); setIsMobileSidebarOpen(false); }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

               {/* Mobile Preview Overlay */}
               <AnimatePresence>
                {isMobilePreviewOpen && (
                  <motion.div 
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    className="absolute inset-0 bg-white z-40 flex flex-col"
                  >
                    <div className="h-11 flex items-center justify-between px-4 border-b border-neutral-200 bg-neutral-50 shrink-0">
                      <span className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Preview UI</span>
                      <button onClick={() => setIsMobilePreviewOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <BrowserPreview />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ) : (
            // Desktop Layout
            <PanelGroup direction="horizontal">
              <Panel defaultSize={20} minSize={15}>
                <TaskSidebar selectedTask={selectedTask} onSelectTask={setSelectedTask} />
              </Panel>
              
              <PanelResizeHandle className="w-px bg-neutral-200 hover:bg-neutral-400 active:bg-neutral-400 cursor-col-resize transition-colors hover:w-[3px] hover:-ml-[1px] z-10" />
              
              <Panel defaultSize={30} minSize={20}>
                <div className="h-full overflow-hidden">
                  <AgentChat />
                </div>
              </Panel>
              
              <PanelResizeHandle className="w-px bg-neutral-200 hover:bg-neutral-400 active:bg-neutral-400 cursor-col-resize transition-colors hover:w-[3px] hover:-ml-[1px] z-10" />
              
              <Panel defaultSize={50} minSize={30}>
                <BrowserPreview />
              </Panel>
            </PanelGroup>
          )}
        </div>
      </div>

      {/* ===== Floating Cursor CLI window ===== */}
      <AnimatePresence>
        {isCliVisible && !isMobile && (
          <motion.div 
            drag 
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, pointerEvents: "none" }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[-36px] right-[-24px] h-[360px] w-[440px] cursor-grab active:cursor-grabbing z-50"
          >
            <CursorCli />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

type Task = {
  title: string
  subtitle: string
  time?: string
  status: "progress" | "review"
  selected?: boolean
}

const IN_PROGRESS: Task[] = [
  { title: "Analyze Tab vs Agent Usage P...", subtitle: "Fetching data", status: "progress" },
  { title: "Plan Mission Control", subtitle: "Generating plan", status: "progress" },
]

const READY: Task[] = [
  { title: "Build Landing Page", subtitle: "Done. Fonts preload in the head,...", time: "now", status: "review", selected: true },
  { title: "PyTorch MNIST Experim...", subtitle: "PyTorch MNIST Experiments", time: "10m", status: "review" },
  { title: "Set up Cursor Rules for ...", subtitle: "Set up Cursor Rules for Dashboa...", time: "30m", status: "review" },
  { title: "Bioinformatics Tools", subtitle: "+135 -21 · Bioinformatics Tools", time: "45m", status: "review" },
]

function TaskSidebar({ selectedTask, onSelectTask }: { selectedTask: string; onSelectTask: (title: string) => void }) {
  return (
    <aside className="flex flex-col gap-1 overflow-y-auto bg-neutral-50/80 px-3 py-4">
      <SectionLabel>In Progress 2</SectionLabel>
      {IN_PROGRESS.map((t) => (
        <TaskRow 
          key={t.title} 
          task={t} 
          isSelected={selectedTask === t.title} 
          onClick={() => onSelectTask(t.title)} 
        />
      ))}

      <SectionLabel className="mt-4">Ready For Review 4</SectionLabel>
      {READY.map((t) => (
        <TaskRow 
          key={t.title} 
          task={t} 
          isSelected={selectedTask === t.title} 
          onClick={() => onSelectTask(t.title)} 
        />
      ))}
    </aside>
  )
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 ${className}`}>
      {children}
    </p>
  )
}

function TaskRow({ task, isSelected, onClick }: { task: Task; isSelected?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex gap-2.5 rounded-md px-2 py-2 text-left w-full transition-colors ${
        isSelected ? "bg-neutral-200/60" : "hover:bg-neutral-200/40"
      }`}
    >
      {isSelected && <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-neutral-500" aria-hidden="true" />}
      <span className="mt-0.5 shrink-0">
        {task.status === "progress" ? (
          <Spinner className="border-neutral-300 border-t-neutral-500" />
        ) : (
          <CheckCircleIcon className="size-4 text-neutral-400" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[13px] font-medium text-neutral-700">{task.title}</p>
          {task.time && <span className="ml-auto shrink-0 text-[11px] text-neutral-400">{task.time}</span>}
        </div>
        <p className="truncate text-[12px] text-neutral-400">{task.subtitle}</p>
      </div>
    </button>
  )
}


