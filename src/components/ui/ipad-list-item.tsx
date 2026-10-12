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
    <div className={cn("w-full overflow-clip rounded-16 border border-border-default bg-surface-default shadow-croptrak", className)} {...props}>
      {items.map((it, i) => (
        <div key={i} className="flex h-72 items-stretch gap-10 border-b border-border-default last:border-b-0">
          <div className="flex w-135 shrink-0 flex-col gap-3.5 border-r border-border-default pt-13 pl-14">
            <span className="text-label text-text-muted">PO #</span>
            <span className="truncate text-body text-text-default">{it.po}</span>
          </div>
          <div className="flex w-269 shrink-0 flex-col gap-5.5 pt-11.5">
            <span className="truncate text-body text-text-default">{it.farm}</span>
            <span className="flex min-w-0 items-center gap-6 text-label whitespace-nowrap text-text-muted">
              <Badge tone={it.statusTone}>{it.status}</Badge>
              <span aria-hidden>·</span>
              <span className="truncate">{it.owner}</span>
              <span aria-hidden>·</span>
              <span>{it.date}</span>
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-5 pt-14">
            <span className="text-label text-text-muted">Vendor</span>
            <span className="truncate text-body text-text-default">{it.vendor}</span>
          </div>
          <div className="flex w-84 shrink-0 flex-col items-end gap-3 pt-14">
            <span className="text-label text-text-muted">Total</span>
            <span className="text-18 leading-normal tracking-condensed text-text-default tabular-nums">{it.total}</span>
          </div>
          <div className="flex w-103 shrink-0 items-start pt-13 pl-47">
            <Badge tone={it.badgeTone}>{it.badge}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

export { IPadListItem }
export type { IPadListItemData }
