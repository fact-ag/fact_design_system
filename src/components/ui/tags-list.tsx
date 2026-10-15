import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Icon } from "./icon"

// Figma: Tags list (1182:1086). Tag 1-3 toggles -> tags array. The Add Button is shown when onAdd is given.
// The X on each tag is not in Figma yet (team request): it shows when onRemove is given.
type TagsListProps = Omit<ComponentProps<"div">, "onChange"> & {
  tags: string[]
  onTagClick?: (tag: string) => void
  onAdd?: () => void
  /** Shows an X on each tag. Called with the tag to remove. */
  onRemove?: (tag: string) => void
}

function TagsList({ tags, onTagClick, onAdd, onRemove, className, ...props }: TagsListProps) {
  return (
    <div className={cn("flex w-full flex-wrap items-center gap-x-4 gap-y-6", className)} {...props}>
      {tags.map((tag) =>
        onRemove ? (
          <span key={tag} className="inline-flex items-center">
            <Button className="h-auto rounded-l-25 rounded-r-none py-4 pr-4 pl-8" onClick={() => onTagClick?.(tag)}>
              {tag}
            </Button>
            <Button aria-label={`Remove ${tag}`} className="h-auto rounded-l-none rounded-r-25 py-4 pr-8 pl-2" onClick={() => onRemove(tag)}>
              <Icon name="xmark" size={12} />
            </Button>
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
