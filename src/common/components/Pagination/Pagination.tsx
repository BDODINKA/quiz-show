import React, { ChangeEvent, useState } from 'react'

import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { selectorStatus } from '../../selectors/selectors'

import style from './pagination.module.css'
import { PaginationArrowBtn } from './PaginationArrowBtn'
import { PaginationNumBtn } from './PaginationNumBtn'

type PropsType = {
  pageCount: number
  currentPage: number
  totalCount: number
  setPage: (value: number) => void
  setPageCount: (value: number) => void
  maxPages: number
}

export const Pagination = (props: PropsType) => {
  const status = useAppSelector(selectorStatus)

  const [open, setOpen] = useState<boolean>(false)
  const maxPages = Math.ceil(props.totalCount / props.pageCount)

  let totalPages: number[] = []

  const selectMenuPages: number[] = []

  if (props.totalCount && props.currentPage) {
    if (maxPages <= 6) {
      for (let i = 1; i <= props.pageCount; i++) {
        totalPages.push(i)
      }
    } else if (props.currentPage >= 4 && props.currentPage !== maxPages) {
      for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
        totalPages.push(i)
      }
    } else if (props.currentPage >= 4 && props.currentPage === maxPages) {
      for (let i = props.currentPage - 4; i <= props.currentPage; i++) {
        totalPages.push(i)
      }
    } else if (props.currentPage <= maxPages) {
      totalPages = Array(props.maxPages)
        .fill(0)
        .map((_, i) => i + 1)
    }
  }

  for (let i = 1; i < maxPages + 1; i++) {
    selectMenuPages.push(i)
  }

  const setPage = (value: number) => {
    if (value > 0 && value <= maxPages && value !== props.currentPage) {
      props.setPage(value)
    }
  }

  const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value)

    props.setPageCount(value)
  }

  if (!totalPages.length) return null

  return (
    <div className={style.container}>
      <PaginationArrowBtn
        arrow={'prev'}
        setPage={() => setPage(props.currentPage - 1)}
        disabled={status === 'progress'}
      />
      <div className={style.blockPages}>
        {totalPages.map((page, i) => (
          <PaginationNumBtn
            setOpen={() => setOpen(!open)}
            key={page}
            setPage={page => setPage(page)}
            page={totalPages.length - 1 === i ? maxPages : page}
            selectMenuPages={selectMenuPages}
            totalPages={totalPages}
            status={status === 'progress'}
            currentPage={props.currentPage}
            openDropDown={open}
            showDropBtn={i === totalPages.length - 2}
          />
        ))}
      </div>
      <PaginationArrowBtn
        arrow={'next'}
        setPage={() => setPage(props.currentPage + 1)}
        disabled={status === 'progress'}
      />
      <div className={style.selectBlock}>
        Show
        <select value={props.pageCount} onChange={setPageCount} className={style.select}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        Cards per Page
      </div>
    </div>
  )
}
