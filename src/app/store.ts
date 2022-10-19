import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { signUpReducer } from "../features/SignUp/sign-up-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
  /* auth: authReducer,
         profile: profileReducer,*/
  reg: signUpReducer,
  app: appReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
