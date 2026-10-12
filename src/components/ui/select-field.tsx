import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/ui/icon"

// Figma: Select Field (24:298). State=[Default|Active|Selected]: Active -> open, Selected -> value is set.
type SelectFieldProps = Omit<ComponentProps<"button">, "value"> & {
  label?: ReactNode
  placeholder?: ReactNode
  /** Selected value. When set the field shows the Selected look. */
  value?: ReactNode
  /** Open (Active) look with the angle-up chevron. */
  open?: boolean
  icon?: IconName
  unit?: ReactNode
  onScan?: () => void
}

function SelectField({ label, placeholder = "Select Property", value, open = false, icon = "house", unit, onScan, className, ...props }: SelectFieldProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && <span className="text-heading text-text-default">{label}</span>}
      <div className="flex h-[44px] items-center gap-2.5 rounded-[30px] bg-fill-neutral-default px-3.5">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-full min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-full text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        >
          <span className="flex size-5 items-center justify-center text-text-on-fill-brand-tonal">
            <Icon name={icon} />
          </span>
          <span className={cn("min-w-0 flex-1 truncate text-body", value ? "text-text-default" : "text-text-on-fill-placeholder")}>
            {value ?? placeholder}
          </span>
          {unit && <span className="text-body whitespace-nowrap text-text-muted">{unit}</span>}
          <span className="flex size-5 items-center justify-center text-text-on-fill-brand-tonal">
            <Icon name={open ? "angle-up" : "angle-down"} />
          </span>
        </button>
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
      </div>
    </div>
  )
}

export { SelectField }
