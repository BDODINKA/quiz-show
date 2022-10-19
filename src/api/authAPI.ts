import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL:
    // process.env.REACT_APP_BACK_URL ||
    // 'http://localhost:7542/2.0/' ||
    'https://neko-back.herokuapp.com/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

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

    return instance.post<LoginFieldsType, AxiosResponse<ProfileType>>('auth/login', data)
  },
}
