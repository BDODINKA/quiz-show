import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { signUpAPI, SignUpUserType } from '../../api/signUpAPI'
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from '../../app/app-reducer'

const initialState = {
  isSignUp: false,
}

export type SignUpType = typeof initialState

export const signUpReducer = (
  state: SignUpType = initialState,
  action: SignUpActionsType
): SignUpType => {
  switch (action.type) {
    case 'signUp/SET-IS-SIGN-UP':
      return { ...state, isSignUp: action.isSignUp }
    default:
      return state
  }
}

export type SignUpActionsType =
  | ReturnType<typeof setIsSignUpAC>
  | SetAppStatusActionType
  | SetAppErrorActionType

export const setIsSignUpAC = (isSignUp: boolean) => {
  return { type: 'signUp/SET-IS-SIGN-UP', isSignUp } as const
}

export const signUpTC = (data: SignUpUserType) => (dispatch: Dispatch<SignUpActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  signUpAPI
    .signUp(data)
    .then(res => {
      dispatch(setIsSignUpAC(true))
      console.log(res)
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((e: AxiosError) => {
      const error = e.response ? (e.response.data as { error: string }).error : e.message

      dispatch(setAppErrorAC(error))
      dispatch(setAppStatusAC('succeeded'))
    })
}
