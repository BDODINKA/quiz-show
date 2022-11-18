import { CardsType } from '../../../api/cardAPI'
import { RootStateType } from '../../../app/store'
import { AppThunk } from '../../../types/HooksTypes'
import { Nullable } from '../../../types/Nullable'
import { getRandomCard } from '../../../utils/getRandomCard'

type learnStateType = typeof learnState
export type LearnActionsType = ReturnType<typeof setCardAC>

const learnState = {
  card: null as Nullable<CardsType>,
}

export const learnReducer = (state: learnStateType = learnState, action: LearnActionsType) => {
  switch (action.type) {
    case 'LEARN/SET-LEARN-CARD': {
      return { card: action.payload }
    }
    default: {
      return state
    }
  }
}

export const setCardAC = (card: CardsType) => {
  return {
    type: 'LEARN/SET-LEARN-CARD',
    payload: card,
  } as const
}

export const getCardTC =
  (cardId?: string): AppThunk =>
  (dispatch, getState: () => RootStateType) => {
    const cards = getState().card.cards

    if (cardId) {
      const card = cards && cards.filter(c => c._id === cardId)

      card && dispatch(setCardAC(new Object(...card) as CardsType))
    } else {
      const random = getRandomCard(cards as CardsType[])

      dispatch(setCardAC(random))
    }
  }
