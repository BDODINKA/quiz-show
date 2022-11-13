import { AxiosError, AxiosResponse } from 'axios'

import {
  cardAPI,
  CardsParamsType,
  CardsResponseType,
  CardsType,
  GradeCardResponseType,
  GradeCardType,
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

export const cardsReducer = (state = initialState, action: CardActionsType): InitialStateType => {
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

    cardAPI.getCards(param as CardsParamsType).then((res: AxiosResponse<CardsResponseType>) => {
      dispatch(setCardsAC(res.data))
      // dispatch(setAppErrorAC('Cards is setted'))
      console.log(res)
    })
  }

export const addCardTC =
  (
    cardsPack_id: string,
    question?: string,
    answer?: string,
    grade?: number,
    shots?: number,
    answerImg?: string,
    questionImg?: string,
    questionVideo?: string,
    answerVideo?: string
  ): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .addCard({
        cardsPack_id,
        question,
        answer,
        grade,
        shots,
        answerImg,
        questionImg,
        questionVideo,
        answerVideo,
      })
      .then(res => {
        dispatch(getCardsTC(cardsPack_id))
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
      .then((res: AxiosResponse<CardsResponseType>) => {
        dispatch(getCardsTC(packId))
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Card deleted'))
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
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .updateCard(updateCard)
      .then((res: AxiosResponse<any>) => {
        dispatch(getCardsTC(updateCard.cardsPack_id))
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Card updated'))
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

export const changeRatingCardTC =
  (grade: GradeCardType): AppThunk =>
  dispatch => {
    console.log(grade)
    dispatch(setAppStatusAC('progress'))
    cardAPI
      .changeRatingCard(grade)
      .then((res: AxiosResponse<GradeCardResponseType>) => {
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
