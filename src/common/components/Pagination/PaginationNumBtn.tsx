import React from 'react'

import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

import style from './pagination.module.scss'

type PropsType = {
  setPage: (page: number) => void
  currentPage: number
  totalPages: number[]
  key: number
  page: number
  status: boolean
  selectMenuPages: number[]
  setOpen: (value: boolean) => void
  openDropDown: boolean
  showDropBtn: boolean
}

export const PaginationNumBtn = (props: PropsType) => {
  const finalClass =
    props.page === props.currentPage ? `${style.pagesActive} ${style.pages}` : style.pages

  return (
    <>
      <button
        onClick={() => props.setPage(props.page)}
        className={finalClass}
        disabled={props.status}
        onMouseEnter={() => props.setOpen(false)}
      >
        {props.page}
      </button>
      {props.showDropBtn && (
        <DropDownMenu
          onClick={() => {
            props.setOpen(!props.openDropDown)
          }}
          className={style.drop}
        >
          {props.openDropDown && (
            <div className={style.blockPagesDrop} onMouseLeave={() => props.setOpen(false)}>
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
          )}
          {'...'}
        </DropDownMenu>
      )}
    </>
  )
}
