import { axiosInstance } from './apiConfig/axiosConfig'

export type CardsType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  questionImg: string
  answerImg: string
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerVideo: string
  questionVideo: string
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

export type AddAndUpdateCardType = {
  cardsPack_id: string
  _id?: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type GradeCardType = {
  card_id: string
  grade: number
}

export type CardsResponseType = {
  cards: CardsType[]
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

export type ResponseUpdateCard = {
  updatedCard: CardsType
  token: string
  tokenDeathTime: number
}

export type ResponseGradeCardType = {
  updatedGrade: ResponseGradeUpdatedGrade
  token: string
  tokenDeathTime: number
}

export type ResponseGradeUpdatedGrade = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type ResponseDeletedCard = {
  deletedCard: CardsType
  token: string
  tokenDeathTime: number
}

export const cardAPI = {
  getCards(params: CardsParamsType) {
    return axiosInstance.get<CardsResponseType>('/cards/card', { params })
  },

  addCard(card: AddAndUpdateCardType) {
    return axiosInstance.post<CardsResponseType>('/cards/card', { card })
  },

  deleteCard(id: string) {
    return axiosInstance.delete<ResponseDeletedCard>(`/cards/card?id=${id}`)
  },

  updateCard(card: AddAndUpdateCardType) {
    return axiosInstance.put<ResponseUpdateCard>('/cards/card', { card })
  },

  changeRatingCard(grade: GradeCardType) {
    return axiosInstance.put<ResponseGradeCardType>('/cards/grade', grade)
  },
}
