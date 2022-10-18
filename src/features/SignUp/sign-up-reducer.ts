import { Dispatch } from "redux";
import { signUpAPI, SignUpUserType } from "./signUp-api";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {AxiosError} from "axios";

const initialState = {
  //data: ResponseType,
  isSignUp: false,
};

type InitialStateType = typeof initialState;

export const signUpReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "signUp/SET-IS-SIGN-UP":
      return {...state, isSignUp: action.value}
    default:
      return state;
  }
};

type ActionsType =
   ReturnType<typeof setIsSignUpAC>
  | SetAppStatusActionType
| SetAppErrorActionType

export const setIsSignUpAC = (value: boolean) => {
  return { type: "signUp/SET-IS-SIGN-UP", value } as const;
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
        console.log(res);
        dispatch(setAppStatusAC('succeeded'))

      })
      .catch((e: AxiosError) => {
          const error = e.response
              ? (e.response.data as ({ error: string })).error
              : e.message
          dispatch(setAppErrorAC(error))
          dispatch(setAppStatusAC('succeeded'))
      });
  };
