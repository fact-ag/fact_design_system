import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { StepItem } from "./step-item"

// Figma: CT Stepper (89:88). Steps=[2..8] -> steps array length. Step states come from currentStep (1-based).
type StepperProps = ComponentProps<"div"> & {
  steps: string[]
  currentStep: number
}

function Stepper({ steps, currentStep, className, ...props }: StepperProps) {
  return (
    <div className={cn("inline-flex h-[47px] items-center justify-center overflow-clip rounded-[23.5px] bg-fill-neutral-default p-2.5", className)} {...props}>
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
