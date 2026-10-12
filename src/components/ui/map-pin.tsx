import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import marker from "@/assets/images/map-pin-marker.svg"

// Figma: Map Pin (1219:1176). showLabel -> showLabel, Pin name text -> name.
type MapPinProps = ComponentProps<"div"> & { name?: string; showLabel?: boolean }

function MapPin({ name = "Pin 1", showLabel = true, className, ...props }: MapPinProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)} {...props}>
      {showLabel && <span className="rounded-14 bg-bg-default px-8 py-3 text-label whitespace-nowrap text-text-default drop-shadow-floating">{name}</span>}
      <div className="relative h-36 w-28">
        {/* ds-exception: marker image crop from Figma */}
        <img src={marker} alt="" className="absolute -top-[11.11%] -left-1/4 block h-[139.7%] w-[150%] max-w-none" />
      </div>
    </div>
  )
}

export { MapPin }
