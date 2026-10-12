import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Figma: Badge (117:567). Style=[Status|Tag] -> badgeStyle (style is an HTML attribute). Tone=[Neutral|Positive|Caution|Negative] -> tone.
// Figma only has Tag+Neutral; other Tag tones fall back to the Neutral tag look.
const badgeVariants = cva("inline-flex items-center rounded-full whitespace-nowrap", {
  variants: {
    badgeStyle: {
      status: "h-5 px-2 text-caption",
      tag: "h-6 px-2.5 bg-bg-muted text-label text-text-on-fill-neutral",
    },
    tone: { neutral: "", positive: "", caution: "", negative: "" },
  },
  compoundVariants: [
    { badgeStyle: "status", tone: "neutral", class: "bg-fill-accent text-text-on-fill-alternative" },
    { badgeStyle: "status", tone: "positive", class: "bg-fill-success text-text-on-fill-success" },
    { badgeStyle: "status", tone: "caution", class: "bg-fill-warning text-text-on-fill-warning" },
    { badgeStyle: "status", tone: "negative", class: "bg-fill-danger text-text-on-fill-alternative" },
  ],
  defaultVariants: { badgeStyle: "status", tone: "neutral" },
})

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>

function Badge({ className, badgeStyle, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ badgeStyle, tone }), className)} {...props} />
}

export { Badge, badgeVariants }
