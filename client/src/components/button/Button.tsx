import type { FC, JSX } from "react"
import type { ButtonProps as NextButtonProps } from "@nextui-org/react"
import { Button as NextButton } from "@nextui-org/react"

type ButtonProps = {
  icon?: JSX.Element
} & NextButtonProps

export const Button: FC<ButtonProps> = ({
  children,
  color = "default",
  variant = "solid",
  size = "lg",
  icon,
  ...restProps
}) => {
  return (
    <NextButton
      color={color}
      variant={variant}
      size={size}
      startContent={icon}
      {...restProps}
    >
      {children}
    </NextButton>
  )
}
