import { AxiosError } from 'axios'

import {
  cardAPI,
  CardsParamsType,
  CardsResponseType,
  CardsType,
  GradeCardType,
  AddAndUpdateCardType,
} from '../../../api/cardAPI'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../types/HooksTypes'
import { Nullable } from '../../../types/Nullable'
import { ServerError } from '../../../utils/ServerErrorHandler'

type CardsStateType = typeof cardsState

const cardsState = {
  cards: null as Nullable<CardsType[]>,
  packName: null as Nullable<string>,
  packUserId: null as Nullable<string>,
  packDeckCover: null as Nullable<string>,
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

export type CardActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setPackCardsIdAC>
  | ReturnType<typeof setPackNameAC>
  | ReturnType<typeof setDeckCoverAC>
  | ReturnType<typeof searchCardNameAC>

export const cardsReducer = (
  state: CardsStateType = cardsState,
  action: CardActionsType
): CardsStateType => {
  switch (action.type) {
    case 'CARDS/SET-PACK-CARDS-ID': {
      return { ...state, params: { ...state.params, cardsPack_id: action.cardId } }
    }

    case 'CARDS/SET-CARDS': {
      return {
        ...state,
        cards: action.cards.cards,
        packUserId: action.cards.packUserId,
        packDeckCover: action.cards.packDeckCover,
        packName: action.cards.packName,
        cardsTotalCount: action.cards.cardsTotalCount,
        minGrade: action.cards.minGrade,
        maxGrade: action.cards.maxGrade,
      }
    }
    case 'CARDS/SET-PACK-NAME': {
      return { ...state, packName: action.name }
    }
    case 'CARDS/SET-DECK-COVER': {
      return { ...state, packDeckCover: action.deckCover }
    }
    case 'CARDS/SET-FILTER-QUESTION': {
      return { ...state, params: { ...state.params, cardQuestion: action.value } }
    }

    default:
      return state
  }
}

export const setCardsAC = (cards: CardsResponseType) => {
  return { type: 'CARDS/SET-CARDS', cards } as const
}

export const setPackCardsIdAC = (cardId: string) => {
  return { type: 'CARDS/SET-PACK-CARDS-ID', cardId } as const
}

export const setPackNameAC = (name: string) => {
  return { type: 'CARDS/SET-PACK-NAME', name } as const
}

export const setDeckCoverAC = (deckCover: string) => {
  return { type: 'CARDS/SET-DECK-COVER', deckCover } as const
}
export const searchCardNameAC = (value: string) => {
  return { type: 'CARDS/SET-FILTER-QUESTION', value } as const
}

export const getCardsTC =
  (packId?: string): AppThunk =>
  (dispatch, getState) => {
    const params = getState().card.params

    console.log(params.cardQuestion)
    const param = packId ? { ...params, cardsPack_id: packId } : params

    cardAPI
      .getCards(param as CardsParamsType)
      .then(res => {
        if (res.data.cards.length) {
          dispatch(setCardsAC(res.data))
          dispatch(setAppStatusAC(null))
        } else {
          dispatch(setCardsAC(res.data))
          dispatch(setAppStatusAC('warning'))
          dispatch(setAppErrorAC('Current Card not found '))
        }
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

export const addCardTC =
  (card: AddAndUpdateCardType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .addCard(card)
      .then(res => {
        dispatch(getCardsTC(card.cardsPack_id))
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Card added'))
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
  (_id: string, packId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .deleteCard(_id)
      .then(() => {
        dispatch(getCardsTC(packId))
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Card deleted'))
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
  (updateCard: AddAndUpdateCardType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .updateCard(updateCard)
      .then(res => {
        console.log(res)
        dispatch(getCardsTC(updateCard.cardsPack_id))
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Card updated'))
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

export const changeRatingCardTC =
  (grade: GradeCardType): AppThunk =>
  dispatch => {
    console.log(grade)
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .changeRatingCard(grade)
      .then(res => {
        console.log(res.data)
        dispatch(getCardsTC(res.data.updatedGrade.cardsPack_id))
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Rating changed'))
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
