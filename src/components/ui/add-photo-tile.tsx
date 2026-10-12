import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Add Photo Tile (1198:1086). Button; onPress -> onClick.
type AddPhotoTileProps = Omit<ComponentProps<"button">, "onClick"> & { onPress?: () => void }

function AddPhotoTile({ onPress, className, type = "button", ...props }: AddPhotoTileProps) {
  return (
    <button
      type={type}
      onClick={onPress}
      className={cn(
        "flex size-100 cursor-pointer flex-col items-center justify-center gap-6 rounded-10 border border-dashed border-text-muted bg-bg-default text-body text-text-muted outline-none focus-visible:ring-2 focus-visible:ring-border-focus active:bg-bg-muted",
        className,
      )}
      {...props}
    >
      <Icon name="image-circle-plus" size={16} />
      Add photo
    </button>
  )
}

export { AddPhotoTile }
