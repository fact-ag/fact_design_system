import type { ComponentProps, ReactNode } from "react"
import { Icon, type IconName } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// Figma: Menu Item (1086:3232). State=[Default|Active] -> active prop (current page).
type MenuItemProps = ComponentProps<"button"> & {
  icon?: IconName
  active?: boolean
  children: ReactNode
}

function MenuItem({ icon = "globe", active = false, children, className, type = "button", ...props }: MenuItemProps) {
  return (
    <button
      type={type}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full cursor-pointer items-center gap-10 rounded-10 p-10 text-left text-title outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        active ? "bg-surface-muted text-text-default" : "text-text-muted",
        className,
      )}
      {...props}
    >
      <Icon name={icon} />
      {children}
    </button>
  )
}

export { MenuItem }
