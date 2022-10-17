
import {ActionsType, AppThunk} from "../../app/store";
import {authAPI, LoginFieldsType} from "../../api/authAPI";
import {AxiosError} from "axios";


const AUTH_LOGIN = 'AUTH/LOGIN'
const SET_ERROR = 'AUTH/SET_ERROR'


const initState = {
	 isLoggedIn: false,
	 error: null as string | null,
}

export type LoginActionType =
	|ReturnType<typeof loginAC>
	|ReturnType<typeof setErrorAC>

type InitialStateType = typeof initState

export const loginAC = (isLoggedIn: boolean) => ({type: AUTH_LOGIN, isLoggedIn} as const)
export const setErrorAC = (error:string|null)=>({type:SET_ERROR, error} as const)

export const loginReducer = (state: InitialStateType = initState, action: ActionsType): InitialStateType => {
	 switch (action.type) {
			case AUTH_LOGIN:
				 return {...state, isLoggedIn: action.isLoggedIn}
			case "AUTH/SET_ERROR":
				 return {...state, error: action.error}
			default:
				 return state
	 }
}

export const loginTC = (data: LoginFieldsType): AppThunk =>  dispatch => {
	 authAPI.login(data)
		 .then(res=>{
				dispatch(loginTC(res.data))
		 })
		 .catch((e:AxiosError)=>{
				dispatch(setErrorAC(e.message))
				console.log(e.message)
		 })
}