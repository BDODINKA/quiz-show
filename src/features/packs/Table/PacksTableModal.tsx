import React, { useState } from 'react'

import { CardPacks, CardsPackAddType } from '../../../api/cardPacksAPI'
import { ModalMain } from '../../../common/components/Modal/ModalMain'
import { ModalsAll } from '../../../common/components/Modal/ModalsAll'

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
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalName, setModalName] = useState<'modalCard' | 'modalDelete' | 'modalPack' | ''>('')

  return (
    <tr key={elem._id} className={style.title_table_body}>
      <td className={style.td}>
        {elem.deckCover && (
          <img
            className={style.linkImage}
            src={elem.deckCover}
            alt="deckCover"
            onClick={() => navigateToCards(elem._id)}
          />
        )}
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
              setOpenModal(true)
              setModalName('modalDelete')
            }}
            changeName={() => {
              setOpenModal(true)
              setModalName('modalPack')
            }}
          />
        ) : (
          <ActionsButton showBtn={false} learnHandler={() => navigateToCards(elem._id)} />
        )}

        {modalName !== '' && (
          <ModalMain open={openModal} setOpenModal={setOpenModal}>
            <ModalsAll
              title={{ pack: 'Edit pack', delete: 'Delete Pack' }}
              setOpenModal={setOpenModal}
              onSubmitPack={pack => changeFieldName(pack, elem._id)}
              text={elem.name}
              deckCover={elem.deckCover}
              nameModal={modalName}
              onSubmitDelete={() => {
                deleteHandler(elem._id)
              }}
              deleteName={elem.name}
            />
          </ModalMain>
        )}
      </td>
    </tr>
  )
}
