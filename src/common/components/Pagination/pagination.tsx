import React, { ChangeEvent } from 'react'

import style from './pagination.module.css'

type PropsType = {
  pageCount: number
  currentPage: number
  totalCount: number
  setPage: (value: number) => void
  setPageCount: (value: number) => void
  maxPages: number
}

export const Pagination = (props: PropsType) => {
  const totalPages = []
  const maxPages = Math.ceil(props.totalCount / props.pageCount)

  const pages = maxPages >= props.maxPages ? props.currentPage + props.maxPages : maxPages

  for (let i = props.currentPage; i < pages; i++) {
    totalPages.push(i)
  }

  const setPage = (value: number) => {
    if (value > 0 && value < pages) {
      props.setPage(value)
    }
  }

  const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value)

    props.setPageCount(value)
  }

  return totalPages.length ? (
    <div className={style.container}>
      <button
        className={`${style.btn} ${style.prevBtn}`}
        onClick={() => setPage(props.currentPage - 1)}
      ></button>
      <div className={style.blockPages}>
        {totalPages.map(page => (
          <div
            key={page}
            onClick={() => setPage(page)}
            className={
              page === props.currentPage ? `${style.pagesActive} ${style.pages}` : style.pages
            }
          >
            {page}
          </div>
        ))}
      </div>
      <button
        className={`${style.btn} ${style.nextBtn}`}
        onClick={() => setPage(props.currentPage + 1)}
      ></button>
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
  ) : null
}
