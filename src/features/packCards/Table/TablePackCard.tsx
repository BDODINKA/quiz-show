import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { CardPacks } from '../../../api/cardPacksAPI'
import { Nullable } from '../../../types/Nullable'
import { ModalDelete } from '../../modal/ModalDelete/ModalDelete'
import { FriendsButton } from '../TableActionsButton/FriendsButton'
import { MyActionsButton } from '../TableActionsButton/MyActionsButton'

import poligon from './../../../assets/img/Table/Polygon 2.svg'
import { TableModal } from './TableModal'
import style from './TablePackCard.module.css'

type PropsType = {
  cards?: Nullable<CardPacks[]>
  userId?: string
  sort: (value: boolean) => void
  deleteHandler?: (id: string) => void
  changeFieldName?: (text: string, id: string) => void
  navigateToCards?: (cardId: string) => void
}
export const TablePackCard = (props: PropsType) => {
  const [sort, setSort] = useState(false)

  const sortHandler = (value: boolean) => {
    setSort(value)
    props.sort(sort)
  }
  const deleteHandler = (id: string) => {
    props.deleteHandler && props.deleteHandler(id)
  }
  const navigateToCards = (cardId: string) => {
    props.navigateToCards && props.navigateToCards(cardId)
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
                  <TableModal
                    key={elem._id}
                    elem={elem}
                    userId={props.userId}
                    navigateToCards={navigateToCards}
                    changeFieldName={props.changeFieldName!}
                    deleteHandler={deleteHandler}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  )
}
