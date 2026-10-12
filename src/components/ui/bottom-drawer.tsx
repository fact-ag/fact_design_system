import { useEffect, useRef, type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Figma: Small Bottom Drawer (983:762), Medium Bottom Drawer (983:905), Large Bottom Drawer (983:1000).
// One component with a size prop. Uses the native <dialog> for focus trap, Escape, and the backdrop.
const drawerVariants = cva(
  "fixed inset-x-0 top-auto bottom-0 mx-auto w-full max-w-[392px] overflow-clip rounded-t-[25px] rounded-b-[50px] border border-border-default bg-surface-default p-0 pt-3.5 text-text-default backdrop:bg-surface-overlay",
  {
    variants: {
      size: {
        small: "h-[250px]",
        medium: "h-[449px]",
        large: "h-[796px] max-h-[calc(100dvh-16px)]",
      },
    },
    defaultVariants: { size: "small" },
  },
)

type BottomDrawerProps = Omit<ComponentProps<"dialog">, "open"> &
  VariantProps<typeof drawerVariants> & {
    open: boolean
    onClose: () => void
  }

function BottomDrawer({ open, onClose, size, className, children, ...props }: BottomDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // A click on the dialog element itself (not its content) is a click on the backdrop.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(drawerVariants({ size }), className)}
      {...props}
    >
      <div aria-hidden className="absolute top-1 left-1/2 h-1 w-[50px] -translate-x-1/2 rounded-[25px] bg-border-focus" />
      <div className="h-full overflow-y-auto">{children}</div>
    </dialog>
  )
}

export { BottomDrawer }
