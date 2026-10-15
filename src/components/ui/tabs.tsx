import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import type { IconName } from "@/components/ui/icon"
import { Tab } from "@/components/ui/tab"

// Figma: Tabs (875:1192). Number of Tabs=[2..5] -> items length. Controlled: value + onValueChange.
type TabsProps = Omit<ComponentProps<"div">, "onChange"> & {
  items: { value: string; label: string; icon?: IconName | null }[]
  value: string
  onValueChange?: (value: string) => void
}

function Tabs({ items, value, onValueChange, className, ...props }: TabsProps) {
  return (
    <div role="tablist" className={cn("inline-flex h-40 items-center rounded-full bg-fill-neutral-default p-3", className)} {...props}>
      {items.map((item) => (
        <Tab key={item.value} tabName={item.label} icon={item.icon} selected={item.value === value} onClick={() => onValueChange?.(item.value)} />
      ))}
    </div>
  )
}

export { Tabs }
