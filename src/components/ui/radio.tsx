import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Figma: CT Radio Buttons (64:1285). Size -> size, Status Active -> checked, Hovered -> :hover, Title/Copy -> title/description.
const sizes = {
  small: { box: "size-5", dot: "size-2" },
  medium: { box: "size-6", dot: "size-3" },
  large: { box: "size-7", dot: "size-3" },
}

type RadioProps = Omit<ComponentProps<"input">, "size" | "title" | "type"> & {
  size?: keyof typeof sizes
  title?: ReactNode
  description?: ReactNode
}

function Radio({ size = "small", title, description, className, ...props }: RadioProps) {
  const s = sizes[size]
  return (
    <label
      className={cn(
        "group inline-flex cursor-pointer gap-2 has-disabled:cursor-not-allowed has-disabled:opacity-disabled",
        description ? "items-start" : "items-center",
        className,
      )}
    >
      <span className="relative block shrink-0">
        <input type="radio" className="peer absolute inset-0 size-full cursor-pointer opacity-hidden disabled:cursor-not-allowed" {...props} />
        <span
          className={cn(
            "flex items-center justify-center rounded-full border border-border-default bg-bg-default transition-colors peer-checked:border-bg-inverse peer-checked:bg-bg-inverse peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus",
            "[&>span]:bg-transparent group-hover:[&>span]:bg-fill-active peer-checked:[&>span]:bg-fill-success group-hover:peer-checked:[&>span]:bg-fill-success",
            s.box,
          )}
        >
          <span className={cn("rounded-full", s.dot)} />
        </span>
      </span>
      {title && (
        <span className="flex flex-col gap-0.5">
          <span className="text-heading text-text-default">{title}</span>
          {description && <span className="text-label text-text-muted">{description}</span>}
        </span>
      )}
    </label>
  )
}

export { Radio }
