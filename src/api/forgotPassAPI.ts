import { AxiosResponse } from 'axios'

import { axiosInstance } from './apiConfig/axiosConfig'

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
    return axiosInstance.post<forgotType, AxiosResponse>('auth/forgot', data)
  },
  sendNewPassword(data: forgotNewPassword) {
    return axiosInstance.post<forgotNewPassword>('auth/set-new-password', data)
  },
}
