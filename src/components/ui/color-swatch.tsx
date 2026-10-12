import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Color Swatch (1229:1449). State=[Default|Selected] -> selected. color is user data (inline style allowed).
type ColorSwatchProps = Omit<ComponentProps<"button">, "color"> & {
  /** Any CSS color string. */
  color: string
  selected?: boolean
  /** Accessible name, for example "Red". */
  label: string
}

function ColorSwatch({ color, selected = false, label, className, type = "button", ...props }: ColorSwatchProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      aria-label={label}
      className={cn(
        "flex size-[30px] cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        selected && "border-2 border-fill-brand-default",
        className,
      )}
      {...props}
    >
      <span className="size-5 rounded-full border border-border-default" style={{ backgroundColor: color }} />
    </button>
  )
}

export { ColorSwatch }
