import React, { useState } from 'react'

import { CardPacks, CardsPackAddType } from '../../../api/cardPacksAPI'
import { ModalDelete } from '../../../common/components/modal/ModalDelete/ModalDelete'
import { ModalMain } from '../../../common/components/modal/ModalMain'
import { ModalPack } from '../../../common/components/modal/ModalPack/ModalPack'

import { ActionsButton } from './TableActionsButton/ActionsButton'
import style from './TableCard.module.css'

type PropsType = {
  deleteHandler: (id: string) => void
  changeFieldName: (pack: CardsPackAddType, id: string) => void
  navigateToCards: (cardId: string) => void
  elem: CardPacks
  userId?: string
}
export const PacksTableModal = ({
  elem,
  deleteHandler,
  userId,
  navigateToCards,
  changeFieldName,
}: PropsType) => {
  const [modalActive, setModalActive] = useState(false)
  const [modalBtn, setModalBtn] = useState('')

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
        {userId === elem.user_id ? (
          <ActionsButton
            showBtn={true}
            learnHandler={() => navigateToCards(elem._id)}
            deleteHandler={() => {
              setModalActive(true)
              setModalBtn('delete')
            }}
            changeName={() => {
              setModalActive(true)
              setModalBtn('change')
            }}
          />
        ) : (
          <ActionsButton showBtn={false} learnHandler={() => navigateToCards(elem._id)} />
        )}

        {modalBtn === 'delete' ? (
          <ModalMain open={modalActive} setActive={setModalActive}>
            <ModalDelete
              setActive={setModalActive}
              title={'Delete Pack'}
              name={elem.name}
              deleteCallback={() => {
                deleteHandler(elem._id)
                console.log(elem._id)
              }}
            />
          </ModalMain>
        ) : (
          <ModalMain open={modalActive} setActive={setModalActive}>
            <ModalPack
              text={elem.name}
              setActive={setModalActive}
              title={'Edit pack'}
              onSubmit={pack => changeFieldName(pack, elem._id)}
            />
          </ModalMain>
        )}
      </td>
    </tr>
  )
}
