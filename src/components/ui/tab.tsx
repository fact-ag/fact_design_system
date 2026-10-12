import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

// Figma: FACT Tab (903:572). State=[Default|Active] -> selected prop. tabName is the label (Figma default state shows fixed "Tab Name").
type TabProps = Omit<ComponentProps<"button">, "children"> & { selected?: boolean; tabName?: string }

function Tab({ className, selected = false, tabName = "Tab Name", type = "button", ...props }: TabProps) {
  return (
    <button
      type={type}
      role="tab"
      aria-selected={selected}
      className={cn(
        "inline-flex h-[34px] cursor-pointer items-center justify-center gap-1 rounded-full pr-4 pl-2.5 text-[13px] leading-[19.5px] tracking-[-0.1px] whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
        selected ? "bg-fill-accent text-text-on-fill-brand" : "text-text-muted",
        className,
      )}
      {...props}
    >
      <Icon name="circle-info" size={12} />
      {tabName}
    </button>
  )
}

export { Tab }
