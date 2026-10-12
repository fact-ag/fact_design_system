import type { ReactNode } from "react"
import { BottomDrawer } from "@/components/ui/bottom-drawer"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

// Figma: Alert bottom drawer (983:687). Title, description, cancel and confirm buttons.
type AlertBottomDrawerProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  confirmLabel?: ReactNode
  cancelLabel?: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  /** Red confirm button, for actions that delete data (Figma: Sketch Pad discard). */
  destructive?: boolean
}

function AlertBottomDrawer({
  open,
  onClose,
  title = "Title",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
}: AlertBottomDrawerProps) {
  return (
    <BottomDrawer open={open} onClose={onClose} role="alertdialog" className="h-68">
      <div className="flex flex-col items-center px-8 pt-3 pb-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-pill bg-fill-danger-surface-subtle text-status-danger">
          <Icon name="triangle-exclamation" size={20} className="size-6" />
        </span>
        <h2 className="mt-5 text-title text-text-default">{title}</h2>
        {description && <p className="mt-2 line-clamp-2 text-body text-text-muted">{description}</p>}
      </div>
      <div className="flex gap-5 px-8">
        <Button variant="secondary" className="flex-1" onClick={onCancel ?? onClose}>
          {cancelLabel}
        </Button>
        <Button className={destructive ? "flex-1 bg-fill-danger text-text-on-fill-brand active:bg-fill-danger active:opacity-pressed" : "flex-1"} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </BottomDrawer>
  )
}

export { AlertBottomDrawer }
