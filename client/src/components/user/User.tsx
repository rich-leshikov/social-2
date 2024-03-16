import type { FC } from "react"
import { User as NextUser } from "@nextui-org/react"
import { BASE_URL } from "../../common"

type UserProps = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

export const User: FC<UserProps> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  return (
    <NextUser
      className={className}
      name={name}
      description={description}
      avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
    />
  )
}
