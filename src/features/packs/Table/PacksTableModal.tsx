import React, { useState } from 'react'

import { CardPacks, CardsPackAddType } from '../../../api/cardPacksAPI'
import { ModalMain } from '../../../common/components/Modal/ModalMain'
import { ModalsAll } from '../../../common/components/Modal/ModalsAll'

import style from './Table.module.scss'
import { ActionsButton } from './TableActionsButton/ActionsButton'

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
    <tr key={elem._id} className={style.row}>
      <td className={style.td} data-label="Name">
        {elem.deckCover && (
          <img
            className={style.linkImage}
            src={elem.deckCover}
            alt="deckCover"
            onClick={() => navigateToCards(elem._id)}
          />
        )}
        <p className={style.linkName} onClick={() => navigateToCards(elem._id)}>
          {elem.name}
        </p>
      </td>
      <td data-label="Cards" className={style.td}>
        {elem.cardsCount}
      </td>
      <td data-label="Last Updated" className={style.td}>
        {new Date(Date.parse(elem.updated)).toLocaleDateString('ru-RU')}
      </td>
      <td data-label="Created by" className={style.td}>
        {elem.user_name}
      </td>
      <td className={style.td} data-label="Actions">
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
      </td>
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
    </tr>
  )
}
