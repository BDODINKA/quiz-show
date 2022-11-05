import React from 'react'

import { CardsType } from '../../../api/cardAPI'
import poligon from '../../../assets/img/Table/Polygon 2.svg'
import RatingComponent from '../../../common/components/Rating/RatingComponent'
import { Nullable } from '../../../types/Nullable'
import { ActionsButton } from '../Table/TableActionsButton/ActionsButton'
import style from '../Table/TableCard.module.css'

type PropsType = {
  cards: Nullable<CardsType[]>
  minGrade?: Nullable<number>
  maxGrade?: Nullable<number>
  profileId?: string
  changeRating?: (value: number) => void
}

export const CardsTable = (props: PropsType) => {
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
          </tr>
        </thead>
        <tbody>
          {props.cards &&
            props.cards.map(elem => {
              return (
                <tr key={elem._id} className={style.title_table_body}>
                  <td>{elem.question}</td>
                  <td>{elem.answer}</td>
                  <td>{new Date(Date.parse(elem.updated)).toLocaleDateString('ru-RU')}</td>
                  <td>
                    <RatingComponent
                      changeRating={value => props.changeRating && props.changeRating(value)}
                      valueRating={elem.grade}
                    />
                  </td>
                  <td className={style.actions_button_my_pack}>
                    {props.profileId === elem.user_id && <ActionsButton />}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}
