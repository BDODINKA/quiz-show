import React from 'react'

import { Pagination } from '../../common/components/pagination/pagination'
import { useAppDispatch } from '../../utils/hooks/customHooks'

const Cards = () => {
  const dispatch = useAppDispatch()

  return (
    <Pagination
      pageCount={10}
      currentPage={2}
      setPage={value => {}}
      setPageCount={value => {}}
      totalCount={200}
      maxPages={5}
    />
  )
}

export default Cards
