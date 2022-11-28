import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

type AppSearchParamsType = Record<string, string>

export const useAppSearchParams = (setParams: AppSearchParamsType) => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams(setParams)
  }, [setParams])

  return searchParams
}
