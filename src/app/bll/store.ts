import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import { authReducer } from "./auth-Reducer";
import { profileReducer } from "./profile-Reducer";
import { useDispatch } from "react-redux";
import { regReducer } from "../../features/Register/reg-Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  reg: regReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
