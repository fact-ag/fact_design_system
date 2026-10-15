import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@/components/ui/icon"

// Figma: Interactive Input (299:483). State=[Empty|Filled] comes from value. Action=[Clear|Scan] -> action.
// The four Slot props become leading (default Checkbox). Filled shows title and optional detail; Empty shows an input.
type InteractiveInputProps = Omit<ComponentProps<"div">, "onChange"> & {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  action?: "clear" | "scan"
  /** Fires when the trailing action button is pressed (clear the value, or open the scanner). */
  onAction?: () => void
  /** Replaces the leading checkbox. */
  leading?: ReactNode
  /** Second line in the filled state (for example a barcode). */
  detail?: ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function InteractiveInput({
  value = "",
  onChange,
  placeholder,
  action = "clear",
  onAction,
  leading,
  detail,
  checked,
  onCheckedChange,
  className,
  ...props
}: InteractiveInputProps) {
  const filled = value !== ""
  return (
    <div className={cn("flex w-full items-center gap-8 py-7", className)} {...props}>
      {leading ?? <Checkbox checked={checked} onChange={(e) => onCheckedChange?.(e.target.checked)} aria-label="Select" />}
      {filled ? (
        <div className="flex min-w-0 flex-1 flex-col py-1.25">
          <span className={cn("truncate text-text-default", detail ? "text-label" : "text-body")}>{value}</span>
          {detail && <span className="truncate font-mono text-caption leading-16 text-text-muted">{detail}</span>}
        </div>
      ) : (
        <div className="relative h-20 min-w-0 flex-1">
          <span aria-hidden className="absolute top-0 left-0 h-20 w-1.5 animate-caret bg-fill-success" />
          <input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder ?? (action === "scan" ? "Scan or enter a code" : "Enter a name")}
            className="h-20 w-full bg-transparent pl-3.5 text-body text-text-default caret-transparent outline-none placeholder:text-text-muted/50"
          />
        </div>
      )}
      <button
        type="button"
        onClick={onAction}
        aria-label={action === "scan" ? "Scan" : "Clear"}
        className="flex h-23.5 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        <Icon name={action === "scan" ? "barcode-read" : "material-close"} size={16} />
      </button>
    </div>
  )
}

export { InteractiveInput }
