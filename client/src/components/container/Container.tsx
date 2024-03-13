import type { FC, ReactElement } from "react"

type ContainerProps = {
  children: ReactElement[] | ReactElement
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={"flex max-w-screen-xl mx-auto mt-10"}>{children}</div>
}
