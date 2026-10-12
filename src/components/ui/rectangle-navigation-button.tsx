import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Rectangle Navigation Button (855:1087). Property 1=[GreenVariant|RedVariant|SiltVariant] -> variant (green|red|silt).
// The trailing "N" + arrow image in Figma is a chevron: rendered as <Icon name="chevron-right" /> with `meta` text (default "N") instead of the SVG asset.
// Figma has no pressed/disabled states; pressed/disabled here are a fallback.
const rectangleNavigationButtonVariants = cva(
  "flex w-full cursor-pointer items-center gap-12 rounded-14 px-14 py-13 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50",
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
  red: "bg-fill-danger-surface-subtle text-fill-danger",
  silt: "bg-fill-accent text-text-on-fill-brand",
}

type RectangleNavigationButtonProps = Omit<ComponentProps<"button">, "title"> &
  VariantProps<typeof rectangleNavigationButtonVariants> & { icon?: IconName; title?: ReactNode; meta?: ReactNode }

function RectangleNavigationButton({ className, variant = "green", icon = "house", title = "Title", meta = "N", type = "button", ...props }: RectangleNavigationButtonProps) {
  return (
    <button type={type} className={cn(rectangleNavigationButtonVariants({ variant }), className)} {...props}>
      <span className={cn("flex size-36 shrink-0 items-center justify-center rounded-10", overlay[variant ?? "green"])}>
        <Icon name={icon} size={16} className="size-20" />
      </span>
      <span className="min-w-px flex-1 text-18 leading-none tracking-condensed">{title}</span>
      <span className="flex shrink-0 items-center gap-2 text-body leading-none text-text-muted">
        {meta}
        <span className="flex size-20 shrink-0 items-center justify-center">
          <Icon name="chevron-right" size={16} />
        </span>
      </span>
    </button>
  )
}

export { RectangleNavigationButton, rectangleNavigationButtonVariants }
