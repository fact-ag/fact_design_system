import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Input field (114:612). Show label/unit/scan action -> label, unit, onScan.
type InputFieldProps = Omit<ComponentProps<"input">, "size"> & {
  label?: ReactNode
  unit?: ReactNode
  /** Shows the scan action (divider + barcode button) when set. */
  onScan?: () => void
}

function InputField({ label, unit, onScan, id, className, ...props }: InputFieldProps) {
  return (
    <label className={cn("flex w-full flex-col gap-2", className)}>
      {label && <span className="text-heading text-text-default">{label}</span>}
      <span className="flex h-11 items-center gap-2 rounded-pill bg-fill-neutral-default px-3 focus-within:ring-2 focus-within:ring-border-focus has-disabled:opacity-disabled">
        <input
          id={id}
          className="min-w-0 flex-1 bg-transparent text-body text-text-default outline-none placeholder:text-text-on-fill-placeholder"
          {...props}
        />
        {unit && <span className="text-body whitespace-nowrap text-text-muted">{unit}</span>}
        {onScan && (
          <>
            <span className="h-5 w-px bg-border-default" />
            <button
              type="button"
              onClick={onScan}
              className="flex size-7 cursor-pointer items-center justify-center rounded-full text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <Icon name="barcode-read" size={20} label="Scan" />
            </button>
          </>
        )}
      </span>
    </label>
  )
}

export { InputField }
