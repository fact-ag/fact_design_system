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
        "group flex h-60 w-full cursor-pointer items-center gap-10 overflow-clip rounded-30 bg-fill-neutral-default pr-16 pl-12 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        // ds-exception: Figma stroke is 1.5px, Tailwind border widths are whole px
        selected ? "border-[1.5px] border-border-brand-tonal pr-14.5 pl-10.5" : "active:bg-fill-neutral-pressed",
        className,
      )}
      {...props}
    >
      <LocationPinBadge />
      <span className="flex min-w-0 flex-1 flex-col gap-2 overflow-clip">
        <span className={cn("whitespace-nowrap text-text-default", selected ? "text-heading" : "text-body")}>{title}</span>
        <span className="text-label whitespace-pre text-text-muted">{subtitle}</span>
      </span>
      <Icon name="chevron-right" size={16} className={cn("size-20 shrink-0", selected ? "text-text-on-fill-brand-tonal" : "text-icon-default group-active:text-text-on-fill-brand-tonal")} />
    </button>
  )
}

export { PropertyListRow }
