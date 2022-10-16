import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { LoginActionType, loginReducer} from "../features/login/login-reducer";


export const rootReducer = combineReducers({
	 auth: loginReducer
	 // profile:
})

export type ActionsType =
	|LoginActionType

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, undefined, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

//@ts-ignore
window.store = store
