import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { ToolButton } from "./tool-button"
import { ColorSwatch } from "./color-swatch"
import { StrokeWidth } from "./stroke-width"
import type { IconName } from "./icon"

// Figma: Drawing Toolbar (1229:1591). Context=[Canvas|Map] -> context.
// Visual shell: tool, color and strokeWidth are controlled; changes go through callbacks.
type DrawingTool = "pen" | "highlighter" | "shape" | "text" | "pin" | "eraser"
type StrokeSize = "thin" | "medium" | "thick"
type SwatchOption = { color: string; label: string }

const toolMeta: Record<DrawingTool, { icon: IconName; label: string }> = {
  pen: { icon: "pen", label: "Pen" },
  highlighter: { icon: "highlighter", label: "Highlighter" },
  shape: { icon: "shapes", label: "Shape" },
  text: { icon: "font", label: "Text" },
  pin: { icon: "location-dot", label: "Pin" },
  eraser: { icon: "eraser", label: "Eraser" },
}

const canvasTools: DrawingTool[] = ["pen", "highlighter", "shape", "text", "eraser"]
const mapTools: DrawingTool[] = ["pen", "highlighter", "shape", "text", "pin", "eraser"]

// Swatch colors are Figma primitives (algae, fern, persimmon, negative, citron, mist), passed as CSS variables.
const canvasColors: SwatchOption[] = [
  { color: "var(--color-greens-algae)", label: "Algae" },
  { color: "var(--color-greens-fern)", label: "Fern" },
  { color: "var(--color-warm-earth-persimmon)", label: "Persimmon" },
  { color: "var(--color-indicators-negative)", label: "Negative" },
]
const mapColors: SwatchOption[] = [
  { color: "var(--color-warm-earth-citron)", label: "Citron" },
  { color: "var(--color-warm-earth-persimmon)", label: "Persimmon" },
  { color: "var(--color-neutrals-mist)", label: "Mist" },
  { color: "var(--color-indicators-negative)", label: "Negative" },
]

type DrawingToolbarProps = Omit<ComponentProps<"div">, "children" | "onChange"> & {
  context?: "canvas" | "map"
  tool?: DrawingTool
  onToolChange?: (tool: DrawingTool) => void
  /** CSS color of the selected swatch. */
  color?: string
  onColorChange?: (color: string) => void
  /** Overrides the default swatches of the context. */
  colors?: SwatchOption[]
  strokeWidth?: StrokeSize
  onStrokeWidthChange?: (size: StrokeSize) => void
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
}

function Divider({ className }: { className: string }) {
  return <div aria-hidden className={cn("w-px shrink-0 bg-border-default", className)} />
}

function DrawingToolbar({
  context = "canvas",
  tool = "pen",
  onToolChange,
  color,
  onColorChange,
  colors,
  strokeWidth = "medium",
  onStrokeWidthChange,
  canUndo = true,
  canRedo = true,
  onUndo,
  onRedo,
  className,
  ...props
}: DrawingToolbarProps) {
  const swatches = colors ?? (context === "map" ? mapColors : canvasColors)
  const selectedColor = color ?? swatches[0].color
  const tools = context === "map" ? mapTools : canvasTools
  return (
    <div
      className={cn("flex w-fit flex-col items-center gap-1.5 rounded-panel bg-bg-default p-2 drop-shadow-floating", className)}
      {...props}
    >
      <div role="toolbar" aria-label="Drawing tools" className="flex items-center gap-0.5">
        {tools.map((t) => (
          <ToolButton key={t} icon={toolMeta[t].icon} label={toolMeta[t].label} selected={tool === t} onClick={() => onToolChange?.(t)} />
        ))}
        <Divider className="h-6" />
        <ToolButton icon="arrow-rotate-left" label="Undo" disabled={!canUndo} onClick={onUndo} />
        <ToolButton icon="arrow-rotate-right" label="Redo" disabled={!canRedo} onClick={onRedo} />
      </div>
      <div className="flex items-center gap-2 pb-1">
        {swatches.map((s) => (
          <ColorSwatch key={s.label} color={s.color} label={s.label} selected={selectedColor === s.color} onClick={() => onColorChange?.(s.color)} />
        ))}
        <Divider className="h-5" />
        {(["thin", "medium", "thick"] as const).map((s) => (
          <StrokeWidth key={s} size={s} selected={strokeWidth === s} onClick={() => onStrokeWidthChange?.(s)} />
        ))}
      </div>
    </div>
  )
}

export { DrawingToolbar, type DrawingTool, type StrokeSize, type SwatchOption }
