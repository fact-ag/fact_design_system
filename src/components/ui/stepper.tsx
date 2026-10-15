import { useEffect, useRef, type ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { StepItem } from "./step-item"

// Figma: CT Stepper (89:88). Steps=[2..8] -> steps array length. Step states come from currentStep (1-based).
// When the steps do not fit, the row scrolls sideways, keeps the active step in view and fades the clipped edges.
type StepperProps = ComponentProps<"div"> & {
  steps: string[]
  currentStep: number
}

function Stepper({ steps, currentStep, className, ...props }: StepperProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.toggleAttribute("data-overflow", el.scrollWidth > el.clientWidth)
    el.children[0]?.children[currentStep - 1]?.scrollIntoView({ inline: "center", block: "nearest" })
  }, [currentStep, steps.length])
  return (
    <div
      ref={ref}
      // ds-exception: hide scrollbar and fade clipped edges (no token for mask-image)
      className={cn("inline-flex h-47 w-fit max-w-full items-center justify-start overflow-x-auto rounded-full bg-fill-neutral-default p-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden data-overflow:[mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]", className)}
      {...props}
    >
      <div className="mx-auto flex w-max items-center">
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
    </div>
  )
}

export { Stepper }
