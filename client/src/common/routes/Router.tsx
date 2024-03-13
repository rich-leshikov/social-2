import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  Auth,
  CurrentPost,
  Followers,
  Following,
  Posts,
  UserProfile,
} from "../../pages"
import { Layout } from "../../components"

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "following",
        element: <Following />,
      },
    ],
  },
])

export const Router = () => <RouterProvider router={router} />
