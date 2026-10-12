import type { ComponentProps, ReactNode } from "react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// Figma: List Section Header - Large (1086:3064). State=[Collapse|Expand] -> expanded prop.
// Figma "Collapse" shows chevron-up (the section is open and can collapse).
type ListSectionHeaderLargeProps = Omit<ComponentProps<"section">, "title"> & {
  title: ReactNode
  expanded: boolean
  onToggle: () => void
}

function ListSectionHeaderLarge({ title, expanded, onToggle, children, className, ...props }: ListSectionHeaderLargeProps) {
  return (
    <section className={cn("flex flex-col", className)} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-tile p-2 text-left text-title text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        {title}
        <span className="flex size-6 items-center justify-center text-text-on-fill-brand-tonal">
          <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} />
        </span>
      </button>
      {expanded && children}
    </section>
  )
}

export { ListSectionHeaderLarge }
