import { api } from "./api"
import type { Like } from "../types"

export const likeApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, string>({
      query: postId => ({
        url: "/likes",
        method: "POST",
        body: { postId },
      }),
    }),
    unlikePost: builder.mutation<Like, string>({
      query: postId => ({
        url: `/likes/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnlikePostMutation } = likeApi
export const {
  endpoints: { likePost, unlikePost },
} = likeApi
