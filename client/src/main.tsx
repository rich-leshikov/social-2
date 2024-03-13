import { createRoot } from "react-dom/client"
import { App } from "./app"
import "./index.css"

const container = document.getElementById("root")

if (container) {
  createRoot(container).render(<App />)
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
