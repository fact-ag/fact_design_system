import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

// Figma: Signature Field (1224:1405). State=[Empty|Signed|Error] -> state. Tap calls onPress; clear button calls onClear.
type SignatureFieldProps = Omit<ComponentProps<"div">, "onClick"> & {
  state?: "empty" | "signed" | "error"
  label?: ReactNode
  /** Helper text under the pad. */
  caption?: ReactNode
  /** Signature image (for example a PNG from the Signature Pad). Shown when state is "signed". */
  signatureSrc?: string
  onPress?: () => void
  onClear?: () => void
}

function SignatureField({ state = "empty", label = "Signature", caption, signatureSrc, onPress, onClear, className, ...props }: SignatureFieldProps) {
  const signed = state === "signed"
  const error = state === "error"
  return (
    <div className={cn("flex w-full max-w-358 flex-col gap-9", className)} {...props}>
      <p className="text-body text-text-default">{label}</p>
      <div
        className={cn(
          "relative h-140 overflow-clip rounded-12 border",
          signed ? "border-solid border-border-default bg-bg-default" : "border-dashed bg-surface-muted",
          error ? "border-status-danger" : !signed && "border-border-default",
        )}
      >
        <button
          type="button"
          onClick={onPress}
          aria-label={signed ? "Change signature" : "Tap to sign"}
          className="absolute inset-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
        />
        <div className="pointer-events-none absolute inset-x-23 top-103 h-px bg-border-default" />
        <span className="pointer-events-none absolute top-79 left-23 text-heading text-icon-subtle">×</span>
        {signed && signatureSrc ? (
          <>
            <img src={signatureSrc} alt="Signature" className="pointer-events-none absolute top-56.25 left-1/2 h-54.75 w-240 -translate-x-1/2" />
            <button
              type="button"
              onClick={onClear}
              className="absolute top-9 right-9 flex size-28 cursor-pointer items-center justify-center rounded-14 bg-fill-neutral-default text-icon-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <Icon name="xmark" size={16} label="Clear signature" />
            </button>
          </>
        ) : (
          <div className={cn("pointer-events-none absolute top-43 left-1/2 flex -translate-x-1/2 items-center gap-8", error ? "text-status-danger" : "text-text-default")}>
            <span className="flex size-20 items-center justify-center"><Icon name="signature" size={16} /></span>
            <span className="text-heading whitespace-nowrap">Tap to sign</span>
          </div>
        )}
      </div>
      {caption && <p className={cn("text-label", error ? "text-status-danger" : "text-text-muted")}>{caption}</p>}
    </div>
  )
}

export { SignatureField }
