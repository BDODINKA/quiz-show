import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import forgotPasswordReducer from '../features/forgot-pass/forgot-password.reducer'

export type AppRootStateType = ReturnType<typeof rootReducer>
export const rootReducer = combineReducers({
  // auth: loginReducer,
  forgotPass: forgotPasswordReducer,
})

export type ActionsType = any

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, undefined, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  ActionsType
>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

//@ts-ignore
window.store = store
