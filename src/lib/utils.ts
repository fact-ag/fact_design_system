import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge, validators } from "tailwind-merge"

// Teach tailwind-merge our token names, so cn() keeps the right class when two conflict.
// Text sizes share the text- prefix with text colors (text-body vs text-text-default).
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: [validators.isNumber, "wave"],
      blur: ["glass", "glass-sm"],
      "text-shadow": ["media-sm", "media-md", "media-lg"],
      "drop-shadow": ["floating", "glow", "lift"],
      shadow: ["drop-shadow-2", "croptrak", "mobile", "hairline", "glow-sm", "glow-md", "lift", "ring-selected", "scrim"],
      tracking: ["condensed", "hairline"],
    },
    classGroups: {
      "font-size": [{ text: ["display", "title", "heading", "body", "label", "caption", validators.isNumber] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
