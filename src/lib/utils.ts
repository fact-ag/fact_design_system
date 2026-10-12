import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Our text sizes share the text- prefix with text colors (text-body vs text-text-default).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "heading", "body", "label", "caption"] }],
      shadow: [{ shadow: ["drop-shadow-2", "croptrak", "mobile"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
