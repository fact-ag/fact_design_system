import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import filterList from "@/assets/images/filter-list.svg"

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
    <div className={cn("flex h-17 w-full items-center gap-2 rounded-pill border border-border-neutral bg-bg-default px-3", className)} {...props}>
      <div className="flex h-10 min-w-0 flex-1 items-center rounded-pill bg-fill-neutral-default pr-3 pl-3 text-text-muted">
        <button type="button" onClick={onOpen} className={cn("flex h-full min-w-0 flex-1 cursor-pointer items-center gap-1 rounded-pill text-body text-text-muted", focus)}>
          <Icon name="magnifying-glass" size={20} className="text-icon-default" />
          <span className="truncate">{placeholder}</span>
        </button>
        <button type="button" onClick={onMic} aria-label="Voice search" className={cn("flex size-6 cursor-pointer items-center justify-center rounded-pill text-icon-default", focus)}>
          <Icon name="microphone" size={16} />
        </button>
      </div>
      <button
        type="button"
        onClick={onFilter}
        aria-label="Filter"
        className={cn("flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-pill border border-border-default bg-surface-default drop-shadow-floating", focus)}
      >
        <img src={filterList} alt="" className="size-6" />
      </button>
    </div>
  )
}

export { MyPropertiesMinimized }
