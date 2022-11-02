import React from 'react'

import { CardsType } from '../../../api/cardAPI'
import poligon from '../../../assets/img/Table/Polygon 2.svg'
import RatingComponent from '../../../common/components/Rating/RatingComponent'
import { Nullable } from '../../../types/Nullable'
import { MyPackButton } from '../TableActionsButton/MyPackButton'

import style from './../Table/TablePackCard.module.css'

type PropsType = {
  cards: Nullable<CardsType[]>
  minGrade?: Nullable<number>
  maxGrade?: Nullable<number>
  profileId?: string
}

export const TableMyPack = (props: PropsType) => {
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
                  <td>{elem.updated}</td>
                  <td>
                    <RatingComponent />
                  </td>
                  <td className={style.actions_button_my_pack}>
                    {props.profileId === elem.user_id && <MyPackButton />}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}
