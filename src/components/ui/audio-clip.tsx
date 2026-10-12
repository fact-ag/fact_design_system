import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { LinearProgressBar } from "@/components/ui/linear-progress-bar"

// Figma: Audio Clip (1191:1031). State=[Default|Playing] -> playing boolean. Strings are display text, formatted by the feature.
type AudioClipProps = Omit<ComponentProps<"div">, "children"> & {
  playing?: boolean
  title: ReactNode
  /** Total length, for example "0:18". */
  duration: string
  /** Current position, for example "0:07". Shown while playing. */
  position?: string
  /** Playback progress 0-100. */
  progress?: number
  onPlay?: () => void
  onPause?: () => void
  onRemove?: () => void
}

function AudioClip({ playing = false, title, duration, position = "0:00", progress = 0, onPlay, onPause, onRemove, className, ...props }: AudioClipProps) {
  return (
    <div className={cn("flex w-full items-center gap-11 rounded-11 border border-border-default bg-bg-default p-11", className)} {...props}>
      <button
        type="button"
        onClick={playing ? onPause : onPlay}
        aria-label={playing ? "Pause" : "Play"}
        className={cn(
          "flex size-34 shrink-0 cursor-pointer items-center justify-center rounded-17 text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          playing ? "border border-border-brand-tonal bg-fill-brand-tonal-default" : "bg-surface-muted",
        )}
      >
        <Icon name={playing ? "pause" : "play"} size={16} className="size-20" />
      </button>
      <div className="flex min-w-px flex-1 flex-col gap-2">
        <p className="truncate text-body text-text-default">{title}</p>
        {playing ? (
          <div className="flex w-full items-center gap-8">
            <LinearProgressBar value={progress} className="h-3 flex-1" />
            <p className="text-caption whitespace-nowrap text-text-muted">
              {position} / {duration}
            </p>
          </div>
        ) : (
          <p className="text-caption text-text-muted">{duration}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove recording"
        className="flex size-28 shrink-0 cursor-pointer items-center justify-center rounded-14 bg-fill-neutral-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        <Icon name="xmark" size={16} className="size-20" />
      </button>
    </div>
  )
}

export { AudioClip }
export type { AudioClipProps }
