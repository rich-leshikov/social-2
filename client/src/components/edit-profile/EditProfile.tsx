import type { User } from "../../app"
import type { ChangeEvent, FC } from "react"
import { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import { useUpdateUserMutation } from "../../app"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import { Input } from "../input"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../error-message"
import { Button } from "../button"
import { hasErrorField } from "../../common"

type EditProfileProps = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile: FC<EditProfileProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const onSubmit = async (data: User) => {
    try {
      if (id) {
        const formData = new FormData()
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email)
        data.name && formData.append("name", data.name)
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append("bio", data.bio)
        data.location && formData.append("location", data.location)
        selectedFile && formData.append("avatar", selectedFile)
        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className={"flex flex-col gap-1"}>
              Profile changing
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name={"email"}
                  label={"Email"}
                  type={"email"}
                  endContent={<MdOutlineEmail />}
                />
                <Input
                  control={control}
                  name={"name"}
                  label={"Name"}
                  type={"text"}
                />
                <input
                  type={"file"}
                  name={"avatarUrl"}
                  placeholder={"Select a picture"}
                  onChange={onFileChange}
                />
                <Input
                  control={control}
                  name={"dateOfBirth"}
                  label={"Date of birth"}
                  type={"date"}
                  placeholder={"Your date of birth"}
                />
                <Controller
                  name={"bio"}
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder={"Your biography"}
                    />
                  )}
                />
                <Input
                  control={control}
                  name={"location"}
                  label={"Location"}
                  type={"text"}
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color={"primary"}
                    type={"submit"}
                    isLoading={isLoading}
                  >
                    Update profile
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color={"danger"} variant={"light"}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
