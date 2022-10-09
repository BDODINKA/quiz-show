import {combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './auth-Reducer'
import { profileReducer } from './profile-Reducer'


const rootReducer = combineReducers(
    {
        auth:authReducer,
        profile:profileReducer,
    }
)


const store =  createStore(rootReducer,applyMiddleware(thunk))



//@ts-ignore
window.store=store