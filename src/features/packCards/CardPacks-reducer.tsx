import { cardPacksAPI, CardsPackType } from "../../api/CardPacksAPI";
import { AppThunk } from "../../types/HooksTypes";

const CARD_PACKS = "CARDS/PACK";

const initState = {
  cardPacks: [] as CardsPackType[],
};

type InitialStateType = typeof initState;

export const cardPacksAC = (cardPacks: CardsPackType[]) =>
  ({ type: CARD_PACKS, cardPacks } as const);

export type CardPacksActionType = ReturnType<typeof cardPacksAC>;

export const cardPacksReducer = (
  state: InitialStateType = initState,
  action: CardPacksActionType
): InitialStateType => {
  switch (action.type) {
    case "CARDS/PACK": {
      return { ...state, cardPacks: action.cardPacks };
    }
    default:
      return state;
  }
};

export const getCardPacksTC = (): AppThunk => async (dispatch) => {
  const res = await cardPacksAPI.getCardPacks();
  dispatch(cardPacksAC(res.data));
};
