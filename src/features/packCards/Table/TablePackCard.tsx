import React, { useState } from 'react'

import { CardPacksType } from '../../../api/cardPacksAPI'
import { FriendsButton } from '../TableActionsButton/FriendsButton'
import { MyActionsButton } from '../TableActionsButton/MyActionsButton'

import poligon from './../../../assets/img/Table/Polygon 2.svg'
import style from './TablePackCard.module.css'

type PropsType = {
  cards?: CardPacksType[]
  userId: string | undefined
  sort: (value: boolean) => void
}
export const TablePackCard = (props: PropsType) => {
  const [sort, setSort] = useState(false)

  const sortHandler = (value: boolean) => {
    setSort(value)
    props.sort(sort)
  }

  return (
    <>
      <div>
        <table className={style.table}>
          <thead>
            <tr className={style.title_table_header}>
              <th>Name</th>
              <th>Cards</th>
              {sort ? (
                <th onClick={() => sortHandler(false)}>
                  Last Updated
                  <img style={{ marginLeft: '5px' }} src={poligon} alt="poligon" />
                </th>
              ) : (
                <th onClick={() => sortHandler(true)}>
                  Last Updated
                  <img
                    style={{ marginLeft: '5px', rotate: '180deg' }}
                    src={poligon}
                    alt="poligon"
                  />
                </th>
              )}

              <th>Created by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.cards
              ? props.cards.map(elem => (
                  <tr key={elem._id} className={style.title_table_body}>
                    <td className={style.td}>{elem.name}</td>
                    <td>{elem.cardsCount}</td>
                    <td>{new Date(Date.parse(elem.updated)).toLocaleDateString('ru-RU')}</td>
                    <td>{elem.user_name}</td>
                    <td className={style.actions_button_container}>
                      {elem.user_id === props.userId ? <MyActionsButton /> : <FriendsButton />}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  )
}
