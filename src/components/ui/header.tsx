import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { BadgeButton } from "@/components/ui/badge-button"
import { IconButton } from "@/components/ui/icon-button"
import { Icon, type IconName } from "@/components/ui/icon"

// Figma: Header (881:1594). BadgeButton tabs row. The external "Toolbars - Bottom" (status bar) and "Nav Tab Pill"
// are built inline: the status bar (clock, cellular, wifi, battery) and extra tabs in the scrolling row (Nav Tab Pill = an inactive BadgeButton).
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
        "relative w-full overflow-clip rounded-t-50 rounded-b-25 border border-border-default bg-bg-default shadow-lift",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="flex h-54 items-start gap-154 px-18 pt-15">
        {/* ds-exception: Figma SF Pro weight is 590 */}
        <span className="flex h-22 flex-1 items-center justify-center font-system text-17 leading-22 font-[590] text-text-default">{time}</span>
        <span className="absolute top-8 left-1/2 h-36 w-124 -translate-x-1/2 rounded-50 bg-device-notch" />
        <span className="flex h-22 flex-1 items-center justify-center gap-7 text-text-default">
          <Icon name="cellular" size={19.2} />
          <Icon name="wifi" size={17.14} />
          <span className="relative h-13 w-27.25">
            <span className="absolute inset-y-0 left-0 w-25 rounded-battery border border-text-default/35" />
            <span className="absolute top-2 left-2 h-9 w-21 rounded-battery-fill bg-text-default" />
            <span className="absolute top-4.5 left-26 h-4 w-1.25 rounded-r-full bg-text-default/40" />
          </span>
        </span>
      </div>
      <div className="flex items-start gap-13 px-14 pb-14">
        <IconButton label="Menu" icon="dehaze" iconSize={24} onClick={onMenu} className="border-border-default bg-surface-default shadow-glow-md" />
        <div className="mt-8 flex min-w-0 flex-1 gap-8 overflow-x-auto">
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
