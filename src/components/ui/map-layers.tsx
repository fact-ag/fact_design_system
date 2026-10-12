import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Map Layers (897:514). Layer thumbnails are sample content -> `image` prop per layer.
type MapLayer = { id: string; label: string; image: string }

type MapLayersProps = Omit<ComponentProps<"div">, "children" | "onSelect"> & {
  layers: MapLayer[]
  /** Id of the selected layer. */
  selectedId?: string
  onSelect?: (id: string) => void
  onClose?: () => void
  title?: string
  footer?: string
}

function MapLayers({ layers, selectedId, onSelect, onClose, title = "Map Layers", footer = "Upload custom layers on the FA desktop app.", className, ...props }: MapLayersProps) {
  return (
    <div className={cn("relative flex w-full flex-col gap-16 rounded-t-25 rounded-b-50 border border-border-default bg-surface-default px-14 pt-19 pb-20", className)} {...props}>
      <div className="absolute top-5 left-1/2 h-4 w-50 -translate-x-1/2 rounded-25 bg-fill-active" />
      <div className="flex items-center justify-between">
        <h2 className="text-22 leading-none text-text-default">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-40 cursor-pointer items-center justify-center rounded-20 border border-border-default bg-surface-default text-icon-default drop-shadow-glow outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Icon name="xmark" size={20} />
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-x-10 gap-y-12">
        {layers.map((l) => {
          const selected = l.id === selectedId
          return (
            <li key={l.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect?.(l.id)}
                className={cn(
                  "flex w-full cursor-pointer flex-col items-center gap-4 rounded-12 border p-3 text-label outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                  selected ? "border-border-focus text-text-subtle" : "border-transparent text-text-muted",
                )}
              >
                <img src={l.image} alt="" className="h-70 w-full rounded-10 object-cover" />
                {l.label}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="text-center text-label text-text-muted">{footer}</p>
    </div>
  )
}

export { MapLayers, type MapLayer }
