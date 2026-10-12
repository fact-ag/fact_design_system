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
    <BottomDrawer open={open} onClose={onClose} role="alertdialog" className="h-273">
      <div className="flex flex-col items-center px-34 pt-14 pb-20 text-center">
        <span className="flex size-56 items-center justify-center rounded-full bg-fill-danger-surface-subtle text-fill-danger">
          <Icon name="triangle-exclamation" size={20} className="size-25" />
        </span>
        <h2 className="mt-20 text-title text-text-default">{title}</h2>
        {description && <p className="mt-10 h-39 line-clamp-2 text-body text-text-muted">{description}</p>}
      </div>
      <div className="flex gap-20 px-33">
        <Button variant="secondary" className="flex-1" onClick={onCancel ?? onClose}>
          {cancelLabel}
        </Button>
        <Button className={destructive ? "flex-1 bg-fill-danger text-text-on-fill-brand active:bg-fill-danger active:opacity-80" : "flex-1"} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </BottomDrawer>
  )
}

export { AlertBottomDrawer }
