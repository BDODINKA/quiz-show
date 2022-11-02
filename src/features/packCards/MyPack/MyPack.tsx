import React, { useEffect, useMemo } from 'react'

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { string } from 'yup'

import { RootStateType } from '../../../app/store'
import { Pagination } from '../../../common/components/pagination/pagination'
import Search from '../../../common/components/Search/Search'
import { maxPaginationPage } from '../../../common/constants/pagination'
import { PATH } from '../../../common/routes/const-routes'
import {
  selectorCards,
  selectorCardsParams,
  selectorCardsTotalCount,
  selectorIsLogin,
  selectorMaxGrade,
  selectorMinGrade,
  selectorPackName,
  selectorPackUserId,
  selectorProfileId,
} from '../../../common/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import { TitleAndButtonPack } from '../TitleAndButtonPack'
import style from '../TitleAndButtonPack.module.css'

import dots from './../../../assets/img/Table/dots.svg'
import { getCardsTC, setPackCardsIdAC } from './my-pack-reducer'
import s from './MyPack.module.css'
import { TableMyPack } from './TableMyPack'

export const MyPack = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectorCards)
  const packUserId = useAppSelector(selectorPackUserId)
  const packName = useAppSelector(selectorPackName)
  const minGrade = useAppSelector(selectorMinGrade)
  const maxGrade = useAppSelector(selectorMaxGrade)
  const cardsTotalCount = useAppSelector(selectorCardsTotalCount)
  const profileId = useAppSelector(selectorProfileId)
  const cardsParams = useAppSelector(selectorCardsParams)
  const isLogin = useAppSelector(selectorIsLogin)

  const [search, setSearch] = useSearchParams()

  const location = useLocation()

  useEffect(() => {
    if (isLogin) {
      setSearch({ id: cardsParams.cardsPack_id as string })
      dispatch(getCardsTC(String(search.get('id'))))
    } else {
      navigate(PATH.LOGIN_PAGE)
    }
  }, [isLogin, cardsParams])

  useEffect(() => {
    sessionStorage.setItem('url', `${location.pathname}?${search}`)
  }, [])

  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleAndButtonPack
          titlePack={packName as string}
          titleButton={packUserId === profileId ? 'Add new card' : 'Learn to pack'}
          image={<img className={s.dots} src={dots} alt="dots" />}
          onClick={() => {}}
        />
        <Search onSearchChange={() => {}} value={''} className={s.search} />
        <TableMyPack cards={cards} minGrade={minGrade} maxGrade={maxGrade} profileId={profileId} />
      </div>
    </div>
  )
}
