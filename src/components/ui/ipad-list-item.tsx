import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

// Figma: iPad List item container (531:455). Rows are data. Figma's swipe-to-delete row state is not built.
type IPadListItemData = {
  po: string
  farm: string
  status: string
  statusTone?: ComponentProps<typeof Badge>["tone"]
  owner: string
  date: string
  vendor: string
  total: string
  badge: string
  badgeTone?: ComponentProps<typeof Badge>["tone"]
}

type IPadListItemProps = ComponentProps<"div"> & { items: IPadListItemData[] }

function IPadListItem({ items, className, ...props }: IPadListItemProps) {
  return (
    <div className={cn("w-full overflow-clip rounded-panel border border-border-default bg-surface-default shadow-card", className)} {...props}>
      {items.map((it, i) => (
        <div key={i} className="flex h-18 items-stretch gap-4 border-b border-border-default pr-2 last:border-b-0">
          <div className="flex w-33 shrink-0 flex-col justify-center border-r border-border-default pl-3">
            <span className="text-label text-text-muted">PO #</span>
            <span className="truncate text-body text-text-default">{it.po}</span>
          </div>
          <div className="flex min-w-0 flex-3 flex-col justify-center gap-1">
            <span className="truncate text-body text-text-default">{it.farm}</span>
            <span className="flex min-w-0 items-center gap-1.5 text-label whitespace-nowrap text-text-muted">
              <Badge tone={it.statusTone}>{it.status}</Badge>
              <span aria-hidden>·</span>
              <span className="truncate">{it.owner}</span>
              <span aria-hidden>·</span>
              <span>{it.date}</span>
            </span>
          </div>
          <div className="flex min-w-0 flex-3 flex-col justify-center">
            <span className="text-label text-text-muted">Vendor</span>
            <span className="truncate text-body text-text-default">{it.vendor}</span>
          </div>
          <div className="flex shrink-0 flex-col items-end justify-center">
            <span className="text-label text-text-muted">Total</span>
            <span className="text-heading text-text-default tabular-nums">{it.total}</span>
          </div>
          <div className="flex w-15 shrink-0 items-start justify-end pt-3">
            <Badge tone={it.badgeTone}>{it.badge}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

export { IPadListItem }
export type { IPadListItemData }
