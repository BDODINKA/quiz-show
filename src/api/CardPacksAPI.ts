import { axiosInstance } from "./apiConfig/axiosConfig";

export const cardPacksAPI = {
  getCardPacks() {
    return axiosInstance.get<CardsPackType[]>("/cards/pack");
  },
};

export type CardsPackType = {
  cards: CardsDataType;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

type CardsDataType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: false;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
  deckCover: null;
};
