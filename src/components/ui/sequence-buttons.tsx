import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { SequenceStep } from "./sequence-step"

// Figma: Sequence Buttons (293:332). title, legends, N/A are optional. Single choice: value is the selected number (0 = N/A).
// Colors per step are Figma's rating fills. Steps above `max` render disabled (Figma shows 8-10 disabled).
const fills = [
  "bg-fill-rating-00 text-text-muted",
  "bg-fill-rating-01",
  "bg-fill-rating-02",
  "bg-fill-rating-03",
  "bg-fill-rating-04",
  "bg-fill-rating-05",
  "bg-fill-rating-06",
  "bg-fill-rating-07",
  "bg-fill-rating-08",
  "bg-fill-rating-09",
  "bg-fill-rating-10",
]

type SequenceButtonsProps = Omit<ComponentProps<"div">, "onChange" | "title"> & {
  value?: number | null
  onValueChange?: (value: number) => void
  max?: number
  title?: string
  legends?: boolean
  lowLabel?: string
  highLabel?: string
  showNA?: boolean
  naLabel?: string
}

function SequenceButtons({
  value = null, onValueChange, max = 10, title, legends = true, lowLabel = "Poor", highLabel = "Excellent",
  showNA = true, naLabel = "N/A", className, ...props
}: SequenceButtonsProps) {
  return (
    <div role="group" aria-label={title} className={cn("flex w-full max-w-358 flex-col gap-8", className)} {...props}>
      {title && <p className="text-heading text-text-default">{title}</p>}
      <div className="flex items-center gap-4 p-4">
        {fills.map((fill, n) =>
          n === 0 && !showNA ? null : (
            <SequenceStep
              key={n}
              value={String(n)}
              selected={value === n}
              disabled={n > max}
              aria-label={n === 0 ? naLabel : String(n)}
              onClick={() => onValueChange?.(n)}
              className={cn("w-auto min-w-0 flex-1 disabled:bg-fill-disabled", n <= max && fill)}
            />
          ),
        )}
      </div>
      {legends && (
        <div className="flex gap-4 px-4 text-caption text-text-muted">
          {showNA && <span className="w-28.25 shrink-0 text-center">{naLabel}</span>}
          <span className="min-w-0 flex-1">{lowLabel}</span>
          <span className="text-right whitespace-nowrap">{highLabel}</span>
        </div>
      )}
    </div>
  )
}

export { SequenceButtons }
