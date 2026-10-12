import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { DisplayIcon } from "./display-icon"
import { Icon } from "./icon"

// Figma: Item Layout Row (1147:818). Property 1=[Default|Photo option] -> variant. `photo` is the image node for variant="photo".
type ItemLayoutRowProps = Omit<ComponentProps<"div">, "title"> & {
  variant?: "default" | "photo"
  title: ReactNode
  description?: ReactNode
  photo?: ReactNode
}

function ItemLayoutRow({ variant = "default", title, description, photo, className, ...props }: ItemLayoutRowProps) {
  return (
    <div className={cn("flex h-11 w-full items-center gap-2.5 border-b border-border-neutral pb-1", className)} {...props}>
      {variant === "photo" ? (
        <div className="size-[34px] shrink-0 overflow-clip rounded-md border border-border-muted bg-fill-neutral-default [&>img]:size-full [&>img]:object-cover">{photo}</div>
      ) : (
        <DisplayIcon className="size-[34px] rounded-md bg-fill-brand-tonal-default">
          <Icon name="folder" size={16} />
        </DisplayIcon>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-body text-text-default">{title}</span>
        <span className="text-caption whitespace-pre text-text-muted">{description}</span>
      </div>
      <Icon name="circle-info" size={16} className="shrink-0 text-text-muted" />
      <Icon name="bookmark" size={16} className="shrink-0 text-text-muted" />
    </div>
  )
}

export { ItemLayoutRow }
