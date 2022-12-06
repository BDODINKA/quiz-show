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
        <div className={style.td_name}>
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
        </div>
      </td>
      <td data-label="Cards" className={style.td}>
        <div className={style.card_update_create}>{elem.cardsCount}</div>
      </td>
      <td data-label="Last Updated" className={style.td}>
        <div className={style.card_update_create}>
          {new Date(Date.parse(elem.updated)).toLocaleDateString('ru-RU')}
        </div>
      </td>
      <td data-label="Created by" className={style.td}>
        <div className={style.card_update_create}>
          <p>{elem.user_name}</p>
        </div>
      </td>
      <td className={style.td} data-label="Actions">
        <div className={style.td_btn}>
          <ActionsButton
            showBtn={userId === elem.user_id}
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
        </div>
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
