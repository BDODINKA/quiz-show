import { Dispatch } from 'redux'

import { forgotApi, forgotNewPassword, forgotType } from '../../api/forgot-Pass-Api'
import { AppRootStateType } from '../../app/store'

export enum SendStatus {
  start = 0,
  inProgress = 1,
  failed = 2,
  success = 3,
}
type StateType = {
  isSend: SendStatus
  sendFormMail: forgotType
}
const initialState = {
  isSend: SendStatus.start,
  sendFormMail: {
    email: '',
    from: 'Friday Team',
    message: `<div style="background-color: lime; padding: 15px">\n" +
        "password recovery link: \n" +
        "<a href=http://localhost:3000/#/NewPass/$token$>\n" +
        "link</a>\n" +
        "</div>`,
  },
}

type AllActions =
  | ReturnType<typeof SendForgotEmailAC>
  | ReturnType<typeof SetIsSendAC>
  | ReturnType<typeof SetResetStateAC>

export const ForgotPasswordReducer = (state: StateType = initialState, action: AllActions) => {
  switch (action.type) {
    case 'FORGOT-PASS/SET-FORGOT-EMAIL': {
      return { ...state, sendFormMail: { ...state.sendFormMail, email: action.payload.email } }
    }
    case 'FORGOT-PASS/SET-IS-SEND': {
      return { ...state, isSend: action.payload.isSend }
    }
    case 'FORGOT-PASS/SET-RESET-STATE': {
      return { ...state, isSend: 0, sendFormMail: { ...state.sendFormMail, email: '' } }
    }
    default:
      return state
  }
}

export default ForgotPasswordReducer

const SendForgotEmailAC = (email: string) => {
  return {
    type: 'FORGOT-PASS/SET-FORGOT-EMAIL',
    payload: { email },
  } as const
}
const SetIsSendAC = (isSend: SendStatus) => {
  return {
    type: 'FORGOT-PASS/SET-IS-SEND',
    payload: { isSend },
  } as const
}
const SetResetStateAC = () => {
  return {
    type: 'FORGOT-PASS/SET-RESET-STATE',
    payload: {},
  } as const
}

export const SendForgotFormTC =
  (values: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(SendForgotEmailAC(values))
    dispatch(SetIsSendAC(1))
    const dataSend = getState().forgotPass.sendFormMail

    forgotApi
      .sendFormToEmail(dataSend)
      .then(response => {
        if (response.status === 200) {
          dispatch(SetIsSendAC(3))
        }
      })
      .catch(reason => {
        dispatch(SetIsSendAC(2))
      })
  }
export const SetResetStateTC = () => (dispatch: Dispatch) => {
  dispatch(SetResetStateAC())
}
export const SendNewPasswordFormTC = (data: forgotNewPassword) => (dispatch: Dispatch) => {
  dispatch(SetIsSendAC(1))
  forgotApi
    .sendNewPassword(data)
    .then(response => {
      if (response.status === 200) {
        dispatch(SetIsSendAC(3))
      }
    })
    .catch(reason => {
      dispatch(SetIsSendAC(2))
    })
    .finally(() => dispatch(SetResetStateAC()))
}
