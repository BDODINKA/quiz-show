import { axiosInstance } from './apiConfig/axiosConfig'

export type CardsResponseType = {
  cards: []
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}
export type CardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type UpdateCardType = {
  _id: string
  question?: string
}

export const cardAPI = {
  getCards(params: CardsParamsType) {
    return axiosInstance.get<CardsResponseType>('/cards/card', { params })
  },
  addCard() {
    return axiosInstance.post('/cards/card', {})
  },

  deleteCard(_id: string) {
    return axiosInstance.delete(`/cards/card?id=${_id}`)
  },
  updateCard(updateCard: UpdateCardType) {
    return axiosInstance.put('/cards/card', {
      card: {
        _id: '5eb6a2f72f849402d46c6ac7',
        question: 'new question',
      },
    })
  },
}
