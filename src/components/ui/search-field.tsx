import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Search Field (232:273). State=[Default|Active|Filled]: Active -> :focus-within, Filled -> value prop.
// Default/Active show a microphone (onMicPress). Filled shows the value as a chip with a clear button (onClear).
type SearchFieldProps = Omit<ComponentProps<"input">, "value" | "type"> & {
  value?: string
  onMicPress?: () => void
  onClear?: () => void
}

function SearchField({ value = "", onMicPress, onClear, className, ...props }: SearchFieldProps) {
  const filled = value !== ""
  return (
    <div
      className={cn(
        "flex h-44 w-full items-center gap-8 rounded-30 bg-fill-neutral-default px-12 focus-within:ring-2 focus-within:ring-border-focus",
        className,
      )}
    >
      <Icon name="magnifying-glass" className="text-icon-default" />
      {filled ? (
        <>
          <span className="rounded-4 bg-fill-brand-tonal-default px-8 py-2 text-body whitespace-nowrap text-text-on-fill-brand-tonal">{value}</span>
          <span className="flex-1" />
          <button
            type="button"
            onClick={onClear}
            className="flex size-22 cursor-pointer items-center justify-center rounded-full bg-fill-accent text-icon-on-emphasis outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <Icon name="xmark" size={10} label="Clear search" />
          </button>
        </>
      ) : (
        <>
          <input
            type="search"
            value={value}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-body text-text-default outline-none placeholder:text-text-on-fill-placeholder"
            {...props}
          />
          <button
            type="button"
            onClick={onMicPress}
            className="flex size-20 cursor-pointer items-center justify-center rounded-full text-icon-muted outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <Icon name="microphone" label="Voice search" />
          </button>
        </>
      )}
    </div>
  )
}

export { SearchField }
