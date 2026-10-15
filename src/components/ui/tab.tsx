import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/ui/icon"

// Figma: FACT Tab (903:572). State=[Default|Active] -> selected prop. tabName is the label (Figma default state shows fixed "Tab Name").
type TabProps = Omit<ComponentProps<"button">, "children"> & { selected?: boolean; tabName?: string; /** null hides the icon. */ icon?: IconName | null }

function Tab({ className, selected = false, tabName = "Tab Name", icon = "circle-info", type = "button", ...props }: TabProps) {
  return (
    <button
      type={type}
      role="tab"
      aria-selected={selected}
      className={cn(
        "inline-flex h-34 cursor-pointer items-center justify-center gap-4 rounded-full pr-16 pl-10 text-13 leading-19.5 tracking-hairline whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        selected ? "bg-fill-accent text-text-on-fill-brand" : "text-text-muted",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex size-15 shrink-0 items-center justify-center">
          <Icon name={icon} size={12} />
        </span>
      )}
      {tabName}
    </button>
  )
}

export { Tab }
