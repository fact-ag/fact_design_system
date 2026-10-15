import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

// Figma: Display Icon (289:298). Size=[Large|Medium|Small] -> size. Figma shows a house glyph only.
const displayIconVariants = cva("inline-flex shrink-0 items-center justify-center rounded-30 text-text-on-fill-brand-tonal", {
  variants: {
    size: {
      large: "size-38 bg-fill-neutral-default",
      medium: "size-32 bg-fill-brand-tonal-pressed",
      small: "size-28 bg-fill-neutral-default",
    },
  },
  defaultVariants: { size: "small" },
})

type DisplayIconProps = ComponentProps<"div"> & VariantProps<typeof displayIconVariants>

function DisplayIcon({ className, size, children, ...props }: DisplayIconProps) {
  return (
    <div className={cn(displayIconVariants({ size }), className)} {...props}>
      {children ?? <Icon name="house" size={16} />}
    </div>
  )
}

export { DisplayIcon, displayIconVariants }
