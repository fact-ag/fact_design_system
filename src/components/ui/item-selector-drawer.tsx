import type { ComponentProps, ReactNode } from "react"
import { BottomDrawer } from "@/components/ui/bottom-drawer"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

// Figma: Item selector drawer (518:278). Show button -> showBack. Selector rows are children.
// Search shows when onQueryChange is set. The footer button shows when confirmLabel is set.
type ItemSelectorDrawerProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  showBack?: boolean
  onBack?: () => void
  onClear?: () => void
  query?: string
  onQueryChange?: (query: string) => void
  searchPlaceholder?: string
  confirmLabel?: ReactNode
  onConfirm?: () => void
  size?: ComponentProps<typeof BottomDrawer>["size"]
  children?: ReactNode
}

function ItemSelectorDrawer({
  open,
  onClose,
  title = "Filters",
  showBack = true,
  onBack,
  onClear,
  query = "",
  onQueryChange,
  searchPlaceholder = "Search",
  confirmLabel,
  onConfirm,
  size = "medium",
  children,
}: ItemSelectorDrawerProps) {
  return (
    <BottomDrawer open={open} onClose={onClose} size={size} aria-label={typeof title === "string" ? title : undefined}>
      <div className="relative flex min-h-full flex-col">
        <div className="flex items-center gap-14 border-b border-border-default px-14 pt-10 pb-12.5">
          {showBack && (
            <button
              type="button"
              aria-label="Back"
              onClick={onBack}
              className="flex size-36 shrink-0 cursor-pointer items-center justify-center rounded-18 bg-surface-muted text-text-on-fill-neutral outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <Icon name="arrow-left" />
            </button>
          )}
          <h2 className="flex-1 text-title text-text-default">{title}</h2>
          {onClear && (
            <Button variant="secondary" className="h-36 px-14" onClick={onClear}>
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-10 px-14 pt-9.5 pb-16">
          {onQueryChange && (
            <label className="mb-6 flex h-44 shrink-0 items-center gap-10 rounded-30 bg-fill-neutral-default px-14 text-text-muted focus-within:ring-2 focus-within:ring-border-focus">
              <Icon name="magnifying-glass" size={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-body text-text-default outline-none placeholder:text-text-on-fill-placeholder"
              />
            </label>
          )}
          {children}
        </div>
        {confirmLabel && (
          <div className="sticky bottom-0 flex h-133 items-center justify-center bg-gradient-to-b from-transparent to-bg-default px-14 pt-45 pb-10 backdrop-blur-glass">
            <Button className="w-176" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        )}
      </div>
    </BottomDrawer>
  )
}

export { ItemSelectorDrawer }
