import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { BottomDrawer } from "./bottom-drawer"
import { Icon, type IconName } from "./icon"

// Figma: Barcode Scanner (1206:1231). State=[Scanning|Detected|No match|Permission denied] -> state.
// background = the camera feed. No camera logic here. Detected/No match show a BottomDrawer; its body is children.
// Viewfinder and scrim are drawn with CSS (the Figma SVGs are not shipped).
type BarcodeScannerProps = Omit<ComponentProps<"div">, "children"> & {
  state?: "scanning" | "detected" | "no-match" | "permission-denied"
  background?: ReactNode
  /** Drawer body for detected / no-match. Falls back to default text and buttons. */
  children?: ReactNode
  /** The scanned value, shown in the default Detected drawer. */
  code?: string
  onClose?: () => void
  onToggleFlashlight?: () => void
  onEnterManually?: () => void
  onOpenSettings?: () => void
  /** Detected drawer primary action. */
  onUseCode?: () => void
  /** Drawers: scan again / dismiss. */
  onScanAgain?: () => void
}

const glass = "flex size-40 cursor-pointer items-center justify-center rounded-20 bg-text-on-inverse/16 text-text-on-inverse outline-none focus-visible:ring-2 focus-visible:ring-border-focus"

function GlassButton({ icon, label, onClick, className }: { icon: IconName; label: string; onClick?: () => void; className?: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cn(glass, className)}>
      <Icon name={icon} size={16} className="size-20" />
    </button>
  )
}

function BarcodeScanner({
  state = "scanning",
  background,
  children,
  code,
  onClose,
  onToggleFlashlight,
  onEnterManually,
  onOpenSettings,
  onUseCode,
  onScanAgain,
  className,
  ...props
}: BarcodeScannerProps) {
  const denied = state === "permission-denied"
  const detected = state === "detected"
  const noMatch = state === "no-match"
  const hint = detected ? "Barcode captured" : noMatch ? "Code read — no match in catalog" : "Align the barcode inside the frame"
  return (
    <div className={cn("relative h-full min-h-600 w-full overflow-clip bg-bg-inverse text-text-on-inverse", className)} {...props}>
      {!denied && <div className="absolute inset-0">{background}</div>}
      {!denied && (
        <>
          {/* The viewfinder box is transparent; its shadow dims everything around it. */}
          <div
            aria-hidden
            className={cn(
              "absolute top-290 left-1/2 h-170 w-280 -translate-x-1/2 rounded-16 border-2 shadow-scrim",
              detected ? "border-status-success" : noMatch ? "border-status-danger" : "border-text-on-inverse",
            )}
          />
          <div className="absolute top-480 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-center whitespace-nowrap">
            <p className="text-body">{hint}</p>
            {state === "scanning" && <p className="text-label opacity-70">UPC, EAN, Code 128 and QR</p>}
          </div>
        </>
      )}
      <GlassButton icon="xmark" label="Close" onClick={onClose} className="absolute top-62 left-16" />
      <h2 className="absolute top-71 left-1/2 -translate-x-1/2 text-heading whitespace-nowrap">Scan barcode</h2>
      {!denied && <GlassButton icon="flashlight" label="Flashlight" onClick={onToggleFlashlight} className="absolute top-62 right-16" />}
      {state === "scanning" && (
        <Button variant="tertiary" onClick={onEnterManually} className="absolute bottom-50 left-1/2 -translate-x-1/2">
          Enter code manually
        </Button>
      )}
      {denied && (
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-12 px-32">
          <span className="flex size-64 items-center justify-center rounded-32 bg-text-on-inverse/12">
            <Icon name="camera-slash" size={20} />
          </span>
          <h3 className="text-title">Camera access needed</h3>
          <p className="text-center text-body opacity-75">Allow camera access in Settings to scan barcodes, or enter the code manually.</p>
          <Button variant="tertiary" className="mt-20" onClick={onOpenSettings}>
            Open Settings
          </Button>
          <Button variant="text" className="text-text-on-inverse active:bg-transparent active:text-text-on-inverse" onClick={onEnterManually}>
            Enter code manually
          </Button>
        </div>
      )}
      <BottomDrawer open={detected} modal={false} onClose={() => onScanAgain?.()} className="h-190">
        {children ?? (
          <div className="flex flex-col items-center gap-8 px-24 pt-16">
            <p className="text-label text-text-muted">Barcode</p>
            <p className="font-mono text-title text-text-default">{code}</p>
            <div className="mt-8 flex w-full gap-12">
              <Button variant="secondary" className="flex-1" onClick={onScanAgain}>
                Scan again
              </Button>
              <Button className="flex-1" onClick={onUseCode}>
                Use code
              </Button>
            </div>
          </div>
        )}
      </BottomDrawer>
      <BottomDrawer open={noMatch} modal={false} onClose={() => onScanAgain?.()} className="h-224">
        {children ?? (
          <div className="flex flex-col items-center gap-8 px-24 pt-16">
            <h3 className="text-title text-text-default">No match found</h3>
            <p className="text-center text-body text-text-muted">{code ? `${code} is not in the catalog.` : "This code is not in the catalog."}</p>
            <div className="mt-8 flex w-full gap-12">
              <Button variant="secondary" className="flex-1" onClick={onScanAgain}>
                Scan again
              </Button>
              <Button className="flex-1" onClick={onEnterManually}>
                Enter manually
              </Button>
            </div>
          </div>
        )}
      </BottomDrawer>
    </div>
  )
}

export { BarcodeScanner }
