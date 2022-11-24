import { axiosInstance } from './apiConfig/axiosConfig'

export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string // чьи колоды не обязательно, или придут все
  block?: boolean
}

export type CardPacks = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover?: string
}

export type ResponseDeletePackType = {
  deletedCardsPack: CardPacks
  token: string
  tokenDeathTime: number
}

export type ResponseUpdatePackType = {
  updatedCardsPack: CardPacks
  token: string
  tokenDeathTime: number
}

export type ResponseCardPacksType = {
  cardPacks: CardPacks[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type AddPackType = {
  newCardsPack: CardPacks
  token: string
  tokenDeathTime: number
}

export type CardsPackUpdateType = {
  _id: string
  name: string
  deckCover: string
  private: boolean
}

export type CardsPackAddType = {
  name: string
  deckCover: string
  private: boolean
}

export const cardPacksAPI = {
  getPacks(params: PacksParamsType) {
    return axiosInstance.get<ResponseCardPacksType>('/cards/pack', { params })
  },

  addPack(cardsPack: CardsPackAddType) {
    return axiosInstance.post<AddPackType>('/cards/pack', { cardsPack })
  },

  deletePack(id: string) {
    return axiosInstance.delete<ResponseDeletePackType>('/cards/pack', {
      params: {
        id,
      },
    })
  },

  updatePack(cardsPack: CardsPackUpdateType) {
    return axiosInstance.put<ResponseUpdatePackType>('/cards/pack', { cardsPack })
  },
}
