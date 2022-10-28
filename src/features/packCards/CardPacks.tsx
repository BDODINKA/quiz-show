import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { Pagination } from '../../common/components/pagination/pagination'
import { maxPaginationPage } from '../../common/constants/pagination'
import { LoginPage } from '../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import { CardPackForm } from './CardPackForm'
import { deletePackTC, filterPackTC, getPacksTC } from './cardPacks-reducer'
import style from './CardPacks.module.css'
import { Filtration } from './Filtration/Filtration'
import { TablePackCard } from './Table/TablePackCard'
import { TitleAndButtonPack } from './TitleAndButtonPack'

const selectorCardPacks = (state: RootStateType) => state.cardPacks.cardPacks
const selectorCardPageCount = (state: RootStateType) => state.cardPacks.pageCount
const selectorCardPage = (state: RootStateType) => state.cardPacks.page
const selectorTotalCount = (state: RootStateType) => state.cardPacks.cardPacksTotalCount
const selectorProfileId = (state: RootStateType) => state.profile.profile?._id
const selectorStatus = (state: RootStateType) => state.app.status
const selectorMessage = (state: RootStateType) => state.app.error

export const CardPacks = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cardPacks = useAppSelector(selectorCardPacks)
  const pageCount = useAppSelector(selectorCardPageCount)
  const page = useAppSelector(selectorCardPage)
  const totalCount = useAppSelector(selectorTotalCount)
  const profileId = useAppSelector(selectorProfileId)
  const status = useAppSelector(selectorStatus)
  const message = useAppSelector(selectorMessage)

  const [showForm, setShowForm] = useState<boolean>(false)
  const [filterBtn, setfilterBtn] = useState<string>('')

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
  const deleteMyPack = (id: string) => {
    dispatch(deletePackTC(id))
  }
  const navigateMyPack = () => {
    setShowForm(!showForm)
  }
  const activeBtnHandler = (value: string) => {
    setfilterBtn(value)
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
          totalCount={totalCount}
          maxPages={maxPaginationPage}
        />
      </div>
      {showForm && <CardPackForm onClose={navigateMyPack} />}
      <CustomAlertSnackBar status={status} message={message} autoHideDuration={6000} />
    </div>
  )
}
