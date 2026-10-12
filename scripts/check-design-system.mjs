// Two checks, run by `npm run lint`:
// 1. Every Figma color variable (src/styles/figma-colors.json) exists in tokens.css with the same value, in Light and Dark.
// 2. Feature code (src outside components/ui and styles) has no raw colors: hex, rgb(), hsl(), or arbitrary color classes.
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

// ---- 2. No raw colors in feature code ----
const allowed = [join(root, "src/components/ui"), join(root, "src/styles")]
const rawColor = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(|-\[(?:#|rgb|hsl|oklch|var\()/
function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) { if (!allowed.includes(p)) walk(p); continue }
    if (!/\.(tsx?|css)$/.test(f)) continue
    readFileSync(p, "utf8").split("\n").forEach((line, i) => {
      if (rawColor.test(line)) errors.push(`${p.slice(root.length)}:${i + 1}: raw color, use a token class: ${line.trim()}`)
    })
  }
}
walk(join(root, "src"))

if (errors.length) {
  console.error(errors.join("\n") + `\n\n${errors.length} design-system problem(s).`)
  process.exit(1)
}
console.log(`Design system OK: ${Object.keys(figma).length} Figma colors match tokens.css, no raw colors in feature code.`)
