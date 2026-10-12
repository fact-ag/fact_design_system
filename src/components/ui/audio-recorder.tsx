import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/components/ui/icon-button"
import { UtilityButton } from "@/components/ui/utility-button"

// Figma: Audio Recorder (1190:1384). State=[Idle|Recording|Paused|Review] -> state.
// No microphone code: the feature records, and passes elapsed/duration/levels in.
// Rec indicator is a 6px danger dot (Figma uses an SVG). Waveform green is indicator_positive -> bg-status-success.
const FIGMA_LEVELS = [
  9.6, 14.4, 22.4, 17.6, 27.2, 33.6, 22.4, 12.8, 19.2, 30.4, 36.8, 25.6, 19.2, 24, 32, 41.6, 35.2, 24, 17.6, 22.4, 28.8, 36.8,
  27.2, 16, 11.2, 17.6, 25.6, 33.6, 30.4, 20.8, 14.4, 19.2, 27.2, 36.8, 32, 22.4, 16, 12.8, 19.2, 24, 30.4, 25.6, 17.6, 14.4, 9.6,
]

type AudioRecorderProps = Omit<ComponentProps<"div">, "children"> & {
  state?: "idle" | "recording" | "paused" | "review"
  /** Elapsed time text, for example "0:18". In review it is the playback position. */
  elapsed?: string
  /** Total length text shown at the right in review. */
  duration?: string
  /** Bar heights in px (max ~42). Defaults to the Figma sample. Idle shows flat dots. */
  levels?: number[]
  /** Review playback progress 0-100. Bars before it are dark. */
  progress?: number
  onStart?: () => void
  onPause?: () => void
  onResume?: () => void
  onPlay?: () => void
  onDiscard?: () => void
  onSave?: () => void
}

function AudioRecorder({
  state = "idle",
  elapsed = "0:00",
  duration,
  levels = FIGMA_LEVELS,
  progress = 0,
  onStart,
  onPause,
  onResume,
  onPlay,
  onDiscard,
  onSave,
  className,
  ...props
}: AudioRecorderProps) {
  const idle = state === "idle"
  const playedBars = Math.round((levels.length * progress) / 100)
  const primary = {
    idle: { icon: "microphone", label: "Record", onClick: onStart },
    recording: { icon: "pause", label: "Pause", onClick: onPause },
    paused: { icon: "microphone", label: "Resume", onClick: onResume },
    review: { icon: "play", label: "Play", onClick: onPlay },
  } as const
  const p = primary[state]
  const disabledLook = "disabled:border-border-default disabled:bg-fill-disabled disabled:text-text-on-fill-disabled"

  return (
    <div className={cn("flex w-full flex-col gap-[11px]", className)} {...props}>
      <div className="flex w-full items-center gap-[11px]">
        <div className={cn("flex w-10 shrink-0 items-center justify-center text-body", state === "recording" && "gap-1", idle ? "text-text-muted" : "text-text-default")}>
          {state === "recording" && <span className="size-1.5 rounded-full bg-status-danger" />}
          {elapsed}
        </div>
        <div className="flex h-[45px] min-w-px flex-1 items-center justify-center gap-[2.4px]" aria-hidden>
          {levels.map((h, i) => (
            <span
              key={i}
              className={cn(
                "w-[3.2px] shrink-0 rounded-[1.6px]",
                idle && "bg-border-default",
                state === "recording" && "bg-status-success",
                state === "paused" && "bg-fill-draft",
                state === "review" && (i < playedBars ? "bg-text-default" : "bg-border-default"),
              )}
              style={{ height: idle ? 3.2 : h }}
            />
          ))}
        </div>
        <div className="flex h-5 w-10 shrink-0 items-center justify-center text-body text-text-muted">{state === "review" ? duration : null}</div>
      </div>
      <div className="flex w-full items-center gap-[11px]">
        <IconButton
          label="Discard recording"
          icon="trash-can"
          disabled={idle}
          onClick={onDiscard}
          className={cn(!idle && "border-fill-rating-01 bg-fill-danger-bg-subtle text-status-danger", disabledLook)}
        />
        <UtilityButton icon={p.icon} onClick={p.onClick} className="h-10 min-w-px flex-1 text-body">
          {p.label}
        </UtilityButton>
        <IconButton label="Save recording" icon="check" disabled={idle} onClick={onSave} className={disabledLook} />
      </div>
    </div>
  )
}

export { AudioRecorder }
export type { AudioRecorderProps }
