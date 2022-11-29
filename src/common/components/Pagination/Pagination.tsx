import React, { ChangeEvent, useEffect, useState } from 'react'

import { getPaginationPage } from '../../../utils/getPaginationPage'
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
type pagesType = {
  totalPages: number[]
  selectMenuPages: number[]
}
export const Pagination = (props: PropsType) => {
  const status = useAppSelector(selectorStatus)
  const [open, setOpen] = useState<boolean>(false)
  const [pagesObj, setPagesObj] = useState({} as pagesType)

  const maxPages = Math.ceil(props.totalCount / props.pageCount)

  useEffect(() => {
    setPagesObj(
      getPaginationPage({
        maxPages,
        pageCount: props.pageCount,
        totalCount: props.totalCount,
        currentPage: props.currentPage,
        maxBtn: props.maxPages,
      })
    )
  }, [maxPages])

  const setPage = (value: number) => {
    if (value > 0 && value <= maxPages && value !== props.currentPage) {
      props.setPage(value)
    }
  }

  const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value)

    props.setPageCount(value)
  }

  if (!pagesObj.totalPages) return null

  return (
    <div className={style.container}>
      <PaginationArrowBtn
        arrow={'prev'}
        setPage={() => setPage(props.currentPage - 1)}
        disabled={status === 'progress'}
      />
      <div className={style.blockPages}>
        {pagesObj.totalPages.map((page, i) => (
          <PaginationNumBtn
            setOpen={() => setOpen(!open)}
            key={page}
            setPage={page => setPage(page)}
            page={pagesObj.totalPages.length - 1 === i ? maxPages : page}
            selectMenuPages={pagesObj.selectMenuPages}
            totalPages={pagesObj.totalPages}
            status={status === 'progress'}
            currentPage={props.currentPage}
            openDropDown={open}
            showDropBtn={i === pagesObj.totalPages.length - 2}
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
