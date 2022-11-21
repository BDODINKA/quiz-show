import React, { useEffect } from 'react'

import { Navigate, useParams, useSearchParams } from 'react-router-dom'

import ArrowBackTo from '../../../common/components/ArrowBackTo/ArrowBackTo'
import { PATH } from '../../../common/routes/const-routes'
import {
  selectorCards,
  selectorIsLogin,
  selectorPackName,
} from '../../../common/selectors/selectors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import { getCardsTC } from '../Cards/cards-reducer'
import style from '../TitleBlockTable/TitleBlockTable.module.css'

import { getCardTC } from './learn-reducer'
import styles from './Learn.module.css'
import { LearnCard } from './LearnCard/LearnCard'

const Learn = () => {
  const params = useParams<'id'>()
  const [searchParams, setSearchParams] = useSearchParams({ id: params.id as string })
  const packName = useAppSelector(selectorPackName)
  const cards = useAppSelector(selectorCards)
  const isLogin = useAppSelector(selectorIsLogin)
  const card = useAppSelector(state => state.learn.card)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (cards) {
      dispatch(getCardTC(searchParams.get('id') as string))
    } else {
      const packId = sessionStorage.getItem('packId')

      dispatch(getCardsTC(packId as string))
    }
  }, [cards])

  useEffect(() => {
    if (card) {
      setSearchParams({ id: card._id })
    }
  }, [card])

  const nextCard = () => {
    dispatch(getCardTC())
  }

  if (!isLogin) return <Navigate to={PATH.LOGIN_PAGE} />

  return (
    <div className={style.packs_list_container}>
      <ArrowBackTo />
      {card ? (
        <div className={styles.box}>
          <div className={styles.title}>
            <h2>{`Learn ${packName}`}</h2>
          </div>
          <LearnCard question={card.question} answer={card.answer} nextCard={nextCard} />
        </div>
      ) : null}
    </div>
  )
}

export default Learn
