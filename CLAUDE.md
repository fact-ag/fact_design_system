# International Farming app

The app is Vite + React 19 + TypeScript + Tailwind CSS v4. The design system comes from the Figma file "Master Components (Copy)", file key `00E9j9wMim2nlHmN0Zsfsq`, page "Components" (`0:1`).

## Rules for building features

1. Build every screen from components in `src/components/ui`. Import from `@/components/ui/<file>`.
2. If a screen needs a part that is not in `src/components/ui`, add it to the design system first. Then use it in the feature.
3. Use only token classes for color, type, and shadow. Never write a hex value, `rgb()`, or an arbitrary color class like `bg-[#294739]` in feature code.
4. Use the type classes for all text: `text-display`, `text-title`, `text-heading`, `text-body`, `text-label`, `text-caption`.
5. Use semantic color classes. Primitive colors (for example `--color-greens-algae`) have no Tailwind classes on purpose.
6. Use `<Icon name="..." />` for every icon. The names are the Figma glyph names.
7. Run `npm run build` and `npm run lint` before you say that a change works.

## Tokens

All tokens are in `src/styles/tokens.css`. A Figma variable name becomes a CSS variable: `Color/fill/brand/default` becomes `--color-fill-brand-default`, and the Tailwind class is `bg-fill-brand-default`.

| Figma group | Tailwind class examples |
| --- | --- |
| `Color/bg/*`, `Color/surface/*` | `bg-bg-default`, `bg-surface-muted` |
| `Color/text/*` | `text-text-default`, `text-text-on-fill-brand` |
| `Color/icon/*` | `text-icon-muted` |
| `Color/border/*` | `border-border-default`, `ring-border-focus` |
| `Color/fill/*` | `bg-fill-brand-default`, `bg-fill-danger-surface-subtle` |
| `Color/status/*` | `bg-status-success`, `text-status-danger` |
| `Type/*` | `text-body`, `text-heading` |
| Spacing and size | The unit is 1px, so the class number is the Figma px value: `p-16`, `gap-10`, `h-44`, `leading-22` |
| Radius | `rounded-<px>`: 2, 4, 6, 8, 10, 11, 12, 14, 15, 16, 17, 18, 20, 22, 24, 25, 30, 32, 33, 50, plus `rounded-full` and `rounded-wave` |
| Extra font sizes | `text-11`, `-13`, `-14`, `-16`, `-17`, `-18`, `-22`, `-24`, `-30`. Tracking: `tracking-condensed`, `tracking-hairline` |
| Shadows | `shadow-drop-shadow-2`, `-croptrak`, `-mobile`, `-hairline`, `-glow-sm`, `-glow-md`, `-lift`, `-ring-selected`, `-scrim` |
| Other effects | `drop-shadow-floating`, `-glow`, `-lift`. `text-shadow-media-sm`, `-md`, `-lg`. `backdrop-blur-glass`, `-glass-sm` |

`npm run lint` fails on raw colors and arbitrary values like `p-[13px]` in all of `src` except `src/styles` and `src/dev`. If a value cannot be a token, write `ds-exception: <reason>` in a comment on that line or the line above. If a new value is needed, add a token in `tokens.css` and add its name to `src/lib/utils.ts` so that `cn()` merges it correctly.

Dark mode: add the class `dark` on `<html>`. The semantic tokens switch to the Figma "Dark" mode values.

## How a design-system component is written

Use `src/components/ui/button.tsx` as the model.

- One file per Figma component set, kebab-case: Figma "Select Field" is `select-field.tsx`, export `SelectField`.
- Put the Figma name and node ID in a comment at the top: `// Figma: Select Field (24:298)`.
- Figma variant properties become camelCase props with lowercase values: `State=[Default|Active]` is `state?: "default" | "active"`. Exception: Figma `Type` becomes `variant`, because `type` is an HTML attribute.
- Figma interaction states are CSS states, not props: `Pressed` is `active:`, `Hovered` is `hover:`, `Disabled` is the `disabled` attribute with `disabled:` classes. Focus uses `focus-visible:ring-2 focus-visible:ring-border-focus`.
- Figma states that are data (for example `Selected`, `Error`, `Filled`, `Recording`) are props.
- Figma BOOLEAN properties are optional boolean props. TEXT properties are string or `ReactNode` props. SLOT and INSTANCE_SWAP properties are `ReactNode` props or `children`.
- Use `cva` for variants and `cn` from `@/lib/utils` to merge classes. Spread the remaining props onto the root element and accept `className`.
- Use native elements (`button`, `input`, `textarea`, `dialog`) before a library. If a native element cannot do the job, use `@base-ui/react`. An example is a popover with focus handling.
- If Figma uses a value that has no token, add the token with the exact Figma value. Do not round it.
- Some components are complex: Barcode Scanner, Map Sketch, Sketch Pad, Signature Pad, Audio Recorder, Location Picker, and device frames. They render every Figma state from props and report user actions through callbacks. They do not contain camera, map, canvas drawing, or audio logic. The feature that uses them adds that logic.

## Icons

`src/components/ui/icon.tsx` maps Figma glyph names to Font Awesome 7 Sharp Regular (Pro), the same style as Figma. The package `@fortawesome/sharp-regular-svg-icons` comes from the private Font Awesome registry. The project `.npmrc` points the `@fortawesome` scope to that registry. It holds no secret. Before `npm install`, each developer and each build server needs the Font Awesome Package Manager Token in `~/.npmrc`: `//npm.fontawesome.com/:_authToken=<token>`. Never commit the token.

Some Figma icons are Material glyphs or images, not Font Awesome. They are custom glyphs in `icon.tsx` with the Figma path: `arrow-forward-ios`, `material-close`, `keyboard-arrow-right`, `add-2`, `search`, `mic`, `filter-list`, `dehaze`, `cellular`, `wifi`, `check-thin`, `check-stroke`, `i-search`, `mic-20`, `close-thin`.

Set the icon size with the `size` prop. A `size-*` class on `<Icon>` has no effect, because the component sets an inline width and height. If Figma puts the icon in a larger box, wrap the icon in a `span` with that box size. `IconButton` takes `iconSize` (default 16).

## Font

Phonic is in `src/assets/fonts`. Regular (400) and Bold (700) are the final licensed files. Medium (500) is still a trial file, `PhonicTrial-Medium.otf`. Replace it with the final Medium file before the app goes live.

## Code Connect

Each Figma component links to its code file through Figma Code Connect. The link uses the node ID in the `// Figma:` comment. If you add a component, add its mapping with the Figma MCP tool `add_code_connect_map`.
