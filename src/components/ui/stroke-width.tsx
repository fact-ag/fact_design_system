import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Stroke Width (1229:1462). Size=[Thin|Medium|Thick] -> size, State=[Default|Selected] -> selected.
// Selected fill (#F1F3E1) and border (#D1DBBA) have no variable; closest tokens used.
const dot = cva("rounded-full bg-fill-brand-default", {
  variants: { size: { thin: "size-1", medium: "size-2", thick: "size-3" } },
})

type StrokeWidthProps = Omit<ComponentProps<"button">, "children"> & {
  size?: "thin" | "medium" | "thick"
  selected?: boolean
}

function StrokeWidth({ size = "thin", selected = false, className, type = "button", ...props }: StrokeWidthProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      aria-label={`${size} stroke`}
      className={cn(
        "flex size-[30px] cursor-pointer items-center justify-center rounded-full border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        selected && "border-border-default bg-fill-brand-tonal-alternative",
        className,
      )}
      {...props}
    >
      <span className={dot({ size })} />
    </button>
  )
}

export { StrokeWidth }
