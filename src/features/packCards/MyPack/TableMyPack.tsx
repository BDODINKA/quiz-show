import React from 'react'

import poligon from '../../../assets/img/Table/Polygon 2.svg'
import RatingComponent from '../../../common/components/Rating/RatingComponent'
import { MyPackButton } from '../TableActionsButton/MyPackButton'

import style from './../Table/TablePackCard.module.css'

const questions = [
  {
    question: "How 'This' work in Java Script",
    answer: "This is how 'This' work in Java Script",
    last_updated: '20/10/2022',
  },
  {
    question: "How 'This' work in Java Script",
    answer: "This is how 'This' work in Java Script",
    last_updated: '23/10/2022',
  },
]

export const TableMyPack = () => {
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
          {questions.map(elem => {
            return (
              <tr className={style.title_table_body}>
                <td>{elem.question}</td>
                <td>{elem.answer}</td>
                <td>{elem.last_updated}</td>
                <td>
                  <RatingComponent />
                </td>
                <td className={style.actions_button_my_pack}>
                  <MyPackButton />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
