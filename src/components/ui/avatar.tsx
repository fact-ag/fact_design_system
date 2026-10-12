import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Avatar (1252:1791). Size=[Small|Medium] -> size. Initials is a text prop.
const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center border border-border-brand-tonal bg-fill-brand-tonal-default text-text-default",
  {
    variants: {
      size: {
        small: "size-20 rounded-10 text-caption",
        medium: "size-32 rounded-16 text-label",
      },
    },
    defaultVariants: { size: "small" },
  },
)

type AvatarProps = ComponentProps<"div"> & VariantProps<typeof avatarVariants> & { initials?: string }

function Avatar({ className, size, initials = "AM", ...props }: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {initials}
    </div>
  )
}

export { Avatar, avatarVariants }
