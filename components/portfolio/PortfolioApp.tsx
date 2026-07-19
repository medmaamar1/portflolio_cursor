import { HeroSection } from "./sections/HeroSection"
import { StorySection } from "./sections/StorySection"
import { AgenticWorkflowSection } from "./sections/AgenticWorkflowSection"
import { ProjectsSection } from "./sections/ProjectsSection"
import { TechStackSection } from "./sections/TechStackSection"
import { GithubSection } from "./sections/GithubSection"
import { ContactSection } from "./sections/ContactSection"

export function PortfolioApp() {
  return (
    <div className="portfolio-app bg-white min-h-screen text-neutral-900 font-sans selection:bg-neutral-200 selection:text-neutral-900">
      <HeroSection />
      <StorySection />
      <AgenticWorkflowSection />
      <TechStackSection />
      <GithubSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
