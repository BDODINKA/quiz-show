import { AxiosError } from 'axios'

import { authAPI, LoginFieldsType } from '../../api/authAPI'
import { AppThunk } from '../../app/store'
import { setProfileAC } from '../profile/profile.reducer'

const AUTH_LOGIN = 'AUTH/LOGIN'
const SET_ERROR = 'AUTH/SET_ERROR'

const initState = {
  isLoggedIn: false,
  error: null as string | null,
}

export type LoginActionType = ReturnType<typeof loginAC> | ReturnType<typeof setErrorAC>

type InitialStateType = typeof initState

export const loginAC = (isLoggedIn: boolean) => ({ type: AUTH_LOGIN, isLoggedIn } as const)
export const setErrorAC = (error: string | null) => ({ type: SET_ERROR, error } as const)

export const loginReducer = (
  state: InitialStateType = initState,
  action: LoginActionType
): InitialStateType => {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, isLoggedIn: action.isLoggedIn }
    case SET_ERROR:
      return { ...state, error: action.error }

    default:
      return state
  }
}

export const loginTC =
  (data: LoginFieldsType): AppThunk =>
  dispatch => {
    authAPI
      .login(data)
      .then(res => {
        console.log(res.status)
        dispatch(loginAC(true))
        dispatch(setProfileAC(res.data))
      })
      .catch((err: AxiosError) => {
        const error = err.response ? (err.response.data as { error: string }).error : err.message

        dispatch(setErrorAC(error))
      })
  }
