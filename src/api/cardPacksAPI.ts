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
export type CardPacksResponseType = {
  cardPacks: CardPacks[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
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
export type DeleteType = {
  deletedCardsPack: DeleteTypeDeletedCardsPack
  token: string
  tokenDeathTime: number
}
export type DeleteTypeDeletedCardsPack = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export type AddPackType = {
  newCardsPack: AddPackTypeNewCardsPack
  token: string
  tokenDeathTime: number
}
export type AddPackTypeNewCardsPack = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export type CardsPackUpdateType = {
  _id: string
  name: string
  deckCover: string
  private: boolean
}

export const cardPacksAPI = {
  // getPacks(data: PacksParamsType) {
  //   return axiosInstance.get<CardPacksResponseType>('/cards/pack', {
  //     params: {
  //       ...data,
  //     },
  //   })
  // },

  getPacks(params: PacksParamsType) {
    return axiosInstance.get<CardPacksResponseType>('/cards/pack', { params })
  },

  addPack(packName: string, deckCover: string, isPrivate: boolean) {
    return axiosInstance.post<AddPackType>('/cards/pack', {
      cardsPack: {
        name: packName,
        deckCover: deckCover,
        private: isPrivate,
      },
    })
  },

  deletePack(id: string) {
    return axiosInstance.delete<DeleteType>('/cards/pack', {
      params: {
        id: id,
      },
    })
  },

  updatePack(cardsPack: CardsPackUpdateType) {
    return axiosInstance.put('/cards/pack', { cardsPack })
  },
}
