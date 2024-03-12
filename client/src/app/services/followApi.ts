import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, string>({
      query: followingId => ({
        url: "/follow",
        method: "POST",
        body: { followingId },
      }),
    }),
    unfollowUser: builder.mutation<void, string>({
      query: id => ({
        url: `/follow/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi
export const {
  endpoints: { followUser, unfollowUser },
} = followApi
