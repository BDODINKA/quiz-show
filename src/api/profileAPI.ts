import { AxiosResponse } from 'axios'

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

export type UpdateUserProfile = {
  updatedUser: ProfileType
  error?: string
}

export const profileAPI = {
  async authMe() {
    return axiosInstance.post<{}, AxiosResponse<ProfileType>>('auth/me', {})
  },
  async logOut() {
    return axiosInstance.delete<AxiosResponse<LogOutType>>('auth/me', {})
  },
  async updateProfile(data: ChangeProfileType) {
    return axiosInstance.put<ChangeProfileType, AxiosResponse<UpdateUserProfile>>('auth/me', data)
  },
}
