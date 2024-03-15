import type { FC, JSX } from "react"
import { useCurrentQuery } from "../../../../app"
import { Spinner } from "@nextui-org/react"

type AuthGuardProps = {
  children: JSX.Element
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }

  return children
}
