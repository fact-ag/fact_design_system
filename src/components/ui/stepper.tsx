import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { StepItem } from "./step-item"

// Figma: CT Stepper (89:88). Steps=[2..8] -> steps array length. Step states come from currentStep (1-based).
// When the steps do not fit, the row scrolls sideways.
type StepperProps = ComponentProps<"div"> & {
  steps: string[]
  currentStep: number
}

function Stepper({ steps, currentStep, className, ...props }: StepperProps) {
  return (
    <div className={cn("inline-flex h-12 max-w-full items-center overflow-x-auto rounded-pill bg-fill-neutral-default p-2", className)} {...props}>
      {steps.map((label, i) => (
        <StepItem
          key={i}
          label={label}
          stepNumber={String(i + 1)}
          state={i + 1 < currentStep ? "completed" : i + 1 === currentStep ? "active" : "upcoming"}
          showConnector={i < steps.length - 1}
        />
      ))}
    </div>
  )
}

export { Stepper }
