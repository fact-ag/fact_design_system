import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: My Properties - Minimized (881:1660). Search pill + mic + filter. The off-canvas add_2 icon is not rendered.
type MyPropertiesMinimizedProps = Omit<ComponentProps<"div">, "children"> & {
  /** Opens the full properties list. */
  onOpen?: () => void
  onMic?: () => void
  onFilter?: () => void
  placeholder?: string
}

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-border-focus"

function MyPropertiesMinimized({ onOpen, onMic, onFilter, placeholder = "My Properties", className, ...props }: MyPropertiesMinimizedProps) {
  return (
    <div className={cn("flex h-68 w-full items-center gap-10 rounded-50 border border-border-neutral bg-bg-default px-14", className)} {...props}>
      <div className="flex h-40 min-w-0 flex-1 items-center rounded-25 bg-fill-neutral-default pr-12 pl-12 text-text-muted">
        <button type="button" onClick={onOpen} className={cn("flex h-full min-w-0 flex-1 cursor-pointer items-center gap-4 rounded-25 text-body text-text-muted", focus)}>
          <Icon name="magnifying-glass" size={20} className="text-icon-default" />
          <span className="truncate">{placeholder}</span>
        </button>
        <button type="button" onClick={onMic} aria-label="Voice search" className={cn("flex size-24 cursor-pointer items-center justify-center rounded-full text-icon-default", focus)}>
          <Icon name="microphone" size={18} />
        </button>
      </div>
      <button
        type="button"
        onClick={onFilter}
        aria-label="Filter"
        className={cn("flex size-40 shrink-0 cursor-pointer items-center justify-center rounded-20 border border-border-default bg-surface-default drop-shadow-glow", focus)}
      >
        <Icon name="filter-list" size={24} className="text-icon-default" />
      </button>
    </div>
  )
}

export { MyPropertiesMinimized }
