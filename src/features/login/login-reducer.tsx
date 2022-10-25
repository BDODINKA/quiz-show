import { AxiosError } from 'axios'

import { authAPI, LoginFieldsType } from '../../api/authAPI'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { SnackBarType } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { AppThunk } from '../../types/HooksTypes'
import { Nullable } from '../../types/Nullable'
import { ServerError } from '../../utils/ServerErrorHandler'
import { setProfileAC } from '../profile/profile.reducer'
const AUTH_LOGIN = 'AUTH/LOGIN'

const initState = {
  isLoggedIn: false,
  error: null as Nullable<string>,
  status: null as Nullable<SnackBarType>,
}

export type LoginActionType = ReturnType<typeof loginAC>

type InitialStateType = typeof initState

export const loginAC = (isLoggedIn: boolean) => ({ type: AUTH_LOGIN, isLoggedIn } as const)

export const loginReducer = (
  state: InitialStateType = initState,
  action: LoginActionType
): InitialStateType => {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}

export const loginTC =
  (data: LoginFieldsType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    authAPI
      .login(data)
      .then(res => {
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('success'))
        dispatch(loginAC(true))
        dispatch(setProfileAC(res.data))
      })
      .catch((reason: AxiosError<{ error: string }>) => {
        if (reason.response?.data) {
          ServerError(reason.response.data.error, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        } else {
          ServerError(reason.message, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        }
      })
  }
