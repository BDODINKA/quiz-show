import { axiosInstance } from './apiConfig/axiosConfig'

export type CardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: any
  page?: number
  pageCount?: number
}

export type CardResponceType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer?: string
  question?: string
  grade?: number
  shots?: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export const cardAPI = {
  getCards(cardsPack_id: string) {
    return axiosInstance.get(`/cards/card?cardsPack_id=${cardsPack_id}`)
  },

  addCard(card: CardType) {
    return axiosInstance.post('/cards/card', {
      card: {
        cardsPack_id: card.cardsPack_id,
        question: card.question,
        answer: card.answer,
        grade: card.grade,
        shots: card.shots,
      },
    })
  },

  deleteCard(_id: string) {
    return axiosInstance.delete(`/cards/card?id=${_id}`)
  },

  updateCard(card: CardType) {
    return axiosInstance.put('/cards/card', {
      card: {
        _id: card._id,
        cardsPack_id: card.cardsPack_id,
        question: card.question,
        answer: card.answer,
      },
    })
  },
}
