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

const pill = "rounded-22 bg-bg-default drop-shadow-floating"

function RailButton({ icon, label, onClick }: { icon: IconName; label: string; onClick?: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-44 cursor-pointer items-center justify-center rounded-12 text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
      <Icon name={icon} size={16} className="size-20" />
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
    <div className={cn("relative h-full min-h-600 w-full overflow-clip bg-bg-inverse", className)} {...props}>
      <div className="absolute inset-0">{background}</div>
      <button type="button" onClick={onCancel} className={cn(pill, "absolute top-62 left-16 cursor-pointer px-16 py-12 text-body text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus")}>
        Cancel
      </button>
      <h2 className={cn(pill, "absolute top-62 left-1/2 -translate-x-1/2 px-16 py-11 text-heading whitespace-nowrap text-text-default")}>{title}</h2>
      <div className={cn(pill, "absolute top-62 right-16 flex flex-col items-center")}>
        <RailButton icon="layer-group" label="Map layers" onClick={onOpenLayers} />
        <div aria-hidden className="h-px w-24 bg-border-default" />
        <RailButton icon="location-crosshairs" label="My location" onClick={onMyLocation} />
      </div>
      {/* Pin tip sits on the center target, 57px above the vertical center. */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 -mt-57 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {locating ? (
          <span className="block size-60 animate-pulse rounded-full border border-border-brand-tonal bg-fill-brand-tonal-default/60" />
        ) : (
          <span className="block size-10 rounded-full border border-bg-default bg-fill-brand-default" />
        )}
      </div>
      {!locating && <MapPin showLabel={false} className="pointer-events-none absolute top-1/2 -mt-75 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <p className="absolute top-1/2 -mt-15 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8 rounded-14 bg-bg-default px-14 py-8 text-label whitespace-nowrap text-text-default drop-shadow-floating">
        <Icon name="hand-pointer" size={16} className="size-20 text-text-muted" />
        {hint ?? (locating ? "Finding your location…" : "Move the map to place the pin")}
      </p>
      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-12 rounded-t-25 rounded-b-50 border border-border-default bg-surface-default px-17 pt-19 pb-20">
        <div aria-hidden className="absolute top-4 left-1/2 h-4 w-50 -translate-x-1/2 rounded-25 bg-border-focus" />
        <div className="flex gap-12">
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
