import { AxiosResponse } from 'axios'

import { axiosInstance } from './apiConfig/axiosConfig'

export type LoginFieldsType = {
  email: string
  password: string
  rememberMe: boolean
}
export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar?: string
}
export const authAPI = {
  async login(data: LoginFieldsType) {
    await new Promise(resolve => setTimeout(resolve, 500))

    return axiosInstance.post<LoginFieldsType, AxiosResponse<ProfileType>>('auth/login', data)
  },
}
