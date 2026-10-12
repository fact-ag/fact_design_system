import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/ui/icon"
import { LinearProgressBar } from "@/components/ui/linear-progress-bar"

// Figma: File Item (1195:1031). State=[Uploading|Uploaded|Error] -> state.
// Uploading: cancel button (onRemove). Uploaded: remove (onRemove). Error: retry (onRetry) + remove (onRemove).
type FileItemProps = Omit<ComponentProps<"div">, "children"> & {
  state?: "uploading" | "uploaded" | "error"
  name: string
  /** Second line in uploaded state, for example "DOCX · 529 KB". */
  meta?: ReactNode
  /** Error text under the name. */
  errorText?: ReactNode
  /** Upload progress 0-100, shown in the uploading state. */
  progress?: number
  /** Glyph in the file badge. */
  fileIcon?: IconName
  onRemove?: () => void
  onRetry?: () => void
}

const actionClass =
  "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[14px] bg-fill-neutral-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"

function FileItem({
  state = "uploading",
  name,
  meta,
  errorText = "Upload failed",
  progress = 0,
  fileIcon = "file-lines",
  onRemove,
  onRetry,
  className,
  ...props
}: FileItemProps) {
  const error = state === "error"
  return (
    <div
      className={cn(
        "flex w-full items-center gap-[11px] rounded-[11px] border bg-bg-default p-[11px]",
        error ? "border-status-danger-subtle" : "border-border-default",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex size-[34px] shrink-0 items-center justify-center rounded-[17px]",
          error ? "bg-fill-danger-surface-subtle text-status-danger" : "bg-surface-muted text-icon-default",
        )}
      >
        <Icon name={error ? "circle-exclamation" : fileIcon} size={16} className="size-5" />
      </div>
      <div className="flex min-w-px flex-1 flex-col gap-0.5">
        <p className="truncate text-body text-text-default">{name}</p>
        {state === "uploading" && (
          <div className="flex w-full items-center gap-2">
            <LinearProgressBar value={progress} className="h-[3px] flex-1" />
            <p className="text-caption text-text-muted">{progress}%</p>
          </div>
        )}
        {state === "uploaded" && meta && <p className="text-caption text-text-muted">{meta}</p>}
        {error && <p className="text-caption text-status-danger">{errorText}</p>}
      </div>
      <div className={cn("flex items-center", error && "gap-2")}>
        {error && (
          <button type="button" onClick={onRetry} aria-label="Retry upload" className={actionClass}>
            <Icon name="rotate-right" size={16} className="size-5" />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={state === "uploading" ? "Cancel upload" : "Remove file"}
          className={actionClass}
        >
          <Icon name="xmark" size={16} className="size-5" />
        </button>
      </div>
    </div>
  )
}

export { FileItem }
export type { FileItemProps }
