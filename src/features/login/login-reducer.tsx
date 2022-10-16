import React from "react";
import {ActionsType, AppThunk} from "../../app/store";
import {loginAPI, LoginFieldsType} from "../../api/login-api";


const initState = {
	 isLoggedIn: false
}

export type LoginActionType =
	|ReturnType<typeof loginAC>

type InitialStateType = typeof initState

export const loginAC = (isLoggedIn: boolean) => ({type: 'AUTH/LOGIN', isLoggedIn} as const)

export const loginReducer = (state: InitialStateType = initState, action: ActionsType): InitialStateType => {
	 switch (action.type) {
			case "AUTH/LOGIN":
				 return {...state, isLoggedIn: action.isLoggedIn}
			default:
				 return state
	 }
}

export const loginTC = (data: LoginFieldsType): AppThunk => async dispatch => {
	 await loginAPI.login(data)
	 dispatch(loginAC(true))
}