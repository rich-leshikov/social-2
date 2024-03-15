import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { store } from "../store"
import { ThemeProvider } from "../../components"
import { Router } from "../../common"
import { AuthGuard } from "../../features"

export const App = () => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <AuthGuard>
            <Router />
          </AuthGuard>
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  )
}
