import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { IconButton } from "./icon-button"
import { LinearProgressBar } from "./linear-progress-bar"
import { MapPin } from "./map-pin"

// Figma: Sketch Item (1227:1504). Type=[Canvas|Map] -> variant, State=[Default|Uploading] -> state.
// preview is sample content (flattened sketch image or drawing) passed by the feature, rendered inside the 64px thumbnail.
type SketchItemProps = Omit<ComponentProps<"div">, "children"> & {
  variant?: "canvas" | "map"
  state?: "default" | "uploading"
  /** Thumbnail content. */
  preview?: ReactNode
  /** Date and time line. */
  title: string
  /** Author line, shown in the default state. */
  author?: string
  /** 0-100, shown while uploading. */
  progress?: number
  /** Default state: remove button. Uploading state: cancel button. */
  onRemove?: () => void
}

function SketchItem({ variant = "canvas", state = "default", preview, title, author, progress = 0, onRemove, className, ...props }: SketchItemProps) {
  const uploading = state === "uploading"
  const map = variant === "map"
  return (
    <div className={cn("flex w-full items-center gap-3 rounded-card border border-border-default bg-bg-default p-3", className)} {...props}>
      <div className={cn("relative size-16 shrink-0 overflow-clip rounded-tile", map ? "bg-bg-inverse" : "border border-border-default bg-bg-default")}>
        {preview}
        {map && <MapPin showLabel={false} className="absolute top-8 left-13 origin-top-left scale-25" />}
        {uploading && <div className="absolute inset-0 bg-bg-inverse opacity-scrim" />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body text-text-default">{title}</p>
        {uploading ? (
          <div className="flex items-center gap-2">
            <LinearProgressBar value={progress} className="h-0.5 flex-1" />
            <span className="text-caption text-text-muted">{Math.round(progress)}%</span>
          </div>
        ) : (
          author && <p className="text-caption text-text-muted">{author}</p>
        )}
      </div>
      <IconButton variant="alt" icon="xmark" label={uploading ? "Cancel upload" : "Remove sketch"} onClick={onRemove} className="size-7 rounded-pill" />
    </div>
  )
}

export { SketchItem }
