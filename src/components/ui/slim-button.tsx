import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Slim Button (302:293). Style=[Primary|Secondary|Secondary 2] -> variant (primary|secondary|secondary2). showIcon -> icon prop (null hides it).
// Figma has no pressed/disabled for this set; the pressed/disabled looks reuse the Button tokens (fallback).
const slimButtonVariants = cva(
  "inline-flex h-[30px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[25px] border px-2.5 text-body leading-none whitespace-nowrap shadow-[0_0_5px_0_#2947391a] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:border-border-default disabled:bg-fill-disabled disabled:text-text-on-fill-disabled",
  {
    variants: {
      variant: {
        primary: "border-border-default bg-fill-brand-default text-text-on-fill-brand active:bg-fill-brand-pressed",
        secondary: "border-border-brand-tonal bg-fill-brand-tonal-default text-text-on-fill-brand-tonal active:bg-fill-brand-tonal-pressed",
        secondary2: "border-border-default bg-surface-default text-text-default active:bg-fill-neutral-pressed",
      },
    },
    defaultVariants: { variant: "primary" },
  },
)

type SlimButtonProps = ComponentProps<"button"> &
  VariantProps<typeof slimButtonVariants> & { icon?: IconName | null }

function SlimButton({ className, variant, icon = "house", type = "button", children, ...props }: SlimButtonProps) {
  return (
    <button type={type} className={cn(slimButtonVariants({ variant }), className)} {...props}>
      {icon && <Icon name={icon} size={16} className="size-[15px]" />}
      {children}
    </button>
  )
}

export { SlimButton, slimButtonVariants }
