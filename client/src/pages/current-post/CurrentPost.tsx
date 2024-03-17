import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app"
import { Card, CreateComment, GoBack } from "../../components"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Post not found</h2>
  }

  const {
    id,
    content,
    author,
    authorId,
    likes,
    comments,
    likedByUser,
    createdAt,
  } = data

  return (
    <>
      <GoBack />
      <Card
        cardFor={"current-post"}
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments.length > 0
          ? data.comments.map(comment => (
              <Card
                key={comment.id}
                commentId={comment.id}
                id={id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                cardFor={"comment"}
                content={comment.content}
              />
            ))
          : null}
      </div>
    </>
  )
}
