import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Icon } from "./icon"

// Figma: Tags list (1182:1086). Tag 1-3 toggles -> tags array. The Add Button is shown when onAdd is given.
// The X on each tag is not in Figma yet (team request, option A): it shows when onRemove is given.
type TagsListProps = Omit<ComponentProps<"div">, "onChange"> & {
  tags: string[]
  onTagClick?: (tag: string) => void
  onAdd?: () => void
  /** Shows an X on each tag. Called with the tag to remove. */
  onRemove?: (tag: string) => void
}

const tagFocus = "rounded-full outline-none focus-visible:ring-2 focus-visible:ring-border-focus"

function TagsList({ tags, onTagClick, onAdd, onRemove, className, ...props }: TagsListProps) {
  return (
    <div className={cn("flex w-full flex-wrap items-center gap-x-4 gap-y-6", className)} {...props}>
      {tags.map((tag) =>
        onRemove ? (
          <span key={tag} className="inline-flex h-28 items-center rounded-25 bg-fill-brand-default text-body text-text-on-fill-brand transition-colors has-active:bg-fill-brand-pressed">
            <button type="button" className={cn(tagFocus, "h-full cursor-pointer pr-2 pl-8")} onClick={() => onTagClick?.(tag)}>
              {tag}
            </button>
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              className={cn(tagFocus, "mr-4 flex size-20 cursor-pointer items-center justify-center hover:bg-text-on-fill-brand/20")}
              onClick={() => onRemove(tag)}
            >
              <Icon name="xmark" size={12} />
            </button>
          </span>
        ) : (
          <Button key={tag} className="h-auto rounded-25 px-8 py-4" onClick={() => onTagClick?.(tag)}>
            {tag}
          </Button>
        ),
      )}
      {onAdd && (
        <Button variant="tertiary" aria-label="Add tag" className="size-28 rounded-50 p-0" onClick={onAdd}>
          <Icon name="plus" size={16} />
        </Button>
      )}
    </div>
  )
}

export { TagsList }
