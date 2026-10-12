import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Navigation button (855:994). Style=[GreenVariant|RedVariant|SiltVariant] -> variant (green|red|silt).
// Figma has no pressed/disabled states; pressed/disabled here are a fallback.
const navigationButtonVariants = cva(
  "flex min-h-35 w-full cursor-pointer flex-col items-start rounded-panel px-4 pt-4 pb-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus active:opacity-pressed disabled:cursor-not-allowed disabled:opacity-disabled",
  {
    variants: {
      variant: {
        green: "border border-border-brand-tonal bg-fill-brand-tonal-default text-text-on-fill-brand-tonal",
        red: "border border-status-danger-subtle bg-fill-danger-bg-subtle text-status-danger",
        silt: "bg-fill-neutral-default text-text-on-fill-brand-tonal",
      },
    },
    defaultVariants: { variant: "green" },
  },
)
const overlay = {
  green: "bg-fill-brand-subtle text-text-on-fill-brand-tonal",
  red: "bg-fill-danger-surface-subtle text-status-danger",
  silt: "bg-text-on-fill-placeholder text-text-on-fill-brand",
}

type NavigationButtonProps = Omit<ComponentProps<"button">, "title"> &
  VariantProps<typeof navigationButtonVariants> & { icon?: IconName; title?: ReactNode; description?: ReactNode }

function NavigationButton({ className, variant = "green", icon = "house", title = "Title", description = "Description", type = "button", ...props }: NavigationButtonProps) {
  return (
    <button type={type} className={cn(navigationButtonVariants({ variant }), className)} {...props}>
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-tile", overlay[variant ?? "green"])}>
        <Icon name={icon} size={16} className="size-5" />
      </span>
      <span className="min-h-6 flex-1" />
      <span className="w-full text-heading">{title}</span>
      <span className="w-full pt-0.5 text-body text-text-muted">{description}</span>
    </button>
  )
}

export { NavigationButton, navigationButtonVariants }
