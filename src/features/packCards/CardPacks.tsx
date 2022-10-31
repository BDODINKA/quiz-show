import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Pagination } from '../../common/components/pagination/pagination'
import { InitValueRangeSlider } from '../../common/constants/packsCard'
import { maxPaginationPage } from '../../common/constants/pagination'
import { PATH } from '../../common/routes/const-routes'
import {
  selectorCardPacks,
  selectorIsLogin,
  selectorParams,
  selectorProfileId,
  selectorTotalCount,
} from '../../common/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import { CardPackForm } from './CardPackForm'
import {
  deletePackTC,
  filterLastUpdateAC,
  filterPageAC,
  filterPageCountAC,
  getPacksTC,
  updatePackTC,
} from './cardPacks-reducer'
import style from './CardPacks.module.css'
import { Filtration } from './Filtration/Filtration'
import { TablePackCard } from './Table/TablePackCard'
import { TitleAndButtonPack } from './TitleAndButtonPack'

export const CardPacks = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cardPacks = useAppSelector(selectorCardPacks)
  const totalCount = useAppSelector(selectorTotalCount)
  const profileId = useAppSelector(selectorProfileId)
  const isLogin = useAppSelector(selectorIsLogin)
  const params = useAppSelector(selectorParams)

  const [showForm, setShowForm] = useState<boolean>(false)

  useEffect(() => {
    if (!isLogin) {
      navigate(PATH.LOGIN_PAGE)
    } else {
      dispatch(getPacksTC())
    }
  }, [isLogin, params])

  const setPage = (value: number) => {
    dispatch(filterPageAC(value))
  }

  const setPageCount = (value: number) => {
    dispatch(filterPageCountAC(value))
  }

  const setLastUpdate = (value: boolean) => {
    const update = value ? '0updated' : '1updated'

    dispatch(filterLastUpdateAC(update))
  }

  const deleteMyPack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const navigateMyPack = () => {
    setShowForm(!showForm)
  }

  const changeFieldName = (text: string, id: string) => {
    dispatch(updatePackTC(id, text))
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
          user_id={profileId}
          initialValueSlider={InitValueRangeSlider}
          paramsId={params.user_id}
        />
        <TablePackCard
          cards={cardPacks}
          userId={profileId}
          sort={setLastUpdate}
          deleteHandler={id => deleteMyPack(id)}
        />
        <Pagination
          pageCount={params.pageCount}
          currentPage={params.page}
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
