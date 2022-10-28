import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { Pagination } from '../../../common/components/pagination/pagination'
import Search from '../../../common/components/Search/Search'
import { maxPaginationPage } from '../../../common/constants/pagination'
import { LoginPage } from '../../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import { filterPackTC, getPacksTC } from '../cardPacks-reducer'
import { TitleAndButtonPack } from '../TitleAndButtonPack'
import style from '../TitleAndButtonPack.module.css'

import dots from './../../../assets/img/Table/dots.svg'
import s from './MyPack.module.css'
import { TableMyPack } from './TableMyPack'

const selectorCardPacks = (state: RootStateType) => state.cardPacks.cardPacks
const selectorCardPageCount = (state: RootStateType) => state.cardPacks.pageCount
const selectorCardPage = (state: RootStateType) => state.cardPacks.page
const selectorTotalCount = (state: RootStateType) => state.cardPacks.cardPacksTotalCount
const selectorProfileId = (state: RootStateType) => state.profile.profile?._id

export const MyPack = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(selectorCardPacks)
  const pageCount = useAppSelector(selectorCardPageCount)
  const page = useAppSelector(selectorCardPage)
  const totalCount = useAppSelector(selectorTotalCount)
  const profileId = useAppSelector(selectorProfileId)

  useEffect(() => {
    if (!profileId) {
      navigate(LoginPage)
    } else {
      console.log('s')
      console.log(profileId)
      dispatch(filterPackTC({ user_id: profileId }))
    }
  }, [])

  const setPage = (value: number) => {
    dispatch(filterPackTC({ page: value }))
  }
  const setPageCount = (value: number) => {
    dispatch(filterPackTC({ pageCount: value }))
  }

  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleAndButtonPack
          titlePack="My Pack"
          titleButton="Add new card"
          image={<img className={s.dots} src={dots} alt="dots" />}
          onClick={() => {}}
        />
        <Search onSearchChange={() => {}} value={''} className={s.search} />
        <TableMyPack />
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          totalCount={totalCount}
          setPage={setPage}
          setPageCount={setPageCount}
          maxPages={maxPaginationPage}
        />
      </div>
    </div>
  )
}
