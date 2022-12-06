import React from 'react'

import { AddAndUpdateCardType, CardsType } from '../../../api/cardAPI'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { Nullable } from '../../../types/Nullable'

import { CardsTableModal } from './CardsTableModal'
import style from './Table.module.scss'

type PropsType = {
  cards: Nullable<CardsType[]>
  minGrade?: Nullable<number>
  maxGrade?: Nullable<number>
  profileId?: string
  changeRating?: (cardId: string, value: number) => void
  deleteHandler: (_id: string, packId: string) => void
  editCardHandler: (updateCard: AddAndUpdateCardType) => void
  navigateLearnPage: (cardId: string) => void
  userId?: string
}

export const TableHeadCards = (props: PropsType) => {
  const deleteHandler = (_id: string, packId: string) => {
    props.deleteHandler && props.deleteHandler(_id, packId)
  }

  const editCardHandler = (updateCard: AddAndUpdateCardType) => {
    props.editCardHandler && props.editCardHandler(updateCard)
  }
  const changeRatingHandler = (cardId: string, value: number) => {
    props.changeRating && props.changeRating(cardId, value)
  }
  const navigateLearnPage = (cardId: string) => {
    props.navigateLearnPage && props.navigateLearnPage(cardId)
  }

  // const finalClassNameSort = sort ? `${style.triangle_top} ` : `${style.triangle_down} `

  return (
    <Wrapper className={style.container}>
      <table className={style.table}>
        <thead className={style.head}>
          <tr className={style.head_row}>
            <th scope="col">Question</th>
            <th scope="col">Answer</th>
            <th scope="col" className={style.head_update}>
              Last Updated
              {/*<div className={finalClassNameSort}></div>*/}
            </th>
            <th scope="col">Grade</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.cards &&
            props.cards.map(elem => (
              <CardsTableModal
                key={elem._id}
                deleteHandler={(_id, packId) => deleteHandler(_id, packId)}
                editCardHandler={updateCard => editCardHandler(updateCard)}
                navigateLearnPage={cardId => navigateLearnPage(cardId)}
                elem={elem}
                userId={props.userId}
                changeRating={value => changeRatingHandler(elem._id, value)}
              />
            ))}
        </tbody>
      </table>
    </Wrapper>
  )
}
