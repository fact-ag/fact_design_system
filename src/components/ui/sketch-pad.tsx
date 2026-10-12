import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { AlertBottomDrawer } from "@/components/ui/alert-bottom-drawer"
import { DrawingToolbar } from "./drawing-toolbar"
import { Icon } from "./icon"

// Figma: Sketch Pad (1227:1461). State=[Blank|Drawing|Discard] -> state.
// Blank = hint + disabled Done; Drawing = children is the drawing layer; Discard = Drawing + confirm drawer.
// The canvas itself is the feature's job: render it as children. Toolbar props go in toolbarProps.
type SketchPadProps = Omit<ComponentProps<"div">, "children"> & {
  state?: "blank" | "drawing" | "discard"
  /** The drawing surface. */
  children?: ReactNode
  title?: string
  hint?: string
  toolbarProps?: Omit<ComponentProps<typeof DrawingToolbar>, "context">
  onCancel?: () => void
  onDone?: () => void
  /** Discard drawer: "Keep drawing" and backdrop/Escape. */
  onKeepDrawing?: () => void
  onDiscard?: () => void
}

function SketchPad({
  state = "blank",
  children,
  title = "Sketch",
  hint = "Draw with your finger",
  toolbarProps,
  onCancel,
  onDone,
  onKeepDrawing,
  onDiscard,
  className,
  ...props
}: SketchPadProps) {
  const blank = state === "blank"
  return (
    <div className={cn("relative flex h-full min-h-150 w-full flex-col overflow-clip bg-bg-default", className)} {...props}>
      <div className="relative min-h-0 flex-1">
        {children}
        {blank && (
          <div className="absolute top-1/2 left-1/2 -mt-15 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-icon-subtle opacity-secondary">
            <Icon name="scribble" size={16} className="size-5" />
            <p className="text-title whitespace-nowrap">{hint}</p>
          </div>
        )}
      </div>
      <div className="absolute inset-x-4 top-15 flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-pill bg-bg-default px-4 py-3 text-body text-text-default drop-shadow-floating outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          Cancel
        </button>
        <h2 className="text-heading text-text-default">{title}</h2>
        <Button disabled={blank} onClick={onDone}>
          Done
        </Button>
      </div>
      <DrawingToolbar
        context="canvas"
        canUndo={!blank}
        canRedo={false}
        {...toolbarProps}
        className={cn("absolute bottom-8 left-1/2 -translate-x-1/2", toolbarProps?.className)}
      />
      <AlertBottomDrawer
        open={state === "discard"}
        onClose={() => onKeepDrawing?.()}
        title="Discard sketch?"
        description="Your drawing will be lost. This can't be undone."
        cancelLabel="Keep drawing"
        confirmLabel="Discard"
        destructive
        onCancel={onKeepDrawing}
        onConfirm={onDiscard}
      />
    </div>
  )
}

export { SketchPad }
