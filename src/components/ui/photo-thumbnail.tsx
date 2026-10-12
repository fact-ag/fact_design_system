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
        "relative size-100 overflow-clip rounded-10 bg-surface-muted",
        selected && "border-3 border-border-selected-alt shadow-selected",
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
        {/* ds-exception: image grows under the 3px selected border */}
        <img src={src} alt="" className={cn("pointer-events-none absolute max-w-none object-cover", selected ? "-inset-3 size-[calc(100%+6px)]" : "inset-0 size-full")} />
      </button>
      {busy && <div className={cn("pointer-events-none absolute inset-0 bg-bg-inverse", state === "error" ? "opacity-80" : "opacity-60")} />}
      {busy && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6">
          {state === "uploading" ? (
            <>
              <p className="text-body text-text-on-inverse">{progress}%</p>
              <div className="relative h-3 w-64 overflow-clip rounded-2">
                <div className="absolute inset-0 bg-text-on-inverse opacity-30" />
                <div className="relative h-full rounded-2 bg-text-on-inverse" style={{ width: `${progress}%` }} />
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onRetry}
                aria-label="Retry upload"
                className="pointer-events-auto flex size-30 cursor-pointer items-center justify-center rounded-18 bg-bg-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
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
          "absolute flex size-18 cursor-pointer items-center justify-center rounded-12 bg-bg-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          selected ? "top-3 right-3" : busy ? "top-6 right-6" : "top-5 right-5",
        )}
      >
        <Icon name="xmark" size={8} />
      </button>
    </div>
  )
}

export { PhotoThumbnail }
