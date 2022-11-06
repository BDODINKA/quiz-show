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
export type AddCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: 0 | 1 | 2 | 3 | 4 | 5
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateCardType = {
  _id: string
  question?: string
  answer?: string
  grade?: 0 | 1 | 2 | 3 | 4 | 5
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export const cardAPI = {
  getCards(params: CardsParamsType) {
    return axiosInstance.get<CardsResponseType>('/cards/card', { params })
  },
  addCard(card: AddCardType) {
    return axiosInstance.post('/cards/card', { card: card })
  },

  deleteCard(_id: string) {
    return axiosInstance.delete(`/cards/card?id=${_id}`)
  },
  updateCard(updateCard: UpdateCardType) {
    return axiosInstance.put('/cards/card', {
      card: {
        _id: updateCard._id,
        question: updateCard.question,
        answer: updateCard.answer,
      },
    })
  },
}
