import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../types/HooksTypes'

export const useAppDispatch = () => useDispatch<AppDispatch>()
