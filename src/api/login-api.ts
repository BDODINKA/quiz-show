import axios from "axios";

export const instance = axios.create({
	 baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
	 // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
	 withCredentials: true,
})

export type LoginFieldsType = {
	 email: string
	 password: string
	 rememberMe: boolean
}

export const loginAPI = {
	 login(data:LoginFieldsType){
			return instance.post<LoginFieldsType>('auth/login', data)
	 }
}

