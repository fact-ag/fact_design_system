import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Numberic Input (1180:1020). Controlled number with minus/plus buttons.
type NumberInputProps = Omit<ComponentProps<"div">, "onChange"> & {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  disabled?: boolean
}

const stepper =
  "flex size-6 cursor-pointer items-center justify-center rounded-pill border border-border-default bg-surface-default text-text-on-fill-neutral outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-disabled"

function NumberInput({ value, onChange, min = -Infinity, max = Infinity, step = 1, placeholder = "Number of X", disabled, className, ...props }: NumberInputProps) {
  const set = (n: number) => onChange?.(Math.min(max, Math.max(min, n)))
  return (
    <div className={cn("flex h-11 w-full items-center gap-2 rounded-pill bg-fill-neutral-default px-1.5", className)} {...props}>
      <button type="button" className={stepper} disabled={disabled || (value ?? 0) <= min} onClick={() => set((value ?? 0) - step)}>
        <Icon name="minus" size={12} label="Decrease" />
      </button>
      <input
        type="number"
        inputMode="decimal"
        value={value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => e.target.value !== "" && set(Number(e.target.value))}
        className="min-w-0 flex-1 bg-transparent text-center text-body text-text-default outline-none [appearance:textfield] placeholder:text-text-on-fill-placeholder [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button type="button" className={stepper} disabled={disabled || (value ?? 0) >= max} onClick={() => set((value ?? 0) + step)}>
        <Icon name="plus" size={12} label="Increase" />
      </button>
    </div>
  )
}

export { NumberInput }
