import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TextArea } from "@/components/ui/text-area"
import { AddPhotoTile } from "@/components/ui/add-photo-tile"
import { PhotoThumbnail } from "@/components/ui/photo-thumbnail"

// Figma: Upload Photos (1150:881). Preview of the selected photo + caption, then a carousel (Add tile first).
// Photos, selection and caption are controlled by the feature.
type UploadPhoto = {
  id: string
  src: string
  alt?: string
  state?: "default" | "uploading" | "error"
  progress?: number
}

type UploadPhotosProps = Omit<ComponentProps<"div">, "children" | "onSelect"> & {
  photos?: UploadPhoto[]
  /** id of the selected photo. Its image shows in the preview. */
  selectedId?: string
  header?: ReactNode
  caption?: string
  captionPlaceholder?: string
  showCaption?: boolean
  showPreview?: boolean
  onAdd?: () => void
  onSelect?: (id: string) => void
  onRemove?: (id: string) => void
  onRetry?: (id: string) => void
  onCaptionChange?: (value: string) => void
}

function UploadPhotos({
  photos = [],
  selectedId,
  header,
  caption,
  captionPlaceholder = "Include a caption for this photo",
  showCaption = true,
  showPreview = true,
  onAdd,
  onSelect,
  onRemove,
  onRetry,
  onCaptionChange,
  className,
  ...props
}: UploadPhotosProps) {
  const selected = photos.find((p) => p.id === selectedId)
  const done = photos.filter((p) => p.state === undefined || p.state === "default").length
  return (
    <div className={cn("flex w-full flex-col gap-4", className)} {...props}>
      {(showPreview || showCaption) && selected && (
        <div className="flex w-full flex-col gap-2">
          {showPreview && (
            <div className="h-66 w-full overflow-clip rounded-tile bg-bg-inverse">
              <img src={selected.src} alt={selected.alt ?? ""} className="size-full object-contain" />
            </div>
          )}
          {showCaption && (
            <TextArea
              value={caption ?? ""}
              placeholder={captionPlaceholder}
              aria-label="Photo caption"
              onChange={(e) => onCaptionChange?.(e.target.value)}
              className="[&_textarea]:h-21"
            />
          )}
        </div>
      )}
      <div className="flex w-full flex-col">
        <p className="text-heading text-text-default">{header ?? `Photos (${done})`}</p>
        <div className="flex gap-3 overflow-x-auto pt-3 pb-3">
          <AddPhotoTile onPress={onAdd} className="shrink-0" />
          {photos.map((p) => (
            <PhotoThumbnail
              key={p.id}
              src={p.src}
              alt={p.alt}
              state={p.id === selectedId && !p.state ? "selected" : (p.state ?? "default")}
              progress={p.progress}
              onSelect={() => onSelect?.(p.id)}
              onRemove={() => onRemove?.(p.id)}
              onRetry={() => onRetry?.(p.id)}
              className="shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export { UploadPhotos }
export type { UploadPhotosProps, UploadPhoto }
