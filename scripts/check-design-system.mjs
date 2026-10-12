// Two checks, run by `npm run lint`:
// 1. Every Figma color variable (src/styles/figma-colors.json) exists in tokens.css with the same value, in Light and Dark.
// 2. Code in src (outside styles and dev) uses tokens only: no raw colors, arbitrary values, off-grid steps, or default Tailwind scales.
// To update after a Figma change: export the variables again into figma-colors.json, then fix tokens.css until this passes.
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const errors = []

// ---- 1. Tokens vs Figma ----
const css = readFileSync(join(root, "src/styles/tokens.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "")
const [lightCss, darkCss] = css.split(/\.dark\s*\{/)
const decls = (text) => Object.fromEntries([...text.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
const light = decls(lightCss)
const dark = { ...light, ...decls(darkCss) }

const hex8 = (h) => {
  h = h.toLowerCase().replace("#", "")
  if (h.length === 3) h = [...h].map((c) => c + c).join("")
  return "#" + (h.length === 6 ? h + "ff" : h)
}
function resolve(value, vars, depth = 0) {
  if (depth > 20) return null
  const v = value.trim()
  if (v.startsWith("#")) return hex8(v)
  const ref = v.match(/^var\((--[\w-]+)\)$/)
  if (ref) return vars[ref[1]] ? resolve(vars[ref[1]], vars, depth + 1) : null
  const mix = v.match(/^color-mix\(in srgb,\s*(.+?)\s+([\d.]+)%,\s*transparent\)$/)
  if (mix) {
    const base = resolve(mix[1], vars, depth + 1)
    const a = Math.round((Number(mix[2]) / 100) * 255).toString(16).padStart(2, "0")
    return base && base.slice(0, 7) + a
  }
  return null
}
// "Color/fill/brand/default" -> "--color-fill-brand-default"
const cssName = (figma) => "--" + figma.toLowerCase().replace(/[\s/]+/g, "-")

const figma = JSON.parse(readFileSync(join(root, "src/styles/figma-colors.json"), "utf8"))
for (const [name, modes] of Object.entries(figma)) {
  const v = cssName(name)
  for (const [mode, expected] of Object.entries(modes)) {
    const vars = mode === "Dark" ? dark : light
    if (!(v in vars)) { errors.push(`tokens.css: missing ${v} (Figma "${name}")`); break }
    const got = resolve(vars[v], vars)
    if (got !== hex8(expected)) errors.push(`tokens.css: ${v} in ${mode} is ${got}, Figma "${name}" is ${expected}`)
  }
}

// ---- 2. No raw values in src (components included) ----
// Every color, size, radius, shadow, opacity, duration, and layer must come from a token.
// A line that must break a rule carries "ds-exception: <reason>" on that line or the line above.
const skip = [join(root, "src/styles"), join(root, "src/dev")]
const rules = [
  [/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/, "raw color, use a color token"],
  [/(?<![\w-])[a-z][\w:-]*-\[[^\]]+\](?!:)/, "arbitrary value, use a token or the 4px grid"],
  [/(?<![\w-])-?(?:p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y|w|h|size|min-w|min-h|max-w|max-h|top|left|right|bottom|inset|inset-x|inset-y|translate-x|translate-y|basis)-(?!0\.5\b|1\.5\b)\d+\.\d+\b/, "off-grid step, use 0.5, 1.5, or a whole number"],
  [/(?<![\w-])rounded(?:-[tblrse]{1,2})?(?:-(?:xs|sm|md|lg|xl|2xl|3xl|4xl))?(?![\w-])/, "radius, use rounded-<role>"],
  [/(?<![\w-])(?:shadow|drop-shadow|text-shadow)-(?:2xs|xs|sm|md|lg|xl|2xl)(?![\w-])/, "shadow, use an elevation role"],
  [/(?<![\w-])opacity-\d+(?![\w-])/, "opacity, use opacity-<role>"],
  [/(?<![\w-])(?:duration|delay)-\d+(?![\w-])/, "duration, use duration-fast, -base, or -slow"],
  [/(?<![\w-])-?z-\d+(?![\w-])/, "z-index, use z-raised, -sticky, -overlay, or -toast"],
  [/(?<![\w-])(?:border|border-[xytblrse]|ring|outline)-(?:[3-9])(?![\w-])/, "stroke width, use 1px (border) or 2px (border-2)"],
  [/(?<![\w-])(?:leading|tracking)-/, "line height or tracking, use a type class"],
  [/(?<![\w-])font-(?:thin|extralight|light|semibold|extrabold|black)(?![\w-])/, "font weight, use font-normal, font-medium, or font-bold"],
  [/(?<![\w-])ease-(?:linear|in|out|in-out)(?![\w-])/, "easing, use ease-standard"],
]
function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) { if (!skip.includes(p)) walk(p); continue }
    if (!/\.(tsx?|css)$/.test(f)) continue
    const lines = readFileSync(p, "utf8").split("\n")
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line) || /ds-exception:/.test(line) || /ds-exception:/.test(lines[i - 1] ?? "")) return
      for (const [re, msg] of rules) {
        const m = line.match(re)
        if (m) errors.push(`${p.slice(root.length)}:${i + 1}: ${msg}: ${m[0]}`)
      }
    })
  }
}
walk(join(root, "src"))

if (errors.length) {
  console.error(errors.join("\n") + `\n\n${errors.length} design-system problem(s).`)
  process.exit(1)
}
console.log(`Design system OK: ${Object.keys(figma).length} Figma colors match tokens.css, no raw values in src.`)
