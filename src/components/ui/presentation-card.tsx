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
        "relative isolate flex aspect-square w-full flex-col overflow-hidden rounded-tile p-6 pt-5 text-text-on-inverse drop-shadow-floating",
        className,
      )}
      {...props}
    >
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      {/* Figma: multiply gradient for text contrast */}
      <div className="absolute inset-0 bg-linear-to-b from-bg-inverse/15 from-20% to-transparent to-95% mix-blend-multiply" />
      {label && <span className="relative z-raised text-heading text-shadow-on-media">{label}</span>}
      <span className="relative z-raised text-display text-shadow-on-media">{title}</span>
      {onAction && actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="relative z-raised mt-auto flex w-fit cursor-pointer items-center gap-2 rounded-pill bg-bg-default/15 px-5 py-2 text-heading text-shadow-on-media outline-none backdrop-blur-glass focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Icon name={actionIcon} />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export { PresentationCard }
