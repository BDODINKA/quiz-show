import { RootStateType } from '../../app/store'

export const selectorCardPacks = (state: RootStateType) => state.cardPacks.cardPacks
export const selectorTotalCount = (state: RootStateType) => state.cardPacks.cardPacksTotalCount
export const selectorProfileId = (state: RootStateType) => state.profile.profile?._id
export const selectorIsLogin = (state: RootStateType) => state.auth.isLoggedIn
export const selectorParams = (state: RootStateType) => state.cardPacks.params
export const selectorStatus = (state: RootStateType) => state.app.status
