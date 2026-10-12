import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: CT Checkbox (64:1178). Size -> size, Status Active -> checked, Hovered -> :hover, Title/Copy -> title/description.
const sizes = {
  small: { box: "size-20", icon: 16, title: "text-heading", desc: "text-label" },
  medium: { box: "size-24", icon: 18, title: "text-heading", desc: "text-label" },
  large: { box: "size-28", icon: 20, title: "text-18 leading-none", desc: "text-body" },
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
        "group inline-flex cursor-pointer gap-12 has-disabled:cursor-not-allowed has-disabled:opacity-50",
        description ? "items-start" : "items-center",
        className,
      )}
    >
      <span className={cn("relative block shrink-0", description && "pt-6")}>
        <input type="checkbox" checked={checked} className="peer absolute inset-0 size-full cursor-inherit opacity-0" {...props} />
        <span
          className={cn(
            "flex items-center justify-center rounded-4 border border-border-default bg-surface-default text-transparent transition-colors group-hover:text-icon-disabled peer-checked:border-fill-brand-default peer-checked:bg-fill-brand-default peer-checked:text-icon-on-emphasis peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus",
            s.box,
          )}
        >
          <Icon name="check" size={s.icon} />
        </span>
      </span>
      {title && (
        <span className="flex flex-col gap-2">
          <span className={cn("text-text-default", s.title)}>{title}</span>
          {description && <span className={cn("text-text-muted", s.desc)}>{description}</span>}
        </span>
      )}
    </label>
  )
}

export { Checkbox }
