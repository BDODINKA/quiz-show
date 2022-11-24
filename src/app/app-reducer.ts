import { SnackBarType } from '../common/components/CustomSnackBar/CustomAlertSnackBar'
import { Nullable } from '../types/Nullable'

export type AppStateType = typeof appState

const appState = {
  status: null as Nullable<SnackBarType>,
  error: null as Nullable<string>,
  isInitialize: false,
}

export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setInitializeAC>

export const appReducer = (
  state: AppStateType = appState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }

    case 'APP/SET-ERROR':
      return { ...state, error: action.error }

    case 'APP/SET-INITIALIZE': {
      return { ...state, isInitialize: action.initialize }
    }

    default:
      return state
  }
}

export const setAppStatusAC = (status: Nullable<SnackBarType>) => {
  return { type: 'APP/SET-STATUS', status } as const
}

export const setAppErrorAC = (error: Nullable<string>) => {
  return { type: 'APP/SET-ERROR', error } as const
}

export const setInitializeAC = (initialize: boolean) => {
  return { type: 'APP/SET-INITIALIZE', initialize } as const
}
