import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Figma: Signature Pad (1224:1430). State=[Empty|Signed] -> signed boolean (or a signatureSrc / children).
// No canvas code: the feature draws into the children slot (for example a <canvas>) or passes a signatureSrc image.
// Done is disabled until signed. Clear shows when signed. Figma uses a 874px frame; here it fills its container.
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
    <div className={cn("relative flex min-h-100 w-full flex-col bg-bg-default px-15 pt-5 pb-5", className)} {...props}>
      <div className="grid grid-cols-3 items-center">
        <Button variant="secondary" onClick={onCancel} className="justify-self-start border border-border-default text-body">
          Cancel
        </Button>
        <p className="text-center text-heading text-text-default">{title}</p>
        <Button onClick={onDone} disabled={!isSigned} className="justify-self-end text-body">
          Done
        </Button>
      </div>
      <div className="relative mx-5 mt-4 flex-1">
        {!isSigned && !children && (
          <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-title text-icon-subtle opacity-secondary">{placeholder}</p>
        )}
        {signatureSrc && <img src={signatureSrc} alt="Signature" className="absolute top-1/2 left-1/2 w-112 max-w-full -translate-x-1/2 -translate-y-1/2" />}
        {children && <div className="absolute inset-0">{children}</div>}
        <div className="absolute inset-x-0 bottom-9 h-px bg-border-default" />
        <p className="absolute bottom-10 left-0 text-heading text-icon-subtle">×</p>
        {signerName && <p className="absolute inset-x-0 bottom-3 text-center text-label text-text-muted">{signerName}</p>}
      </div>
      {isSigned && (
        <Button variant="tertiary" onClick={onClear} className="self-start text-body">
          Clear
        </Button>
      )}
    </div>
  )
}

export { SignaturePad }
export type { SignaturePadProps }
