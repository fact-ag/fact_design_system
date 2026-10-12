import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Figma: Text area (292:317). Optional label.
type TextAreaProps = ComponentProps<"textarea"> & { label?: ReactNode }

function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <label className={cn("flex w-full flex-col gap-2", className)}>
      {label && <span className="text-heading text-text-default">{label}</span>}
      <textarea
        className="h-[70px] w-full resize-none rounded-[10px] bg-fill-neutral-default px-3.5 py-3 text-body text-text-default outline-none placeholder:text-text-on-fill-placeholder focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50"
        {...props}
      />
    </label>
  )
}

export { TextArea }
