import { Dispatch } from 'redux'

import { cardAPI, CardResponceType, UpdateCardType } from '../../../api/cardAPI'
import { CardPacksResponceType } from '../../../api/cardPacksAPI'
import { AppThunk } from '../../../types/HooksTypes'

type InitialStateType = CardResponceType[]
const initialState: InitialStateType = []

export type CardActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof addCardAC>
  | ReturnType<typeof deleteCardAC>
  | ReturnType<typeof updateCardAC>

export const myPackReducer = (state = initialState, action: CardActionsType): InitialStateType => {
  switch (action.type) {
    case 'CRUD/SET-CARDS': {
      return action.cards
    }
    default:
      return state
  }
}

export const setCardsAC = (cards: CardResponceType[]) => {
  return { type: 'CRUD/SET-CARDS', cards } as const
}
export const addCardAC = (cardsPack: CardPacksResponceType) => {
  return { type: 'CRUD/ADD-CARD', cardsPack } as const
}
export const deleteCardAC = (id: string) => {
  return { type: 'CRUD/DELETE-CARD', id } as const
}
export const updateCardAC = (card: CardResponceType) => {
  return { type: 'CRUD/UPDATE-CARD', card } as const
}

export const getCardsTC = (): AppThunk => (dispatch: Dispatch<CardActionsType>) => {
  cardAPI.getCards().then(res => {
    dispatch(setCardsAC(res.data.cards))
    console.log(res.data.cards)
  })
}

export const addCardTC =
  (card: CardResponceType): AppThunk =>
  dispatch => {
    cardAPI.addCard(card).then(res => {
      console.log(res)
    })
  }

export const deleteCardTC = (): AppThunk => dispatch => {
  cardAPI.deleteCard().then(res => {
    console.log(res)
  })
}

export const updateCardTC =
  (updateCard: UpdateCardType): AppThunk =>
  dispatch => {
    cardAPI.updateCard(updateCard).then(res => {
      console.log(res)
    })
  }
