import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Figma: Tags list (1182:1086). Tag 1-3 toggles -> tags array. The Add Button is shown when onAdd is given.
type TagsListProps = Omit<ComponentProps<"div">, "onChange"> & {
  tags: string[]
  onTagClick?: (tag: string) => void
  onAdd?: () => void
}

function TagsList({ tags, onTagClick, onAdd, className, ...props }: TagsListProps) {
  return (
    <div className={cn("flex w-full flex-wrap items-center gap-x-1 gap-y-1.5", className)} {...props}>
      {tags.map((tag) => (
        <Button key={tag} className="h-auto rounded-pill px-2 py-1" onClick={() => onTagClick?.(tag)}>
          {tag}
        </Button>
      ))}
      {onAdd && (
        <Button variant="tertiary" aria-label="Add tag" className="size-6 rounded-pill p-0 text-title" onClick={onAdd}>
          +
        </Button>
      )}
    </div>
  )
}

export { TagsList }
