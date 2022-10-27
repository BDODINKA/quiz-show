import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { Pagination } from '../../common/components/pagination/pagination'
import { maxPaginationPage } from '../../common/constants/pagination'
import { LoginPage, MyPackPage } from '../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'
import Login from '../login/Login'

import { filterPackTC, getPacksTC } from './cardPacks-reducer'
import style from './CardPacks.module.css'
import { Filtration } from './Filtration/Filtration'
import { TablePackCard } from './Table/TablePackCard'
import { TitleAndButtonPack } from './TitleAndButtonPack'

const selectorCardPacks = (state: RootStateType) => state.cardPacks.cardPacks
const selectorCardPageCount = (state: RootStateType) => state.cardPacks.pageCount
const selectorCardPage = (state: RootStateType) => state.cardPacks.page
const selectorTotalCount = (state: RootStateType) => state.cardPacks.cardPacksTotalCount
const selectorProfileId = (state: RootStateType) => state.profile.profile?._id

export const CardPacks = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cardPacks = useAppSelector(selectorCardPacks)
  const pageCount = useAppSelector(selectorCardPageCount)
  const page = useAppSelector(selectorCardPage)
  const totalCount = useAppSelector(selectorTotalCount)
  const profileId = useAppSelector(selectorProfileId)

  useEffect(() => {
    if (!profileId) {
      navigate(LoginPage)
    } else {
      dispatch(getPacksTC())
    }
  }, [])

  const setPage = (value: number) => {
    dispatch(filterPackTC({ page: value }))
  }
  const setPageCount = (value: number) => {
    dispatch(filterPackTC({ pageCount: value }))
  }
  const setLastUpdate = (value: boolean) => {
    const update = value ? '0updated' : '1updated'

    dispatch(filterPackTC({ sortPacks: update }))
  }
  const navigateMyPack = () => {
    navigate(MyPackPage)
  }

  console.log(cardPacks)

  return (
    <div className={style.container}>
      <div className={style.table_container}>
        <TitleAndButtonPack
          titlePack="Packs list"
          titleButton="Add new pack"
          onClick={navigateMyPack}
        />
        <Filtration />
        <TablePackCard cards={cardPacks} userId={profileId} sort={setLastUpdate} />
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          setPage={value => setPage(value)}
          setPageCount={value => setPageCount(value)}
          totalCount={totalCount}
          maxPages={maxPaginationPage}
        />
      </div>
    </div>
  )
}
