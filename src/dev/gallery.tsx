import { useState, type ReactNode } from "react"
import { AddPhotoTile } from "@/components/ui/add-photo-tile"
import { AiFab } from "@/components/ui/ai-fab"
import { AlertBottomDrawer } from "@/components/ui/alert-bottom-drawer"
import { AltTab } from "@/components/ui/alt-tab"
import { AltTabs } from "@/components/ui/alt-tabs"
import { AudioClip } from "@/components/ui/audio-clip"
import { AudioNotes } from "@/components/ui/audio-notes"
import { AudioRecorder } from "@/components/ui/audio-recorder"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BadgeButton } from "@/components/ui/badge-button"
import { BottomDrawer } from "@/components/ui/bottom-drawer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { DisplayIcon } from "@/components/ui/display-icon"
import { DrawingToolbar } from "@/components/ui/drawing-toolbar"
import { FileItem } from "@/components/ui/file-item"
import { FileUpload } from "@/components/ui/file-upload"
import { Header } from "@/components/ui/header"
import { HeaderWithTitle } from "@/components/ui/header-with-title"
import { Icon, icons, type IconName } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"
import { InputField } from "@/components/ui/input-field"
import { InteractiveInput } from "@/components/ui/interactive-input"
import { IPadListItem } from "@/components/ui/ipad-list-item"
import { ItemLayoutCard } from "@/components/ui/item-layout-card"
import { ItemLayoutRow } from "@/components/ui/item-layout-row"
import { ItemSelectorDrawer } from "@/components/ui/item-selector-drawer"
import { ItemTypeBadge } from "@/components/ui/item-type-badge"
import { LinearProgressBar } from "@/components/ui/linear-progress-bar"
import { ListItem } from "@/components/ui/list-item"
import { ListSectionHeader } from "@/components/ui/list-section-header"
import { ListSectionHeaderLarge } from "@/components/ui/list-section-header-large"
import { LocationField } from "@/components/ui/location-field"
import { LocationPinBadge } from "@/components/ui/location-pin-badge"
import { MapLayers } from "@/components/ui/map-layers"
import { MapPin } from "@/components/ui/map-pin"
import { BarcodeScanner } from "@/components/ui/barcode-scanner"
import { LocationPicker } from "@/components/ui/location-picker"
import { MapSketch } from "@/components/ui/map-sketch"
import { MobileScreen } from "@/components/ui/mobile-screen"
import { MenuItem } from "@/components/ui/menu-item"
import { MyPropertiesMinimized } from "@/components/ui/my-properties-minimized"
import { NavigationButton } from "@/components/ui/navigation-button"
import { NumberInput } from "@/components/ui/number-input"
import { PhotoThumbnail } from "@/components/ui/photo-thumbnail"
import { PresentationCard, presentationImages } from "@/components/ui/presentation-card"
import { PropertyListRow } from "@/components/ui/property-list-row"
import { Radio } from "@/components/ui/radio"
import { RectangleNavigationButton } from "@/components/ui/rectangle-navigation-button"
import { RectanglePanel } from "@/components/ui/rectangle-panel"
import { SearchField } from "@/components/ui/search-field"
import { SelectField } from "@/components/ui/select-field"
import { SequenceButtons } from "@/components/ui/sequence-buttons"
import { SequenceStep } from "@/components/ui/sequence-step"
import { SignatureField } from "@/components/ui/signature-field"
import { SignaturePad } from "@/components/ui/signature-pad"
import { SketchItem } from "@/components/ui/sketch-item"
import { SketchPad } from "@/components/ui/sketch-pad"
import { Sketches } from "@/components/ui/sketches"
import { Slider } from "@/components/ui/slider"
import { SlimButton } from "@/components/ui/slim-button"
import { SlimNavigationButton } from "@/components/ui/slim-navigation-button"
import { SquareRectangleButton } from "@/components/ui/square-rectangle-button"
import { StepIndicator } from "@/components/ui/step-indicator"
import { StepItem } from "@/components/ui/step-item"
import { Stepper } from "@/components/ui/stepper"
import { StrokeWidth } from "@/components/ui/stroke-width"
import { Switch } from "@/components/ui/switch"
import { Tab } from "@/components/ui/tab"
import { Tabs } from "@/components/ui/tabs"
import { TagsList } from "@/components/ui/tags-list"
import { TextArea } from "@/components/ui/text-area"
import { ToolButton } from "@/components/ui/tool-button"
import { UndoToast } from "@/components/ui/undo-toast"
import { UploadPhotos } from "@/components/ui/upload-photos"
import { UserChip } from "@/components/ui/user-chip"
import { UserRow } from "@/components/ui/user-row"
import { UserSelectorDrawer } from "@/components/ui/user-selector-drawer"
import { UtilityButton } from "@/components/ui/utility-button"

const wheat = presentationImages.wheatField
const potato = presentationImages.potatoField
const noop = () => {}

function Section({ id, title, wide, children }: { id: string; title: string; wide?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={wide ? "w-full max-w-[1122px] scroll-mt-4" : "w-full max-w-[392px] scroll-mt-4"}>
      <h2 className="mb-2 text-heading text-text-default">{title}</h2>
      <div className="flex flex-col gap-4 rounded-xl border border-border-default bg-bg-default p-4">{children}</div>
    </section>
  )
}

