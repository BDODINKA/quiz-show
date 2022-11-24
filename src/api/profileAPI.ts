import { axiosInstance } from './apiConfig/axiosConfig'
import { ProfileType } from './authAPI'

export type ChangeProfileType = {
  name: string
  avatar: string // url or base64
}

export type LogOutType = {
  info: string
  error?: string
}

export type UpdateProfileType = {
  updatedUser: ProfileType
  error?: string
}

export const profileAPI = {
  authMe() {
    return axiosInstance.post<ProfileType>('auth/me', {})
  },
  logOut() {
    return axiosInstance.delete<LogOutType>('auth/me', {})
  },
  updateProfile(data: ChangeProfileType) {
    return axiosInstance.put<UpdateProfileType>('auth/me', data)
  },
}
