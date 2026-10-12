import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Sketches (1227:1505). showTitle / showSketches booleans. Sketch items are children (SketchItem list).
type SketchesProps = Omit<ComponentProps<"div">, "title"> & {
  showTitle?: boolean
  showSketches?: boolean
  title?: string
  onAddBlank?: () => void
  onAddMap?: () => void
  /** SketchItem elements. */
  children?: ReactNode
}

function AddOption({ icon, title, hint, onClick }: { icon: IconName; title: string; hint: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1 rounded-xl border border-dashed border-border-default bg-surface-muted px-3 pt-4 pb-3.5 outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
    >
      <span className="flex size-9 items-center justify-center rounded-full border border-border-default bg-bg-default text-icon-default">
        <Icon name={icon} size={16} className="size-5" />
      </span>
      <span className="mt-1 text-heading whitespace-nowrap text-text-default">{title}</span>
      <span className="text-label whitespace-nowrap text-text-muted">{hint}</span>
    </button>
  )
}

function Sketches({ showTitle = true, showSketches = true, title = "Sketches", onAddBlank, onAddMap, children, className, ...props }: SketchesProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <div className="flex flex-col gap-[9px]">
        {showTitle && <p className="text-body text-text-default">{title}</p>}
        <div className="flex gap-[11px]">
          <AddOption icon="pen" title="Blank sketch" hint="Draw freehand" onClick={onAddBlank} />
          <AddOption icon="map-location-dot" title="Map sketch" hint="Draw on map" onClick={onAddMap} />
        </div>
      </div>
      {showSketches && <div className="flex flex-col gap-2">{children}</div>}
    </div>
  )
}

export { Sketches }
