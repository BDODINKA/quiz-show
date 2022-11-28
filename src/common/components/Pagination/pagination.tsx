import React, { ChangeEvent, useState } from 'react'

import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

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
  const [open, setOpen] = useState<boolean>(false)

  const totalPages: number[] = []

  const selectMenuPages: number[] = []

  const maxPages = Math.ceil(props.totalCount / props.pageCount)

  for (let i = 1; i < maxPages; i++) {
    selectMenuPages.push(i)
  }

  for (let i = props.currentPage; i < maxPages; i++) {
    totalPages.push(i)
  }

  const setPage = (value: number) => {
    if (value > 0 && value < maxPages && value !== props.currentPage) {
      props.setPage(value)
    }
  }

  const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value)

    props.setPageCount(value)
  }

  totalPages.length = props.maxPages

  return maxPages !== 1 ? (
    <div className={style.container}>
      <button
        className={`${style.btn} ${style.prevBtn}`}
        onClick={() => setPage(props.currentPage - 1)}
      ></button>
      <div className={style.blockPages}>
        {totalPages.map((page, i) =>
          i === totalPages.length - 2 ? (
            <div key={page} style={{ display: 'flex' }}>
              <div
                onClick={() => setPage(page)}
                className={
                  page === props.currentPage ? `${style.pagesActive} ${style.pages}` : style.pages
                }
              >
                {page}
              </div>
              <div onClick={() => setOpen(!open)}>
                {open && (
                  <DropDownMenu closeMenu={() => setOpen(!open)}>
                    <div
                      className={style.blockPages}
                      style={{ width: '500px', overflowX: 'scroll' }}
                    >
                      {selectMenuPages.map(p => (
                        <div
                          key={p}
                          className={
                            p === props.currentPage
                              ? `${style.pagesActive} ${style.pages}`
                              : style.pages
                          }
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </DropDownMenu>
                )}
                open
              </div>
            </div>
          ) : (
            <div
              key={page}
              onClick={() => setPage(page)}
              className={
                page === props.currentPage ? `${style.pagesActive} ${style.pages}` : style.pages
              }
            >
              {page}
            </div>
          )
        )}
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
