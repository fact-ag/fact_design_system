import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Figma: Slider (89:404). Native range input styled to the Figma track and knob.
// The knob is CSS (green circle + Croptrak shadow) instead of the exported SVG.
type SliderProps = Omit<ComponentProps<"input">, "type" | "title"> & {
  title?: ReactNode
  subtitle?: ReactNode
  min?: number
  max?: number
  value?: number
}

const thumb =
  "h-20 w-20 appearance-none rounded-full border-0 bg-status-success shadow-croptrak"

function Slider({ title, subtitle, min = 0, max = 100, value = 0, className, ...props }: SliderProps) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0
  return (
    <label className={cn("flex w-full flex-col gap-4 pt-15.5", className)}>
      {title && <span className="text-18 leading-none text-text-default">{title}</span>}
      {subtitle && <span className="text-caption leading-20 text-text-muted">{subtitle}</span>}
      <span className="flex flex-col">
      <span className="flex h-44 items-center rounded-20 bg-fill-neutral-default px-17">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          style={{
            background: `linear-gradient(to right, var(--color-fill-brand-default) ${pct}%, var(--color-border-default) ${pct}%) center / 100% 4px no-repeat`,
          }}
          className={cn(
            "block h-28 w-full cursor-pointer appearance-none rounded-2 bg-transparent outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50",
            `[&::-webkit-slider-thumb]:${thumb.split(" ").join(" [&::-webkit-slider-thumb]:")}`,
            `[&::-moz-range-thumb]:${thumb.split(" ").join(" [&::-moz-range-thumb]:")}`,
          )}
          {...props}
        />
      </span>
        <span className="flex justify-between px-17 pt-5 text-label text-text-muted">
          <span>{min.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </span>
      </span>
    </label>
  )
}

export { Slider }
