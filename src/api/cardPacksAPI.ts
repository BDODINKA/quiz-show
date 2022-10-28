import { axiosInstance } from './apiConfig/axiosConfig'

export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  // чьи колоды не обязательно, или придут все
  block?: boolean
}
export type CardPacksResponceType = {
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
  deckCover?: any
}

export const cardPacksAPI = {
  getPacks() {
    return axiosInstance.get('/cards/pack', {
      params: {
        page: 1,
        pageCount: 10,
      },
    })
  },

  addPack(packName: string, deckCover: string, isPrivate: boolean) {
    return axiosInstance.post('/cards/pack', {
      cardPacks: {
        name: 'new  pack',
        private: false,
      },
    })
  },
  deletePack() {
    return axiosInstance.delete('/cards/pack?id=635633448187d600045d9931')
  },

  updatePack(cardsPack: CardPacksResponceType) {
    return axiosInstance.put('/cards/pack', {
      cardsPack: {
        _id: '63569c0865c36e000499fa23',
        name: 'new name',
      },
    })
  },
  filterPacks(data: PacksParamsType) {
    return axiosInstance.get<CardPacksResponceType>('/cards/pack', {
      params: {
        ...data,
      },
    })
  },
}
