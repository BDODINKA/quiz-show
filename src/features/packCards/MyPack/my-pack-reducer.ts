import { AxiosError } from 'axios'

import {
  cardAPI,
  CardsParamsType,
  CardsResponseType,
  CardsType,
  UpdateCardType,
} from '../../../api/cardAPI'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { RootStateType } from '../../../app/store'
import { AppThunk } from '../../../types/HooksTypes'
import { Nullable } from '../../../types/Nullable'
import { ServerError } from '../../../utils/ServerErrorHandler'

type InitialStateType = typeof initialState

const initialState = {
  cards: null as Nullable<CardsType[]>,
  packName: null as Nullable<string>,
  packUserId: null as Nullable<string>,
  packPrivate: null as Nullable<boolean>,
  cardsTotalCount: null as Nullable<number>,
  minGrade: null as Nullable<number>,
  maxGrade: null as Nullable<number>,
  params: {
    cardsPack_id: null as Nullable<string>,
    page: 1,
    pageCount: 10,
    cardAnswer: null as Nullable<string>,
    cardQuestion: null as Nullable<string>,
    min: 0,
    max: 5,
    sortCards: null as Nullable<string>,
  },
}

export type CardActionsType = ReturnType<typeof setCardsAC> | ReturnType<typeof setPackCardsIdAC>

export const myPackReducer = (state = initialState, action: CardActionsType): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-PACK-CARDS-ID': {
      return { ...state, params: { ...state.params, cardsPack_id: action.cardId } }
    }
    case 'CARDS/SET-CARDS': {
      return {
        ...state,
        cards: action.cards.cards,
        packUserId: action.cards.packUserId,
        packName: action.cards.packName,
        cardsTotalCount: action.cards.cardsTotalCount,
        minGrade: action.cards.minGrade,
        maxGrade: action.cards.maxGrade,
      }
    }
    default:
      return state
  }
}

export const setCardsAC = (cards: CardsResponseType) => {
  return { type: 'CARDS/SET-CARDS', cards } as const
}
// export const addCardAC = () => {
//   return { type: 'CARDS/ADD-CARD', card } as const
// }
// export const deleteCardAC = (id: string) => {
//   return { type: 'CARDS/DELETE-CARD', id } as const
// }
// export const updateCardAC = (card: CardResponceType) => {
//   return { type: 'CARDS/UPDATE-CARD', card } as const
// }
export const setPackCardsIdAC = (cardId: string) => {
  return { type: 'CARDS/SET-PACK-CARDS-ID', cardId } as const
}

export const getCardsTC =
  (packId?: string): AppThunk =>
  (dispatch, getState: () => RootStateType) => {
    const params = getState().card.params

    const param = packId ? { ...params, cardsPack_id: packId } : params

    cardAPI.getCards(param as CardsParamsType).then(res => {
      dispatch(setCardsAC(res.data))
      console.log(res.data.cards)
    })
  }

export const addCardTC =
  (question: string, answer: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .addCard()
      .then(res => {
        dispatch(getCardsTC())
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
        dispatch(getCardsTC())
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
  (updateCard: UpdateCardType): AppThunk =>
  dispatch => {
    cardAPI.updateCard(updateCard).then(res => {
      console.log(res)
    })
  }
