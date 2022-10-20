import { Dispatch } from 'redux'

export const ServerError = <T>(data: T, ActionCreator: Function, dispatch: Dispatch) => {
  if (typeof data === 'string') {
    dispatch(ActionCreator(data))
  }
}
