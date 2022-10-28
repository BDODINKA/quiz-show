import React, { ChangeEvent, useEffect, useState } from 'react'

import { DoubleRangeSlider } from '../../../common/components/DoubleRangeSlider/DoubleRangeSlider'
import Search from '../../../common/components/Search/Search'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppDispatch, useDebounce } from '../../../utils/hooks/customHooks'
import { filterPackTC, getPacksTC } from '../cardPacks-reducer'

import style from './Filtration.module.css'

const initialValueSlider = [2, 52]

type PropsType = {
  id?: string
  activeBtnHandler: (value: string) => void
  showActive: string
}
export const Filtration = (props: PropsType) => {
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState<string>('')
  const [rangeValue, setRangeValue] = useState<number[]>(initialValueSlider)

  const debounceSearch = useDebounce<string>(searchValue, 700)
  const debounceRange = useDebounce<number[]>(rangeValue, 1000)

  useEffect(() => {
    if (debounceSearch !== '') {
      dispatch(filterPackTC({ packName: debounceSearch }))
      setTimeout(() => {
        setSearchValue('')
      }, 20000)
    }
    if (debounceRange !== initialValueSlider) {
      dispatch(filterPackTC({ min: debounceRange[0], max: debounceRange[1] }))
    }
  }, [debounceSearch, debounceRange])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  const getValueInput = (value: number | number[]) => {
    setRangeValue(value as number[])
  }
  const getMyPacks = () => {
    props.activeBtnHandler('My')
    dispatch(filterPackTC({ user_id: props.id }))
  }
  const getAllPacks = () => {
    props.activeBtnHandler('All')
    dispatch(getPacksTC())
  }
  const resetFilter = () => {
    setSearchValue('')
    setRangeValue(initialValueSlider)
    getAllPacks()
  }

  const finalClassBtnMy = props.showActive === 'My' ? `${style.btn} ${style.activeBtn}` : style.btn
  const finalClassBtnAll =
    props.showActive === 'All' ? `${style.btn} ${style.activeBtn}` : style.btn

  return (
    <div className={style.container}>
      <div className={style.boxSearch}>
        <Search onSearchChange={onSearchChange} value={searchValue} />
      </div>
      <div className={style.boxPacks}>
        <span className={style.span}>Show packs cards</span>
        <div className={style.boxBtn}>
          <SuperButton onClick={getMyPacks} className={finalClassBtnMy} title={'My'} />
          <SuperButton onClick={getAllPacks} className={finalClassBtnAll} title={'All'} />
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
