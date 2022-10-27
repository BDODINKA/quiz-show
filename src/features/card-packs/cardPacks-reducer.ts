import {Dispatch} from "redux";
import {AppThunk} from "../../types/HooksTypes";
import {cardPacksAPI, CardPacksResponceType} from "../../api/cardPacksAPI";


type InitialStateType = CardPacksResponceType[]
const initialState: InitialStateType = []

export type CardPacksActionsType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof updatePackAC>


export const cardPacksReducer = (state= initialState, action: CardPacksActionsType):InitialStateType => {
    switch (action.type) {
        case "CRUD/SET-PACKS": {
            return action.cardPacks
        }
        default:
            return state
    }
}

export const setPacksAC = (cardPacks: CardPacksResponceType[]) => {
    return {type: "CRUD/SET-PACKS", cardPacks} as const
}
export const addPackAC = (name: string) => {
    return {type: "CRUD/ADD-PACKS", name} as const
}
export const deletePackAC = (id: string) => {
    return {type: "CRUD/DELETE-PACKS", id} as const
}
export const updatePackAC = (cardsPack: CardPacksResponceType) => {
    return {type: "CRUD/UPDATE-PACKS", cardsPack} as const
}

export const getPacksTC =
    (): AppThunk => (dispatch: Dispatch<CardPacksActionsType>) => {
        cardPacksAPI.getPacks()
            .then((res) => {
                dispatch(setPacksAC(res.data.cardPacks))
                console.log(res.data.cardPacks)
            })
    }

export const addPackTC =
    (cardsPack: CardPacksResponceType): AppThunk => (dispatch: Dispatch<CardPacksActionsType>) => {
        cardPacksAPI.addPack(cardsPack)
            .then((res) => {
                console.log(res)
            })
    }

export const deletePackTC =
    (): AppThunk => (dispatch: Dispatch<CardPacksActionsType>) => {
        cardPacksAPI.deletePack()
            .then((res) => {
                console.log(res)
            })
    }

export const updatePackTC =
    (cardsPack: CardPacksResponceType): AppThunk => (dispatch: Dispatch<CardPacksActionsType>) => {
        cardPacksAPI.updatePack(cardsPack)
            .then((res) => {
                console.log(res)
            })
    }

