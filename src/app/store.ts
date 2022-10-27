import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { paginationReducer } from '../common/components/pagination/pagination-reducer'
import { forgotPasswordReducer } from '../features/forgot-pass/forgot-password.reducer'
import { loginReducer } from '../features/login/login-reducer'
import { cardPacksReducer } from '../features/packCards/cardPacks-reducer'
import { myPackReducer } from '../features/packCards/MyPack/my-pack-reducer'
import { ProfileReducer } from '../features/profile/profile.reducer'
import { signUpReducer } from '../features/sign-up/signUpReducer'

import { appReducer } from './app-reducer'

export const rootReducer = combineReducers({
  auth: loginReducer,
  profile: ProfileReducer,
  forgotPass: forgotPasswordReducer,
  reg: signUpReducer,
  app: appReducer,
  cardPacks: cardPacksReducer,
  card: myPackReducer,
  pagination: paginationReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store
