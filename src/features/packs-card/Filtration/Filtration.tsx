import React, { ChangeEvent, useEffect, useState } from 'react'

import { DoubleRangeSlider } from '../../../common/components/DoubleRangeSlider/DoubleRangeSlider'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import SuperInput from '../../../common/components/SuperInputText/SuperInput'
import { useAppDispatch, useDebounce } from '../../../utils/hooks/customHooks'

import style from './Filtration.module.css'

const initialValueSlider = [2, 52]

const Filtration = () => {
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState<string>('')
  const [rangeValue, setRangeValue] = useState<number[]>(initialValueSlider)

  const debounce = useDebounce<string>(searchValue, 700)

  useEffect(() => {
    if (debounce !== '') {
      console.log(debounce)
    }
  }, [debounce])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  const getValueInput = (value: number | number[]) => {
    setRangeValue(value as number[])
  }
  const getMyPacks = () => {
    console.log('getMyPack')
  }
  const getAllPacks = () => {
    console.log('getAllPack')
  }
  const resetFilter = () => {
    setSearchValue('')
    setRangeValue(initialValueSlider)
    getAllPacks()
  }

  return (
    <div className={style.container}>
      <div className={style.boxSearch}>
        <span className={style.span}>Search</span>
        <SuperInput
          onChange={onSearchChange}
          className={style.search}
          placeholder={'Provide your text'}
        />
      </div>
      <div className={style.boxPacks}>
        <span className={style.span}>Show packs cards</span>
        <div className={style.boxBtn}>
          <SuperButton onClick={getMyPacks} className={style.btn} title={'My'} />
          <SuperButton onClick={getAllPacks} className={style.btn} title={'All'} />
        </div>
      </div>
      <div className={style.boxRange}>
        <span className={style.span}>Number of cards</span>
        <div className={style.range}>
          <div className={style.rangeWindow}>{rangeValue[0]}</div>
          <DoubleRangeSlider
            initialValue={initialValueSlider}
            getValue={getValueInput}
            currentValue={rangeValue}
          />
          <div className={style.rangeWindow}>{rangeValue[1]}</div>
        </div>
      </div>
      <SuperButton onClick={resetFilter} className={style.reset} />
    </div>
  )
}

export default Filtration
