import { AxiosError } from 'axios'

import { forgotApi, ForgotNewPasswordType } from '../../api/forgotPassAPI'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../types/HooksTypes'
import { ServerError } from '../../utils/ServerErrorHandler'

import { ForgotLink } from './ForgotLink'

export type ForgotActionsType =
  | ReturnType<typeof SendForgotEmailAC>
  | ReturnType<typeof SetResetStateAC>
  | ReturnType<typeof SetIsSendAC>

export type ForgotStateType = typeof forgotState

const forgotState = {
  sendFormToEmail: {
    email: '',
    from: 'Friday Team',
    message: ForgotLink,
  },
  isSend: false,
}

export const forgotPasswordReducer = (
  state: ForgotStateType = forgotState,
  action: ForgotActionsType
): ForgotStateType => {
  switch (action.type) {
    case 'FORGOT-PASS/SET-FORGOT-EMAIL': {
      return {
        ...state,
        sendFormToEmail: { ...state.sendFormToEmail, email: action.payload.email },
      }
    }

    case 'FORGOT-PASS/SET-RESET-STATE': {
      return {
        ...state,
        sendFormToEmail: { ...state.sendFormToEmail, email: '' },
      }
    }

    case 'FORGOT-PASS/SET-IS-SEND': {
      return { ...state, isSend: action.payload.value }
    }

    default: {
      return state
    }
  }
}

export const SendForgotEmailAC = (email: string) => {
  return {
    type: 'FORGOT-PASS/SET-FORGOT-EMAIL',
    payload: { email },
  } as const
}

export const SetResetStateAC = () => {
  return {
    type: 'FORGOT-PASS/SET-RESET-STATE',
    payload: {},
  } as const
}
export const SetIsSendAC = (value: boolean) => {
  return {
    type: 'FORGOT-PASS/SET-IS-SEND',
    payload: { value },
  } as const
}

export const SendForgotFormTC =
  (values: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(SendForgotEmailAC(values))
    dispatch(setAppStatusAC('progress'))
    const data = getState().forgotPass.sendFormToEmail

    forgotApi
      .sendFormToEmail(data)
      .then(response => {
        if (response.status === 200) {
          dispatch(SetIsSendAC(true))
          dispatch(setAppStatusAC('success'))
          dispatch(setAppErrorAC('success'))
        }
      })
      .catch((reason: AxiosError<{ error: string; email: string; in: string }>) => {
        if (reason.response?.data.error) {
          ServerError(reason.response?.data.error, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        } else {
          ServerError(reason.message, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        }
      })
  }
export const SetResetStateTC = (): AppThunk => dispatch => {
  dispatch(SetResetStateAC())
  dispatch(setAppStatusAC(null))
  dispatch(setAppErrorAC(null))
}

export const SendNewPasswordFormTC =
  (data: ForgotNewPasswordType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    forgotApi
      .sendNewPassword(data)
      .then(response => {
        if (response.status === 200) {
          dispatch(setAppStatusAC('success'))
          dispatch(setAppErrorAC('success'))
        }
      })
      .catch((reason: AxiosError<{ error: string }>) => {
        if (reason.response?.data.error) {
          ServerError(reason.response?.data.error, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        } else {
          ServerError(reason.message, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        }
      })
  }
