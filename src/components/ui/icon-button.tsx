import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Icon Button (1017:859). State=[Default|Pressed|Disabled|Alt]. Pressed = :active, Disabled = :disabled, Alt = variant="alt".
// Disabled fill in Figma is raw #d3cfc2 (no variable) -> bg-border-default (same value).
type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> & {
  label: string
  icon?: IconName
  variant?: "default" | "alt"
  /** Glyph size in px. Figma uses 16, and 24 for Material glyphs such as the header menu. */
  iconSize?: number
}

function IconButton({ className, label, icon = "house", variant = "default", iconSize = 16, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex size-40 shrink-0 cursor-pointer items-center justify-center rounded-20 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed",
        variant === "alt"
          ? "bg-fill-neutral-default text-text-on-fill-neutral"
          : "border border-border-default bg-bg-default text-icon-default on-fog:border-transparent shadow-glow-sm active:bg-fill-neutral-default active:text-text-on-fill-neutral disabled:bg-border-default disabled:text-text-on-fill-neutral",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  )
}

export { IconButton }
