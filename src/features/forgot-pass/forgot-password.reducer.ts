import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { forgotApi, forgotNewPassword } from '../../api/forgot-Pass-Api'
import { RootStateType, AppThunk } from '../../app/store'
import { ServerError } from '../../utils/ServerErrorHandler'

export enum SendStatusType {
  initial = 'info',
  inProgress = 'warning',
  error = 'error',
  success = 'success',
}

export type AllActionsType =
  | ReturnType<typeof SendForgotEmailAC>
  | ReturnType<typeof SetResetStateAC>
  | ReturnType<typeof SetStatusResponseAC>
  | ReturnType<typeof ErrorAC>

export type ForgotStateType = typeof initialState

const initialState = {
  response: {
    message: '',
    status: 'info',
  },
  sendFormToEmail: {
    email: '',
    from: 'Friday Team',
    message: `<div style="background-color: lime; padding: 15px">\n" +
        "password recovery link: \n" +
        "<a href=http://localhost:3000/#/NewPass/$token$>\n" +
        "link</a>\n" +
        "</div>`,
  },
}

export const forgotPasswordReducer = (
  state: ForgotStateType = initialState,
  action: AllActionsType
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
        response: { ...state.response, status: 'info', message: '' },
      }
    }
    case 'FORGOT-PASS/SET-STATUS-RESPONSE': {
      if (action.payload.status === 'info') {
        return {
          ...state,
          response: {
            ...state.response,
            status: action.payload.status,
          },
        }
      } else if (action.payload.status === 'warning') {
        return {
          ...state,
          response: {
            ...state.response,
            status: action.payload.status,
          },
        }
      } else {
        return {
          ...state,
          response: {
            ...state.response,
            status: action.payload.status,
            message: action.payload.status,
          },
        }
      }
    }
    case 'FORGOT-PASS/SET-ERROR': {
      return {
        ...state,
        response: {
          ...state.response,
          message: action.payload.error,
          status: SendStatusType.error,
        },
      }
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

export const SetStatusResponseAC = (status: SendStatusType) => {
  return {
    type: 'FORGOT-PASS/SET-STATUS-RESPONSE',
    payload: { status },
  } as const
}

export const ErrorAC = (error: string) => {
  return {
    type: 'FORGOT-PASS/SET-ERROR',
    payload: { error },
  } as const
}

export const SendForgotFormTC =
  (values: string): AppThunk =>
  (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(SendForgotEmailAC(values))
    dispatch(SetStatusResponseAC(SendStatusType.inProgress))
    const data = getState().forgotPass.sendFormToEmail

    forgotApi
      .sendFormToEmail(data)
      .then(response => {
        if (response.status === 200) {
          dispatch(SetStatusResponseAC(SendStatusType.success))
        }
      })
      .catch((reason: AxiosError<{ error: string; email: string; in: string }>) => {
        if (reason.response?.data.error) {
          ServerError(reason.response?.data.error, ErrorAC, dispatch)
        } else {
          ServerError(reason.message, ErrorAC, dispatch)
        }
      })
  }
export const SetResetStateTC = (): AppThunk => (dispatch: Dispatch) => {
  dispatch(SetResetStateAC())
}
export const SendNewPasswordFormTC =
  (data: forgotNewPassword): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(SetStatusResponseAC(SendStatusType.inProgress))
    forgotApi
      .sendNewPassword(data)
      .then(response => {
        if (response.status === 200) {
          dispatch(SetStatusResponseAC(SendStatusType.success))
        }
      })
      .catch((reason: AxiosError<{ error: string }>) => {
        if (reason.response?.data.error) {
          ServerError(reason.response?.data.error, ErrorAC, dispatch)
        } else {
          ServerError(reason.message, ErrorAC, dispatch)
        }
      })
  }
