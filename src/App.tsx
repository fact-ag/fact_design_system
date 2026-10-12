import { Compare } from "@/dev/compare"
import { Gallery } from "@/dev/gallery"

export default function App() {
  return new URLSearchParams(location.search).has("compare") ? <Compare /> : <Gallery />
}
