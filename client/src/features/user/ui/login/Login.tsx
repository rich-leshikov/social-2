import type { FC } from "react"
import { useForm } from "react-hook-form"
import { Button, ErrorMessage, Input } from "../../../../components"
import { Link } from "@nextui-org/react"
import { useLazyCurrentQuery, useLoginMutation } from "../../../../app"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { hasErrorField } from "../../../../common"

type Login = {
  email: string
  password: string
}

type LoginProps = {
  setSelected: (value: string) => void
}

export const Login: FC<LoginProps> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery()
      navigate("/")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  const onSetSelected = () => setSelected("sign-up")

  return (
    <form
      className={"flex flex-col gap-4"}
      action=""
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name={"email"}
        label={"Email"}
        type={"email"}
        control={control}
        required={"Required field"}
      />
      <Input
        name={"password"}
        label={"Password"}
        type={"password"}
        control={control}
        required={"Required field"}
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Have no account?{" "}
        <Link size={"sm"} className={"cursor-pointer"} onPress={onSetSelected}>
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color={"primary"}
          type={"submit"}
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </div>
    </form>
  )
}
