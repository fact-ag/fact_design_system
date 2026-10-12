import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { InputField } from "@/components/ui/input-field"
import { MapPin } from "@/components/ui/map-pin"

// Figma: Location Field (1234:1905). State=[Empty|Filled|Error] -> Filled when value is set, Error when error is set.
// The map preview image is the mapPreview prop (sample content, not shipped).
type LocationFieldProps = Omit<ComponentProps<"div">, "onChange"> & {
  label?: ReactNode
  value?: { latitude: number; longitude: number }
  /** Error text shown under the empty picker. */
  error?: string
  /** Map image or canvas shown behind the pin in the filled state. */
  mapPreview?: ReactNode
  onPick?: () => void
  onUseCurrent?: () => void
  onRemove?: () => void
}

const chip = "bg-bg-default drop-shadow-floating"

function LocationField({ label = "Location", value, error, mapPreview, onPick, onUseCurrent, onRemove, className, ...props }: LocationFieldProps) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-2", className)} {...props}>
      <span className="text-body text-text-default">{label}</span>
      {value ? (
        <>
          <div className="relative h-35 w-full overflow-clip rounded-card border border-border-default bg-bg-inverse">
            {mapPreview}
            <MapPin showLabel={false} className="absolute top-1/2 left-1/2 -mt-2 -translate-x-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove location"
              className={cn("absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-card text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus", chip)}
            >
              <Icon name="xmark" size={16} />
            </button>
            <button
              type="button"
              onClick={onPick}
              className={cn("absolute bottom-2 left-2 flex cursor-pointer items-center gap-1.5 rounded-card px-2 py-1.5 text-label text-text-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus", chip)}
            >
              <Icon name="pen" size={16} />
              Move pin
            </button>
          </div>
          <div className="flex w-full gap-3">
            <InputField label="Latitude" readOnly value={value.latitude.toFixed(5)} className="flex-1 font-mono" />
            <InputField label="Longitude" readOnly value={value.longitude.toFixed(5)} className="flex-1 font-mono" />
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onPick}
            aria-invalid={!!error}
            className={cn(
              "flex w-full cursor-pointer items-center gap-3 rounded-card border border-dashed bg-surface-muted p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
              error ? "border-status-danger" : "border-border-default",
            )}
          >
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-pill border border-border-default bg-bg-default", error ? "text-status-danger" : "text-icon-default")}>
              <Icon name="location-dot" size={16} className="size-5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className={cn("text-heading", error ? "text-status-danger" : "text-text-default")}>Drop a pin</span>
              <span className="text-label text-text-muted">Pick the spot on the satellite map</span>
            </span>
            <Icon name="plus" size={16} className="size-5 text-icon-default" />
          </button>
          {error && <span role="alert" className="text-label text-status-danger">{error}</span>}
          <button
            type="button"
            onClick={onUseCurrent}
            className="flex cursor-pointer items-center gap-1.5 rounded-checkbox text-label text-text-default underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <Icon name="location-crosshairs" size={16} className="size-5" />
            Use my current location
          </button>
        </>
      )}
    </div>
  )
}

export { LocationField }
