import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { RootStateType } from '../../app/store'
import { AppDispatch } from '../../types/HooksTypes'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
