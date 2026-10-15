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
  /** Status badge in the subtitle row (Figma 91x17 box). */
  badge?: ReactNode
}

function ListItem({ title, subtitle, icon = "house", showChevron = true, trailing, badge, className, type = "button", ...props }: ListItemProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex w-full cursor-pointer items-center gap-12 rounded-12 bg-bg-default py-11 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="flex size-45 shrink-0 items-start justify-start rounded-10 bg-fill-alternative pt-13 pl-13 text-text-on-fill-brand">
        <span className="flex size-20 items-center justify-center">
          <Icon name={icon} />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-3">
        <span className="truncate text-16 leading-16.25 text-text-default">{title}</span>
        {(subtitle || badge) && (
          <span className="flex items-center gap-5 overflow-clip">
            {subtitle && <span className="truncate text-11 leading-16.5 text-text-muted capitalize">{subtitle}</span>}
            {badge && <span className="flex h-17 w-91 shrink-0 items-center">{badge}</span>}
          </span>
        )}
      </span>
      {showChevron && (
        <span className="flex h-25 min-w-25 shrink-0 items-center justify-center text-text-muted">
          {trailing ?? <Icon name="arrow-forward-ios" size={25} />}
        </span>
      )}
    </button>
  )
}

export { ListItem }
