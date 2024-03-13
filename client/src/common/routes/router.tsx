import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <h1>Auth</h1>,
  },
  {
    path: "/",
    element: <h1>Home</h1>,
  },
])
