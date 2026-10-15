import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Sequence Step (1232:1691). State=[Default|Selected|Disabled] -> selected prop + disabled attribute.
type SequenceStepProps = Omit<ComponentProps<"button">, "value" | "children"> & {
  value: string
  selected?: boolean
}

function SequenceStep({ value, selected = false, className, type = "button", ...props }: SequenceStepProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "flex h-36 w-29 cursor-pointer items-center justify-center rounded-8 border border-border-default bg-fill-rating-05 text-label text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:bg-fill-disabled disabled:text-text-disabled",
        selected && "border-transparent shadow-ring-selected",
        className,
      )}
      {...props}
    >
      {value}
    </button>
  )
}

export { SequenceStep }
