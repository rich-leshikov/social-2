import type { ReactNode, JSX, FC } from "react"
import { Button } from "../../button"
import { Link } from "react-router-dom"

type NavButtonProps = {
  children: ReactNode
  href: string
  icon?: JSX.Element
}

export const NavButton: FC<NavButtonProps> = ({ children, icon, href }) => {
  return (
    <Button className={"flex justify-start text-xl"} icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
