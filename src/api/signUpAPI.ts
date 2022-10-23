import { AxiosResponse } from 'axios'

import { axiosInstance } from './apiConfig/axiosConfig'

export type SignUpUserType = {
  email: string
  password: string
}

export type ResponseType = {
  addedUser: SignUpUserType
  error?: string
}

export const signUpAPI = {
  signUp(data: SignUpUserType) {
    return axiosInstance.post<SignUpUserType, AxiosResponse<ResponseType>>('/auth/register', data)
  },
}
