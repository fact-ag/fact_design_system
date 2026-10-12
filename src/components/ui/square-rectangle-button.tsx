import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Square Rectangle Button (270:280). Size=[Small|Medium|Large] -> size (small|medium|large).
// Figma has no pressed/disabled states; pressed/disabled here are a fallback.
const squareButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center bg-fill-alternative text-text-on-fill-brand outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus active:opacity-80 disabled:cursor-not-allowed disabled:bg-fill-disabled disabled:text-text-on-fill-disabled",
  {
    variants: {
      size: {
        small: "size-8 rounded-lg",
        medium: "size-[46px] rounded-[10px]",
        large: "size-[60px] rounded-[14px]",
      },
    },
    defaultVariants: { size: "small" },
  },
)
const iconPx = { small: 15, medium: 20, large: 30 } as const

type SquareRectangleButtonProps = Omit<ComponentProps<"button">, "aria-label"> &
  VariantProps<typeof squareButtonVariants> & { label: string; icon?: IconName }

function SquareRectangleButton({ className, size = "small", label, icon = "house", type = "button", ...props }: SquareRectangleButtonProps) {
  const px = iconPx[size ?? "small"]
  return (
    <button type={type} aria-label={label} className={cn(squareButtonVariants({ size }), className)} {...props}>
      <Icon name={icon} size={px} />
    </button>
  )
}

export { SquareRectangleButton, squareButtonVariants }
