import { AxiosError } from 'axios'

import { authAPI, LoginFieldsType } from '../../api/authAPI'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { SnackBarType } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { AppThunk } from '../../types/HooksTypes'
import { Nullable } from '../../types/Nullable'
import { ServerError } from '../../utils/ServerErrorHandler'
import { setProfileAC } from '../profile/profileReducer'

const loginState = {
  isLoggedIn: false,
  error: null as Nullable<string>,
  status: null as Nullable<SnackBarType>,
}

export type LoginActionType = ReturnType<typeof loginAC>

type LoginStateType = typeof loginState

export const loginReducer = (
  state: LoginStateType = loginState,
  action: LoginActionType
): LoginStateType => {
  switch (action.type) {
    case 'AUTH/SET-LOGIN':
      return { ...state, isLoggedIn: action.isLoggedIn }

    default:
      return state
  }
}

export const loginAC = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-LOGIN', isLoggedIn } as const)

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
