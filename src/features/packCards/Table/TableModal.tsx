import React, { useState } from 'react'

import { CardPacks } from '../../../api/cardPacksAPI'
import { Nullable } from '../../../types/Nullable'
import { ModalDelete } from '../../modal/ModalDelete/ModalDelete'
import { ModalMain } from '../../modal/ModalMain'
import { FriendsButton } from '../TableActionsButton/FriendsButton'
import { MyActionsButton } from '../TableActionsButton/MyActionsButton'

import style from './TablePackCard.module.css'

type PropsType = {
  deleteHandler: (id: string) => void
  changeFieldName: (text: string, id: string) => void
  navigateToCards: (cardId: string) => void
  elem: CardPacks
  userId?: string
}

export const TableModal = ({ elem, deleteHandler, userId, navigateToCards }: PropsType) => {
  const [modalActive, setModalActive] = useState(false)

  console.log('render')

  return (
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
        {elem.user_id === userId ? (
          <>
            <MyActionsButton
              deleteHandler={() => {
                setModalActive(true)
              }}
            />
            <ModalMain active={modalActive} setActive={setModalActive}>
              <ModalDelete
                setActive={setModalActive}
                title={'Delete Pack'}
                name={elem.name}
                deleteCallback={() => {
                  console.log(elem._id)
                }}
              />
            </ModalMain>
          </>
        ) : (
          <FriendsButton />
        )}
      </td>
    </tr>
  )
}
