import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Utility Button (69:473). State=[Default|Pressed|Disabled] -> :active / :disabled.
type UtilityButtonProps = ComponentProps<"button"> & { icon?: IconName }

function UtilityButton({ className, icon = "house", type = "button", children, ...props }: UtilityButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-50 w-full cursor-pointer items-center justify-center gap-6 rounded-50 border border-border-brand-tonal bg-fill-brand-tonal-default px-7 text-heading text-text-on-fill-brand-tonal outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus active:border-transparent active:bg-fill-brand-tonal-pressed disabled:cursor-not-allowed disabled:border-transparent disabled:bg-fill-disabled disabled:text-text-on-fill-disabled",
        className,
      )}
      {...props}
    >
      <span className="flex size-20 shrink-0 items-center justify-center">
        <Icon name={icon} size={16} />
      </span>
      {children}
    </button>
  )
}

export { UtilityButton }
