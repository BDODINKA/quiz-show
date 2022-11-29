import React from 'react'

import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

import style from './pagination.module.css'

type PropsType = {
  setPage: (page: number) => void
  currentPage: number
  totalPages: number[]
  key: number
  page: number
  status: boolean
  selectMenuPages: number[]
  setOpen: () => void
  openDropDown: boolean
  showDropBtn: boolean
}

export const PaginationNumBtn = (props: PropsType) => {
  console.log(props.page)
  console.log(props.currentPage)

  const finalClass =
    props.page === props.currentPage ? `${style.pagesActive} ${style.pages}` : style.pages

  return (
    <>
      <button
        onClick={() => props.setPage(props.page)}
        className={finalClass}
        disabled={props.status}
      >
        {props.page}
      </button>
      {props.showDropBtn && (
        <div onClick={() => props.setOpen()} className={style.drop}>
          {props.openDropDown && (
            <DropDownMenu closeMenu={() => props.setOpen()}>
              <div className={style.blockPagesDrop}>
                {props.selectMenuPages.map(p => (
                  <button
                    key={p}
                    className={
                      p === props.currentPage ? `${style.pagesActive} ${style.pages}` : style.pages
                    }
                    onClick={() => props.setPage(p)}
                    disabled={props.status}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </DropDownMenu>
          )}
          {'...'}
        </div>
      )}
    </>
  )
}
