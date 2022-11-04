import React, { useState } from 'react'

import { CardPacks } from '../../../api/cardPacksAPI'
import { Nullable } from '../../../types/Nullable'
import { ModalMain } from '../../modal/ModalMain'
import { ModalPack } from '../../modal/ModalPack/ModalPack'
import { FriendsButton } from '../TableActionsButton/FriendsButton'
import { MyActionsButton } from '../TableActionsButton/MyActionsButton'

import poligon from './../../../assets/img/Table/Polygon 2.svg'
import style from './TablePackCard.module.css'

type PropsType = {
  cards?: Nullable<CardPacks[]>
  userId?: string
  sort: (value: boolean) => void
  deleteHandler?: (id: string) => void
  changeFieldName?: (text: string, deckCover: string, privates: boolean, cardId: string) => void
  navigateToCards?: (cardId: string) => void
}
export const TablePackCard = (props: PropsType) => {
  const [sort, setSort] = useState(false)
  const [modalActive, setModalActive] = useState<boolean>(false)
  const [elemId, setElemID] = useState<string>('')

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

  const onChangeName = (id: string) => {
    setElemID(id)
    setModalActive(true)
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
                    <td className={style.td}>
                      <span className={style.linkName} onClick={() => navigateToCards(elem._id)}>
                        {elem.name}
                      </span>
                    </td>
                    <td>{elem.cardsCount}</td>
                    <td>{new Date(Date.parse(elem.updated)).toLocaleDateString('ru-RU')}</td>
                    <td>{elem.user_name}</td>
                    <td className={style.actions_button_container}>
                      {elem.user_id === props.userId ? (
                        <>
                          <MyActionsButton
                            deleteHandler={() => deleteHandler(elem._id)}
                            changeName={() => onChangeName(elem._id)}
                          />

                          <>
                            <ModalMain
                              active={elemId === elem._id && modalActive}
                              setActive={setModalActive}
                            >
                              <ModalPack
                                text={elem.name}
                                title={'Edit pack'}
                                setActive={modalActive => setModalActive(modalActive)}
                                onSubmit={(text, deckCover, privates) =>
                                  setFieldName(text, deckCover, privates, elem._id)
                                }
                              />
                            </ModalMain>
                          </>
                        </>
                      ) : (
                        <FriendsButton />
                      )}
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
