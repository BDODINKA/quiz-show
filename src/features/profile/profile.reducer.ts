import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ProfileType } from '../../api/authAPI'
import { ChangeProfileType, LogOutType, profileAPI } from '../../api/profileAPI'
import { AppThunk } from '../../app/store'
import { ServerError } from '../../utils/ServerErrorHandler'
import { loginAC } from '../login/login-reducer'

export type ProfileStateType = typeof initialState
export type ProfileActionType =
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof StatusAC>
  | ReturnType<typeof logOutAC>
  | ReturnType<typeof updateProfileAC>
  | ReturnType<typeof ErrorAC>

const initialState = {
  profile: null as null | ProfileType,
  status: null as string | null,
  error: null as string | null,
}

export const ProfileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionType
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE': {
      return { ...state, profile: action.payload.profile }
    }
    case 'PROFILE/SET-STATUS': {
      return { ...state, status: action.payload.status, error: action.payload.status }
    }
    case 'PROFILE/SET-LOGOUT': {
      return { ...state, profile: null }
    }
    case 'PROFILE/UPDATE-PROFILE': {
      return {
        ...state,
        profile: action.payload,
      }
    }
    case 'PROFILE/SET-ERROR-MESSAGE': {
      return { ...state, error: action.payload.message }
    }

    default: {
      return state
    }
  }
}

export const setProfileAC = (profile: ProfileType) => {
  return {
    type: 'PROFILE/SET-PROFILE',
    payload: { profile },
  } as const
}

export const StatusAC = (status: string | null) => {
  return {
    type: 'PROFILE/SET-STATUS',
    payload: { status },
  } as const
}
const ErrorAC = (message: string) => {
  return {
    type: 'PROFILE/SET-ERROR-MESSAGE',
    payload: { message },
  } as const
}
const logOutAC = (data: null) => {
  return {
    type: 'PROFILE/SET-LOGOUT',
    payload: data,
  } as const
}
const updateProfileAC = (data: ProfileType) => {
  return {
    type: 'PROFILE/UPDATE-PROFILE',
    payload: data,
  } as const
}

export const authMeTC = (): AppThunk => (dispatch: Dispatch) => {
  dispatch(StatusAC('progress'))
  profileAPI
    .authMe()
    .then(res => {
      dispatch(setProfileAC(res.data))
      dispatch(loginAC(true))
      dispatch(StatusAC('success'))
    })
    .catch((reason: AxiosError<{ error: string }>) => {
      if (reason.response?.data.error) {
        ServerError<string>(reason.response.data.error, ErrorAC, dispatch)
        dispatch(StatusAC('error'))
      } else {
        ServerError<string>(reason.message, ErrorAC, dispatch)
        dispatch(StatusAC('error'))
      }
    })
}
export const LogOutTC = (): AppThunk => (dispatch: Dispatch) => {
  dispatch(StatusAC('progress'))
  profileAPI
    .logOut()
    .then(() => {
      dispatch(logOutAC(null))
      dispatch(loginAC(false))
      dispatch(StatusAC('success'))
    })
    .catch((reason: AxiosError<LogOutType>) => {
      if (reason.response?.data) {
        ServerError<string>(reason.response.data.info, ErrorAC, dispatch)
        dispatch(StatusAC('error'))
      } else {
        ServerError<string>(reason.message, ErrorAC, dispatch)
        dispatch(StatusAC('error'))
      }
    })
}
export const UpdateUserProfile =
  (data: ChangeProfileType): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(StatusAC('progress'))
    profileAPI
      .updateProfile(data)
      .then(res => {
        if (res.data.updatedUser) {
          dispatch(setProfileAC(res.data.updatedUser))
          dispatch(StatusAC('success'))
        }
      })
      .catch((reason: AxiosError<LogOutType>) => {
        if (reason.response?.data) {
          ServerError<string>(reason.response.data.info, ErrorAC, dispatch)
          dispatch(StatusAC('error'))
        } else {
          ServerError<string>(reason.message, ErrorAC, dispatch)
          dispatch(StatusAC('error'))
        }
      })
  }