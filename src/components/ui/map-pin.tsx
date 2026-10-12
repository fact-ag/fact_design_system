import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import marker from "@/assets/images/map-pin-marker.svg"

// Figma: Map Pin (1219:1176). showLabel -> showLabel, Pin name text -> name.
type MapPinProps = ComponentProps<"div"> & { name?: string; showLabel?: boolean }

function MapPin({ name = "Pin 1", showLabel = true, className, ...props }: MapPinProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)} {...props}>
      {showLabel && <span className="rounded-[14px] bg-bg-default px-2 py-[3px] text-label whitespace-nowrap text-text-default drop-shadow-[0_6px_14px_rgba(41,71,57,0.18)]">{name}</span>}
      <div className="relative h-9 w-7">
        <img src={marker} alt="" className="absolute -top-[11.11%] -left-1/4 block h-[139.7%] w-[150%] max-w-none" />
      </div>
    </div>
  )
}

export { MapPin }
