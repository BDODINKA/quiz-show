import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ProfileType } from '../../api/authAPI'
import { ChangeProfileType, LogOutType, profileAPI } from '../../api/profileAPI'
import { setAppErrorAC, setAppStatusAC, setInitializeAC } from '../../app/app-reducer'
import { AppThunk } from '../../types/HooksTypes'
import { Nullable } from '../../types/Nullable'
import { ServerError } from '../../utils/ServerErrorHandler'
import { loginAC } from '../login/login-reducer'

export type ProfileStateType = typeof initialState
export type ProfileActionType =
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof logOutAC>
  | ReturnType<typeof updateProfileAC>

const initialState = {
  profile: null as Nullable<ProfileType>,
}

export const ProfileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionType
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE': {
      return { ...state, profile: action.payload.profile }
    }
    case 'PROFILE/SET-LOGOUT': {
      return { ...state, profile: action.payload }
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

export const authMeTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('progress'))
  profileAPI
    .authMe()
    .then(res => {
      dispatch(loginAC(true))
      dispatch(setInitializeAC(true))
      dispatch(setProfileAC(res.data))
      dispatch(setAppStatusAC('success'))
      dispatch(setAppErrorAC('You success Authorized'))
    })
    .catch((reason: AxiosError<{ error: string }>) => {
      if (reason.response?.data.error) {
        ServerError<string>(reason.response.data.error, setAppErrorAC, dispatch)
        dispatch(setAppStatusAC(null))
        dispatch(setInitializeAC(true))
      } else {
        ServerError<string>(reason.message, setAppErrorAC, dispatch)
        dispatch(setAppStatusAC(null))
        dispatch(setInitializeAC(true))
      }
    })
}
export const LogOutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('progress'))
  profileAPI
    .logOut()
    .then(() => {
      dispatch(logOutAC(null))
      dispatch(loginAC(false))
      dispatch(setAppStatusAC('warning'))
      dispatch(setAppErrorAC('You are not Authorized'))
    })
    .catch((reason: AxiosError<LogOutType>) => {
      if (reason.response?.data) {
        ServerError<string>(reason.response.data.info, setAppErrorAC, dispatch)
        dispatch(setAppStatusAC('error'))
      } else {
        ServerError<string>(reason.message, setAppErrorAC, dispatch)
        dispatch(setAppStatusAC('error'))
      }
    })
}
export const UpdateUserProfile =
  (data: ChangeProfileType): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('progress'))
    profileAPI
      .updateProfile(data)
      .then(res => {
        if (res.data.updatedUser) {
          dispatch(setProfileAC(res.data.updatedUser))
          dispatch(setAppStatusAC('success'))
          dispatch(setAppErrorAC('You success changed Profile'))
        }
      })
      .catch((reason: AxiosError<LogOutType>) => {
        if (reason.response?.data) {
          ServerError<string>(reason.response.data.info, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        } else {
          ServerError<string>(reason.message, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        }
      })
  }
