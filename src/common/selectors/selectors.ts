import { RootStateType } from '../../app/store'
export const selectorStatus = (state: RootStateType) => state.app.status

export const selectorIsLogin = (state: RootStateType) => state.auth.isLoggedIn

export const selectorError = (state: RootStateType) => state.app.error

export const selectorPackParams = (state: RootStateType) => state.cardPacks.params

export const selectorCardPacks = (state: RootStateType) => state.cardPacks.cardPacks

export const selectorPacksTotalCount = (state: RootStateType) => state.cardPacks.cardPacksTotalCount

export const selectorProfileId = (state: RootStateType) => state.profile.profile?._id

export const selectorCards = (state: RootStateType) => state.card.cards
export const selectorPackDeckCover = (state: RootStateType) => state.card.packDeckCover
export const selectorPackUserId = (state: RootStateType) => state.card.packUserId

export const selectorPackName = (state: RootStateType) => state.card.packName
export const selectorMinGrade = (state: RootStateType) => state.card.minGrade
export const selectorMaxGrade = (state: RootStateType) => state.card.maxGrade
export const selectorCardsTotalCount = (state: RootStateType) => state.card.cardsTotalCount
export const selectorCardsParams = (state: RootStateType) => state.card.params
