import { useEffect, useState } from 'react'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { AppDispatch } from '../../types/HooksTypes'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

type AppSearchParamsType = Record<string, string>

export const useAppSearchParams = (setParams: AppSearchParamsType) => {
  const [searchParams, setSearhParams] = useSearchParams()

  useEffect(() => {
    setSearhParams(setParams)
  }, [setParams])

  return searchParams
}
