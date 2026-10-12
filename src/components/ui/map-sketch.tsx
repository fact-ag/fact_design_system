import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { BottomDrawer } from "./bottom-drawer"
import { DrawingToolbar } from "./drawing-toolbar"
import { Icon, type IconName } from "./icon"
import { InputField } from "./input-field"
import { MapLayers } from "./map-layers"

// Figma: Map Sketch (1219:1376). State=[Explore|Draw|Pin details|Layers] -> state.
// background = the live map. children = overlay on the map (sketch layer, MapPin elements), positioned by the feature.
type MapSketchProps = Omit<ComponentProps<"div">, "children"> & {
  state?: "explore" | "draw" | "pin-details" | "layers"
  background?: ReactNode
  children?: ReactNode
  title?: string
  hint?: string
  captureLabel?: string
  onClose?: () => void
  onCapture?: () => void
  onOpenLayers?: () => void
  onMyLocation?: () => void
  onCancel?: () => void
  onDone?: () => void
  toolbarProps?: Omit<ComponentProps<typeof DrawingToolbar>, "context">
  /** Pin details drawer. */
  pinName?: string
  pinCoordinates?: string
  pinNote?: string
  onPinNoteChange?: (note: string) => void
  onDeletePin?: () => void
  onSavePin?: () => void
  /** Layers drawer. Closing it calls onLayersClose. */
  layersProps?: Omit<ComponentProps<typeof MapLayers>, "onClose" | "className">
  onLayersClose?: () => void
}

const pill = "rounded-22 bg-bg-default drop-shadow-floating"
const rail = "flex size-44 cursor-pointer items-center justify-center rounded-12 text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"

function RailButton({ icon, label, onClick, className }: { icon: IconName; label: string; onClick?: () => void; className?: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cn(rail, className)}>
      <Icon name={icon} size={16} className="size-20" />
    </button>
  )
}

function MapSketch({
  state = "explore",
  background,
  children,
  title = "Map sketch",
  hint = "Pan and zoom to frame the area",
  captureLabel = "Capture this area",
  onClose,
  onCapture,
  onOpenLayers,
  onMyLocation,
  onCancel,
  onDone,
  toolbarProps,
  pinName = "Pin 1",
  pinCoordinates,
  pinNote,
  onPinNoteChange,
  onDeletePin,
  onSavePin,
  layersProps,
  onLayersClose,
  className,
  ...props
}: MapSketchProps) {
  const explore = state === "explore"
  const layers = state === "layers"
  const draw = state === "draw"
  const pinDetails = state === "pin-details"
  return (
    <div className={cn("relative h-full min-h-600 w-full overflow-clip rounded-50 bg-bg-inverse", className)} {...props}>
      <div className="absolute inset-0">{background}</div>
      {(draw || pinDetails) && <div className="absolute inset-0 overflow-clip">{children}</div>}
      {(explore || layers) && (
        <button type="button" aria-label="Close" onClick={onClose} className={cn(pill, "absolute top-62 left-16 flex size-44 cursor-pointer items-center justify-center text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus")}>
          <Icon name="xmark" size={16} className="size-20" />
        </button>
      )}
      {(draw || pinDetails) && (
        <div className="absolute inset-x-16 top-60 flex items-center justify-between">
          <button type="button" onClick={onCancel} className={cn(pill, "cursor-pointer px-16 py-12 text-body text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus")}>
            Cancel
          </button>
          <Button onClick={onDone}>Done</Button>
        </div>
      )}
      {explore && (
        <>
          <h2 className={cn(pill, "absolute top-62 left-1/2 -translate-x-1/2 px-16 py-11 text-heading text-text-default")}>{title}</h2>
          <div className={cn(pill, "absolute top-62 right-16 flex flex-col items-center")}>
            <RailButton icon="layer-group" label="Map layers" onClick={onOpenLayers} />
            <div aria-hidden className="h-px w-24 bg-border-default" />
            <RailButton icon="location-crosshairs" label="My location" onClick={onMyLocation} />
          </div>
          <div className="absolute inset-x-16 bottom-50 flex flex-col items-center gap-12">
            <p className="flex items-center gap-8 rounded-14 bg-bg-default px-14 py-8 text-label text-text-default drop-shadow-floating">
              <span className="flex size-20 items-center justify-center text-text-muted">
                <Icon name="hand-pointer" size={16} />
              </span>
              {hint}
            </p>
            <Button className="w-full" onClick={onCapture}>
              {captureLabel}
            </Button>
          </div>
        </>
      )}
      {draw && (
        <DrawingToolbar
          context="map"
          canRedo={false}
          {...toolbarProps}
          className={cn("absolute bottom-34 left-1/2 -translate-x-1/2", toolbarProps?.className)}
        />
      )}
      {/* Dim and drawers come from the native dialog backdrop. */}
      <BottomDrawer open={pinDetails} modal={false} onClose={() => onDone?.()} className="bottom-5 h-257">
        <div className="flex flex-col gap-12 px-24 pt-12">
          <div className="flex items-center gap-12">
            <span className="flex size-32 items-center justify-center rounded-full bg-fill-neutral-default text-icon-default">
              <Icon name="location-dot" size={16} />
            </span>
            <div>
              <p className="text-body text-text-default">{pinName}</p>
              {pinCoordinates && <p className="font-mono text-caption text-text-muted">{pinCoordinates}</p>}
            </div>
          </div>
          <InputField label="Note" placeholder="e.g. Broken sprinkler on north span" value={pinNote ?? ""} onChange={(e) => onPinNoteChange?.(e.target.value)} />
          <div className="flex gap-12">
            <Button variant="secondary" className="flex-1" onClick={onDeletePin}>
              Delete pin
            </Button>
            <Button className="flex-1" onClick={onSavePin}>
              Save pin
            </Button>
          </div>
        </div>
      </BottomDrawer>
      <BottomDrawer open={layers} onClose={() => onLayersClose?.()} size="medium" className="bottom-5 overflow-visible">
        <MapLayers layers={[]} {...layersProps} onClose={onLayersClose} className="rounded-none border-0 bg-transparent" />
      </BottomDrawer>
    </div>
  )
}

export { MapSketch }
