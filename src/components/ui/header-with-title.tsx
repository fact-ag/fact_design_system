import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"

// Figma: Header with Title (1023:1085). Back button, centered title with chevron, trailing actions as children.
// The status bar and Dynamic Island in Figma belong to the device frame and are not part of this component.
type HeaderWithTitleProps = Omit<ComponentProps<"header">, "title"> & {
  title: ReactNode
  onBack?: () => void
  /** Makes the title a button with a chevron (a title menu). */
  onTitleClick?: () => void
  /** Trailing actions, usually IconButton. */
  children?: ReactNode
}

function HeaderWithTitle({ title, onBack, onTitleClick, children, className, ...props }: HeaderWithTitleProps) {
  return (
    <header className={cn("relative flex h-40 items-center justify-between gap-8 px-16", className)} {...props}>
      {onBack ? <IconButton label="Back" icon="arrow-left" variant="alt" onClick={onBack} /> : <span className="size-40" />}
      <div className="absolute inset-x-64 flex justify-center">
        {onTitleClick ? (
          <button
            type="button"
            onClick={onTitleClick}
            className="flex cursor-pointer items-center gap-6 rounded-4 text-heading text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            {title}
            <Icon name="chevron-down" size={16} />
          </button>
        ) : (
          <h1 className="truncate text-heading text-text-default">{title}</h1>
        )}
      </div>
      <div className="flex min-w-40 justify-end gap-8">{children}</div>
    </header>
  )
}

export { HeaderWithTitle }
