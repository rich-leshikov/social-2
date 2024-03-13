import type { FC, ReactNode } from "react"
import { createContext, useState } from "react"

export type Theme = "dark" | "light"
type ThemeContextProps = {
  theme: Theme
  toggleTheme: () => void
}
type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const storedTheme = localStorage.getItem("theme")
  const currentTheme = storedTheme ? (storedTheme as Theme) : "dark"

  const [theme, setTheme] = useState(currentTheme)

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)

      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
