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
    <div className={cn("flex w-full flex-wrap items-center gap-x-4 gap-y-6", className)} {...props}>
      {tags.map((tag) => (
        <Button key={tag} className="h-auto rounded-25 px-8 py-4" onClick={() => onTagClick?.(tag)}>
          {tag}
        </Button>
      ))}
      {onAdd && (
        <Button variant="tertiary" aria-label="Add tag" className="size-28 rounded-50 p-0 text-24 leading-20" onClick={onAdd}>
          +
        </Button>
      )}
    </div>
  )
}

export { TagsList }
