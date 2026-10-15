import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "./icon"

// Figma: Item Type Badge (988:844). Item Type=[Inspection|Form|Sensor|PO|Work] -> itemType.
const items = {
  inspection: { icon: "clipboard-list-check", label: "Inspection" },
  form: { icon: "list-ul", label: "Form" },
  sensor: { icon: "signal-stream", label: "Sensor" },
  po: { icon: "file-invoice-dollar", label: "PO" },
  work: { icon: "tractor", label: "Work" },
} as const satisfies Record<string, { icon: IconName; label: string }>

type ItemTypeBadgeProps = ComponentProps<"div"> & { itemType?: keyof typeof items }

function ItemTypeBadge({ className, itemType = "inspection", ...props }: ItemTypeBadgeProps) {
  const { icon, label } = items[itemType]
  return (
    // ds-exception: Figma sets this bold label without letter spacing
    <div className={cn("inline-flex items-center gap-5 text-label font-bold tracking-[0] text-text-muted uppercase", className)} {...props}>
      <span className="flex size-15 shrink-0 items-center justify-center">
        <Icon name={icon} size={12} />
      </span>
      <span>{label}</span>
    </div>
  )
}

export { ItemTypeBadge }
