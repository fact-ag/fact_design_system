import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"
import { StepIndicator, type StepState } from "./step-indicator"

// Figma: CT Step Item (89:63). State=[upcoming|active|completed] -> state. showConnector, label, stepNumber are props.
type StepItemProps = ComponentProps<"div"> & { state?: StepState; label?: string; stepNumber?: string; showConnector?: boolean }

function StepItem({ className, state = "upcoming", label = "Label", stepNumber = "1", showConnector = true, ...props }: StepItemProps) {
  const upcoming = state === "upcoming"
  return (
    <div
      aria-current={state === "active" ? "step" : undefined}
      className={cn("inline-flex items-start gap-2 overflow-clip py-2 pr-2 pl-1", className)}
      {...props}
    >
      <StepIndicator state={state} stepNumber={stepNumber} />
      <span className={cn("text-heading whitespace-nowrap", upcoming ? "text-text-disabled" : "text-text-default")}>{label}</span>
      {showConnector && (
        <span className={cn("flex size-6 items-center justify-center", upcoming ? "text-text-disabled" : "text-text-muted")}>
          <Icon name="chevron-right" size={12} />
        </span>
      )}
    </div>
  )
}

export { StepItem }
