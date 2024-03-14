import type { FC } from "react"

type ErrorMessageProps = {
  error: string
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error = "" }) => {
  return error && <p className={"text-red-500 mt-2 mb-5 text-small"}>{error}</p>
}
