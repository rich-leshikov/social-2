import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../features"
import { useNavigate } from "react-router-dom"
import { Button } from "../button"
import { CiLogout } from "react-icons/ci"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Social Network</p>
      </NavbarBrand>
      <NavbarContent justify={"end"}>
        <NavbarItem
          className={"lg:flex text-3xl cursor-pointer"}
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button className={"gap-2"} variant={"flat"} onClick={onLogout}>
              <CiLogout /> <span>Logout</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
