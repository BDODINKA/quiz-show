import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { SuperInput } from '../SuperInputText/SuperInput'

import style from './Search.module.css'

type PropsType = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  clearSearchHandler?: () => void
  value: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Search = (props: PropsType) => {
  const className = props.className
  const finalClassName = className ? `${style.search} ${className}` : style.search

  return (
    <>
      <span className={style.span}>Search</span>
      <SuperInput
        onChange={props.onSearchChange}
        onClick={props.clearSearchHandler}
        className={finalClassName}
        placeholder={'Provide your text'}
        value={props.value}
      />
    </>
  )
}
