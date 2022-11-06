import React, { useState } from 'react'

import { CardPacks } from '../../../api/cardPacksAPI'
import { Nullable } from '../../../types/Nullable'

import poligon from './../../../assets/img/Table/Polygon 2.svg'
import { PacksTableModal } from './PacksTableModal'
import style from './TableCard.module.css'

type PropsType = {
  cards?: Nullable<CardPacks[]>
  userId?: string
  sort: (value: boolean) => void
  deleteHandler?: (id: string) => void
  changeFieldName?: (text: string, deckCover: string, privates: boolean, cardId: string) => void
  navigateToCards?: (cardId: string) => void
}
export const TableCard = (props: PropsType) => {
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

  const setFieldName = (text: string, deckCover: string, privates: boolean, cardId: string) => {
    props.changeFieldName && props.changeFieldName(text, deckCover, privates, cardId)
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
                  <PacksTableModal
                    key={elem._id}
                    deleteHandler={id => deleteHandler(id)}
                    changeFieldName={(text, deckCover, privates, id) =>
                      setFieldName(text, deckCover, privates, id)
                    }
                    navigateToCards={cardId => navigateToCards(cardId)}
                    elem={elem}
                    userId={props.userId}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  )
}
