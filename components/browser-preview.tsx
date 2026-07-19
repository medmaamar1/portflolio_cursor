import { PortfolioApp } from "./portfolio/PortfolioApp"

export function BrowserPreview() {
  return (
    <div className="flex flex-col bg-white h-full w-full">
      {/* browser toolbar */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-neutral-200 px-4 text-neutral-400">
        <button className="hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-100"><NavArrow dir="back" /></button>
        <button className="hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-100"><NavArrow dir="forward" /></button>
        <button className="hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-100"><ReloadIcon /></button>
        <div className="ml-1 flex-1 truncate text-[13px] text-neutral-500">http://localhost:3000</div>
        <button className="hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-100"><PanelIcon /></button>
      </div>

      {/* rendered page (Portfolio UI) */}
      <div className="flex-1 overflow-auto relative">
        <PortfolioApp />
      </div>
    </div>
  )
}

function NavArrow({ dir }: { dir: "back" | "forward" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {dir === "back" ? (
        <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function ReloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PanelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M15 4v16" />
    </svg>
  )
}
