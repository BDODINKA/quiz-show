import { axiosInstance } from './apiConfig/axiosConfig'

export type ForgotType = {
  email: string
  from: string
  message: string
}

export type ForgotNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}

export const forgotApi = {
  sendFormToEmail(data: ForgotType) {
    return axiosInstance.post<ForgotType>('auth/forgot', data)
  },

  sendNewPassword(data: ForgotNewPasswordType) {
    return axiosInstance.post<ForgotNewPasswordType>('auth/set-new-password', data)
  },
}
