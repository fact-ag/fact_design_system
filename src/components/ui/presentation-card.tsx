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
        "relative isolate flex aspect-square w-full flex-col overflow-hidden rounded-[10px] p-6 pt-5 text-text-on-inverse drop-shadow-[0_10px_7.5px_rgba(0,0,0,0.1)]",
        className,
      )}
      {...props}
    >
      <img src={image} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
      {/* Figma: multiply gradient for text contrast */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[rgba(26,42,57,0.15)] from-[18.75%] to-transparent to-[95.19%] mix-blend-multiply" />
      {label && <span className="text-[16px] leading-normal tracking-[-0.02em] text-shadow-[0_0_1px_rgba(0,0,0,0.25)]">{label}</span>}
      <span className="text-[30px] leading-[55.1px] tracking-[-0.02em] text-shadow-[0_0_3px_rgba(0,0,0,0.2)]">{title}</span>
      {onAction && actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-auto flex w-fit cursor-pointer items-center gap-2.5 rounded-[33px] bg-[rgba(248,247,240,0.15)] px-5 py-[9px] text-[16px] leading-normal tracking-[-0.02em] text-shadow-[0_0_2px_rgba(0,0,0,0.25)] outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <Icon name={actionIcon} />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export { PresentationCard }
