import React, { useEffect, useState } from 'react'

import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { CardsPackAddType } from '../../api/cardPacksAPI'
import { ModalMain } from '../../common/components/modal/ModalMain'
import { ModalPack } from '../../common/components/modal/ModalPack/ModalPack'
import { Pagination } from '../../common/components/pagination/pagination'
import { InitValueRangeSlider } from '../../common/constants/packsCard'
import { maxPaginationPage } from '../../common/constants/pagination'
import { PATH } from '../../common/routes/const-routes'
import {
  selectorCardPacks,
  selectorIsLogin,
  selectorPackParams,
  selectorProfileId,
  selectorPacksTotalCount,
} from '../../common/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import { setPackCardsIdAC } from './Cards/cards-reducer'
import { Filtration } from './Filtration/Filtration'
import {
  addPackTC,
  deletePackTC,
  filterLastUpdateAC,
  filterPageAC,
  filterPageCountAC,
  getPacksTC,
  updatePackTC,
} from './Packs-reducer'
import style from './Packs.module.css'
import { TableCard } from './Table/TableCard'
import { TitleBlockTable } from './TitleBlockTable/TitleBlockTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const cardPacks = useAppSelector(selectorCardPacks)
  const totalCount = useAppSelector(selectorPacksTotalCount)
  const profileId = useAppSelector(selectorProfileId)
  const isLogin = useAppSelector(selectorIsLogin)
  const params = useAppSelector(selectorPackParams)

  const [modalActive, setModalActive] = useState<boolean>(false)

  useEffect(() => {
    sessionStorage.setItem('url', location.pathname)
    dispatch(getPacksTC())
  }, [params])

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

  const setModalActiveHandler = () => {
    setModalActive(true)
  }

  const changeFieldName = (pack: CardsPackAddType, cardId: string) => {
    dispatch(updatePackTC(pack, cardId))
  }

  const addNewPack = (pack: CardsPackAddType) => {
    dispatch(addPackTC(pack))
  }

  const navigateToCards = (packId: string) => {
    dispatch(setPackCardsIdAC(packId))
    sessionStorage.setItem('url', `${PATH.MY_PACK_PAGE}/${packId}`)
    navigate(`${PATH.MY_PACK_PAGE}/${packId}`)
  }

  if (!isLogin) return <Navigate to={PATH.LOGIN_PAGE} />

  return (
    <div className={style.main}>
      <div className={style.container}>
        <div className={style.table_container}>
          <TitleBlockTable
            titlePack="Packs list"
            titleButton="Add new pack"
            onClick={setModalActiveHandler}
          />

          <Filtration
            user_id={profileId}
            initialValueSlider={InitValueRangeSlider}
            paramsId={params.user_id}
          />
          <TableCard
            cards={cardPacks}
            userId={profileId}
            sort={setLastUpdate}
            deleteHandler={id => deleteMyPack(id)}
            navigateToCards={cardId => navigateToCards(cardId)}
            changeFieldName={(pack, cardId) => changeFieldName(pack, cardId)}
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
        {/*{modalActive && (*/}
        <ModalMain open={modalActive} setActive={setModalActive}>
          <ModalPack
            setActive={setModalActive}
            title={'Add New Pack'}
            onSubmit={pack => addNewPack(pack)}
            text={''}
            deckCover={''}
          />
        </ModalMain>
        {/*)}*/}
      </div>
    </div>
  )
}
