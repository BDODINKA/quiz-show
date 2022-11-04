import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import ArrowBackTo from '../../../common/components/ArrowBackTo/ArrowBackTo'
import { Pagination } from '../../../common/components/pagination/pagination'
import Search from '../../../common/components/Search/Search'
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
import { getCardsTC } from './my-pack-reducer'
import s from './MyPack.module.css'
import { TableMyPack } from './TableMyPack'

export const MyPack = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams<'id'>()
  const cards = useAppSelector(selectorCards)
  const packUserId = useAppSelector(selectorPackUserId)
  const packName = useAppSelector(selectorPackName)
  const minGrade = useAppSelector(selectorMinGrade)
  const maxGrade = useAppSelector(selectorMaxGrade)
  const cardsTotalCount = useAppSelector(selectorCardsTotalCount)
  const profileId = useAppSelector(selectorProfileId)
  const cardsParams = useAppSelector(selectorCardsParams)
  const isLogin = useAppSelector(selectorIsLogin)

  useEffect(() => {
    if (isLogin) {
      dispatch(getCardsTC(params.id))
    } else {
      navigate(PATH.LOGIN_PAGE)
    }
  }, [isLogin, cardsParams, params])

  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        {cards && cards.length ? (
          <>
            <ArrowBackTo />
            <TitleAndButtonPack
              titlePack={packName as string}
              titleButton={packUserId === profileId ? 'Add new card' : 'Learn to pack'}
              image={<img className={s.dots} src={dots} alt="dots" />}
              onClick={() => {}}
              style={style}
            />
            <Search onSearchChange={() => {}} value={''} className={s.search} />
            <TableMyPack
              cards={cards}
              minGrade={minGrade}
              maxGrade={maxGrade}
              profileId={profileId}
            />
            <Pagination
              pageCount={cardsParams.pageCount}
              currentPage={cardsParams.page}
              totalCount={cardsTotalCount as number}
              setPage={() => () => {}}
              setPageCount={() => () => {}}
              maxPages={cardsParams.max}
            />
          </>
        ) : (
          <>
            <ArrowBackTo />
            <TitleAndButtonPack
              titlePack={packName as string}
              titleButton={'Add new card'}
              image={<img className={s.dots} src={dots} alt="dots" />}
              onClick={() => {}}
              style={style}
            />
          </>
        )}
      </div>
    </div>
  )
}
