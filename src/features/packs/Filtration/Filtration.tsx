import React, { ChangeEvent, useEffect, useState } from 'react'

import { ReactComponent as ResetBtn } from '../../../assets/svg/resetBtn.svg'
import { DoubleRangeSlider } from '../../../common/components/DoubleRangeSlider/DoubleRangeSlider'
import { Search } from '../../../common/components/Search/Search'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { Nullable } from '../../../types/Nullable'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { filterPackNameAC, filterRangeSliderAC, setUserIdAC } from '../Packs-reducer'

import style from './Filtration.module.scss'

type PropsType = {
  user_id?: string
  initialValueSlider: number[]
  paramsId?: Nullable<string>
}
export const Filtration = (props: PropsType) => {
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState<string>('')
  const [rangeValue, setRangeValue] = useState<number[]>(props.initialValueSlider)

  const debounceSearch = useDebounce<string>(searchValue, 700)
  const debounceRange = useDebounce<number[]>(rangeValue, 1000)

  useEffect(() => {
    if (debounceSearch !== '') {
      dispatch(filterPackNameAC(debounceSearch))
    }
    if (debounceRange !== props.initialValueSlider) {
      dispatch(filterRangeSliderAC(debounceRange))
    }
  }, [debounceSearch, debounceRange])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  const getValueInput = (value: number | number[]) => {
    setRangeValue(value as number[])
  }
  const getMyPacks = () => {
    dispatch(setUserIdAC(props.user_id as string))
  }
  const getAllPacks = () => {
    dispatch(setUserIdAC(null))
    dispatch(filterPackNameAC(''))
  }

  const resetFilter = () => {
    setSearchValue('')
    setRangeValue(props.initialValueSlider)
    getAllPacks()
  }

  const finalClassBtnMy = props.paramsId !== null ? `${style.btn} ${style.activeBtn}` : style.btn
  const finalClassBtnAll = props.paramsId === null ? `${style.btn} ${style.activeBtn}` : style.btn

  return (
    <Wrapper className={style.container}>
      <div className={style.boxSearch}>
        <Search onSearchChange={onSearchChange} value={searchValue} className={style.boxSearch} />
      </div>
      <div className={style.boxPacks}>
        <h4 className={style.title}>Show packs cards</h4>
        <div className={style.boxBtn}>
          <SuperButton onClick={getMyPacks} className={finalClassBtnMy} title={'My'} />
          <SuperButton onClick={getAllPacks} className={finalClassBtnAll} title={'All'} />
        </div>
      </div>
      <div className={style.boxRange}>
        <h4 className={style.title}>Number of cards</h4>
        <div className={style.range}>
          <div className={style.rangeWindow}>{rangeValue[0]}</div>
          <DoubleRangeSlider
            getValue={getValueInput}
            currentValue={rangeValue}
            minMaxValue={props.initialValueSlider}
          />
          <div className={style.rangeWindow}>{rangeValue[1]}</div>
        </div>
      </div>
      <ResetBtn className={style.resetIcon} onClick={resetFilter} />
    </Wrapper>
  )
}
