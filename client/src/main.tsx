import { createRoot } from "react-dom/client"
import { App } from "./App"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { ThemeProvider } from "./components"

const container = document.getElementById("root")

if (container) {
  createRoot(container).render(
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NextUIProvider>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
