import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

// Figma: CT Step Indicator (89:53). State=[upcoming|completed|active] -> state. stepNumber is a text prop.
// Figma exports the circles as SVG; they are drawn in CSS here so they follow the color tokens and dark mode.
type StepState = "upcoming" | "completed" | "active"
type StepIndicatorProps = ComponentProps<"div"> & { state?: StepState; stepNumber?: string }

const styles: Record<StepState, string> = {
  upcoming: "bg-surface-default text-text-disabled",
  completed: "bg-fill-success text-text-on-fill-success",
  active: "bg-fill-brand-default text-text-on-fill-brand",
}

function StepIndicator({ className, state = "upcoming", stepNumber = "1", ...props }: StepIndicatorProps) {
  return (
    <div
      className={cn("inline-flex size-5 shrink-0 items-center justify-center rounded-pill text-body", styles[state], className)}
      {...props}
    >
      {state === "completed" ? <Icon name="check" size={12} label="Completed" /> : stepNumber}
    </div>
  )
}

export { StepIndicator }
export type { StepState }
