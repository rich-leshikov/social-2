import type { JSX, ReactNode, FC } from "react"
import { Button as NextButton } from "@nextui-org/react"

type ButtonProps = {
  children: ReactNode
  className?: string
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
  fullWidth?: boolean
  href?: string
  icon?: JSX.Element
  isLoading: boolean
  type?: "button" | "submit" | "reset"
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  color,
  fullWidth,
  href,
  icon,
  isLoading,
  type,
  variant = "solid",
}) => {
  return (
    <NextButton
      className={className}
      color={color}
      fullWidth={fullWidth}
      href={href}
      size={"lg"}
      startContent={icon}
      type={type}
      variant={variant}
      isLoading={isLoading}
    >
      {children}
    </NextButton>
  )
}
