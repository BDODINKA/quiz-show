import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});
export type RegisterUserType = {
  email: string;
  password: string;
};
export type ResponseType = {
  addedUser: RegisterUserType;
  error?: string;
};

export const registerAPI = {
  register(data: RegisterUserType) {
    return instance.post<RegisterUserType, AxiosResponse<ResponseType>>(
      "/auth/register",
      data
    );
  },
};
