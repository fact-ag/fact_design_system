import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Rectangle Panel (284:357). Container slot -> children.
function RectanglePanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-clip rounded-panel border border-border-default bg-bg-default px-4 pt-2 pb-4 shadow-card",
        className,
      )}
      {...props}
    />
  )
}

export { RectanglePanel }
