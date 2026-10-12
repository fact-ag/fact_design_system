import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Figma: Switch (64:1091). Size=[Small|Medium|Large] -> size, Status On/Off -> checked, Title/Copy -> title/description.
const sizes = {
  small: { track: "h-5 w-10", thumb: "h-4 w-[22px]", on: "translate-x-[14px]" },
  medium: { track: "h-[22px] w-[46px]", thumb: "h-[18px] w-6", on: "translate-x-[18px]" },
  large: { track: "h-6 w-[50px]", thumb: "h-5 w-[26px]", on: "translate-x-5" },
}

type SwitchProps = Omit<ComponentProps<"button">, "title" | "onChange"> & {
  size?: keyof typeof sizes
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  title?: ReactNode
  description?: ReactNode
}

function Switch({ size = "small", checked = false, onCheckedChange, title, description, className, disabled, ...props }: SwitchProps) {
  const s = sizes[size]
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "group inline-flex cursor-pointer gap-3 text-left outline-none disabled:cursor-not-allowed disabled:opacity-50",
        description ? "items-start" : "items-center",
        className,
      )}
      {...props}
    >
      <span className={cn(description && "pt-1")}>
        <span
          className={cn(
            "relative block shrink-0 rounded-full transition-colors group-focus-visible:ring-2 group-focus-visible:ring-border-focus",
            s.track,
            checked ? "bg-fill-active" : "bg-fill-neutral-pressed",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 block rounded-full bg-bg-default shadow-drop-shadow-2 transition-transform",
              s.thumb,
              checked && s.on,
            )}
          />
        </span>
      </span>
      {title && (
        <span className="flex flex-col gap-0.5">
          <span className={cn("text-text-default", description ? "text-body" : "text-heading")}>{title}</span>
          {description && <span className="text-label text-text-muted">{description}</span>}
        </span>
      )}
    </button>
  )
}

export { Switch }
