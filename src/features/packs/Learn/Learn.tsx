import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

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
  const packName = useAppSelector(selectorPackName)
  const cards = useAppSelector(selectorCards)
  const isLogin = useAppSelector(selectorIsLogin)
  const card = useAppSelector(state => state.learn.card)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogin) {
      if (cards !== null) {
        dispatch(getCardTC(params.id as string))
      } else {
        const packId = sessionStorage.getItem('packId')

        dispatch(getCardsTC(packId as string))
      }
    } else {
      navigate(PATH.LOGIN_PAGE)
    }
  }, [isLogin, dispatch])

  console.log(card)

  return (
    <div className={style.packs_list_container}>
      <ArrowBackTo />
      <div className={styles.box}>
        <div className={styles.title}>
          <h2>{`Learn ${packName}`}</h2>
        </div>
        <LearnCard question={card ? card.question : ''} answer={card ? card.answer : ''} />
      </div>
    </div>
  )
}

export default Learn
