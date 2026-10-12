import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Icon, type IconName } from "./icon"
import { InputField } from "./input-field"
import { MapPin } from "./map-pin"

// Figma: Location Picker (1234:1814). State=[Placing|Locating] -> state.
// background = the live map. The Locating frame is hidden in Figma and returned no design data,
// so Locating is inferred: hint says "Finding your location", pin is replaced by a pulsing dot, Confirm is disabled.
// The bottom panel is inline (not BottomDrawer) because the map must stay interactive under it.
type LocationPickerProps = Omit<ComponentProps<"div">, "children"> & {
  state?: "placing" | "locating"
  background?: ReactNode
  title?: string
  hint?: string
  latitude?: string
  longitude?: string
  onLatitudeChange?: (value: string) => void
  onLongitudeChange?: (value: string) => void
  note?: string
  confirmLabel?: string
  onCancel?: () => void
  onOpenLayers?: () => void
  onMyLocation?: () => void
  onConfirm?: () => void
}

const pill = "rounded-pill bg-bg-default drop-shadow-floating"

function RailButton({ icon, label, onClick }: { icon: IconName; label: string; onClick?: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-11 cursor-pointer items-center justify-center rounded-card text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
      <Icon name={icon} size={16} className="size-5" />
    </button>
  )
}

function LocationPicker({
  state = "placing",
  background,
  title = "Drop a pin",
  hint,
  latitude = "",
  longitude = "",
  onLatitudeChange,
  onLongitudeChange,
  note = "Pin placed manually · You can also type coordinates",
  confirmLabel = "Confirm location",
  onCancel,
  onOpenLayers,
  onMyLocation,
  onConfirm,
  className,
  ...props
}: LocationPickerProps) {
  const locating = state === "locating"
  return (
    <div className={cn("relative h-full min-h-150 w-full overflow-clip bg-bg-inverse", className)} {...props}>
      <div className="absolute inset-0">{background}</div>
      <button type="button" onClick={onCancel} className={cn(pill, "absolute top-15 left-4 cursor-pointer px-4 py-3 text-body text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus")}>
        Cancel
      </button>
      <h2 className={cn(pill, "absolute top-15 left-1/2 -translate-x-1/2 px-4 py-3 text-heading whitespace-nowrap text-text-default")}>{title}</h2>
      <div className={cn(pill, "absolute top-15 right-4 flex flex-col items-center")}>
        <RailButton icon="layer-group" label="Map layers" onClick={onOpenLayers} />
        <div aria-hidden className="h-px w-6 bg-border-default" />
        <RailButton icon="location-crosshairs" label="My location" onClick={onMyLocation} />
      </div>
      {/* Pin tip sits on the center target, 57px above the vertical center. */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -mt-14 -translate-x-1/2 -translate-y-1/2">
        {locating ? (
          <span className="block size-15 animate-pulse rounded-pill border border-border-brand-tonal bg-fill-brand-tonal-default/60" />
        ) : (
          <span className="block size-2 rounded-pill border border-bg-default bg-fill-brand-default" />
        )}
      </div>
      {!locating && <MapPin showLabel={false} className="pointer-events-none absolute top-1/2 left-1/2 -mt-19 -translate-x-1/2 -translate-y-1/2" />}
      <p className="absolute top-1/2 left-1/2 -mt-4 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-card bg-bg-default px-3 py-2 text-label whitespace-nowrap text-text-default drop-shadow-floating">
        <Icon name="hand-pointer" size={16} className="size-5 text-text-muted" />
        {hint ?? (locating ? "Finding your location…" : "Move the map to place the pin")}
      </p>
      <div className="absolute inset-x-1 bottom-1 flex flex-col gap-3 rounded-t-sheet rounded-b-screen border border-border-default bg-surface-default px-4 pt-5 pb-5">
        <div aria-hidden className="absolute top-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-pill bg-border-focus" />
        <div className="flex gap-3">
          <InputField label="Latitude" inputMode="decimal" value={latitude} onChange={(e) => onLatitudeChange?.(e.target.value)} className="min-w-0 flex-1 [&_input]:font-mono" />
          <InputField label="Longitude" inputMode="decimal" value={longitude} onChange={(e) => onLongitudeChange?.(e.target.value)} className="min-w-0 flex-1 [&_input]:font-mono" />
        </div>
        <p className="text-label text-text-muted">{note}</p>
        <Button disabled={locating} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  )
}

export { LocationPicker }
