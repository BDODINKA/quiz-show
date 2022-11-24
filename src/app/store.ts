import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { forgotPasswordReducer } from '../features/forgot-pass/forgot-password.reducer'
import { loginReducer } from '../features/login/login-reducer'
import { cardsReducer } from '../features/packs/Cards/cards-reducer'
import { learnReducer } from '../features/packs/Learn/learn-reducer'
import { packsReducer } from '../features/packs/Packs-reducer'
import { ProfileReducer } from '../features/profile/profile.reducer'
import { signUpReducer } from '../features/sign-up/signUpReducer'

import { appReducer } from './app-reducer'

export const rootReducer = combineReducers({
  auth: loginReducer,
  profile: ProfileReducer,
  forgotPass: forgotPasswordReducer,
  reg: signUpReducer,
  app: appReducer,
  cardPacks: packsReducer,
  card: cardsReducer,
  learn: learnReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store
