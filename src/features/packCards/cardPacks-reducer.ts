import { AxiosError } from 'axios'

import {
  CardPacks,
  cardPacksAPI,
  CardPacksResponceType,
  PacksParamsType,
} from '../../api/cardPacksAPI'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { RootStateType } from '../../app/store'
import { AppThunk } from '../../types/HooksTypes'
import { Nullable } from '../../types/Nullable'
import { ServerError } from '../../utils/ServerErrorHandler'

type CurrentPackType = 'All' | 'My'
type InitialStateType = typeof initialState
const initialState = {
  cardPacks: null as Nullable<CardPacks[]>,
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: null as Nullable<number>,
  minCardsCount: null as Nullable<number>,
  maxCardsCount: null as Nullable<number>,
  token: null as Nullable<string>,
  tokenDeathTime: null as Nullable<number>,
  currentPack: 'All' as CurrentPackType,
  // params: {
  //   userIs: '',
  //   //  ...
  // },
}

export type CardPacksActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof addPackAC>
  | ReturnType<typeof deletePackAC>
  | ReturnType<typeof updatePackAC>
  | ReturnType<typeof filterPackAC>
  | ReturnType<typeof setFilterBtnAC>

export const cardPacksReducer = (
  state = initialState,
  action: CardPacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CRUD/SET-PACKS': {
      return { ...state, ...action.cardPacks }
    }
    case 'CARD-PACKS/SET-FILTER-BTN': {
      return { ...state, currentPack: action.value }
    }
    case 'CARD-PACKS/FILTER': {
      return { ...state, ...action.packsCard }
    }
    default:
      return state
  }
}

export const setPacksAC = (cardPacks: CardPacksResponceType) => {
  return { type: 'CRUD/SET-PACKS', cardPacks } as const
}
export const addPackAC = (packs: CardPacksResponceType) => {
  return { type: 'CRUD/ADD-PACKS', packs } as const
}
export const deletePackAC = (id: string) => {
  return { type: 'CRUD/DELETE-PACKS', id } as const
}
export const updatePackAC = (packsCard: CardPacksResponceType) => {
  return { type: 'CRUD/UPDATE-PACKS', packsCard } as const
}

export const filterPackAC = (packsCard: CardPacksResponceType) => {
  return { type: 'CARD-PACKS/FILTER', packsCard } as const
}

export const setFilterBtnAC = (value: CurrentPackType) => {
  return { type: 'CARD-PACKS/SET-FILTER-BTN', value } as const
}

export const getPacksTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('progress'))
  cardPacksAPI.getPacks().then(res => {
    dispatch(setPacksAC(res.data))
    dispatch(setAppStatusAC('success'))
    dispatch(setAppErrorAC('Packs loading success'))
  })
}

export const addPackTC =
  (packName: string, deckCover: string, isPrivate: boolean): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('progress'))
    cardPacksAPI
      .addPack(packName, deckCover, isPrivate)
      .then(res => {
        console.log(res.data)
        dispatch(filterPackTC())
        dispatch(setAppStatusAC('success'))
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
        dispatch(filterPackTC())
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
  (cardsPack: CardPacksResponceType): AppThunk =>
  dispatch => {
    cardPacksAPI.updatePack(cardsPack).then(res => {
      console.log(res)
    })
  }

export const setFilterBtnTC =
  (value: string): AppThunk =>
  dispatch => {
    dispatch(setFilterBtnAC(value as CurrentPackType))
  }

export const filterPackTC =
  (filter?: PacksParamsType): AppThunk =>
  (dispatch, getState: () => RootStateType) => {
    const { page, pageCount, currentPack } = getState().cardPacks
    const user_id = getState().profile.profile?._id

    const filters = currentPack === 'All' ? filter : { ...filter, user_id }

    dispatch(setAppStatusAC('progress'))

    cardPacksAPI
      .filterPacks({ page, pageCount, ...filters })
      .then(res => {
        if (res.data.cardPacks.length) {
          dispatch(filterPackAC(res.data))
          dispatch(setAppStatusAC(null))
        } else {
          dispatch(filterPackAC(res.data))
          dispatch(setAppStatusAC('warning'))
          dispatch(setAppErrorAC('Current Pack not found '))
        }
      })
      .catch((error: AxiosError) => {
        dispatch(setAppStatusAC('error'))
        ServerError(error.message, setAppErrorAC, dispatch)
      })
  }
