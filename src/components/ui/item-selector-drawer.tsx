import type { ComponentProps, ReactNode } from "react"
import { BottomDrawer } from "@/components/ui/bottom-drawer"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"

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
        <div className="flex items-center gap-3.5 border-b border-border-default px-3.5 pt-3.5 pb-3">
          {showBack && <IconButton label="Back" icon="arrow-left" variant="alt" onClick={onBack} />}
          <h2 className="flex-1 text-title text-text-default">{title}</h2>
          {onClear && (
            <Button variant="secondary" className="h-9 px-3.5" onClick={onClear}>
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2.5 px-3.5 pt-2.5 pb-4">
          {onQueryChange && (
            <label className="flex h-11 shrink-0 items-center gap-2.5 rounded-[30px] bg-fill-neutral-default px-3.5 text-text-muted focus-within:ring-2 focus-within:ring-border-focus">
              <Icon name="magnifying-glass" size={16} className="size-[18px]" />
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
          <div className="sticky bottom-0 flex justify-center bg-gradient-to-b from-transparent to-bg-default px-3.5 pt-[45px] pb-2.5 backdrop-blur-[15px]">
            <Button className="w-44" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        )}
      </div>
    </BottomDrawer>
  )
}

export { ItemSelectorDrawer }
