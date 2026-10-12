import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"
import { LocationPinBadge } from "./location-pin-badge"

// Figma: Property List Row (25:342). State=[Default|Pressed|Selected]: Pressed = :active, Selected = prop.
// Figma's trailing icon is a "house" placeholder; a chevron is used instead.
type PropertyListRowProps = Omit<ComponentProps<"button">, "title"> & {
  title: ReactNode
  subtitle?: ReactNode
  selected?: boolean
}

function PropertyListRow({ title, subtitle, selected = false, className, type = "button", ...props }: PropertyListRowProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "flex h-[60px] w-full cursor-pointer items-center gap-2.5 overflow-clip rounded-[30px] bg-fill-neutral-default pr-4 pl-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        selected ? "border-[1.5px] border-border-brand-tonal" : "active:bg-fill-neutral-pressed",
        className,
      )}
      {...props}
    >
      <LocationPinBadge />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-clip">
        <span className={cn("whitespace-nowrap text-text-default", selected ? "text-heading" : "text-body")}>{title}</span>
        <span className="text-label whitespace-pre text-text-muted">{subtitle}</span>
      </span>
      <Icon name="chevron-right" size={16} className="shrink-0 text-icon-default" />
    </button>
  )
}

export { PropertyListRow }
