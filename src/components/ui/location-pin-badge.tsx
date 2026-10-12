import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

// Figma: Location Pin Badge (12:167)
function LocationPinBadge({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("inline-flex size-[30px] items-center justify-center rounded-full bg-fill-brand-default text-text-on-fill-brand", className)}
      {...props}
    >
      <Icon name="house" size={16} />
    </div>
  )
}

export { LocationPinBadge }
