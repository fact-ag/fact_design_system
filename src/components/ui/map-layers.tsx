import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Map Layers (897:514). Layer thumbnails are sample content -> `image` prop per layer.
type MapLayer = { id: string; label: string; image: string }

type MapLayersProps = Omit<ComponentProps<"div">, "children"> & {
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
    <div className={cn("relative flex w-full flex-col gap-4 rounded-t-[25px] rounded-b-[50px] border border-border-default bg-surface-default px-3.5 pt-[19px] pb-5", className)} {...props}>
      <div className="absolute top-[5px] left-1/2 h-1 w-[50px] -translate-x-1/2 rounded-[25px] bg-fill-active" />
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] leading-none text-text-default">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 cursor-pointer items-center justify-center rounded-[20px] border border-border-default bg-surface-default text-icon-default drop-shadow-[0_0_5px_rgba(41,71,57,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Icon name="xmark" size={20} />
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-x-2.5 gap-y-3">
        {layers.map((l) => {
          const selected = l.id === selectedId
          return (
            <li key={l.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect?.(l.id)}
                className={cn(
                  "flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl border p-[3px] text-label outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                  selected ? "border-border-focus text-text-subtle" : "border-transparent text-text-muted",
                )}
              >
                <img src={l.image} alt="" className="h-[70px] w-full rounded-[10px] object-cover" />
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
