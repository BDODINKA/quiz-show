import { axiosInstance } from './apiConfig/axiosConfig'

export const paginationAPI = {
  getPages: (page: number, pageCount: number) => {
    return axiosInstance.get<CardsType>('/cards/pack', {
      params: {
        page,
        pageCount,
      },
    })
  },
}
export type CardsType = {
  cardPacks: CardsTypeCardPacks[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type CardsTypeCardPacks = {
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
