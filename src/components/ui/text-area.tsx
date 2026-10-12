import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Figma: Text area (292:317). Optional label.
type TextAreaProps = ComponentProps<"textarea"> & { label?: ReactNode }

function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <label className={cn("flex w-full flex-col gap-8", className)}>
      {label && <span className="text-heading text-text-default">{label}</span>}
      <textarea
        className="h-70 w-full resize-none rounded-10 bg-fill-neutral-default px-14 py-12 text-body text-text-default outline-none placeholder:text-text-on-fill-placeholder focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50"
        {...props}
      />
    </label>
  )
}

export { TextArea }
