import {AppActionsType} from '../app/app-reducer'
import {ForgotActionsType} from '../features/forgot-pass/forgot-password.reducer'
import {LoginActionType} from '../features/login/login-reducer'
import {ProfileActionType} from '../features/profile/profile.reducer'
import {SignUpActionsType} from '../features/sign-up/signUpReducer'
import {CardPacksActionsType} from "../features/card-packs/cardPacks-reducer";
import {CardActionsType} from "../features/card/card-reducer";

export type ActionsType =
    | LoginActionType
    | ProfileActionType
    | SignUpActionsType
    | ForgotActionsType
    | AppActionsType
    | CardPacksActionsType
    | CardActionsType
