import { useGetAllPostsQuery } from "../../app"
import { CreatePost } from "../../components"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  )
}
