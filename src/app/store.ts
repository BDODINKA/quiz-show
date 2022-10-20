<<<<<<< HEAD
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
  ForgotActionsType,
  forgotPasswordReducer,
} from '../features/forgot-pass/forgot-password.reducer'
import { LoginActionType, loginReducer } from '../features/login/login-reducer'
import { ProfileActionType, ProfileReducer } from '../features/profile/profile.reducer'
import {SignUpActionsType, signUpReducer} from "../features/SignUp/signUpReducer";
import {appReducer} from "./app-reducer";

export const rootReducer = combineReducers({
  auth: loginReducer,
  profile: ProfileReducer,
  forgotPass: forgotPasswordReducer,
    reg: signUpReducer,
    app: appReducer
})
export type ActionsType = LoginActionType | ProfileActionType | ForgotActionsType | SignUpActionsType
=======
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'

import {LoginActionType, loginReducer} from '../features/login/login-reducer'
import {ProfileActionType, ProfileReducer} from '../features/profile/profile.reducer'
import {SignUpActionsType, signUpReducer} from "../features/SignUp/signUpReducer";
import {appReducer} from "./app-reducer";

export const rootReducer = combineReducers({
    auth: loginReducer,
    profile: ProfileReducer,
    reg: signUpReducer,
    app: appReducer
})
export type ActionsType = LoginActionType | ProfileActionType | SignUpActionsType
>>>>>>> origin/Pavel5284-main

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, undefined, ActionsType>
<<<<<<< HEAD
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>
=======
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootStateType,
    unknown,
    ActionsType>
>>>>>>> origin/Pavel5284-main

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

//@ts-ignore
window.store = store
