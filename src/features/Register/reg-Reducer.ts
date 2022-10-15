import { Dispatch } from "redux";
import { registerAPI, RegisterUserType } from "./reg-api";

const initialState = {
  isRegister: false,
};

type InitialStateType = typeof initialState;

export const regReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "register/SET-IS-REGISTER":
      return { ...state, isRegister: action.value };
    default:
      return state;
  }
};

type ActionsType = ReturnType<typeof setIsRegisterAC>;

export const setIsRegisterAC = (value: boolean) => {
  return { type: "register/SET-IS-REGISTER", value } as const;
};

/*export const setRegisterAC = (value: boolean) => {
    return {type: "register/SET-IS-REGISTER", value} as const;
};*/

export const registerTC =
  (data: RegisterUserType) => (dispatch: Dispatch<ActionsType>) => {
    registerAPI.register(data).then((res) => {
      console.log(res);
    });
  };
