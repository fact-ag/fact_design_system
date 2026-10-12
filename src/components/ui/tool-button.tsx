import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Tool Button (1229:1444). State=[Default|Active|Disabled]. Active -> selected prop (aria-pressed), Disabled -> :disabled.
type ToolButtonProps = Omit<ComponentProps<"button">, "aria-label"> & { label: string; selected?: boolean; icon?: IconName }

function ToolButton({ className, label, selected = false, icon = "pen", type = "button", ...props }: ToolButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border text-icon-default outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:text-icon-disabled",
        selected ? "border-border-brand-tonal bg-fill-brand-tonal-default" : "border-transparent",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={16} className="size-5" />
    </button>
  )
}

export { ToolButton }
