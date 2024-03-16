import type { CardProps as NextCardProps } from "@nextui-org/react"
import {
  Card as NextCard,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@nextui-org/react"
import type { FC } from "react"
import { useState } from "react"
import {
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../app"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features"
import { User } from "../user"
import { formatToClientDate, hasErrorField } from "../../common"
import { RiDeleteBinLine } from "react-icons/ri"
import { Typography } from "../typography"
import { MetaInfo } from "../meta-info"
import { FcDislike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegComment } from "react-icons/fa"

type CardProps = {
  avatarUrl: string
  name: string
  authorId: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  likedByUser?: boolean
  createdAt?: Date
  cardFor: "comment" | "post" | "current-post"
} & NextCardProps

export const Card: FC<CardProps> = ({
  avatarUrl = "",
  name = "",
  content = "",
  authorId = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  likedByUser = false,
  createdAt,
  id = "",
  cardFor = "post",
}) => {
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)

  const refetchPosts = async () => {
    switch (cardFor) {
      case "current-post":
        await triggerGetPostById(id).unwrap()
        break
      case "post":
        await triggerGetAllPosts().unwrap()
        break
      case "comment":
        await triggerGetPostById(id).unwrap()
        break
      default:
        throw new Error("Wrong argument cardFor")
    }
  }

  const onDelete = async () => {
    try {
      switch (cardFor) {
        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          break
        case "post":
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        default:
          throw new Error("Wrong argument cardFor")
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  const onLike = async () => {
    try {
      likedByUser ? await unlikePost(id).unwrap() : await likePost(id).unwrap()
      await refetchPosts()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  return (
    <NextCard className={"mb-5"}>
      <CardHeader className={"justify-between items-center bg-transparent"}>
        <Link to={`/users/${authorId}`}>
          <User
            className={"text-small font-semibold leading-none text-default-600"}
            name={name}
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className={"cursor-pointer"} onClick={onDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className={"px-3 py-2 mb-5"}>
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className={"gap-3"}>
          <div className="flex gap-5 items-center">
            <div onClick={onLike}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
        </CardFooter>
      )}
    </NextCard>
  )
}
