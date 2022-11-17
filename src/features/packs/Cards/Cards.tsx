import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { AddCardType, UpdateCardType } from '../../../api/cardAPI'
import ArrowBackTo from '../../../common/components/ArrowBackTo/ArrowBackTo'
import { ModalCard } from '../../../common/components/modal/ModalCard/ModalCard'
import { ModalMain } from '../../../common/components/modal/ModalMain'
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
import { TitleBlockTable } from '../TitleBlockTable/TitleBlockTable'
import style from '../TitleBlockTable/TitleBlockTable.module.css'

import dots from './../../../assets/img/Table/dots.svg'
import {
  addCardTC,
  changeRatingCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardTC,
} from './cards-reducer'
import { CardsTable } from './Cards-Table'
import s from './Cards.module.css'

type addNewCardType = {
  cardsPack_id: string
  question: string
  answer: string
  questionImage: string
  answerImage: string
}

export const Cards = () => {
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

  const [modalActive, setModalActive] = useState<boolean>(false)

  useEffect(() => {
    if (isLogin) {
      dispatch(getCardsTC(params.id))
    } else {
      navigate(PATH.LOGIN_PAGE)
    }
  }, [isLogin, dispatch])
  // }, [isLogin, cardsParams, params])

  const deleteCard = (_id: string, packId: string) => {
    dispatch(deleteCardTC(_id, packId))
  }

  const editCard = (updateCard: UpdateCardType) => {
    dispatch(updateCardTC(updateCard))
  }

  const setModalActiveHandler = () => {
    setModalActive(true)
  }

  const addNewCard = (card: addNewCardType) => {
    dispatch(
      addCardTC(card.cardsPack_id, card.question, card.answer, card.questionImage, card.answerImage)
    )
  }

  const changeRating = (cardId: string, value: number) => {
    dispatch(changeRatingCardTC({ card_id: cardId, grade: value }))
  }

  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        {cards && cards.length ? (
          <>
            <ArrowBackTo />
            <TitleBlockTable
              titlePack={packName as string}
              titleButton={packUserId === profileId ? 'Add new card' : 'Learn to pack'}
              image={<img className={s.dots} src={dots} alt="dots" />}
              onClick={setModalActiveHandler}
              style={style}
            />
            <Search onSearchChange={() => {}} value={''} className={s.search} />
            <CardsTable
              cards={cards}
              userId={profileId}
              minGrade={minGrade}
              maxGrade={maxGrade}
              profileId={profileId}
              deleteHandler={(_id, packId) => deleteCard(_id, packId)}
              editCardHandler={updateCard => editCard(updateCard)}
              changeRating={(cardId, value) => changeRating(cardId, value)}
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
            <TitleBlockTable
              titlePack={packName as string}
              titleButton={'Add new card'}
              image={<img className={s.dots} src={dots} alt="dots" />}
              onClick={setModalActiveHandler}
              style={style}
            />
          </>
        )}
      </div>
      <ModalMain active={modalActive} setActive={setModalActive}>
        <ModalCard
          question={''}
          answer={''}
          setActive={setModalActive}
          title={'Add New Card'}
          onSubmit={(question, answer, questionImage, answerImage) =>
            addNewCard({ cardsPack_id: params.id!, question, answer, questionImage, answerImage })
          }
        />
      </ModalMain>
    </div>
  )
}