function Cap({ children }: { children: ReactNode }) {
  return <p className="text-caption text-text-muted">{children}</p>
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

function Opener({ label, children }: { label: string; children: (open: boolean, close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {label}
      </Button>
      {children(open, () => setOpen(false))}
    </>
  )
}

function useToggle(initial = false) {
  const [v, set] = useState(initial)
  return [v, () => set((x) => !x)] as const
}

/* ---------- controlled demos ---------- */

function AltTabsDemo() {
  const [v, setV] = useState("fields")
  return (
    <AltTabs
      value={v}
      onValueChange={setV}
      items={[
        { value: "fields", label: "Fields" },
        { value: "crops", label: "Crops" },
        { value: "tasks", label: "Tasks" },
      ]}
    />
  )
}

function BadgeButtonDemo() {
  const [a, tA] = useToggle(true)
  const [b, tB] = useToggle()
  return (
    <Row>
      <BadgeButton selected={a} onClick={tA}>Inspections</BadgeButton>
      <BadgeButton selected={b} onClick={tB} icon="tractor">Work orders</BadgeButton>
      <BadgeButton disabled>Sensors</BadgeButton>
    </Row>
  )
}

function CheckboxDemo() {
  const [c, setC] = useState<Record<string, boolean>>({ small: true, medium: false, large: true })
  return (
    <>
      {(["small", "medium", "large"] as const).map((s) => (
        <Checkbox
          key={s}
          size={s}
          checked={c[s]}
          onChange={(e) => setC({ ...c, [s]: e.target.checked })}
          title={`Scouted north field (${s})`}
          description="Tick when the walk is finished"
        />
      ))}
      <Checkbox disabled title="Locked inspection" />
    </>
  )
}

function ColorSwatchDemo() {
  const colors = [
    ["Red", "var(--color-indicators-negative)"],
    ["Fern", "var(--color-greens-fern)"],
    ["Citron", "var(--color-warm-earth-citron)"],
  ] as const
  const [sel, setSel] = useState("Fern")
  return (
    <Row>
      {colors.map(([label, color]) => (
        <ColorSwatch key={label} label={label} color={color} selected={sel === label} onClick={() => setSel(label)} />
      ))}
    </Row>
  )
}

function DrawingToolbarDemo({ context }: { context: "canvas" | "map" }) {
  const [tool, setTool] = useState<"pen" | "highlighter" | "shape" | "text" | "pin" | "eraser">("pen")
  const [color, setColor] = useState<string | undefined>(undefined)
  const [stroke, setStroke] = useState<"thin" | "medium" | "thick">("medium")
  return (
    <DrawingToolbar
      context={context}
      tool={tool}
      onToolChange={setTool}
      color={color}
      onColorChange={setColor}
      strokeWidth={stroke}
      onStrokeWidthChange={setStroke}
      canUndo
      canRedo={false}
      onUndo={noop}
      onRedo={noop}
    />
  )
}

function FileUploadDemo() {
  const [files, setFiles] = useState([
    { id: "1", state: "uploaded" as const, name: "irrigation-plan.pdf", meta: "PDF · 1.2 MB", fileIcon: "file-pdf" as IconName },
    { id: "2", state: "uploading" as const, name: "soil-report.docx", progress: 45 },
    { id: "3", state: "error" as const, name: "yield-2025.xlsx", errorText: "Upload failed" },
  ])
  const remove = (id: string) => setFiles((f) => f.filter((x) => x.id !== id))
  return (
    <FileUpload
      title="Attachments"
      description="PDF or DOCX up to 10 MB"
      files={files.map((f) => ({ ...f, onRemove: () => remove(f.id), onRetry: noop }))}
      onPick={noop}
    />
  )
}

const headerTabs = [
  { id: "all", label: "All fields", icon: "layer-group" as IconName },
  { id: "wheat", label: "Wheat" },
  { id: "potato", label: "Potatoes" },
]

function HeaderDemo() {
  const [id, setId] = useState("all")
  return <Header tabs={headerTabs} activeId={id} onTabChange={setId} onMenu={noop} time="9:41" />
}

function InputFieldDemo() {
  const [v, setV] = useState("")
  return (
    <>
      <InputField label="Field name" placeholder="North Paddock" value={v} onChange={(e) => setV(e.target.value)} />
      <InputField label="Area" unit="ha" defaultValue="42.5" />
      <InputField label="Lot barcode" placeholder="Scan lot" onScan={noop} />
      <InputField label="Locked" disabled defaultValue="Sunrise Farm" />
    </>
  )
}

function InteractiveInputDemo({ action, initial }: { action: "clear" | "scan"; initial: string }) {
  const [v, setV] = useState(initial)
  const [c, setC] = useState(false)
  return (
    <InteractiveInput
      value={v}
      onChange={setV}
      placeholder="Seed lot code"
      action={action}
      onAction={() => setV("")}
      detail={v ? "4006381333931" : undefined}
      checked={c}
      onCheckedChange={setC}
    />
  )
}

const poItems = [
  { po: "PO-1042", farm: "Sunrise Farm", status: "Approved", statusTone: "positive" as const, owner: "Maria Lopez", date: "12 Oct", vendor: "AgroSeed Co.", total: "$4,820", badge: "Seed", badgeTone: "neutral" as const },
  { po: "PO-1043", farm: "Hillside Orchard", status: "Pending", statusTone: "caution" as const, owner: "Tom Reid", date: "13 Oct", vendor: "GreenGrow Inputs", total: "$1,260", badge: "Fertilizer", badgeTone: "neutral" as const },
]

function ItemSelectorDemo({ back }: { back: boolean }) {
  const [q, setQ] = useState("")
  return (
    <Opener label={back ? "Item selector (with back)" : "Item selector"}>
      {(open, close) => (
        <ItemSelectorDrawer
          open={open}
          onClose={close}
          title="Select crop"
          showBack={back}
          onBack={close}
          onClear={() => setQ("")}
          query={q}
          onQueryChange={setQ}
          searchPlaceholder="Search crops"
          confirmLabel="Select crop"
          onConfirm={close}
          size="medium"
        >
          <ListItem title="Winter wheat" subtitle="North Paddock" />
          <ListItem title="Russet potatoes" subtitle="Hillside 3" />
          <ListItem title="Sugar beet" subtitle="River Bend" />
        </ItemSelectorDrawer>
      )}
    </Opener>
  )
}

function ListSectionDemo() {
  const [a, tA] = useToggle(true)
  const [b, tB] = useToggle(false)
  return (
    <>
      <ListSectionHeader title="Active fields" expanded={a} onToggle={tA} />
      <ListSectionHeader title="Fallow fields" expanded={b} onToggle={tB} />
    </>
  )
}

function ListSectionLargeDemo() {
  const [a, tA] = useToggle(true)
  const [b, tB] = useToggle(false)
  return (
    <>
      <ListSectionHeaderLarge title="Open inspections" expanded={a} onToggle={tA} />
      <ListSectionHeaderLarge title="Closed inspections" expanded={b} onToggle={tB} />
    </>
  )
}

const pos = { latitude: 36.7378, longitude: -119.7871 }

function LocationFieldDemo() {
  const [v, setV] = useState<typeof pos | undefined>(pos)
  const map = <img src={wheat} alt="" className="size-full object-cover" />
  return (
    <>
      <Cap>Empty</Cap>
      <LocationField label="Field location" onPick={() => setV(pos)} onUseCurrent={() => setV(pos)} />
      <Cap>Error</Cap>
      <LocationField label="Field location" error="Pick the field location" onPick={noop} onUseCurrent={noop} />
      <Cap>Filled (remove to clear)</Cap>
      <LocationField label="Field location" value={v} mapPreview={map} onPick={noop} onRemove={() => setV(undefined)} />
    </>
  )
}

const layers = [
  { id: "sat", label: "Satellite", image: wheat },
  { id: "ndvi", label: "Crop health", image: potato },
]

function MapLayersDemo() {
  const [id, setId] = useState("sat")
  return <MapLayers layers={layers} selectedId={id} onSelect={setId} onClose={noop} title="Map layers" footer="Imagery updated 10 Oct" />
}


function BarcodeScannerDemo() {
  const [state, setState] = useState<"scanning" | "detected" | "no-match" | "permission-denied">("scanning")
  return (
    <>
      <Row>
        {(["scanning", "detected", "no-match", "permission-denied"] as const).map((s) => (
          <BadgeButton key={s} selected={state === s} onClick={() => setState(s)}>{s}</BadgeButton>
        ))}
      </Row>
      <div className="h-[640px] overflow-clip rounded-xl">
        <BarcodeScanner
          state={state}
          background={<img src={wheat} alt="" className="size-full object-cover" />}
          code="0 12345 67890 5"
          onClose={noop}
          onToggleFlashlight={noop}
          onEnterManually={noop}
          onOpenSettings={noop}
          onUseCode={() => setState("scanning")}
          onScanAgain={() => setState("scanning")}
        />
      </div>
    </>
  )
}

function LocationPickerDemo() {
  const [state, setState] = useState<"placing" | "locating">("placing")
  const [lat, setLat] = useState("36.7378")
  const [lng, setLng] = useState("-119.7871")
  return (
    <>
      <Row>
        {(["placing", "locating"] as const).map((s) => (
          <BadgeButton key={s} selected={state === s} onClick={() => setState(s)}>{s}</BadgeButton>
        ))}
      </Row>
      <div className="h-[640px] overflow-clip rounded-xl">
        <LocationPicker
          state={state}
          background={<img src={wheat} alt="" className="size-full object-cover" />}
          latitude={lat}
          longitude={lng}
          onLatitudeChange={setLat}
          onLongitudeChange={setLng}
          onCancel={noop}
          onOpenLayers={noop}
          onMyLocation={() => setState("locating")}
          onConfirm={() => setState("placing")}
        />
      </div>
    </>
  )
}

function MobileScreenDemo() {
  const [dim, setDim] = useToggle()
  return (
    <div className="h-[480px] overflow-clip rounded-xl border border-border-default">
      <MobileScreen
        header={<div className="p-4 text-title">North Field</div>}
        dim={dim}
        onTop={dim ? <div className="absolute inset-x-4 bottom-4 rounded-xl bg-surface-default p-4">On-top panel</div> : null}
      >
        <div className="p-4"><Button onClick={setDim}>Toggle backdrop dim</Button></div>
      </MobileScreen>
    </div>
  )
}

function MapSketchDemo() {
  const [state, setState] = useState<"explore" | "draw" | "pin-details" | "layers">("explore")
  const [lid, setLid] = useState("sat")
  const [note, setNote] = useState("Standing water after rain")
  return (
    <>
      <Row>
        {(["explore", "draw", "pin-details", "layers"] as const).map((s) => (
          <BadgeButton key={s} selected={state === s} onClick={() => setState(s)}>{s}</BadgeButton>
        ))}
      </Row>
      <div className="h-[640px] overflow-clip rounded-xl">
        <MapSketch
          state={state}
          background={<img src={wheat} alt="" className="size-full object-cover" />}
          title="Sketch"
          hint="Tap the map to drop a pin"
          onClose={() => setState("explore")}
          onCapture={() => setState("draw")}
          onOpenLayers={() => setState("layers")}
          onMyLocation={noop}
          onCancel={() => setState("explore")}
          onDone={() => setState("explore")}
          toolbarProps={{ tool: "pen", onToolChange: noop }}
          pinName="Wet spot"
          pinCoordinates="36.7378, -119.7871"
          pinNote={note}
          onPinNoteChange={setNote}
          onDeletePin={() => setState("draw")}
          onSavePin={() => setState("draw")}
          layersProps={{ layers, selectedId: lid, onSelect: setLid }}
          onLayersClose={() => setState("explore")}
        >
          {state === "pin-details" || state === "draw" ? (
            <div className="absolute top-1/3 left-1/3"><MapPin name="Wet spot" /></div>
          ) : null}
        </MapSketch>
      </div>
    </>
  )
}

function NumberInputDemo() {
  const [a, setA] = useState(12)
  const [b, setB] = useState<number | undefined>(undefined)
  return (
    <>
      <NumberInput value={a} onChange={setA} min={0} max={50} step={2} />
      <NumberInput value={b} onChange={setB} placeholder="Plants per m2" />
      <NumberInput value={3} disabled />
    </>
  )
}

function PhotoThumbnailDemo() {
  const [sel, setSel] = useState(false)
  return (
    <Row>
      <PhotoThumbnail src={wheat} alt="Wheat field" onRemove={noop} />
      <PhotoThumbnail src={potato} alt="Potato field" state={sel ? "selected" : "default"} onSelect={() => setSel(!sel)} onRemove={noop} />
      <PhotoThumbnail src={wheat} alt="Uploading" state="uploading" progress={60} onRemove={noop} />
      <PhotoThumbnail src={potato} alt="Failed" state="error" onRetry={noop} onRemove={noop} />
    </Row>
  )
}

function PropertyRowDemo() {
  const [sel, setSel] = useState("a")
  return (
    <>
      <PropertyListRow title="Sunrise Farm" subtitle="12 fields · 340 ha" selected={sel === "a"} onClick={() => setSel("a")} />
      <PropertyListRow title="Hillside Orchard" subtitle="4 fields · 58 ha" selected={sel === "b"} onClick={() => setSel("b")} />
    </>
  )
}

function RadioDemo() {
  const [v, setV] = useState("medium")
  return (
    <>
      {(["small", "medium", "large"] as const).map((s) => (
        <Radio
          key={s}
          size={s}
          name="irrigation"
          checked={v === s}
          onChange={() => setV(s)}
          title={`Drip irrigation (${s})`}
          description="Applied every second day"
        />
      ))}
      <Radio name="irrigation-x" disabled title="Flood irrigation" />
    </>
  )
}

function SearchFieldDemo() {
  const [v, setV] = useState("")
  return (
    <>
      <Cap>Default and typing</Cap>
      <SearchField placeholder="Search fields" value={v} onChange={(e) => setV(e.target.value)} onMicPress={noop} />
      <Cap>Filled</Cap>
      <SearchField value="North Paddock" onClear={noop} readOnly />
    </>
  )
}

function SelectFieldDemo() {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState<string | undefined>(undefined)
  return (
    <>
      <Cap>Default (click to open and select)</Cap>
      <SelectField label="Crop" placeholder="Choose a crop" value={v} open={open} onClick={() => setOpen(!open)} />
      {open && (
        <Row>
          {["Winter wheat", "Potatoes"].map((c) => (
            <Button key={c} variant="tertiary" onClick={() => { setV(c); setOpen(false) }}>{c}</Button>
          ))}
        </Row>
      )}
      <Cap>Active</Cap>
      <SelectField label="Crop" placeholder="Choose a crop" open />
      <Cap>Selected, with unit and scan</Cap>
      <SelectField label="Variety" value="Russet Burbank" icon="tractor" unit="kg" onScan={noop} />
    </>
  )
}

function SequenceButtonsDemo() {
  const [a, setA] = useState<number | null>(7)
  const [b, setB] = useState<number | null>(0)
  return (
    <>
      <SequenceButtons title="Canopy cover" legends lowLabel="Sparse" highLabel="Dense" showNA value={a} onValueChange={setA} max={7} />
      <SequenceButtons title="Weed pressure" value={b} onValueChange={setB} max={10} />
    </>
  )
}

function SequenceStepDemo() {
  const [v, setV] = useState("3")
  return (
    <Row>
      {["1", "2", "3"].map((n) => (
        <SequenceStep key={n} value={n} selected={v === n} onClick={() => setV(n)} />
      ))}
      <SequenceStep value="4" disabled />
    </Row>
  )
}

function SignaturePadDemo() {
  const [signed, setSigned] = useState(false)
  return (
    <SignaturePad
      signed={signed}
      title="Sign to confirm inspection"
      signerName="Maria Lopez"
      placeholder="Sign here"
      onCancel={noop}
      onClear={() => setSigned(false)}
      onDone={noop}
    >
      <button type="button" aria-label="Simulate signing" className="absolute inset-0" onClick={() => setSigned(true)} />
    </SignaturePad>
  )
}

function SketchPadDemo() {
  const [state, setState] = useState<"blank" | "drawing" | "discard">("blank")
  return (
    <>
      <Row>
        {(["blank", "drawing", "discard"] as const).map((s) => (
          <BadgeButton key={s} selected={state === s} onClick={() => setState(s)}>{s}</BadgeButton>
        ))}
      </Row>
      <div className="h-[640px] overflow-clip rounded-xl">
        <SketchPad
          state={state}
          title="Field sketch"
          hint="Draw the drainage ditch"
          toolbarProps={{ tool: "pen", onToolChange: noop }}
          onCancel={() => setState("discard")}
          onDone={() => setState("blank")}
          onKeepDrawing={() => setState("drawing")}
          onDiscard={() => setState("blank")}
        >
          {state !== "blank" && <img src={potato} alt="" className="size-full object-cover opacity-60" />}
        </SketchPad>
      </div>
    </>
  )
}

function SketchesDemo({ title, empty }: { title?: boolean; empty?: boolean }) {
  return (
    <Sketches showTitle={title} showSketches={!empty} title="Sketches" onAddBlank={noop} onAddMap={noop}>
      <SketchItem title="12 Oct, 8:40" author="Maria Lopez" preview={<img src={wheat} alt="" className="size-full object-cover" />} onRemove={noop} />
    </Sketches>
  )
}

function SliderDemo() {
  const [v, setV] = useState(40)
  return (
    <>
      <Slider title="Seeding rate" subtitle={`${v} kg/ha`} min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} />
      <Slider title="Locked" disabled min={0} max={100} value={20} onChange={noop} />
    </>
  )
}

function StrokeWidthDemo() {
  const [s, setS] = useState<"thin" | "medium" | "thick">("medium")
  return (
    <Row>
      {(["thin", "medium", "thick"] as const).map((z) => (
        <StrokeWidth key={z} size={z} selected={s === z} aria-label={z} onClick={() => setS(z)} />
      ))}
    </Row>
  )
}

function SwitchDemo() {
  const [c, setC] = useState<Record<string, boolean>>({ small: true, medium: false, large: true })
  return (
    <>
      {(["small", "medium", "large"] as const).map((s) => (
        <Switch
          key={s}
          size={s}
          checked={c[s]}
          onCheckedChange={(v) => setC({ ...c, [s]: v })}
          title={`Frost alerts (${s})`}
          description="Notify me below 2 C"
        />
      ))}
      <Switch disabled title="Disabled alert" />
    </>
  )
}

function TabsDemo() {
  const [v, setV] = useState("map")
  const [n, setN] = useState("a")
  return (
    <>
      <Tabs
        value={v}
        onValueChange={setV}
        items={[
          { value: "map", label: "Map", icon: "map-location-dot" },
          { value: "list", label: "List", icon: "list-ul" },
        ]}
      />
      <Tabs
        value={n}
        onValueChange={setN}
        items={[
          { value: "a", label: "Fields", icon: null },
          { value: "b", label: "Crops", icon: null },
          { value: "c", label: "Tasks", icon: null },
          { value: "d", label: "Notes", icon: null },
          { value: "e", label: "Files", icon: null },
        ]}
      />
    </>
  )
}

function TagsDemo() {
  const [tags, setTags] = useState(["Irrigated", "Organic", "Frost risk"])
  return <TagsList tags={tags} onTagClick={(t) => setTags(tags.filter((x) => x !== t))} onAdd={() => setTags([...tags, `Tag ${tags.length + 1}`])} />
}

function TextAreaDemo() {
  const [v, setV] = useState("")
  return <TextArea label="Inspection notes" placeholder="Leaf rust on the east edge" value={v} onChange={(e) => setV(e.target.value)} />
}

function ToolButtonDemo() {
  const [t, setT] = useState("pen")
  return (
    <Row>
      {(["pen", "highlighter", "eraser"] as const).map((n) => (
        <ToolButton key={n} label={n} icon={n} selected={t === n} onClick={() => setT(n)} />
      ))}
      <ToolButton label="Text" icon="font" disabled />
    </Row>
  )
}

function UploadPhotosDemo() {
  const [photos, setPhotos] = useState([
    { id: "1", src: wheat, alt: "Wheat" },
    { id: "2", src: potato, alt: "Potatoes", state: "uploading" as const, progress: 50 },
    { id: "3", src: wheat, alt: "Failed", state: "error" as const },
  ])
  const [sel, setSel] = useState("1")
  const [cap, setCap] = useState("Rust on the lower leaves")
  return (
    <UploadPhotos
      header="Photos"
      photos={photos}
      selectedId={sel}
      caption={cap}
      captionPlaceholder="Add a caption"
      showCaption
      showPreview
      onAdd={() => setPhotos([...photos, { id: String(photos.length + 1), src: potato, alt: "New" }])}
      onSelect={setSel}
      onRemove={(id) => setPhotos(photos.filter((p) => p.id !== id))}
      onRetry={noop}
      onCaptionChange={setCap}
    />
  )
}

const drawerUsers = [
  { id: "1", name: "Maria Lopez", role: "Agronomist" },
  { id: "2", name: "Tom Reid", role: "Field manager" },
  { id: "3", name: "Aisha Khan", role: "Scout" },
]

function UserSelectorDemo({ selection }: { selection: "multiple" | "single" }) {
  const [ids, setIds] = useState<string[]>(selection === "multiple" ? ["1"] : [])
  const [q, setQ] = useState("")
  return (
    <Opener label={`User selector (${selection})`}>
      {(open, close) => (
        <UserSelectorDrawer
          open={open}
          onClose={close}
          users={drawerUsers.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()))}
          selectedIds={ids}
          onChange={setIds}
          selection={selection}
          title="Assign inspector"
          showBack
          onBack={close}
          query={q}
          onQueryChange={setQ}
          onConfirm={close}
          groupLabel="Farm team"
        />
      )}
    </Opener>
  )
}

