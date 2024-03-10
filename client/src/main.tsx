import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"

const container = document.getElementById("root")

if (container) {
  createRoot(container).render(
    <NextUIProvider>
      <App />
    </NextUIProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
