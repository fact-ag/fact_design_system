import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Alt Tab Active (909:883). State=[Active|Inactive] -> selected prop. Shadow is an arbitrary value (no matching token).
type AltTabProps = ComponentProps<"button"> & { selected?: boolean }

function AltTab({ className, selected = false, type = "button", children = "Tab Name", ...props }: AltTabProps) {
  return (
    <button
      type={type}
      role="tab"
      aria-selected={selected}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full px-[18px] py-[7px] text-label whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        selected ? "bg-surface-default text-text-default shadow-[0_1px_1.5px_rgba(41,71,57,0.1)]" : "text-text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { AltTab }
