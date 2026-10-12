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
    <div className={cn("flex w-full items-center gap-[11px] rounded-[11px] border border-border-default bg-bg-default p-[11px]", className)} {...props}>
      <button
        type="button"
        onClick={playing ? onPause : onPlay}
        aria-label={playing ? "Pause" : "Play"}
        className={cn(
          "flex size-[34px] shrink-0 cursor-pointer items-center justify-center rounded-[17px] text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          playing ? "border border-border-brand-tonal bg-fill-brand-tonal-default" : "bg-surface-muted",
        )}
      >
        <Icon name={playing ? "pause" : "play"} size={16} className="size-5" />
      </button>
      <div className="flex min-w-px flex-1 flex-col gap-0.5">
        <p className="truncate text-body text-text-default">{title}</p>
        {playing ? (
          <div className="flex w-full items-center gap-2">
            <LinearProgressBar value={progress} className="h-[3px] flex-1" />
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
        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[14px] bg-fill-neutral-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        <Icon name="xmark" size={16} className="size-5" />
      </button>
    </div>
  )
}

export { AudioClip }
export type { AudioClipProps }
