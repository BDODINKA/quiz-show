import {Dispatch} from "redux";
import {CardsPackResponceType, CardResponceType, crudAPI, UpdateCardType} from "./crudAPI";

type InitialStateType = CardsPackResponceType[] | CardResponceType[]

const initialState: InitialStateType = []

export type CrudActionsType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof addCardAC>
    | ReturnType<typeof deleteCardAC>
    | ReturnType<typeof updateCardAC>


export const crudReducer = (state= initialState, action: CrudActionsType):InitialStateType => {
    switch (action.type) {
        case "CRUD/SET-PACKS": {
            return action.cardPacks
        }
        case "CRUD/SET-CARDS": {
            return action.cards
        }
        default:
            return state
    }
}

/*export type SetPacksAtionsType = ReturnType<typeof setPacksAC>
export type AddPackAtionsType = ReturnType<typeof addPackAC>
export type DeletePackAtionsType = ReturnType<typeof deletePackAC>
export type UpdatePackActionsType = ReturnType<typeof updatePackAC>
export type SetCardsActionsType = ReturnType<typeof setCardsAC>
export type AddCardActionsType = ReturnType<typeof addCardAC>
export type DeleteCardActionsType = ReturnType<typeof deleteCardAC>
export type UpdateCardActionsType = ReturnType<typeof updateCardAC>*/

export const setPacksAC = (cardPacks: CardsPackResponceType[]) => {
    return {type: "CRUD/SET-PACKS", cardPacks} as const
}
export const addPackAC = (name: string) => {
    return {type: "CRUD/ADD-PACKS", name} as const
}
export const deletePackAC = (id: string) => {
    return {type: "CRUD/DELETE-PACKS", id} as const
}
export const updatePackAC = (cardsPack: CardsPackResponceType) => {
    return {type: "CRUD/UPDATE-PACKS", cardsPack} as const
}
export const setCardsAC = (cards: CardResponceType[]) => {
    return {type: "CRUD/SET-CARDS", cards} as const
}
export const addCardAC = (cardsPack: CardsPackResponceType) => {
    return {type: "CRUD/ADD-CARD", cardsPack} as const
}
export const deleteCardAC = (id:string) => {
    return {type: "CRUD/DELETE-CARD", id} as const
}
export const updateCardAC = (card: CardResponceType) => {
    return {type: "CRUD/UPDATE-CARD", card} as const
}

export const getPacksTC =
    () => (dispatch: Dispatch<CrudActionsType>) => {
        crudAPI.getPacks()
            .then((res) => {
                dispatch(setPacksAC(res.data.cardPacks))
                console.log(res.data.cardPacks)
            })
    }

export const addPackTC =
    (cardsPack: CardsPackResponceType) => (dispatch: Dispatch<CrudActionsType>) => {
        crudAPI.addPack(cardsPack)
            .then((res) => {
                console.log(res)
            })
    }

export const deletePackTC =
    () => (dispatch: Dispatch<CrudActionsType>) => {
        crudAPI.deletePack()
            .then((res) => {
                console.log(res)
            })
    }

export const updatePackTC =
    (cardsPack: CardsPackResponceType) => (dispatch: Dispatch<CrudActionsType>) => {
        crudAPI.updatePack(cardsPack)
            .then((res) => {
                console.log(res)
            })
    }

    export const getCardsTC =
        () => (dispatch: Dispatch<CrudActionsType>) => {
    crudAPI.getCards()
        .then((res) => {
            dispatch(setCardsAC(res.data.cards))
            console.log(res.data.cards)
        })
}

export const addCardTC =
    (card: CardResponceType) => (dispatch: Dispatch<CrudActionsType>) => {
        crudAPI.addCard(card)
            .then((res) => {
                console.log(res)
            })
    }

    export const deleteCardTC =
        () => (dispatch: Dispatch<CrudActionsType>) => {
    crudAPI.deleteCard()
        .then((res) => {
            console.log(res)
        })
        }

    export const updateCardTC =
        (updateCard: UpdateCardType) => (dispatch: Dispatch<CrudActionsType>) => {
    crudAPI.updateCard(updateCard)
        .then((res) => {
            console.log(res)
        })
        }