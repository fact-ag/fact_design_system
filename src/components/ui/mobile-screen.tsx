import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

// Figma: iPhone 16 & 17 Pro (881:1638). Layout shell only: no bezel, no status bar.
// header: fixed top area. children: scrolling body. onTop: layer above the body (floating buttons, sheets). dim: backdrop behind onTop.
type MobileScreenProps = Omit<ComponentProps<"div">, "children"> & {
  header?: ReactNode
  children?: ReactNode
  onTop?: ReactNode
  /** Shows the dim backdrop between the body and onTop. */
  dim?: boolean
}

function MobileScreen({ header, children, onTop, dim = false, className, ...props }: MobileScreenProps) {
  return (
    <div className={cn("relative mx-auto flex h-dvh w-full max-w-100 flex-col overflow-clip bg-bg-default text-text-default", className)} {...props}>
      {header && <header className="shrink-0">{header}</header>}
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      {dim && <div aria-hidden className="absolute inset-0 bg-bg-inverse opacity-scrim" />}
      {onTop && <div className="absolute inset-0 flex flex-col justify-end *:pointer-events-auto pointer-events-none">{onTop}</div>}
    </div>
  )
}

export { MobileScreen }
