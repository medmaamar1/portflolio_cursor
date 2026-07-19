import { CursorDesktop } from "@/components/cursor-desktop"

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/wallpaper.png)" }}
        aria-hidden="true"
      />
      {/* soft wash so the UI reads clearly, matching the reference */}
      <div className="absolute inset-0 bg-white/45" aria-hidden="true" />

      {/* desktop scene */}
      <div className="relative flex h-screen w-screen">
        <CursorDesktop />
      </div>
    </main>
  )
}
