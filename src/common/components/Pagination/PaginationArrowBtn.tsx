import React from 'react'

import style from './pagination.module.css'
type PropsType = {
  arrow: 'prev' | 'next'
  setPage: () => void
  disabled: boolean
}
export const PaginationArrowBtn = (props: PropsType) => {
  return props.arrow === 'next' ? (
    <button
      className={`${style.btn} ${style.nextBtn}`}
      onClick={() => props.setPage()}
      disabled={props.disabled}
    ></button>
  ) : (
    <button
      className={`${style.btn} ${style.prevBtn}`}
      onClick={() => props.setPage()}
      disabled={props.disabled}
    ></button>
  )
}
