import React, { useState } from 'react'

import { CardPacks, CardsPackAddType } from '../../../api/cardPacksAPI'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { Nullable } from '../../../types/Nullable'

import poligon from './../../../assets/img/Table/Polygon 2.svg'
import { PacksTableModal } from './PacksTableModal'
import style from './Table.module.scss'

type PropsType = {
  packs?: Nullable<CardPacks[]>
  userId?: string
  sort: (value: boolean) => void
  deleteHandler?: (id: string) => void
  changeFieldName?: (pack: CardsPackAddType, cardId: string) => void
  navigateToCards?: (cardId: string) => void
}
export const TableHeadPacks = (props: PropsType) => {
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

  const setFieldName = (pack: CardsPackAddType, cardId: string) => {
    props.changeFieldName && props.changeFieldName(pack, cardId)
  }

  return (
    <Wrapper className={style.container}>
      <table className={style.table}>
        <thead className={style.head}>
          <tr className={style.head_row}>
            <th scope="col">Name</th>
            <th scope="col">Cards</th>
            {sort ? (
              <th onClick={() => sortHandler(false)} scope="col">
                Last Updated
                <img style={{ marginLeft: '5px' }} src={poligon} alt="poligon" />
              </th>
            ) : (
              <th onClick={() => sortHandler(true)} scope="col">
                Last Updated
                <img style={{ marginLeft: '5px', rotate: '180deg' }} src={poligon} alt="poligon" />
              </th>
            )}

            <th scope="col">Created by</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.packs
            ? props.packs.map(elem => (
                <PacksTableModal
                  key={elem._id}
                  deleteHandler={id => deleteHandler(id)}
                  changeFieldName={(pack, id) => setFieldName(pack, id)}
                  navigateToCards={cardId => navigateToCards(cardId)}
                  elem={elem}
                  userId={props.userId}
                />
              ))
            : null}
        </tbody>
      </table>
    </Wrapper>
  )
}
