import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

// Figma: Display Icon (289:298). Size=[Large|Medium|Small] -> size. Figma shows a house glyph only.
const displayIconVariants = cva("inline-flex shrink-0 items-center justify-center rounded-pill text-text-on-fill-brand-tonal", {
  variants: {
    size: {
      large: "size-9 bg-fill-neutral-default",
      medium: "size-8 bg-fill-brand-tonal-pressed",
      small: "size-7 bg-fill-neutral-default",
    },
  },
  defaultVariants: { size: "small" },
})

type DisplayIconProps = ComponentProps<"div"> & VariantProps<typeof displayIconVariants>

function DisplayIcon({ className, size, children, ...props }: DisplayIconProps) {
  return (
    <div className={cn(displayIconVariants({ size }), className)} {...props}>
      {children ?? <Icon name="house" size={size === "medium" ? 20 : 16} />}
    </div>
  )
}

export { DisplayIcon, displayIconVariants }
