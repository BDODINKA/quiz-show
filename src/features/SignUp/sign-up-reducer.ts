import { Dispatch } from "redux";
import { signUpAPI, SignUpUserType } from "./signUp-api";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {redirect} from "react-router-dom";

const initialState = {
  //data: ResponseType,
  isSignUp: false,
};


export type SignUpType = typeof initialState;

export const signUpReducer = (
  state: SignUpType = initialState,
  action: ActionsType
): SignUpType => {
  switch (action.type) {
    case "signUp/SET-IS-SIGN-UP":
      return {...state, isSignUp: action.isSignUp}
    default:
      return state;
  }
};

type ActionsType =
   ReturnType<typeof setIsSignUpAC>
  | SetAppStatusActionType
| SetAppErrorActionType


export const setIsSignUpAC = (isSignUp: boolean) => {
  return { type: "signUp/SET-IS-SIGN-UP", isSignUp } as const;
};


export const signUpTC =
  (data: SignUpUserType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
    signUpAPI
      .signUp(data)
      .then((res) => {
       /* if (res.data.error) {
          dispatch(setAppErrorAC(res.data.error))
        }*/
          dispatch(setIsSignUpAC(true))
        console.log(res);
        dispatch(setAppStatusAC('succeeded'))
        if (res) {

        }
      })
      .catch((e: AxiosError) => {
          const error = e.response
              ? (e.response.data as ({ error: string })).error
              : e.message
          dispatch(setAppErrorAC(error))
          dispatch(setAppStatusAC('succeeded'))
      });
  };
