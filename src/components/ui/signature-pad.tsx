import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Figma: Signature Pad (1224:1430). State=[Empty|Signed] -> signed boolean (or a signatureSrc / children).
// No canvas code: the feature draws into the children slot (for example a <canvas>) or passes a signatureSrc image.
// Done is disabled until signed. Clear shows when signed (hidden, not removed, when empty, so the baseline stays at the Figma position). Figma uses a 874px frame; here it fills its container.
// Cancel/Clear use Button secondary/tertiary (Figma Cancel has a border like tertiary on a neutral fill; closest is secondary).
type SignaturePadProps = Omit<ComponentProps<"div">, "children"> & {
  signed?: boolean
  signatureSrc?: string
  signerName?: string
  title?: ReactNode
  placeholder?: ReactNode
  /** Drawing surface. Rendered over the signature area. */
  children?: ReactNode
  onCancel?: () => void
  onClear?: () => void
  onDone?: () => void
}

function SignaturePad({
  signed,
  signatureSrc,
  signerName,
  title = "Sign below",
  placeholder = "Sign with your finger",
  children,
  onCancel,
  onClear,
  onDone,
  className,
  ...props
}: SignaturePadProps) {
  const isSigned = signed ?? !!signatureSrc
  return (
    <div className={cn("@container relative flex min-h-402 w-full flex-col bg-bg-default", className)} {...props}>
      <div className="flex flex-1 flex-col px-16 pt-20 pb-21 @3xl:px-59">
      {/* ds-exception: title centered between two buttons; @container on the root so padding shrinks below the 874px Figma width */}
      <div className="grid grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-10">
        <Button variant="secondary" onClick={onCancel} className="shrink-0 justify-self-start border border-border-default text-body">
          Cancel
        </Button>
        <p className="min-w-0 truncate text-center text-heading text-text-default">{title}</p>
        <Button onClick={onDone} disabled={!isSigned} className="shrink-0 justify-self-end text-body">
          Done
        </Button>
      </div>
      <div className="relative mx-20 mt-18 flex-1">
        {!isSigned && !children && (
          <p className="absolute inset-x-0 top-114 text-center text-title text-icon-subtle opacity-60">{placeholder}</p>
        )}
        {signatureSrc && <img src={signatureSrc} alt="Signature" className="absolute top-99.25 left-1/2 w-450 max-w-full -translate-x-1/2" />}
        {children && <div className="absolute inset-0">{children}</div>}
        <div className="absolute inset-x-0 bottom-36 h-px bg-border-default" />
        <p className="absolute bottom-38 left-0 text-heading text-icon-subtle">×</p>
        {signerName && <p className="absolute inset-x-0 bottom-12 text-center text-label text-text-muted">{signerName}</p>}
      </div>
      <Button variant="tertiary" onClick={onClear} className={cn("mt-7 self-start text-body", !isSigned && "invisible")}>
        Clear
      </Button>
      </div>
    </div>
  )
}

export { SignaturePad }
export type { SignaturePadProps }
