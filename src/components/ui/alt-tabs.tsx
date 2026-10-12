import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { AltTab } from "./alt-tab"

// Figma: Alt Tabs (909:905). Tabs=[2|3|4] -> items length. Controlled: value + onValueChange.
type AltTabsProps = Omit<ComponentProps<"div">, "onChange"> & {
  items: { value: string; label: string }[]
  value: string
  onValueChange?: (value: string) => void
}

function AltTabs({ items, value, onValueChange, className, ...props }: AltTabsProps) {
  return (
    <div role="tablist" className={cn("inline-flex items-center rounded-full bg-fill-neutral-default p-4 mix-blend-darken", className)} {...props}>
      {items.map((item) => (
        <AltTab key={item.value} selected={item.value === value} onClick={() => onValueChange?.(item.value)}>
          {item.label}
        </AltTab>
      ))}
    </div>
  )
}

export { AltTabs }
