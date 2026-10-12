import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faAngleDown,
  faAngleUp,
  faArrowLeft,
  faArrowRotateLeft,
  faArrowRotateRight,
  faArrowUpFromBracket,
  faBarcode,
  faBookOpen,
  faBookmark,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircleExclamation,
  faCircleInfo,
  faClipboardCheck,
  faEraser,
  faFileInvoiceDollar,
  faFileLines,
  faFilePdf,
  faFolder,
  faFont,
  faGlobe,
  faHandPointer,
  faHighlighter,
  faHouse,
  faImage,
  faLayerGroup,
  faLightbulb,
  faListUl,
  faLocationCrosshairs,
  faLocationDot,
  faMagnifyingGlass,
  faMapLocationDot,
  faMicrophone,
  faMinus,
  faPause,
  faPen,
  faPenNib,
  faPlay,
  faPlus,
  faRotateRight,
  faShapes,
  faSignature,
  faTowerBroadcast,
  faTractor,
  faTrashCan,
  faTriangleExclamation,
  faVideoSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

// Figma uses Font Awesome 7 Sharp Regular (Pro). Keys are the Figma glyph names.
// Glyphs marked Pro in Figma (barcode-read, book-open-lines, clipboard-list-check, signal-stream,
// image-circle-plus, scribble, flashlight, camera-slash) use the closest free glyph.
// ponytail: free solid set for now. With a Pro token, swap these imports to
// @fortawesome/sharp-regular-svg-icons and nothing else changes.
export const icons = {
  "house": faHouse,
  "angle-down": faAngleDown,
  "angle-up": faAngleUp,
  "barcode-read": faBarcode,
  "arrow-left": faArrowLeft,
  "circle-info": faCircleInfo,
  "book-open-lines": faBookOpen,
  "triangle-exclamation": faTriangleExclamation,
  "clipboard-list-check": faClipboardCheck,
  "list-ul": faListUl,
  "signal-stream": faTowerBroadcast,
  "file-invoice-dollar": faFileInvoiceDollar,
  "tractor": faTractor,
  "chevron-up": faChevronUp,
  "chevron-down": faChevronDown,
  "globe": faGlobe,
  "folder": faFolder,
  "bookmark": faBookmark,
  "image-circle-plus": faImage,
  "close": faXmark,
  "minus": faMinus,
  "plus": faPlus,
  "arrow-up-from-bracket": faArrowUpFromBracket,
  "file-pdf": faFilePdf,
  "xmark": faXmark,
  "file-lines": faFileLines,
  "trash-can": faTrashCan,
  "microphone": faMicrophone,
  "check": faCheck,
  "pause": faPause,
  "play": faPlay,
  "circle-exclamation": faCircleExclamation,
  "rotate-right": faRotateRight,
  "layer-group": faLayerGroup,
  "location-crosshairs": faLocationCrosshairs,
  "hand-pointer": faHandPointer,
  "pen": faPen,
  "highlighter": faHighlighter,
  "shapes": faShapes,
  "font": faFont,
  "location-dot": faLocationDot,
  "eraser": faEraser,
  "arrow-rotate-left": faArrowRotateLeft,
  "arrow-rotate-right": faArrowRotateRight,
  "signature": faSignature,
  "scribble": faPenNib,
  "map-location-dot": faMapLocationDot,
  "magnifying-glass": faMagnifyingGlass,
  "chevron-right": faChevronRight,
  "chevron-left": faChevronLeft,
  "flashlight": faLightbulb,
  "camera-slash": faVideoSlash,
  // Figma "My properties - minimized" uses the Material "filter_list" glyph, which Font Awesome Free does not have.
  "filter-list": { prefix: "fas", iconName: "filter" as IconDefinition["iconName"], icon: [24, 24, [], "", "M10.2787 17.5V16H13.7115V17.5H10.2787ZM6.404 12.75V11.25H17.5865V12.75H6.404ZM3.5 8V6.5H20.5V8H3.5Z"] },
} satisfies Record<string, IconDefinition>

export type IconName = keyof typeof icons

type IconProps = {
  name: IconName
  /** Glyph size in px. Figma "Font Awesome Icon" uses 16 inside a 20 box by default. */
  size?: number
  className?: string
  /** Set when the icon is the only content of a control. Otherwise the icon is hidden from screen readers. */
  label?: string
}

export function Icon({ name, size = 16, className, label }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icons[name]}
      className={cn("shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  )
}
