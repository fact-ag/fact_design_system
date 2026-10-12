import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Photo Thumbnail (1198:1085). State=[Default|Selected|Uploading|Error] -> state. Image is a prop (sample content).
type PhotoThumbnailProps = Omit<ComponentProps<"div">, "children"> & {
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
        "relative size-[100px] overflow-clip rounded-[10px] bg-surface-muted",
        selected && "border-3 border-border-selected-alt shadow-mobile",
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
        <img src={src} alt="" className={cn("pointer-events-none absolute max-w-none object-cover", selected ? "-inset-[3px] size-[calc(100%+6px)]" : "inset-0 size-full")} />
      </button>
      {busy && <div className={cn("pointer-events-none absolute inset-0 bg-bg-inverse", state === "error" ? "opacity-80" : "opacity-60")} />}
      {busy && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          {state === "uploading" ? (
            <>
              <p className="text-body text-text-on-inverse">{progress}%</p>
              <div className="relative h-[3px] w-16 overflow-clip rounded-[2px]">
                <div className="absolute inset-0 bg-text-on-inverse opacity-30" />
                <div className="relative h-full rounded-[2px] bg-text-on-inverse" style={{ width: `${progress}%` }} />
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onRetry}
                aria-label="Retry upload"
                className="pointer-events-auto flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-bg-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
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
          "absolute flex size-[18px] cursor-pointer items-center justify-center rounded-xl bg-bg-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          selected ? "top-[3px] right-[3px]" : busy ? "top-1.5 right-1.5" : "top-[5px] right-[5px]",
        )}
      >
        <Icon name="xmark" size={8} />
      </button>
    </div>
  )
}

export { PhotoThumbnail }
