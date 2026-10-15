import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Rectangle Panel (284:357). Container slot -> children.
function RectanglePanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full max-w-345 flex-col overflow-clip rounded-18 border border-border-default bg-bg-default px-14 pt-9 pb-14 shadow-croptrak",
        className,
      )}
      {...props}
    />
  )
}

export { RectanglePanel }
