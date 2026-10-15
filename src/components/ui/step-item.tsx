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
      className={cn("inline-flex items-start gap-10 overflow-clip py-8 pr-10 pl-4", className)}
      {...props}
    >
      <StepIndicator state={state} stepNumber={stepNumber} />
      <span className={cn("text-16 leading-22 whitespace-nowrap", upcoming ? "text-text-disabled" : "text-text-default")}>{label}</span>
      {showConnector && (
        <span className={cn("flex size-24 items-center justify-center", upcoming ? "text-text-disabled" : "text-text-muted")}>
          <Icon name="keyboard-arrow-right" size={24} />
        </span>
      )}
    </div>
  )
}

export { StepItem }
