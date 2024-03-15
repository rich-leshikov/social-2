import type { RootState } from "../../../app"

export const selectIsAuthenticated = (state: RootState) =>
  state.userSlice.isAuthenticated
export const selectCurrent = (state: RootState) => state.userSlice.current
export const selectUser = (state: RootState) => state.userSlice.user
export const selectUsers = (state: RootState) => state.userSlice.users
