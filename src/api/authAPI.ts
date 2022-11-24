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
  login(data: LoginFieldsType) {
    return axiosInstance.post<ProfileType>('auth/login', data)
  },
}
