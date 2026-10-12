import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Button (4:20). Type=[Primary|Secondary|Tertiary|Text] -> variant. State=[Default|Pressed|Disabled].
// Pressed = :active, Disabled = :disabled. Focus ring is not in Figma, so it uses border/focus.
const buttonVariants = cva(
  "inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-1.5 px-5 text-body whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-fill-brand-default text-text-on-fill-brand active:bg-fill-brand-pressed disabled:bg-fill-disabled disabled:text-text-on-fill-disabled",
        secondary:
          "rounded-full bg-fill-neutral-default text-text-on-fill-neutral active:bg-fill-neutral-pressed disabled:bg-fill-disabled disabled:text-text-on-fill-disabled",
        tertiary:
          "rounded-full border border-border-brand-tonal bg-fill-brand-tonal-default text-text-on-fill-brand-tonal active:border-border-default active:bg-fill-brand-tonal-pressed disabled:border-border-default disabled:bg-transparent disabled:text-text-on-fill-disabled",
        text: "rounded-[14px] text-text-link underline active:bg-bg-default active:text-text-muted disabled:text-text-on-fill-disabled",
      },
    },
    defaultVariants: { variant: "primary" },
  },
)

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>

function Button({ className, variant, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant }), className)} {...props} />
}

export { Button, buttonVariants }
