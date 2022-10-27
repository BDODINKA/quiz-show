import React, { ChangeEvent } from 'react'

import SuperInput from '../SuperInputText/SuperInput'

import style from './Search.module.css'

type PropsType = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
}

const Search = (props: PropsType) => {
  return (
    <>
      <span className={style.span}>Search</span>
      <SuperInput
        onChange={props.onSearchChange}
        className={style.search}
        placeholder={'Provide your text'}
        value={props.value}
      />
    </>
  )
}

export default Search
