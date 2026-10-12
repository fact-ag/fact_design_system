import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Icon } from "./icon"
import { ItemTypeBadge } from "./item-type-badge"

// Figma: Item Layout Card (988:943). showAdditionalStatusBadge/showAdditionalDescription -> pass statusBadge / children or omit.
// `status` is the top-right badge ("Published"). Sample content (details, scores) is children.
type ItemLayoutCardProps = Omit<ComponentProps<"div">, "title"> & {
  itemType?: ComponentProps<typeof ItemTypeBadge>["itemType"]
  title: ReactNode
  locationName?: string
  propertyName?: string
  status?: ReactNode
  statusTone?: ComponentProps<typeof Badge>["tone"]
  statusBadge?: ReactNode
  owner?: string
  date?: string
}

const Dot = () => <span aria-hidden className="size-0.5 shrink-0 rounded-full bg-text-muted" />

function ItemLayoutCard({
  itemType, title, locationName, propertyName, status, statusTone = "positive", statusBadge, owner, date, className, children, ...props
}: ItemLayoutCardProps) {
  const info = [statusBadge, owner && <span key="owner" className="max-w-[150px] truncate font-bold">{owner}</span>, date && <span key="date" className="max-w-[150px] truncate font-bold">{date}</span>].filter(Boolean)
  return (
    <div className={cn("relative flex flex-col pt-[30px]", className)} {...props}>
      {status && <Badge tone={statusTone} className="absolute top-0 right-0">{status}</Badge>}
      <ItemTypeBadge itemType={itemType} />
      <p className="text-body text-text-default">{title}</p>
      <div className="flex h-5 items-start gap-[5px] text-label text-text-muted">
        <Icon name="location-dot" size={12} />
        <span>{locationName}</span>
        <Dot />
        <span>{propertyName}</span>
      </div>
      {info.length > 0 && (
        <div className="flex h-8 items-center gap-[5px] text-label text-text-muted">
          {info.map((n, i) => (
            <span key={i} className="flex items-center gap-[5px]">
              {i > 0 && <Dot />}
              {n}
            </span>
          ))}
        </div>
      )}
      {children && <div className="mt-2 flex flex-col gap-2.5 border-t border-border-neutral pt-2.5">{children}</div>}
    </div>
  )
}

export { ItemLayoutCard }