function UserRowDemo() {
  const [m, setM] = useState(true)
  const [s, setS] = useState(false)
  return (
    <>
      <UserRow mode="multiple" name="Maria Lopez" role="Agronomist" selected={m} onSelect={() => setM(!m)} />
      <UserRow mode="multiple" name="Tom Reid" />
      <UserRow mode="single" name="Aisha Khan" role="Scout" selected={s} onSelect={() => setS(!s)} />
    </>
  )
}

function ThemeToggle() {
  return (
    <Button variant="secondary" onClick={() => document.documentElement.classList.toggle("dark")}>
      Toggle dark mode
    </Button>
  )
}

const allIcons = Object.keys(icons) as IconName[]

export function Gallery() {
  return (
    <main className="flex min-h-screen flex-wrap items-start justify-center gap-8 bg-bg-muted p-4">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-title text-text-default">Component gallery</h1>
        <ThemeToggle />
      </div>

      <Section id="add-photo-tile" title="Add Photo Tile (1198:1086)">
        <AddPhotoTile onPress={noop} />
      </Section>

      <Section id="ai-fab" title="AI FAB (853:818)">
        <Row><AiFab label="Ask the farm assistant" /><AiFab label="Disabled assistant" disabled /></Row>
      </Section>

      <Section id="alert-bottom-drawer" title="Alert bottom drawer (983:687)">
        <Opener label="Open alert drawer">
          {(open, close) => (
            <AlertBottomDrawer
              open={open}
              onClose={close}
              title="Delete inspection?"
              description="The North Paddock inspection and its photos will be removed."
              confirmLabel="Delete"
              cancelLabel="Keep"
              onConfirm={close}
              onCancel={close}
            />
          )}
        </Opener>
      </Section>

      <Section id="alt-tab" title="Alt Tab Active (909:883)">
        <Row><AltTab selected>Fields</AltTab><AltTab>Crops</AltTab><AltTab disabled>Tasks</AltTab></Row>
      </Section>

      <Section id="alt-tabs" title="Alt Tabs (909:905)">
        <AltTabsDemo />
        <AltTabs value="a" items={[{ value: "a", label: "Fields" }, { value: "b", label: "Crops" }]} />
        <AltTabs
          value="a"
          items={[{ value: "a", label: "Fields" }, { value: "b", label: "Crops" }, { value: "c", label: "Tasks" }, { value: "d", label: "Notes" }]}
        />
      </Section>

      <Section id="audio-clip" title="Audio Clip (1191:1031)">
        <Cap>Default</Cap>
        <AudioClip title="Rust on east edge" duration="0:18" onPlay={noop} onRemove={noop} />
        <Cap>Playing</Cap>
        <AudioClip playing title="Rust on east edge" duration="0:18" position="0:07" progress={40} onPause={noop} onRemove={noop} />
      </Section>

      <Section id="audio-notes" title="Audio Notes (1191:1032)">
        <Cap>Title, recorder and clips</Cap>
        <AudioNotes
          showTitle
          title="Voice notes"
          recorder={{ state: "idle", elapsed: "0:00" }}
          clips={[
            { id: "1", title: "Irrigation leak", duration: "0:24", onPlay: noop, onRemove: noop },
            { id: "2", title: "Gate left open", duration: "0:09", playing: true, position: "0:03", progress: 30, onPause: noop, onRemove: noop },
          ]}
        />
        <Cap>Recorder only, no title</Cap>
        <AudioNotes showTitle={false} recorder={{ state: "recording", elapsed: "0:12" }} />
      </Section>

      <Section id="audio-recorder" title="Audio Recorder (1190:1384)">
        {(["idle", "recording", "paused", "review"] as const).map((s) => (
          <div key={s} className="flex flex-col gap-1">
            <Cap>{s}</Cap>
            <AudioRecorder
              state={s}
              elapsed={s === "idle" ? "0:00" : "0:18"}
              duration="0:42"
              progress={45}
              onStart={noop}
              onPause={noop}
              onResume={noop}
              onPlay={noop}
              onDiscard={noop}
              onSave={noop}
            />
          </div>
        ))}
      </Section>

      <Section id="avatar" title="Avatar (1252:1791)">
        <Row><Avatar size="small" initials="ML" /><Avatar size="medium" initials="TR" /></Row>
      </Section>

      <Section id="badge-button" title="Badge button (929:669)">
        <BadgeButtonDemo />
      </Section>

      <Section id="badge" title="Badge (117:567)">
        <Row>
          {(["neutral", "positive", "caution", "negative"] as const).map((t) => (
            <Badge key={t} tone={t}>{t === "neutral" ? "Draft" : t === "positive" ? "Healthy" : t === "caution" ? "Watch" : "Blight"}</Badge>
          ))}
        </Row>
        <Row>
          {(["neutral", "positive", "caution", "negative"] as const).map((t) => (
            <Badge key={t} badgeStyle="tag" tone={t}>{t === "neutral" ? "Wheat" : t === "positive" ? "Organic" : t === "caution" ? "Dry" : "Frost"}</Badge>
          ))}
        </Row>
      </Section>

      <Section id="barcode-scanner" title="Barcode Scanner (1206:1231)">
        <BarcodeScannerDemo />
      </Section>

      <Section id="bottom-drawer" title="Small / Medium / Large Bottom Drawer (983:762, 983:905, 983:1000)">
        <Row>
          {(["small", "medium", "large"] as const).map((s) => (
            <Opener key={s} label={`Open ${s}`}>
              {(open, close) => (
                <BottomDrawer open={open} onClose={close} size={s}>
                  <div className="flex flex-col gap-3 p-6">
                    <p className="text-title text-text-default">Hillside harvest plan</p>
                    <p className="text-body text-text-muted">Harvest the lower blocks first. Dry weather expected through Friday.</p>
                    <Button onClick={close}>Close</Button>
                  </div>
                </BottomDrawer>
              )}
            </Opener>
          ))}
        </Row>
      </Section>

      <Section id="button" title="Button (4:20)">
        {(["primary", "secondary", "tertiary", "text"] as const).map((v) => (
          <Row key={v}>
            <Button variant={v}>Start inspection</Button>
            <Button variant={v} disabled>Disabled</Button>
            <Button variant={v}><Icon name="plus" />Add field</Button>
          </Row>
        ))}
      </Section>

      <Section id="checkbox" title="CT Checkbox (64:1178)">
        <CheckboxDemo />
      </Section>

      <Section id="color-swatch" title="Color Swatch (1229:1449)">
        <ColorSwatchDemo />
      </Section>

      <Section id="display-icon" title="Display Icon (289:298)">
        <Row><DisplayIcon size="large" /><DisplayIcon size="medium" /><DisplayIcon size="small" /></Row>
      </Section>

      <Section id="drawing-toolbar" title="Drawing Toolbar (1229:1591)">
        <Cap>Canvas</Cap>
        <DrawingToolbarDemo context="canvas" />
        <Cap>Map</Cap>
        <DrawingToolbarDemo context="map" />
      </Section>

      <Section id="file-item" title="File Item (1195:1031)">
        <FileItem state="uploading" name="soil-report.docx" progress={45} onRemove={noop} />
        <FileItem state="uploaded" name="irrigation-plan.pdf" meta="PDF · 1.2 MB" fileIcon="file-pdf" onRemove={noop} />
        <FileItem state="error" name="yield-2025.xlsx" errorText="Upload failed" onRetry={noop} onRemove={noop} />
      </Section>

      <Section id="file-upload" title="File Upload (1182:1066)">
        <FileUploadDemo />
        <Cap>Empty, no title</Cap>
        <FileUpload showTitle={false} description="PDF or DOCX up to 10 MB" onPick={noop} />
      </Section>

      <Section id="header-with-title" title="Header with Title (1023:1085)">
        <HeaderWithTitle title="North Paddock" onBack={noop} onTitleClick={noop}>
          <IconButton label="Share" icon="arrow-up-from-bracket" />
        </HeaderWithTitle>
        <HeaderWithTitle title="Inspections" onBack={noop} />
      </Section>

      <Section id="header" title="Header (881:1594)">
        <HeaderDemo />
      </Section>

      <Section id="icon-button" title="Icon Button (1017:859)">
        <Row>
          <IconButton label="Add field" icon="plus" />
          <IconButton label="Add field" icon="plus" disabled />
          <IconButton label="Add field" icon="plus" variant="alt" />
        </Row>
      </Section>

      <Section id="icon" title="Icon (all glyph names)">
        <div className="flex flex-wrap gap-3 text-icon-default">
          {allIcons.map((n) => (
            <span key={n} title={n}><Icon name={n} size={20} /></span>
          ))}
        </div>
      </Section>

      <Section id="input-field" title="Input field (114:612)">
        <InputFieldDemo />
      </Section>

      <Section id="interactive-input" title="Interactive Input (299:483)">
        <Cap>Empty, clear</Cap>
        <InteractiveInputDemo action="clear" initial="" />
        <Cap>Filled, clear</Cap>
        <InteractiveInputDemo action="clear" initial="Lot 24-WH-118" />
        <Cap>Empty, scan</Cap>
        <InteractiveInputDemo action="scan" initial="" />
        <Cap>Filled, scan</Cap>
        <InteractiveInputDemo action="scan" initial="Lot 24-PO-007" />
      </Section>

      <Section id="ipad-list-item" wide title="iPad List item container (531:455)">
        <IPadListItem items={poItems} />
      </Section>

      <Section id="item-layout-card" title="Item Layout Card (988:943)">
        <ItemLayoutCard
          itemType="inspection"
          title="Pre-harvest inspection"
          locationName="North Paddock"
          propertyName="Sunrise Farm"
          status="Published"
          statusTone="positive"
          statusBadge={<Badge tone="caution">Overdue</Badge>}
          owner="Maria Lopez"
          date="12 Oct"
        >
          <p className="text-body text-text-muted">Canopy cover 7/10, mild leaf rust on the east edge.</p>
        </ItemLayoutCard>
        <ItemLayoutCard itemType="work" title="Spray fungicide" locationName="Hillside 3" status="Draft" owner="Tom Reid" date="14 Oct" />
      </Section>

      <Section id="item-layout-row" title="Item Layout Row (1147:818)">
        <ItemLayoutRow title="Soil sample, North Paddock" description="Taken 12 Oct at 8:40" />
        <ItemLayoutRow
          variant="photo"
          title="Potato blight check"
          description="Hillside 3"
          photo={<img src={potato} alt="" className="size-full object-cover" />}
        />
      </Section>

      <Section id="item-selector-drawer" title="Item selector drawer (518:278)">
        <Row>
          <ItemSelectorDemo back={false} />
          <ItemSelectorDemo back />
        </Row>
      </Section>

      <Section id="item-type-badge" title="Item Type Badge (988:844)">
        <Row>
          {(["inspection", "form", "sensor", "po", "work"] as const).map((t) => (
            <ItemTypeBadge key={t} itemType={t} />
          ))}
        </Row>
      </Section>

      <Section id="linear-progress-bar" title="Linear Progress Bar (114:584)">
        {[0, 35, 70, 100].map((v) => (
          <LinearProgressBar key={v} value={v} />
        ))}
      </Section>

      <Section id="list-item" title="List Item Variant (261:294)">
        <ListItem title="North Paddock" subtitle="Winter wheat · 42 ha" icon="tractor" showChevron onClick={noop} />
        <ListItem title="Hillside 3" subtitle="Potatoes" onClick={noop} />
        <ListItem title="Soil moisture" trailing={<Badge tone="positive">Optimal</Badge>} />
      </Section>

      <Section id="list-section-header-large" title="List Section Header - Large (1086:3064)">
        <ListSectionLargeDemo />
      </Section>

      <Section id="list-section-header" title="List Section Header (26:294)">
        <ListSectionDemo />
      </Section>

      <Section id="location-picker" title="Location Picker (1234:1814)">
        <LocationPickerDemo />
      </Section>

      <Section id="location-field" title="Location Field (1234:1905)">
        <LocationFieldDemo />
      </Section>

      <Section id="location-pin-badge" title="Location Pin Badge (12:167)">
        <LocationPinBadge />
      </Section>

      <Section id="map-layers" title="Map Layers (897:514)">
        <MapLayersDemo />
      </Section>

      <Section id="map-pin" title="Map Pin (1219:1176)">
        <Row><MapPin name="Wet spot" /><MapPin showLabel={false} /></Row>
      </Section>

      <Section id="map-sketch" title="Map Sketch (1219:1376)">
        <MapSketchDemo />
      </Section>

      <Section id="menu-item" title="Menu Item (1086:3232)">
        <MenuItem icon="house" active>Dashboard</MenuItem>
        <MenuItem icon="tractor">Fields</MenuItem>
        <MenuItem icon="clipboard-list-check">Inspections</MenuItem>
      </Section>

      <Section id="mobile-screen" title="iPhone 16 & 17 Pro (881:1638)">
        <MobileScreenDemo />
      </Section>

      <Section id="my-properties-minimized" title="My Properties - Minimized (881:1660)">
        <MyPropertiesMinimized placeholder="Search my properties" onOpen={noop} onMic={noop} onFilter={noop} />
      </Section>

      <Section id="navigation-button" title="Navigation button (855:994)">
        {(["green", "red", "silt"] as const).map((v) => (
          <NavigationButton key={v} variant={v} icon="clipboard-list-check" title="Inspections" description="3 due this week" />
        ))}
        <NavigationButton disabled title="Sensors" description="Offline" />
      </Section>

      <Section id="number-input" title="Numberic Input (1180:1020)">
        <NumberInputDemo />
      </Section>

      <Section id="photo-thumbnail" title="Photo Thumbnail (1198:1085)">
        <PhotoThumbnailDemo />
      </Section>

      <Section id="presentation-card" title="Presentation Card (983:1021)">
        <PresentationCard image={wheat} label="Wheat" title="North Paddock harvest" actionLabel="View field" actionIcon="chevron-right" onAction={noop} />
        <PresentationCard image={potato} label="Potatoes" title="Hillside blight watch" actionLabel="Open report" onAction={noop} />
      </Section>

      <Section id="property-list-row" title="Property List Row (25:342)">
        <PropertyRowDemo />
      </Section>

      <Section id="radio" title="CT Radio Buttons (64:1285)">
        <RadioDemo />
      </Section>

      <Section id="rectangle-navigation-button" title="Rectangle Navigation Button (855:1087)">
        {(["green", "red", "silt"] as const).map((v) => (
          <RectangleNavigationButton key={v} variant={v} icon="tractor" title="Work orders" meta="N" />
        ))}
        <RectangleNavigationButton disabled title="Sensors" />
      </Section>

      <Section id="rectangle-panel" title="Rectangle Panel (284:357)">
        <RectanglePanel><p className="text-body text-text-default">Soil moisture 28%, irrigation not needed.</p></RectanglePanel>
      </Section>

      <Section id="search-field" title="Search Field (232:273)">
        <SearchFieldDemo />
      </Section>

      <Section id="select-field" title="Select Field (24:298)">
        <SelectFieldDemo />
      </Section>

      <Section id="sequence-buttons" title="Sequence Buttons (293:332)">
        <SequenceButtonsDemo />
      </Section>

      <Section id="sequence-step" title="Sequence Step (1232:1691)">
        <SequenceStepDemo />
      </Section>

      <Section id="signature-field" title="Signature Field (1224:1405)">
        <SignatureField state="empty" label="Inspector signature" caption="Tap to sign" onPress={noop} />
        <SignatureField state="signed" label="Inspector signature" caption="Signed by Maria Lopez" signatureSrc={wheat} onPress={noop} onClear={noop} />
        <SignatureField state="error" label="Inspector signature" caption="Signature required" onPress={noop} />
      </Section>

      <Section id="signature-pad" title="Signature Pad (1224:1430)">
        <Cap>Click the pad to simulate a signature</Cap>
        <SignaturePadDemo />
      </Section>

      <Section id="sketch-item" title="Sketch Item (1227:1504)">
        {(["canvas", "map"] as const).map((v) => (
          <SketchItem
            key={v}
            variant={v}
            title="12 Oct, 8:40"
            author="Maria Lopez"
            preview={<img src={v === "map" ? potato : wheat} alt="" className="size-full object-cover" />}
            onRemove={noop}
          />
        ))}
        <SketchItem variant="canvas" state="uploading" title="12 Oct, 9:05" progress={55} preview={<img src={wheat} alt="" className="size-full object-cover" />} onRemove={noop} />
      </Section>

      <Section id="sketch-pad" title="Sketch Pad (1227:1461)">
        <SketchPadDemo />
      </Section>

      <Section id="sketches" title="Sketches (1227:1505)">
        <Cap>Title and sketches</Cap>
        <SketchesDemo title />
        <Cap>No title, empty</Cap>
        <SketchesDemo empty />
      </Section>

      <Section id="slider" title="Slider (89:404)">
        <SliderDemo />
      </Section>

      <Section id="slim-button" title="Slim Button (302:293)">
        {(["primary", "secondary", "secondary2"] as const).map((v) => (
          <Row key={v}>
            <SlimButton variant={v}>Start walk</SlimButton>
            <SlimButton variant={v} icon={null}>No icon</SlimButton>
            <SlimButton variant={v} disabled>Disabled</SlimButton>
          </Row>
        ))}
      </Section>

      <Section id="slim-navigation-button" title="Slim Navigation Button (855:1054)">
        {(["green", "red", "silt"] as const).map((v) => (
          <SlimNavigationButton key={v} variant={v} icon="tractor" title="Work orders" description="5 open" />
        ))}
        <SlimNavigationButton disabled title="Sensors" />
      </Section>

      <Section id="square-rectangle-button" title="Square Rectangle Button (270:280)">
        <Row>
          {(["small", "medium", "large"] as const).map((s) => (
            <SquareRectangleButton key={s} size={s} label="Add field" icon="plus" />
          ))}
          <SquareRectangleButton label="Disabled" icon="plus" disabled />
        </Row>
      </Section>

      <Section id="step-indicator" title="CT Step Indicator (89:53)">
        <Row>
          <StepIndicator state="upcoming" stepNumber="3" />
          <StepIndicator state="active" stepNumber="2" />
          <StepIndicator state="completed" stepNumber="1" />
        </Row>
      </Section>

      <Section id="step-item" title="CT Step Item (89:63)">
        <StepItem state="completed" label="Pick field" stepNumber="1" showConnector />
        <StepItem state="active" label="Walk the rows" stepNumber="2" showConnector />
        <StepItem state="upcoming" label="Sign off" stepNumber="3" showConnector={false} />
      </Section>

      <Section id="stepper" title="CT Stepper (89:88)">
        <Stepper steps={["Field", "Scout", "Sign"]} currentStep={2} />
        <Stepper steps={["Field", "Crop", "Scout", "Photos", "Notes", "Sign"]} currentStep={4} />
      </Section>

      <Section id="stroke-width" title="Stroke Width (1229:1462)">
        <StrokeWidthDemo />
      </Section>

      <Section id="switch" title="Switch (64:1091)">
        <SwitchDemo />
      </Section>

      <Section id="tab" title="FACT Tab (903:572)">
        <Row><Tab selected tabName="Map" icon="map-location-dot" /><Tab tabName="List" icon="list-ul" /><Tab tabName="Files" icon={null} /></Row>
      </Section>

      <Section id="tabs" title="Tabs (875:1192)">
        <TabsDemo />
      </Section>

      <Section id="tags-list" title="Tags list (1182:1086)">
        <TagsDemo />
        <TagsList tags={["Irrigated"]} />
      </Section>

      <Section id="text-area" title="Text area (292:317)">
        <TextAreaDemo />
        <TextArea placeholder="No label" />
        <TextArea label="Locked" disabled defaultValue="Closed inspection" />
      </Section>

      <Section id="tool-button" title="Tool Button (1229:1444)">
        <ToolButtonDemo />
      </Section>

      <Section id="undo-toast" title="Undo Toast (1192:971)">
        <UndoToast message="Field note deleted" actionLabel="Undo" onAction={noop} />
      </Section>

      <Section id="upload-photos" title="Upload Photos (1150:881)">
        <UploadPhotosDemo />
      </Section>

      <Section id="user-chip" title="User Chip (1252:1809)">
        <Row><UserChip name="Maria Lopez" initials="ML" onRemove={noop} /><UserChip name="Tom Reid" onRemove={noop} /></Row>
      </Section>

      <Section id="user-row" title="User Row (1252:1808)">
        <UserRowDemo />
      </Section>

      <Section id="user-selector-drawer" title="User selector drawer (1253:1959)">
        <Row>
          <UserSelectorDemo selection="multiple" />
          <UserSelectorDemo selection="single" />
        </Row>
      </Section>

      <Section id="utility-button" title="Utility Button (69:473)">
        <Row>
          <UtilityButton icon="plus">Add note</UtilityButton>
          <UtilityButton icon="plus" disabled>Disabled</UtilityButton>
        </Row>
      </Section>
    </main>
  )
}
