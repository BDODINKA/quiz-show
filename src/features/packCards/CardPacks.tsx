import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { Pagination } from '../../common/components/pagination/pagination'
import { maxPaginationPage } from '../../common/constants/pagination'
import { PATH } from '../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import { CardPackForm } from './CardPackForm'
import { deletePackTC, filterPackTC, getPacksTC, setFilterBtnTC } from './cardPacks-reducer'
import style from './CardPacks.module.css'
import { Filtration } from './Filtration/Filtration'
import { TablePackCard } from './Table/TablePackCard'
import { TitleAndButtonPack } from './TitleAndButtonPack'

const selectorCardPacks = (state: RootStateType) => state.cardPacks.cardPacks
const selectorCardPageCount = (state: RootStateType) => state.cardPacks.pageCount
const selectorCardPage = (state: RootStateType) => state.cardPacks.page
const selectorTotalCount = (state: RootStateType) => state.cardPacks.cardPacksTotalCount
const selectorProfileId = (state: RootStateType) => state.profile.profile?._id
const selectorFilterBtn = (state: RootStateType) => state.cardPacks.currentPack
const selectorIsLogin = (state: RootStateType) => state.auth.isLoggedIn

export const CardPacks = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cardPacks = useAppSelector(selectorCardPacks)
  const pageCount = useAppSelector(selectorCardPageCount)
  const page = useAppSelector(selectorCardPage)
  const totalCount = useAppSelector(selectorTotalCount)
  const filterBtn = useAppSelector(selectorFilterBtn)
  const profileId = useAppSelector(selectorProfileId)
  const isLogin = useAppSelector(selectorIsLogin)

  const [showForm, setShowForm] = useState<boolean>(false)

  useEffect(() => {
    if (!isLogin) {
      navigate(PATH.LOGIN_PAGE)
    } else {
      dispatch(getPacksTC())
      console.log('render')
    }
  }, [isLogin])

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

  const deleteMyPack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const navigateMyPack = () => {
    setShowForm(!showForm)
  }

  const activeBtnHandler = (value: string) => {
    dispatch(setFilterBtnTC(value))
  }

  return (
    <div className={style.container}>
      <div className={style.table_container}>
        <TitleAndButtonPack
          titlePack="Packs list"
          titleButton="Add new pack"
          onClick={navigateMyPack}
        />
        <Filtration
          id={profileId}
          activeBtnHandler={value => activeBtnHandler(value)}
          showActive={filterBtn}
        />
        <TablePackCard
          cards={cardPacks}
          userId={profileId}
          sort={setLastUpdate}
          deleteHandler={id => deleteMyPack(id)}
        />
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          setPage={value => setPage(value)}
          setPageCount={value => setPageCount(value)}
          totalCount={totalCount as number}
          maxPages={maxPaginationPage}
        />
      </div>
      {showForm && <CardPackForm onClose={navigateMyPack} />}
    </div>
  )
}
