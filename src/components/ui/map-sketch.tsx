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

const pill = "rounded-[22px] bg-bg-default drop-shadow-[0_6px_14px_rgba(41,71,57,0.18)]"
const rail = "flex size-11 cursor-pointer items-center justify-center rounded-xl text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"

function RailButton({ icon, label, onClick, className }: { icon: IconName; label: string; onClick?: () => void; className?: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cn(rail, className)}>
      <Icon name={icon} size={16} className="size-5" />
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
    <div className={cn("relative h-full min-h-[600px] w-full overflow-clip bg-bg-inverse", className)} {...props}>
      <div className="absolute inset-0">{background}</div>
      {(draw || pinDetails) && <div className="absolute inset-0 overflow-clip">{children}</div>}
      {(explore || layers) && (
        <button type="button" aria-label="Close" onClick={onClose} className={cn(pill, "absolute top-[62px] left-4 flex size-11 cursor-pointer items-center justify-center text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus")}>
          <Icon name="xmark" size={16} className="size-5" />
        </button>
      )}
      {(draw || pinDetails) && (
        <div className="absolute inset-x-4 top-[60px] flex items-center justify-between">
          <button type="button" onClick={onCancel} className={cn(pill, "cursor-pointer px-4 py-3 text-body text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus")}>
            Cancel
          </button>
          <Button onClick={onDone}>Done</Button>
        </div>
      )}
      {explore && (
        <>
          <h2 className={cn(pill, "absolute top-[62px] left-1/2 -translate-x-1/2 px-4 py-[11px] text-heading text-text-default")}>{title}</h2>
          <div className={cn(pill, "absolute top-[62px] right-4 flex flex-col items-center")}>
            <RailButton icon="layer-group" label="Map layers" onClick={onOpenLayers} />
            <div aria-hidden className="h-px w-6 bg-border-default" />
            <RailButton icon="location-crosshairs" label="My location" onClick={onMyLocation} />
          </div>
          <div className="absolute inset-x-4 bottom-[50px] flex flex-col items-center gap-3">
            <p className="flex items-center gap-2 rounded-[14px] bg-bg-default px-3.5 py-2 text-label text-text-default drop-shadow-[0_6px_14px_rgba(41,71,57,0.18)]">
              <Icon name="hand-pointer" size={16} className="size-5 text-text-muted" />
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
          className={cn("absolute bottom-[34px] left-1/2 -translate-x-1/2", toolbarProps?.className)}
        />
      )}
      {/* Dim and drawers come from the native dialog backdrop. */}
      <BottomDrawer open={pinDetails} modal={false} onClose={() => onDone?.()} className="h-[257px]">
        <div className="flex flex-col gap-3 px-6 pt-3">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-fill-neutral-default text-icon-default">
              <Icon name="location-dot" size={16} />
            </span>
            <div>
              <p className="text-body text-text-default">{pinName}</p>
              {pinCoordinates && <p className="font-mono text-caption text-text-muted">{pinCoordinates}</p>}
            </div>
          </div>
          <InputField label="Note" placeholder="e.g. Broken sprinkler on north span" value={pinNote ?? ""} onChange={(e) => onPinNoteChange?.(e.target.value)} />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={onDeletePin}>
              Delete pin
            </Button>
            <Button className="flex-1" onClick={onSavePin}>
              Save pin
            </Button>
          </div>
        </div>
      </BottomDrawer>
      <BottomDrawer open={layers} onClose={() => onLayersClose?.()} size="medium" className="overflow-visible">
        <MapLayers layers={[]} {...layersProps} onClose={onLayersClose} className="rounded-none border-0 bg-transparent" />
      </BottomDrawer>
    </div>
  )
}

export { MapSketch }
