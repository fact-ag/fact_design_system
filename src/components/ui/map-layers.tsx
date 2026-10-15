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
    <div className={cn("relative flex w-full flex-col gap-16 rounded-t-25 rounded-b-50 border border-border-default bg-surface-default px-13 pt-18 pb-31", className)} {...props}>
      <div className="absolute top-4 left-1/2 h-4 w-50 -translate-x-1/2 rounded-25 bg-fill-active" />
      <div className="relative h-22">
        <h2 className="text-22 leading-none tracking-condensed text-text-default">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-5 right-2 flex size-40 cursor-pointer items-center justify-center rounded-20 border border-border-default bg-surface-default text-icon-default drop-shadow-glow outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Icon name="material-close" size={24} />
        </button>
      </div>
      <ul className="-mx-2 mt-6 grid grid-cols-3 gap-x-5.5 gap-y-13">
        {layers.map((l) => {
          const selected = l.id === selectedId
          return (
            <li key={l.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect?.(l.id)}
                className={cn(
                  "flex w-full cursor-pointer flex-col items-center gap-2 text-label outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                  selected ? "text-text-subtle" : "text-text-muted",
                )}
              >
                <span className={cn("block w-full rounded-12 border p-2", selected ? "border-border-focus" : "border-transparent")}>
                  <img src={l.image} alt="" className="block h-70 w-full rounded-10 object-cover" />
                </span>
                {l.label}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-14 text-center text-label text-text-muted">{footer}</p>
    </div>
  )
}

export { MapLayers, type MapLayer }
