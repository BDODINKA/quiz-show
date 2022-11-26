import React, { useState } from 'react'

import { AddAndUpdateCardType, CardsType } from '../../../api/cardAPI'
import { ModalMain } from '../../../common/components/modal/ModalMain'
import { ModalsAll } from '../../../common/components/modal/ModalsAll'
import { RatingComponent } from '../../../common/components/Rating/RatingComponent'
import { selectorStatus } from '../../../common/selectors/selectors'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import { ActionsButton } from './TableActionsButton/ActionsButton'
import style from './TableCard.module.css'

type PropsType = {
  elem: CardsType
  profileId?: string
  changeRating?: (grade: number) => void
  deleteHandler: (_id: string, packId: string) => void
  editCardHandler: (updateCard: AddAndUpdateCardType) => void
  navigateLearnPage: (cardId: string) => void
  userId?: string
}

export const CardsTableModal = (props: PropsType) => {
  const isProgress = useAppSelector(selectorStatus)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalName, setModalName] = useState<'modalCard' | 'modalDelete' | 'modalPack' | ''>('')

  const changeRating = (value: number) => {
    props.changeRating && props.changeRating(value)
  }

  const navigateLearnPage = (cardId: string) => {
    props.navigateLearnPage && props.navigateLearnPage(cardId)
  }

  return (
    <tr key={props.elem._id} className={style.title_table_body}>
      {props.elem.questionImg ? (
        <td className={style.tableImg} onClick={() => navigateLearnPage(props.elem._id)}>
          <img src={props.elem.questionImg} alt="questionImg" />
        </td>
      ) : (
        <td onClick={() => navigateLearnPage(props.elem._id)}>{props.elem.question}</td>
      )}
      {props.elem.answerImg ? (
        <td className={style.tableImg}>
          <img src={props.elem.answerImg} alt="answerImg" />
        </td>
      ) : (
        <td>{props.elem.answer}</td>
      )}

      <td>{new Date(Date.parse(props.elem.updated)).toLocaleDateString('ru-RU')}</td>
      <td>
        <RatingComponent
          changeRating={value => changeRating(value)}
          valueRating={props.elem.grade}
          disabled={isProgress === 'progress'}
        />
      </td>
      <td className={style.actions_button_my_pack}>
        {props.elem._id && props.userId === props.elem.user_id ? (
          <ActionsButton
            showBtn={true}
            deleteHandler={() => {
              setOpenModal(true)
              setModalName('modalDelete')
            }}
            changeName={() => {
              setOpenModal(true)
              setModalName('modalCard')
            }}
            learnHandler={() => navigateLearnPage(props.elem._id)}
          />
        ) : (
          <ActionsButton showBtn={false} learnHandler={() => navigateLearnPage(props.elem._id)} />
        )}

        {modalName !== '' && (
          <ModalMain open={openModal} setOpenModal={setOpenModal}>
            <ModalsAll
              nameModal={modalName}
              setOpenModal={setOpenModal}
              deleteName={props.elem.question}
              onSubmitDelete={() => {
                props.deleteHandler(props.elem._id, props.elem.cardsPack_id)
              }}
              questionCard={props.elem.question}
              title={{ card: 'Edit card' }}
              answerCard={props.elem.answer}
              onSubmitCard={card =>
                props.editCardHandler({
                  ...card,
                  cardsPack_id: props.elem.cardsPack_id,
                  _id: props.elem._id,
                })
              }
            />
          </ModalMain>
        )}
      </td>
    </tr>
  )
}
