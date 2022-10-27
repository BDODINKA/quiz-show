import { axiosInstance } from './apiConfig/axiosConfig'

export type CardPacksResponceType = {
  _id?: string
  name?: string
  deckCover?: string
  private?: boolean
}

export const cardPacksAPI = {
  getPacks() {
    return axiosInstance.get('/cards/pack?user_id=635564838187d600045d98e9', {
      params: {
        page: 1,
        pageCount: 10,
      },
    })
  },
  addPack(cardPacks: CardPacksResponceType) {
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
}
