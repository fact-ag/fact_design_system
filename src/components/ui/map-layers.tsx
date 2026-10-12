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
    <div className={cn("relative flex w-full flex-col gap-4 rounded-t-sheet rounded-b-screen border border-border-default bg-surface-default px-3 pt-5 pb-5", className)} {...props}>
      <div className="absolute top-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-pill bg-fill-active" />
      <div className="flex items-center justify-between">
        <h2 className="text-title text-text-default">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 cursor-pointer items-center justify-center rounded-pill border border-border-default bg-surface-default text-icon-default drop-shadow-floating outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Icon name="xmark" size={20} />
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-x-2 gap-y-3">
        {layers.map((l) => {
          const selected = l.id === selectedId
          return (
            <li key={l.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect?.(l.id)}
                className={cn(
                  "flex w-full cursor-pointer flex-col items-center gap-1 rounded-card border p-0.5 text-label outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                  selected ? "border-border-focus text-text-subtle" : "border-transparent text-text-muted",
                )}
              >
                <img src={l.image} alt="" className="h-18 w-full rounded-tile object-cover" />
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
