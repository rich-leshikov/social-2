import { useCreateCommentMutation, useLazyGetPostByIdQuery } from "../../app"
import { Controller, useForm } from "react-hook-form"
import { Textarea } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { Button } from "../button"
import { IoMdCreate } from "react-icons/io"
import { useParams } from "react-router-dom"

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        setValue("comment", "")
        await triggerGetPostById(id).unwrap()
      }
    } catch (error) {
      console.log(error)
    }
  })

  const error = errors?.post?.message as string

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name={"comment"}
        control={control}
        defaultValue=""
        rules={{
          required: "Required field",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement={"outside"}
            placeholder="Write your comment"
            className={"mb-5"}
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color={"primary"}
        className={"flex-end"}
        type={"submit"}
        endContent={<IoMdCreate />}
      >
        Add comment
      </Button>
    </form>
  )
}
