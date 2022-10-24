import { axiosInstance } from "./apiConfig/axiosConfig";

export type CardsPackType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

export const cardPacksAPI = {
  getCardPacks() {
    return axiosInstance.get<CardsPackType[]>("/cards/pack");
  },
};
