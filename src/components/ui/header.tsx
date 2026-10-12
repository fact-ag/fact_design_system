import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { BadgeButton } from "@/components/ui/badge-button"
import { IconButton } from "@/components/ui/icon-button"
import type { IconName } from "@/components/ui/icon"

// Figma: Header (881:1594). BadgeButton tabs row. The external "Toolbars - Bottom" (status bar) and "Nav Tab Pill"
// are built inline: a simple status bar and extra tabs in the scrolling row (Nav Tab Pill = an inactive BadgeButton).
export type HeaderTab = { id: string; label: string; icon?: IconName }

type HeaderProps = Omit<ComponentProps<"header">, "onChange"> & {
  tabs: HeaderTab[]
  activeId?: string
  onTabChange?: (id: string) => void
  onMenu?: () => void
  /** Status bar clock text. */
  time?: string
}

function Header({ tabs, activeId, onTabChange, onMenu, time = "9:41", className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "w-full overflow-clip rounded-t-50 rounded-b-25 border border-border-default bg-bg-default shadow-lift",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="flex h-55 items-center px-24 pt-21 pb-19">
        <span className="flex-1 text-center text-17 leading-22 font-semibold text-text-default">{time}</span>
        <span className="h-36 w-124 rounded-full bg-black" />
        <span className="flex flex-1 items-center justify-center gap-6">
          <span className="h-12 w-20 rounded-4 bg-text-default" />
          <span className="h-12 w-27 rounded-4 bg-text-default" />
        </span>
      </div>
      <div className="flex items-center gap-10 px-15 pb-14">
        <IconButton label="Menu" icon="list-ul" onClick={onMenu} className="border-border-default bg-surface-default" />
        <div className="flex min-w-0 flex-1 gap-10 overflow-x-auto">
          {tabs.map((t) => (
            <BadgeButton
              key={t.id}
              selected={t.id === activeId}
              icon={t.icon}
              onClick={() => onTabChange?.(t.id)}
            >
              {t.label}
            </BadgeButton>
          ))}
        </div>
      </div>
    </header>
  )
}

export { Header }
