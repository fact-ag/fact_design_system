import type { ComponentProps, ReactNode } from "react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// Figma: List Section Header (26:294). State=[Expanded|Collapsed] -> expanded prop.
type ListSectionHeaderProps = Omit<ComponentProps<"section">, "title"> & {
  title: ReactNode
  expanded: boolean
  onToggle: () => void
}

function ListSectionHeader({ title, expanded, onToggle, children, className, ...props }: ListSectionHeaderProps) {
  return (
    <section className={cn("flex flex-col", className)} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex h-7 w-fit cursor-pointer items-center gap-1.5 rounded-full text-body text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        {title}
        <span className="flex size-6 items-center justify-center rounded-full bg-fill-neutral-default">
          <Icon name={expanded ? "chevron-up" : "chevron-down"} size={8} />
        </span>
      </button>
      {expanded && children}
    </section>
  )
}

export { ListSectionHeader }
