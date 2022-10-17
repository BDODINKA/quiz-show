import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export type forgotType = {
  email: string
  from: string
  message: string
}
export type forgotNewPassword = {
  password: string
  resetPasswordToken: string | undefined
}

export const forgotApi = {
  sendFormToEmail(data: forgotType) {
    return instance.post<forgotType, AxiosResponse>('auth/forgot', data)
  },
  sendNewPassword(data: forgotNewPassword) {
    return instance.post<forgotNewPassword>('auth/set-new-password', data)
  },
}
