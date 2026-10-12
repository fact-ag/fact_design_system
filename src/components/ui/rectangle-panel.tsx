import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Rectangle Panel (284:357). Container slot -> children.
function RectanglePanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-clip rounded-[18px] border border-border-default bg-bg-default px-[15px] pt-2.5 pb-[15px] shadow-croptrak",
        className,
      )}
      {...props}
    />
  )
}

export { RectanglePanel }
