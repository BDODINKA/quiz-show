import { AxiosError } from 'axios'

import {
  CardPacks,
  cardPacksAPI,
  CardPacksResponseType,
  PacksParamsType,
} from '../../api/cardPacksAPI'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../types/HooksTypes'
import { Nullable } from '../../types/Nullable'
import { ServerError } from '../../utils/ServerErrorHandler'

type InitialStateType = typeof initialState
const initialState = {
  cardPacks: null as Nullable<CardPacks[]>,
  cardPacksTotalCount: null as Nullable<number>,
  params: {
    packName: null as Nullable<string>,
    min: 0,
    max: 52,
    sortPacks: null as Nullable<string>,
    page: 1,
    pageCount: 10,
    user_id: null as Nullable<string>,
    block: null as Nullable<boolean>,
  },
}

export type CardPacksActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof filterPageAC>
  | ReturnType<typeof filterPageCountAC>
  | ReturnType<typeof filterLastUpdateAC>
  | ReturnType<typeof filterPackNameAC>
  | ReturnType<typeof filterRangeSliderAC>
  | ReturnType<typeof setUserIdAC>
  | ReturnType<typeof filterResetAC>

export const packsReducer = (
  state = initialState,
  action: CardPacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CRUD/SET-PACKS': {
      return {
        ...state,
        cardPacks: action.cardPacks.cardPacks,
        cardPacksTotalCount: action.cardPacks.cardPacksTotalCount,
      }
    }
    case 'CARD-PACKS/SET-FILTER-PACK-NAME': {
      return { ...state, params: { ...state.params, packName: action.value } }
    }
    case 'CARD-PACKS/SET-FILTER-PAGE': {
      return { ...state, params: { ...state.params, page: action.value } }
    }
    case 'CARD-PACKS/SET-FILTER-PAGE-COUNT': {
      return { ...state, params: { ...state.params, pageCount: action.value } }
    }
    case 'CARD-PACKS/SET-FILTER-RANGE-SLIDER': {
      return { ...state, params: { ...state.params, min: action.value[0], max: action.value[1] } }
    }
    case 'CARD-PACKS/SET-FILTER-LAST-UPDATE': {
      return { ...state, params: { ...state.params, sortPacks: action.value } }
    }
    case 'CARD-PACKS/SET-USER-ID': {
      return { ...state, params: { ...state.params, user_id: action.value } }
    }
    case 'CARD-PACKS/SET-RESET-FILTER': {
      return { ...state, params: { ...state.params, min: 0, max: 52 } }
    }
    default:
      return state
  }
}

export const setPacksAC = (cardPacks: CardPacksResponseType) => {
  return { type: 'CRUD/SET-PACKS', cardPacks } as const
}

export const filterPageAC = (value: number) => {
  return { type: 'CARD-PACKS/SET-FILTER-PAGE', value } as const
}

export const filterPageCountAC = (value: number) => {
  return { type: 'CARD-PACKS/SET-FILTER-PAGE-COUNT', value } as const
}

export const filterLastUpdateAC = (value: string) => {
  return { type: 'CARD-PACKS/SET-FILTER-LAST-UPDATE', value } as const
}

export const filterPackNameAC = (value: string) => {
  return { type: 'CARD-PACKS/SET-FILTER-PACK-NAME', value } as const
}

export const filterRangeSliderAC = (value: number[]) => {
  return { type: 'CARD-PACKS/SET-FILTER-RANGE-SLIDER', value } as const
}

export const setUserIdAC = (value: Nullable<string>) => {
  return { type: 'CARD-PACKS/SET-USER-ID', value } as const
}

export const filterResetAC = () => {
  return { type: 'CARD-PACKS/SET-RESET-FILTER' } as const
}

export const getPacksTC = (): AppThunk => (dispatch, getState) => {
  dispatch(setAppStatusAC('progress'))

  const params = getState().cardPacks.params

  cardPacksAPI
    .getPacks(params as PacksParamsType)
    .then(res => {
      if (res.data.cardPacks.length) {
        dispatch(setPacksAC(res.data))
        dispatch(setAppStatusAC(null))
      } else {
        dispatch(setPacksAC(res.data))
        dispatch(setAppStatusAC('warning'))
        dispatch(setAppErrorAC('Current Pack not found '))
      }
    })
    .catch((error: AxiosError) => {
      dispatch(setAppStatusAC('error'))
      ServerError(error.message, setAppErrorAC, dispatch)
    })
}

export const addPackTC =
  (packName: string, deckCover: string, isPrivate: boolean): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardPacksAPI
      .addPack(packName, deckCover, isPrivate)
      .then(() => {
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Pack added'))
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

export const deletePackTC =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardPacksAPI
      .deletePack(id)
      .then(() => {
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Delete success'))
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

export const updatePackTC =
  (text: string, deckCover: string, privates: boolean, cardId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardPacksAPI
      .updatePack({ name: text, deckCover: '', private: privates, _id: cardId })
      .then(() => {
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('success'))
        dispatch(setAppErrorAC('Pack updated'))
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
