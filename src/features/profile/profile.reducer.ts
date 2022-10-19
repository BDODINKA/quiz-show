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
  | ReturnType<typeof responseStatusAC>
  | ReturnType<typeof logOutAC>
  | ReturnType<typeof updateProfileAC>

const initialState = {
  profile: null as null | ProfileType,
  responseStatus: null as string | null,
}

export const ProfileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionType
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE': {
      return { ...state, profile: action.payload.profile }
    }
    case 'PROFILE/SET-RESPONSE-STATUS': {
      return { ...state, responseStatus: action.payload.status }
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

const responseStatusAC = (status: string) => {
  return {
    type: 'PROFILE/SET-RESPONSE-STATUS',
    payload: { status },
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
  profileAPI
    .authMe()
    .then(res => {
      dispatch(setProfileAC(res.data))
      dispatch(loginAC(true))
    })
    .catch((reason: AxiosError<{ error: string }>) => {
      if (reason.response?.data.error) {
        ServerError<string>(reason.response.data.error, responseStatusAC, dispatch)
      } else {
        ServerError<string>(reason.message, responseStatusAC, dispatch)
      }
    })
}
export const LogOutTC = (): AppThunk => (dispatch: Dispatch) => {
  profileAPI
    .logOut()
    .then(res => {
      dispatch(logOutAC(null))
      dispatch(loginAC(false))
    })
    .catch((reason: AxiosError<LogOutType>) => {
      if (reason.response?.data) {
        ServerError<string>(reason.response.data.info, responseStatusAC, dispatch)
      } else {
        ServerError<string>(reason.message, responseStatusAC, dispatch)
      }
    })
}
export const UpdateUserProfile =
  (data: ChangeProfileType): AppThunk =>
  (dispatch: Dispatch) => {
    profileAPI
      .updateProfile(data)
      .then(res => {
        if (res.data.updatedUser) {
          dispatch(setProfileAC(res.data.updatedUser))
        }
      })
      .catch((reason: AxiosError<LogOutType>) => {
        if (reason.response?.data) {
          ServerError<string>(reason.response.data.info, responseStatusAC, dispatch)
        } else {
          ServerError<string>(reason.message, responseStatusAC, dispatch)
        }
      })
  }
