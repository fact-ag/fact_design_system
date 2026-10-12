import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

export default function App() {
  return (
    <main className="flex flex-col items-start gap-4 p-8">
      {(["primary", "secondary", "tertiary", "text"] as const).map((v) => (
        <div key={v} className="flex gap-4">
          <Button variant={v}>Button</Button>
          <Button variant={v} disabled>Button</Button>
          <Button variant={v}><Icon name="house" />With icon</Button>
        </div>
      ))}
    </main>
  )
}
