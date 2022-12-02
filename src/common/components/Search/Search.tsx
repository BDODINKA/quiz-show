import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { SuperInput } from '../SuperInputText/SuperInput'

import style from './Search.module.scss'

type PropsType = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  clearSearchHandler?: () => void
  value: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Search = (props: PropsType) => {
  const { className } = props
  const finalClassName = className ? `${style.search} ${className}` : style.search

  return (
    <>
      <h4 className={style.title}>Search</h4>
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
