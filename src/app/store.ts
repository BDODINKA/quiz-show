import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  // auth:
  // profile:
})

const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store
