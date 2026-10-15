import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
// ds-exception: AI sparkle artwork with glow, not an icon
import aiFabImage from "@/assets/images/ai-fab.svg"

// Figma: AI FAB (853:818). Single state; the artwork (glow included) is the Figma SVG, drawn 25% larger than the 40px hit area.
type AiFabProps = Omit<ComponentProps<"button">, "aria-label"> & { label: string }

function AiFab({ className, label, type = "button", ...props }: AiFabProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn("relative size-40 shrink-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-border-focus active:scale-95 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    >
      {/* ds-exception: glow image is 150% of the button (Figma inset -25%) */}
      <img alt="" src={aiFabImage} className="pointer-events-none absolute -inset-1/4 block max-w-none size-[150%]" />
    </button>
  )
}

export { AiFab }
