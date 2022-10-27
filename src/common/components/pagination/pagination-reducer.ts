import { CardsType, paginationAPI } from '../../../api/paginationAPI'
import { RootStateType } from '../../../app/store'
import { AppThunk } from '../../../types/HooksTypes'

export type PaginationStateType = typeof paginationInitState

const paginationInitState = {
  page: 1,
  pageCount: 10,
  cards: {} as CardsType,
}

export type ActionsPaginationType =
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setCardsAC>

export const paginationReducer = (
  state: PaginationStateType = paginationInitState,
  action: ActionsPaginationType
) => {
  switch (action.type) {
    case 'PAGINATION/SET-PAGE': {
      return { ...state, page: action.payload.page }
    }
    case 'PAGINATION/SET-PAGE-COUNT': {
      return { ...state, pageCount: action.payload.pageCount }
    }
    case 'PAGINATION/SET-CARDS': {
      return { ...state, cards: action.payload.cards }
    }
    default:
      return state
  }
}

export const setPageAC = (page: number) => {
  return {
    type: 'PAGINATION/SET-PAGE',
    payload: { page },
  } as const
}
export const setPageCountAC = (pageCount: number) => {
  return {
    type: 'PAGINATION/SET-PAGE-COUNT',
    payload: { pageCount },
  } as const
}
export const setCardsAC = (cards: any) => {
  return {
    type: 'PAGINATION/SET-CARDS',
    payload: { cards },
  } as const
}

export const setPagesTC = (): AppThunk => (dispatch, getState: () => RootStateType) => {
  const page = getState().pagination.page
  const pageCount = getState().pagination.pageCount

  paginationAPI.getPages(page, pageCount).then(res => {
    dispatch(setCardsAC(res.data))
    console.log(res)
  })
}
