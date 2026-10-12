import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Photo Thumbnail (1198:1085). State=[Default|Selected|Uploading|Error] -> state. Image is a prop (sample content).
type PhotoThumbnailProps = Omit<ComponentProps<"div">, "children" | "onSelect"> & {
  src: string
  alt?: string
  state?: "default" | "selected" | "uploading" | "error"
  /** Upload progress 0-100, shown in the uploading state. */
  progress?: number
  /** Select the photo (tap on the tile). */
  onSelect?: () => void
  /** Remove (default/selected/error) or cancel (uploading). */
  onRemove?: () => void
  /** Retry a failed upload. */
  onRetry?: () => void
}

function PhotoThumbnail({ src, alt = "", state = "default", progress = 45, onSelect, onRemove, onRetry, className, ...props }: PhotoThumbnailProps) {
  const selected = state === "selected"
  const busy = state === "uploading" || state === "error"
  return (
    <div
      className={cn(
        "relative size-25 overflow-clip rounded-tile bg-surface-muted",
        selected && "border-2 border-border-selected-alt shadow-overlay",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={alt || "Select photo"}
        className="absolute inset-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
      >
        <img src={src} alt="" className={cn("pointer-events-none absolute max-w-none object-cover", "inset-0 size-full")} />
      </button>
      {busy && <div className={cn("pointer-events-none absolute inset-0 bg-bg-inverse", state === "error" ? "opacity-secondary" : "opacity-scrim")} />}
      {busy && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          {state === "uploading" ? (
            <>
              <p className="text-body text-text-on-inverse">{progress}%</p>
              <div className="relative h-1 w-16 overflow-clip rounded-hairline">
                <div className="absolute inset-0 bg-text-on-inverse opacity-subtle" />
                <div className="relative h-full rounded-hairline bg-text-on-inverse" style={{ width: `${progress}%` }} />
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onRetry}
                aria-label="Retry upload"
                className="pointer-events-auto flex size-7 cursor-pointer items-center justify-center rounded-pill bg-bg-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <Icon name="rotate-right" size={12} />
              </button>
              <p className="text-label text-text-on-inverse">Upload failed</p>
            </>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label={state === "uploading" ? "Cancel upload" : "Remove photo"}
        className={cn(
          "absolute flex size-4 cursor-pointer items-center justify-center rounded-pill bg-bg-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          selected ? "top-0.5 right-0.5" : busy ? "top-1.5 right-1.5" : "top-1 right-1",
        )}
      >
        <Icon name="xmark" size={8} />
      </button>
    </div>
  )
}

export { PhotoThumbnail }
