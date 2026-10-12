import { useEffect, useRef, type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Figma: Small Bottom Drawer (983:762), Medium Bottom Drawer (983:905), Large Bottom Drawer (983:1000).
// One component with a size prop. Uses the native <dialog>: showModal() gives focus trap, Escape, and the backdrop.
// modal={false} uses show(), so the page behind stays usable.
const drawerVariants = cva(
  "fixed inset-x-0 top-auto bottom-0 z-raised mx-auto w-full max-w-98 overflow-clip rounded-t-sheet rounded-b-screen border border-border-default bg-surface-default p-0 pt-3 text-text-default backdrop:bg-surface-overlay",
  {
    variants: {
      size: {
        small: "h-62",
        medium: "h-112",
        // ds-exception: viewport-relative cap, no grid class
        large: "h-199 max-h-[calc(100dvh-16px)]",
      },
    },
    defaultVariants: { size: "small" },
  },
)

type BottomDrawerProps = Omit<ComponentProps<"dialog">, "open"> &
  VariantProps<typeof drawerVariants> & {
    open: boolean
    onClose: () => void
    /** false keeps the page behind usable (no dim, no focus trap), for panels over a map or camera. */
    modal?: boolean
  }

function BottomDrawer({ open, onClose, modal = true, size, className, children, ...props }: BottomDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      if (modal) dialog.showModal()
      else dialog.show()
    }
    if (!open && dialog.open) dialog.close()
  }, [open, modal])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // A click on the dialog element itself (not its content) is a click on the backdrop.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(drawerVariants({ size }), className)}
      {...props}
    >
      <div aria-hidden className="absolute top-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-pill bg-border-focus" />
      <div className="h-full overflow-y-auto">{children}</div>
    </dialog>
  )
}

export { BottomDrawer }
