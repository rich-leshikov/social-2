import type { FC } from "react"
import { useForm } from "react-hook-form"
import { Button, Input } from "../../components"
import { Link } from "@nextui-org/react"

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

  const onSetSelected = () => setSelected("sign-up")

  return (
    <form className={"flex flex-col gap-4"} action="">
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
      <p className="text-center text-small">
        Have no account?{" "}
        <Link size={"sm"} className={"cursor-pointer"} onPress={onSetSelected}>
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color={"primary"} type={"submit"}>
          Sign in
        </Button>
      </div>
    </form>
  )
}
