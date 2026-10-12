import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Badge button (929:669). State=[Active|Inactive] boolean -> selected prop (aria-pressed).
// Figma has no pressed/disabled states; disabled here is a fallback.
type BadgeButtonProps = ComponentProps<"button"> & { selected?: boolean; icon?: IconName }

function BadgeButton({ className, selected = false, icon = "house", type = "button", children, ...props }: BadgeButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-28 shrink-0 cursor-pointer items-center gap-6 rounded-25 px-7 text-body whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50",
        selected ? "bg-fill-accent text-text-on-fill-brand" : "bg-fill-neutral-default text-text-muted",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={16} className="size-15" />
      {children}
    </button>
  )
}

export { BadgeButton }
