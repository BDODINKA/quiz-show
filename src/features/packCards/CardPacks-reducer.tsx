import { cardPacksAPI, CardsPackType } from "../../api/CardPacksAPI";
import { AppThunk } from "../../types/HooksTypes";

const CARD_PACKS = "CARDS/PACK";

const initState = {
  cardsPack: [] as CardsPackType[],
};

type InitialStateType = typeof initState;

export const cardPacksAC = (cardsPack: CardsPackType[]) =>
  ({ type: CARD_PACKS, cardsPack } as const);

export type CardPacksActionType = ReturnType<typeof cardPacksAC>;

export const cardPacksReducer = (
  state: InitialStateType = initState,
  action: CardPacksActionType
): InitialStateType => {
  switch (action.type) {
    case "CARDS/PACK": {
      return { ...state, cardsPack: action.cardsPack };
    }
    default:
      return state;
  }
};
export const getCardPacksTC = (): AppThunk => async (dispatch) => {
  const res = await cardPacksAPI.getCardPacks();
  dispatch(cardPacksAC(res.data));
};
