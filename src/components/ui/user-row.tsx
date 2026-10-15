import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@/components/ui/icon"

// Figma: User Row (1252:1808). Mode=[Multiple|Single] -> mode. State=[Default|Selected] -> selected. Show role -> role set or not.
// Multiple: checkbox is the control (keyboard), clicking the text also toggles. Single: the whole row is a button with aria-pressed.
type UserRowProps = Omit<ComponentProps<"div">, "onSelect"> & {
  name: string
  role?: string
  initials?: string
  mode?: "multiple" | "single"
  selected?: boolean
  onSelect?: () => void
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

const row = "flex w-full items-center gap-12 border-b border-border-default py-8"

function UserRow({ name, role, initials = initialsOf(name), mode = "multiple", selected = false, onSelect, className, ...props }: UserRowProps) {
  const content = (
    <>
      <Avatar size="medium" initials={initials} />
      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span className="truncate text-body text-text-default">{name}</span>
        {role && <span className="truncate text-caption text-text-muted">{role}</span>}
      </span>
    </>
  )
  if (mode === "single") {
    return (
      <div className={cn(row, "p-0", className)} {...props}>
        <button
          type="button"
          aria-pressed={selected}
          onClick={onSelect}
          className="flex w-full cursor-pointer items-center gap-12 py-8 outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {content}
          {selected && (
            <span className="flex size-20 shrink-0 items-center justify-center text-icon-default">
              <Icon name="check" size={16} />
            </span>
          )}
        </button>
      </div>
    )
  }
  return (
    <div className={cn(row, className)} {...props}>
      <Checkbox checked={selected} onChange={() => onSelect?.()} aria-label={name} />
      <div onClick={onSelect} className="flex min-w-0 flex-1 cursor-pointer items-center gap-12">
        {content}
      </div>
    </div>
  )
}

export { UserRow, initialsOf }
