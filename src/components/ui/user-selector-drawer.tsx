import { Fragment } from "react"
import { ItemSelectorDrawer } from "@/components/ui/item-selector-drawer"
import { UserChip } from "@/components/ui/user-chip"
import { UserRow } from "@/components/ui/user-row"

// Figma: User selector drawer (1253:1959). Selection=[Multiple|Single] -> selection. Show selected -> chips show when selectedIds is not empty.
// Single: tapping a row selects that person and closes the drawer (no CTA). Clear unassigns.
export type DrawerUser = { id: string; name: string; role?: string; initials?: string }

type UserSelectorDrawerProps = {
  open: boolean
  onClose: () => void
  users: DrawerUser[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  selection?: "multiple" | "single"
  title?: string
  showBack?: boolean
  onBack?: () => void
  query?: string
  onQueryChange?: (query: string) => void
  /** Multiple only. Defaults to "Assign N People". */
  confirmLabel?: string
  onConfirm?: () => void
  groupLabel?: string
}

function UserSelectorDrawer({
  open,
  onClose,
  users,
  selectedIds,
  onChange,
  selection = "multiple",
  title = selection === "single" ? "Assign to" : "Assign people",
  showBack = true,
  onBack,
  query = "",
  onQueryChange = () => {},
  confirmLabel,
  onConfirm,
  groupLabel = "Team",
}: UserSelectorDrawerProps) {
  const multiple = selection === "multiple"
  const q = query.trim().toLowerCase()
  const visible = q ? users.filter((u) => `${u.name} ${u.role ?? ""}`.toLowerCase().includes(q)) : users
  const chosen = users.filter((u) => selectedIds.includes(u.id))
  const toggle = (id: string) => onChange(selectedIds.includes(id) ? selectedIds.filter((s) => s !== id) : [...selectedIds, id])
  const n = selectedIds.length

  return (
    <ItemSelectorDrawer
      open={open}
      onClose={onClose}
      size="large"
      title={title}
      showBack={showBack}
      onBack={onBack}
      onClear={() => onChange([])}
      query={query}
      onQueryChange={onQueryChange}
      searchPlaceholder="Search by name or role"
      confirmLabel={multiple ? (confirmLabel ?? `Assign ${n} ${n === 1 ? "Person" : "People"}`) : undefined}
      onConfirm={onConfirm ?? onClose}
    >
      {multiple && chosen.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {chosen.map((u) => (
            <Fragment key={u.id}>
              <UserChip name={u.name} initials={u.initials} onRemove={() => toggle(u.id)} />
            </Fragment>
          ))}
        </div>
      )}
      <span className="text-label text-text-muted">{groupLabel}</span>
      <div className="flex flex-col px-[7px]">
        {visible.map((u) => (
          <UserRow
            key={u.id}
            name={u.name}
            role={u.role}
            initials={u.initials}
            mode={selection}
            selected={selectedIds.includes(u.id)}
            onSelect={() => {
              if (multiple) return toggle(u.id)
              onChange([u.id])
              onClose()
            }}
          />
        ))}
      </div>
    </ItemSelectorDrawer>
  )
}

export { UserSelectorDrawer }
