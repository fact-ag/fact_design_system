import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Slim Navigation Button (855:1054). Property 1=[GreenVariant|RedVariant|SiltVariant] -> variant (green|red|silt).
// Padding is 1px less than Figma on every side: the border is not counted in Figma padding. The gap above the title is a fixed 50px, as in Figma.
// Figma has no pressed/disabled states; pressed/disabled here are a fallback.
const slimNavigationButtonVariants = cva(
  "flex h-137 w-full cursor-pointer flex-col items-start overflow-clip rounded-14 px-11 py-12 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        green: "border border-border-brand-tonal bg-fill-brand-tonal-default text-text-default",
        red: "border border-status-danger-subtle bg-fill-danger-bg-subtle text-text-danger",
        silt: "border border-transparent bg-fill-neutral-default text-text-default",
      },
    },
    defaultVariants: { variant: "green" },
  },
)
const overlay = {
  green: "bg-fill-brand-subtle text-text-on-fill-brand-tonal",
  red: "bg-fill-danger-surface-subtle text-status-danger",
  silt: "bg-fill-accent text-text-on-fill-brand",
}

type SlimNavigationButtonProps = Omit<ComponentProps<"button">, "title"> &
  VariantProps<typeof slimNavigationButtonVariants> & { icon?: IconName; title?: ReactNode; description?: ReactNode }

function SlimNavigationButton({ className, variant = "green", icon = "house", title = "Title", description = "Description", type = "button", ...props }: SlimNavigationButtonProps) {
  return (
    <button type={type} className={cn(slimNavigationButtonVariants({ variant }), className)} {...props}>
      <span className={cn("flex size-28 shrink-0 items-center justify-center rounded-8", overlay[variant ?? "green"])}>
        <Icon name={icon} size={16} className="size-15" />
      </span>
      <span className="h-50 w-full shrink-0" />
      <span className="w-full text-label">{title}</span>
      <span className="w-full pt-4 text-caption text-text-muted">{description}</span>
    </button>
  )
}

export { SlimNavigationButton, slimNavigationButtonVariants }
