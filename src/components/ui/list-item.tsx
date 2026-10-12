import type { ComponentProps, ReactNode } from "react"
import { Icon, type IconName } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// Figma: List Item Variant (261:294). Title, Subtitle, Show Chevron, arrow_forward_ios slot -> trailing.
type ListItemProps = Omit<ComponentProps<"button">, "title"> & {
  title: ReactNode
  subtitle?: ReactNode
  icon?: IconName
  showChevron?: boolean
  /** Replaces the chevron (Figma slot). */
  trailing?: ReactNode
}

function ListItem({ title, subtitle, icon = "house", showChevron = true, trailing, className, type = "button", ...props }: ListItemProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-card bg-bg-default py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-tile bg-fill-alternative text-text-on-fill-brand">
        <Icon name={icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-heading text-text-default">{title}</span>
        {subtitle && <span className="truncate text-label text-text-muted capitalize">{subtitle}</span>}
      </span>
      {showChevron && (
        <span className="flex size-6 shrink-0 items-center justify-center text-text-default">
          {trailing ?? <Icon name="chevron-right" size={8} />}
        </span>
      )}
    </button>
  )
}

export { ListItem }
