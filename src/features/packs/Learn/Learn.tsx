import React, { useEffect } from 'react'

import { Navigate, useParams, useSearchParams } from 'react-router-dom'

import { ArrowBackTo } from '../../../common/components/ArrowBackTo/ArrowBackTo'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { PATH } from '../../../common/routes/const-routes'
import {
  selectorCard,
  selectorCards,
  selectorIsLogin,
  selectorPackName,
} from '../../../common/selectors/selectors'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { getCardsTC } from '../Cards/cards-reducer'

import { getCardTC } from './learn-reducer'
import style from './Learn.module.scss'
import { LearnCard } from './LearnCard/LearnCard'

export const Learn = () => {
  const params = useParams<'id'>()
  const [searchParams, setSearchParams] = useSearchParams({ id: params.id as string })
  const packName = useAppSelector(selectorPackName)
  const cards = useAppSelector(selectorCards)
  const isLogin = useAppSelector(selectorIsLogin)
  const card = useAppSelector(selectorCard)
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
    <main>
      {card ? (
        <>
          <Wrapper className={style.arrow}>
            <ArrowBackTo />
          </Wrapper>
          <Wrapper className={style.title}>
            <h2>{`Learn ${packName}`}</h2>
          </Wrapper>
          <Wrapper className={style.card}>
            <LearnCard
              question={card.question}
              answer={card.answer}
              nextCard={nextCard}
              questionImg={card.questionImg}
              answerImg={card.answerImg}
            />
          </Wrapper>
        </>
      ) : null}
    </main>
  )
}
