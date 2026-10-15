import type { ComponentProps, ReactNode } from "react"
import { Icon, type IconName } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import wheatField from "@/assets/images/presentation-wheat-field.jpg"
import potatoField from "@/assets/images/presentation-potato-field.jpg"

// Figma: Presentation Card (983:1021). BG Image=[Variant 1|Variant2] -> image prop.
export const presentationImages = { wheatField, potatoField }

type PresentationCardProps = Omit<ComponentProps<"div">, "title"> & {
  /** Background illustration. Use presentationImages.wheatField (Variant 1) or .potatoField (Variant2). */
  image?: string
  label?: ReactNode
  title: ReactNode
  actionLabel?: ReactNode
  actionIcon?: IconName
  onAction?: () => void
}

function PresentationCard({
  image = wheatField,
  label,
  title,
  actionLabel,
  actionIcon = "plus",
  onAction,
  className,
  ...props
}: PresentationCardProps) {
  return (
    <div
      className={cn(
        "relative isolate flex aspect-square w-full max-w-342 flex-col overflow-hidden rounded-10 p-24 pt-20 text-text-on-inverse drop-shadow-lift",
        className,
      )}
      {...props}
    >
      <img src={image} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
      {/* Figma: multiply gradient for text contrast */}
      {/* ds-exception: gradient stops from Figma */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-media-shade from-[18.75%] to-transparent to-[95.19%] mix-blend-multiply" />
      {label && <span className="-mb-5 truncate text-16 leading-22 tracking-condensed text-shadow-media-sm">{label}</span>}
      <span className="truncate text-30 leading-55 tracking-condensed text-shadow-media-lg">{title}</span>
      {onAction && actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-auto flex min-h-49 w-fit cursor-pointer items-center gap-10 rounded-33 bg-fill-glass px-20 py-9 text-16 leading-normal tracking-condensed text-shadow-media-md outline-none backdrop-blur-glass-sm focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Icon name={actionIcon} />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export { PresentationCard }
