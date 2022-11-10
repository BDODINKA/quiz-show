import React from 'react'

import { CardsType, UpdateCardType } from '../../../api/cardAPI'
import poligon from '../../../assets/img/Table/Polygon 2.svg'
import { Nullable } from '../../../types/Nullable'
import { CardsTableModal } from '../Table/CardsTableModal'
import style from '../Table/TableCard.module.css'

type PropsType = {
  cards: Nullable<CardsType[]>
  minGrade?: Nullable<number>
  maxGrade?: Nullable<number>
  profileId?: string
  changeRating?: (cardId: string, value: number) => void
  deleteHandler: (_id: string) => void
  editCardHandler: (updateCard: UpdateCardType) => void
  userId?: string
}

export const CardsTable = (props: PropsType) => {
  const deleteHandler = (_id: string) => {
    props.deleteHandler && props.deleteHandler(_id)
  }

  const editCardHandler = (updateCard: UpdateCardType) => {
    props.editCardHandler && props.editCardHandler(updateCard)
  }
  const changeRatingHandler = (cardId: string, value: number) => {
    props.changeRating && props.changeRating(cardId, value)
  }

  return (
    <>
      <table className={style.table}>
        <thead>
          <tr className={style.title_table_header}>
            <th>Question</th>
            <th>Answer</th>
            <th>
              Last Updated
              <img style={{ marginLeft: '5px' }} src={poligon} alt="poligon" />
            </th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.cards &&
            props.cards.map(elem => (
              <CardsTableModal
                key={elem._id}
                deleteHandler={_id => deleteHandler(_id)}
                editCardHandler={updateCard => editCardHandler(updateCard)}
                elem={elem}
                userId={props.userId}
                changeRating={value => changeRatingHandler(elem._id, value)}
              />
            ))}
        </tbody>
      </table>
    </>
  )
}
