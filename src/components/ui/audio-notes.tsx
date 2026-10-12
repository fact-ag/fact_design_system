import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { AudioRecorder, type AudioRecorderProps } from "@/components/ui/audio-recorder"
import { AudioClip, type AudioClipProps } from "@/components/ui/audio-clip"

// Figma: Audio Notes (1191:1032). Recorder on top, saved clips below. The feature owns recording and playback.
type AudioNote = AudioClipProps & { id: string }

type AudioNotesProps = Omit<ComponentProps<"div">, "children"> & {
  title?: ReactNode
  showTitle?: boolean
  recorder?: AudioRecorderProps
  clips?: AudioNote[]
}

function AudioNotes({ title = "Voice notes", showTitle = true, recorder, clips = [], className, ...props }: AudioNotesProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <div className="flex w-full flex-col gap-2">
        {showTitle && <p className="text-body text-text-default">{title}</p>}
        <AudioRecorder {...recorder} />
      </div>
      {clips.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          {clips.map(({ id, ...clip }) => (
            <AudioClip key={id} {...clip} />
          ))}
        </div>
      )}
    </div>
  )
}

export { AudioNotes }
export type { AudioNotesProps, AudioNote }
