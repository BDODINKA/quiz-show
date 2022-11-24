import { RootStateType } from '../../app/store'

export const selectorStatus = (state: RootStateType) => state.app.status
export const selectorIsInitialize = (state: RootStateType) => state.app.isInitialize
export const selectorError = (state: RootStateType) => state.app.error

export const selectorIsLogin = (state: RootStateType) => state.auth.isLoggedIn

export const selectorProfile = (state: RootStateType) => state.profile.profile
export const selectorProfileId = (state: RootStateType) => state.profile.profile?._id

export const selectorPackParams = (state: RootStateType) => state.packs.params
export const selectorCardPacks = (state: RootStateType) => state.packs.cardPacks
export const selectorPacksTotalCount = (state: RootStateType) => state.packs.cardPacksTotalCount

export const selectorCards = (state: RootStateType) => state.card.cards
export const selectorPackDeckCover = (state: RootStateType) => state.card.packDeckCover
export const selectorPackUserId = (state: RootStateType) => state.card.packUserId
export const selectorPackName = (state: RootStateType) => state.card.packName
export const selectorMinGrade = (state: RootStateType) => state.card.minGrade
export const selectorMaxGrade = (state: RootStateType) => state.card.maxGrade
export const selectorCardsTotalCount = (state: RootStateType) => state.card.cardsTotalCount
export const selectorCardsParams = (state: RootStateType) => state.card.params
