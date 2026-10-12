import { useRef, useState } from "react"

// Dev only: token scales, then the gallery before (main, port 5174) and after (this branch, port 5173).
const ids = Object.keys(import.meta.glob("../components/ui/*.tsx"))
  .map((p) => p.split("/").pop()!.replace(".tsx", ""))
  .filter((id) => id !== "icon")

const radius = [
  ["hairline", "2", "1 to 3"],
  ["checkbox", "4", "4 to 6"],
  ["tile", "8", "7 to 10"],
  ["card", "12", "11 to 14"],
  ["panel", "16", "15 to 18"],
  ["sheet", "24", "19 to 28"],
  ["hero", "32", "29 to 40"],
  ["screen", "48", "41 to 60"],
  ["pill", "full", "half the height or more"],
]
const radiusClass: Record<string, string> = {
  hairline: "rounded-hairline", checkbox: "rounded-checkbox", tile: "rounded-tile", card: "rounded-card", panel: "rounded-panel",
  sheet: "rounded-sheet", hero: "rounded-hero", screen: "rounded-screen", pill: "rounded-pill",
}
const elevation = [
  ["raised", "shadow-raised", "Small shadows, 1 to 5px blur"],
  ["card", "shadow-card", "Was Croptrak drop shadow"],
  ["floating", "shadow-floating", "FAB, pins, floating buttons"],
  ["overlay", "shadow-overlay", "Was Mobile drop shadow"],
]
const spacing = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16]
const type = [
  ["text-display", "Display 28/34"],
  ["text-title", "Title 20/26"],
  ["text-heading", "Heading 16/22"],
  ["text-body", "Body 14/20"],
  ["text-label", "Label 12/16"],
  ["text-caption", "Caption 10/14"],
]
const opacity = [
  ["opacity-subtle", "subtle 25%"],
  ["opacity-disabled", "disabled 50%"],
  ["opacity-scrim", "scrim 50%"],
  ["opacity-secondary", "secondary 75%"],
  ["opacity-pressed", "pressed 75%"],
]
const other = [
  ["Sizes", "h-control-sm 32, h-control-md 40, h-control-lg 48, size-touch 44, px-screen-x 16"],
  ["Icon sizes", "8, 12, 16, 20, 24, 32 (10 becomes 8, 18 becomes 16)"],
  ["Border width", "border 1px, border-2 2px (1.5px and 3px become 2px)"],
  ["Blur", "backdrop-blur-glass 16px"],
  ["Motion", "duration-fast 100ms, duration-base 200ms, duration-slow 300ms, ease-standard"],
  ["Layers", "z-raised 10, z-sticky 20, z-overlay 30, z-toast 40"],
  ["Breakpoints", "tablet: 744px, desktop: 1280px (phone is the default)"],
]

function Block({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-card border border-border-default bg-surface-default p-4">
      <div>
        <h2 className="text-title">{title}</h2>
        <p className="text-body text-text-muted">{note}</p>
      </div>
      {children}
    </section>
  )
}

export function Compare() {
  const [id, setId] = useState(ids[0])
  const before = useRef<HTMLIFrameElement>(null)
  const after = useRef<HTMLIFrameElement>(null)
  const go = (next: string) => {
    setId(next)
    if (before.current) before.current.src = `http://localhost:5174/#${next}`
    if (after.current) after.current.src = `http://localhost:5173/#${next}`
  }
  return (
    <main className="mx-auto flex max-w-[1400px] flex-col gap-6 bg-bg-muted p-6">
      <header>
        <h1 className="text-display">Token system proposal</h1>
        <p className="text-body text-text-muted">
          Every value comes from a token on a 4px grid. Values between two steps round down. Pick a component at the bottom to compare it before and after.
        </p>
      </header>

      <Block title="Radius" note="rounded-<role>. The right column shows which old values move to each role.">
        <div className="grid grid-cols-3 gap-3 tablet:grid-cols-5 desktop:grid-cols-9">
          {radius.map(([role, px, from]) => (
            <div key={role} className="flex flex-col items-center gap-2 text-center">
              <div className={`size-16 border-2 border-border-selected bg-fill-brand-tonal-default ${radiusClass[role]}`} />
              <span className="text-label">{role} · {px}</span>
              <span className="text-caption text-text-muted">was {from}px</span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Elevation" note="shadow-<role>, plus drop-shadow-floating for icons and text-shadow-on-media for text on photos. 15 shadows become 4.">
        <div className="grid grid-cols-2 gap-6 p-2 desktop:grid-cols-4">
          {elevation.map(([role, cls, from]) => (
            <div key={role} className={`flex h-24 flex-col justify-end rounded-card bg-surface-default p-3 ${cls}`}>
              <span className="text-body">{role}</span>
              <span className="text-caption text-text-muted">{from}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Spacing" note="Class number x 4 = px. Allowed: 0.5, 1.5, and whole numbers. 2.5 (10px) becomes 2, 3.5 (14px) becomes 3.">
        <div className="flex flex-col gap-1">
          {spacing.map((n) => (
            <div key={n} className="flex items-center gap-3">
              <span className="w-24 text-label text-text-muted">p-{n} · {n * 4}px</span>
              <div className="h-3 rounded-hairline bg-fill-alternative" style={{ width: n * 4 }} />
            </div>
          ))}
        </div>
      </Block>

      <Block title="Type" note="No change in the scale. Off-scale sizes in components move to it: 18 to heading, 22 and 24 to title, 30 to display, 13 to label.">
        <div className="flex flex-col gap-1">
          {type.map(([cls, label]) => (
            <span key={cls} className={cls}>{label}</span>
          ))}
        </div>
      </Block>

      <Block title="Opacity" note="opacity-<role>. 30% becomes 25%, 40 to 60% become 50%, 70 to 80% become 75%.">
        <div className="flex flex-wrap gap-4">
          {opacity.map(([cls, label]) => (
            <div key={cls} className="flex flex-col items-center gap-1">
              <div className={`size-12 rounded-tile bg-bg-inverse ${cls}`} />
              <span className="text-caption">{label}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Other groups" note="Each one is a token in code and a variable in Figma with the same name.">
        <dl className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-body">
          {other.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-text-muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Before and after" note="Left is the current main branch. Right is the token system. Both scroll on their own.">
        <label className="flex items-center gap-2 text-body">
          Component
          <select value={id} onChange={(e) => go(e.target.value)} className="h-10 rounded-tile border border-border-default bg-surface-default px-2">
            {ids.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Before", before, 5174],
            ["After", after, 5173],
          ].map(([label, ref, port]) => (
            <div key={label as string} className="flex flex-col gap-1">
              <span className="text-heading">{label as string}</span>
              <iframe
                ref={ref as React.RefObject<HTMLIFrameElement>}
                title={label as string}
                src={`http://localhost:${port}/`}
                onLoad={(e) => {
                  const f = e.currentTarget
                  if (!f.src.includes("#")) setTimeout(() => (f.src = `http://localhost:${port}/#${id}`), 300)
                }}
                className="h-[80vh] w-full rounded-card border border-border-default bg-bg-default"
              />
            </div>
          ))}
        </div>
      </Block>
    </main>
  )
}
