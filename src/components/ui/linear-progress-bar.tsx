import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Linear Progress Bar (114:584). value is 0-100.
type LinearProgressBarProps = ComponentProps<"div"> & { value?: number }

function LinearProgressBar({ className, value = 0, ...props }: LinearProgressBarProps) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-border-default", className)}
      {...props}
    >
      <div className="h-full rounded-full bg-border-selected" style={{ width: `${v}%` }} />
    </div>
  )
}

export { LinearProgressBar }
