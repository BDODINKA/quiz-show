import { axiosInstance } from './apiConfig/axiosConfig'

export type CardResponceType = {
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
}

export const cardAPI = {
  getCards() {
    return axiosInstance.get('/cards/card?cardsPack_id=6357f1cb61a8d500046944c9')
  },
  addCard(card: CardResponceType) {
    return axiosInstance.post('/cards/card', {
      card: {
        cardsPack_id: '6357f1cb61a8d500046944c9',
        question: 'no question',
        answer: 'no answer',
        grade: 0,
        shots: 0,
      },
    })
  },
  deleteCard() {
    return axiosInstance.delete('/cards/card?id=')
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
