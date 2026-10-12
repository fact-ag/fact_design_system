import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconSize } from "@/components/ui/icon"

// Figma: CT Checkbox (64:1178). Size -> size, Status Active -> checked, Hovered -> :hover, Title/Copy -> title/description.
const sizes: Record<string, { box: string; icon: IconSize; title: string; desc: string }> = {
  small: { box: "size-5", icon: 16, title: "text-heading", desc: "text-label" },
  medium: { box: "size-6", icon: 16, title: "text-heading", desc: "text-label" },
  large: { box: "size-7", icon: 20, title: "text-heading", desc: "text-body" },
}

type CheckboxProps = Omit<ComponentProps<"input">, "size" | "title" | "type"> & {
  size?: keyof typeof sizes
  title?: ReactNode
  description?: ReactNode
}

function Checkbox({ size = "small", title, description, className, checked, ...props }: CheckboxProps) {
  const s = sizes[size]
  return (
    <label
      className={cn(
        "group inline-flex cursor-pointer gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-disabled",
        description ? "items-start" : "items-center",
        className,
      )}
    >
      <span className={cn("relative block shrink-0", description && "pt-1.5")}>
        <input type="checkbox" checked={checked} className="peer absolute inset-0 size-full cursor-pointer opacity-hidden disabled:cursor-not-allowed" {...props} />
        <span
          className={cn(
            "flex items-center justify-center rounded-checkbox border border-border-default bg-surface-default text-transparent transition-colors group-hover:text-icon-disabled peer-checked:border-fill-brand-default peer-checked:bg-fill-brand-default peer-checked:text-icon-on-emphasis peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus",
            s.box,
          )}
        >
          <Icon name="check" size={s.icon} />
        </span>
      </span>
      {title && (
        <span className="flex flex-col gap-0.5">
          <span className={cn("text-text-default", s.title)}>{title}</span>
          {description && <span className={cn("text-text-muted", s.desc)}>{description}</span>}
        </span>
      )}
    </label>
  )
}

export { Checkbox }
