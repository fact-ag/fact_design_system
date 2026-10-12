import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Icon Button (1017:859). State=[Default|Pressed|Disabled|Alt]. Pressed = :active, Disabled = :disabled, Alt = variant="alt".
// Disabled fill in Figma is raw #d3cfc2 (no variable) -> bg-border-default (same value).
type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> & {
  label: string
  icon?: IconName
  variant?: "default" | "alt"
}

function IconButton({ className, label, icon = "house", variant = "default", type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-pill outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed",
        variant === "alt"
          ? "bg-fill-neutral-default text-text-on-fill-neutral"
          : "border border-border-default bg-bg-default text-icon-default shadow-raised active:bg-fill-neutral-default active:text-text-on-fill-neutral disabled:bg-border-default disabled:text-text-on-fill-neutral",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={16} className="size-5" />
    </button>
  )
}

export { IconButton }
