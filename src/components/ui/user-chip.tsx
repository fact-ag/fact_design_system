import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Icon } from "@/components/ui/icon"
import { initialsOf } from "@/components/ui/user-row"

// Figma: User Chip (1252:1809). Remove button calls onRemove.
type UserChipProps = ComponentProps<"div"> & {
  name: string
  initials?: string
  onRemove?: () => void
}

function UserChip({ name, initials = initialsOf(name), onRemove, className, ...props }: UserChipProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-6 rounded-16 border border-border-brand-tonal bg-fill-brand-tonal-default py-4 pr-8 pl-4", className)}
      {...props}
    >
      <Avatar size="small" initials={initials} />
      <span className="text-label whitespace-nowrap text-text-default">{name}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${name}`}
        className="flex size-20 cursor-pointer items-center justify-center rounded-full text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        <Icon name="xmark" size={12} />
      </button>
    </div>
  )
}

export { UserChip }
