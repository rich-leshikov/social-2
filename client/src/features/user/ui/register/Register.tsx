import { Button, ErrorMessage, Input } from "../../../../components"
import { Link } from "@nextui-org/react"
import { useRegisterMutation } from "../../../../app"
import type { FC } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { hasErrorField } from "../../../../common"

type Register = {
  email: string
  name: string
  password: string
}

type RegisterProps = {
  setSelected: (value: string) => void
}

export const Register: FC<RegisterProps> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSetSelected = () => setSelected("sign-in")

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap()
      onSetSelected()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form
      className={"flex flex-col gap-4"}
      action=""
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name={"name"}
        label={"Name"}
        type={"text"}
        control={control}
        required={"Required field"}
      />
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
        Have an account?{" "}
        <Link size={"sm"} className={"cursor-pointer"} onPress={onSetSelected}>
          Sign in
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color={"primary"}
          type={"submit"}
          isLoading={isLoading}
        >
          Sign up
        </Button>
      </div>
    </form>
  )
}
