import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Figma: Undo Toast (1192:971). Message and Action text props.
type UndoToastProps = ComponentProps<"div"> & {
  message: ReactNode
  actionLabel?: ReactNode
  onAction?: () => void
}

function UndoToast({ message, actionLabel = "Undo", onAction, className, ...props }: UndoToastProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-[10px] bg-bg-inverse px-4 py-3 text-body whitespace-nowrap drop-shadow-[0_6px_14px_rgba(41,71,57,0.18)]",
        className,
      )}
      {...props}
    >
      <span className="text-text-on-inverse">{message}</span>
      {onAction && (
        <button type="button" onClick={onAction} className="cursor-pointer rounded-sm text-status-success outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export { UndoToast }
