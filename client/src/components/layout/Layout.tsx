import { Header } from "../header"
import { Container } from "../container"
import { Navbar } from "../navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsAuthenticated, selectUser } from "../../features"
import { useEffect } from "react"
import { Profile } from "../profile"

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex flex-col gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  )
}
