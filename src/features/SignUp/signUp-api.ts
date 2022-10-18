import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});
export type SignUpUserType = {
  email: string;
  password: string;
};
export type ResponseType = {
  addedUser: SignUpUserType;
  error?: string;
};

export const signUpAPI = {
  signUp(data: SignUpUserType) {
    return instance.post<SignUpUserType, AxiosResponse<ResponseType>>(
      "/auth/register",
      data
    );
  },

/*  registr: async (payload: SignUpUserType) => {
    try {
      const result = await instance.post("/auth/register", payload)
      console.log('result', result)
      return result
    } catch (e) {
      console.log(e)
    }
  }*/
};


