import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { FileItem, type FileItemProps } from "@/components/ui/file-item"

// Figma: File Upload (1182:1066). Props showTitle, showFiles(files), description. Files render as FileItem.
type UploadedFile = FileItemProps & { id: string }

type FileUploadProps = Omit<ComponentProps<"div">, "children"> & {
  title?: ReactNode
  showTitle?: boolean
  description?: ReactNode
  files?: UploadedFile[]
  /** Drop zone pressed. The feature opens the native file picker. */
  onPick?: () => void
}

function FileUpload({
  title = "File upload",
  showTitle = true,
  description = "PDF, image, or spreadsheet · up to 25 MB each",
  files = [],
  onPick,
  className,
  ...props
}: FileUploadProps) {
  return (
    <div className={cn("flex w-full flex-col gap-16", className)} {...props}>
      <div className="flex w-full flex-col gap-9">
        {showTitle && <p className="text-body text-text-default">{title}</p>}
        <button
          type="button"
          data-surface="muted"
          onClick={onPick}
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-12 border border-dashed border-border-default bg-surface-muted px-16 pt-18 pb-16 outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <span className="flex size-36 items-center justify-center rounded-full border border-border-default bg-bg-default text-icon-default on-fog:border-transparent">
            <Icon name="arrow-up-from-bracket" size={16} className="size-20" />
          </span>
          <span className="mt-8 text-heading text-text-default">Add files</span>
          <span className="text-center text-label text-text-muted">{description}</span>
        </button>
      </div>
      {files.length > 0 && (
        <div className="flex w-full flex-col gap-8">
          {files.map(({ id, ...file }) => (
            <FileItem key={id} {...file} />
          ))}
        </div>
      )}
    </div>
  )
}

export { FileUpload }
export type { FileUploadProps, UploadedFile }
