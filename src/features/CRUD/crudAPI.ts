import axios, { AxiosResponse } from 'axios'

export type CardPacksResponceType = {
    _id?: string
    name?: string,
    deckCover?: string,
    private?: boolean
}
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


export const instance = axios.create({
    baseURL:
    // process.env.REACT_APP_BACK_URL ||
    // 'http://localhost:7542/2.0/' ||
        'https://neko-back.herokuapp.com/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const crudAPI = {
    getPacks () {
        return instance.get(
            "/cards/pack?user_id=635564838187d600045d98e9",
            {
                params: {
                    page: 1,
                    pageCount:10
                }
            }
        )
    },
    addPack (cardsPack: CardPacksResponceType) {
        return instance.post(
            "/cards/pack", {
                cardsPack: {
                    name: 'new  pack'
                }
            }

        )
    },
    deletePack () {
        return instance.delete(
            '/cards/pack?id=635633448187d600045d9931'
        )
    },
    updatePack (cardsPack: CardPacksResponceType) {
        return instance.put(
          '/cards/pack', {
              cardsPack: {
                  _id: '63569c0865c36e000499fa23',
                  name: 'new name'
              }
            }

        )
    },
    getCards () {
        return instance.get(
            '/cards/card?cardsPack_id=6357f1cb61a8d500046944c9'
        )
    },
    addCard (card: CardResponceType) {
        return instance.post(
            '/cards/card', {
                card: {
                    cardsPack_id: '6357f1cb61a8d500046944c9'
                }
            }
        )
    },
    deleteCard () {
        return instance.delete(
            '/cards/card?id='
        )
    },
    updateCard (updateCard: UpdateCardType) {
        return instance.put(
            '/cards/card', {
                card: {
                    _id: "5eb6a2f72f849402d46c6ac7",
                    question: "new question"
                }
            }
        )
    }
}