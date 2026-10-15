import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { BottomDrawer } from "./bottom-drawer"
import { Icon, type IconName } from "./icon"
// ds-exception: viewfinder corners and scan line are Figma artwork, not icons
import viewfinderScanning from "@/assets/images/barcode-viewfinder-scanning.svg"
// ds-exception: viewfinder corners are Figma artwork, not icons
import viewfinderDetected from "@/assets/images/barcode-viewfinder-detected.svg"
// ds-exception: viewfinder corners are Figma artwork, not icons
import viewfinderNoMatch from "@/assets/images/barcode-viewfinder-no-match.svg"

// Figma: Barcode Scanner (1206:1231). State=[Scanning|Detected|No match|Permission denied] -> state.
// background = the camera feed. No camera logic here. Detected/No match show a BottomDrawer; its body is children.
// The scrim is a CSS box-shadow (black 62%, 12px cutout). The viewfinder corners are the Figma SVGs. Drawers sit 5px inside the screen.
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
            // ds-exception: Figma scrim is plain black at 62%, no token
            className="absolute top-290 left-1/2 h-170 w-280 -translate-x-1/2 rounded-12 shadow-[0_0_0_100vmax_rgb(0_0_0/0.62)]"
          >
            {/* The artwork is 284x174, 2px larger than the 280x170 box on every side. */}
            <img alt="" src={detected ? viewfinderDetected : noMatch ? viewfinderNoMatch : viewfinderScanning} className="absolute -top-2 -left-2 block max-w-none" />
          </div>
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
            <Icon name="camera-slash" size={16} />
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
      <BottomDrawer open={detected} contained onClose={() => onScanAgain?.()} className="bottom-5 h-190">
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
      <BottomDrawer open={noMatch} contained onClose={() => onScanAgain?.()} className="bottom-5 h-224">
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
