import { Dispatch } from 'redux'

import { ErrorAC } from '../features/forgot-pass/forgot-password.reducer'

export const ServerErrorForgot = <T>(data: T, dispatch: Dispatch) => {
  if (typeof data === 'string') {
    dispatch(ErrorAC(data))
  }
}
