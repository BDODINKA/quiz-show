import { AxiosError } from 'axios'

import { cardAPI, CardResponceType, CardType } from '../../../api/cardAPI'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../types/HooksTypes'
import { ServerError } from '../../../utils/ServerErrorHandler'

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
export const addCardAC = (card: CardResponceType[]) => {
  return { type: 'CRUD/ADD-CARD', card } as const
}
export const deleteCardAC = (id: string) => {
  return { type: 'CRUD/DELETE-CARD', id } as const
}
export const updateCardAC = (card: CardResponceType) => {
  return { type: 'CRUD/UPDATE-CARD', card } as const
}

export const getCardsTC =
  (cardsPack_id: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI.getCards(cardsPack_id).then(res => {
      dispatch(setCardsAC(res.data.cards))
      console.log(res.data.cards)
    })
  }

export const addCardTC =
  (card: CardType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .addCard(card)
      .then(res => {
        dispatch(getCardsTC(card.cardsPack_id))
        dispatch(setAppStatusAC('success'))
        console.log(res)
      })
      .catch((reason: AxiosError<{ error: string }>) => {
        if (reason.response?.data.error) {
          ServerError<string>(reason.response.data.error, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        } else {
          ServerError<string>(reason.message, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        }
      })
  }

export const deleteCardTC =
  (_id: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .deleteCard(_id)
      .then(res => {
        dispatch(getCardsTC(_id))
        dispatch(setAppStatusAC('success'))
        console.log(res)
      })
      .catch((reason: AxiosError<{ error: string }>) => {
        if (reason.response?.data.error) {
          ServerError<string>(reason.response.data.error, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        } else {
          ServerError<string>(reason.message, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        }
      })
  }

export const updateCardTC =
  (card: CardType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .updateCard(card)
      .then(res => {
        console.log(res)
      })
      .catch((reason: AxiosError<{ error: string }>) => {
        if (reason.response?.data.error) {
          ServerError<string>(reason.response.data.error, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        } else {
          ServerError<string>(reason.message, setAppErrorAC, dispatch)
          dispatch(setAppStatusAC('error'))
        }
      })
  }
