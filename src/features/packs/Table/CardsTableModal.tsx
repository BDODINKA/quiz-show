import React, { useState } from 'react'

import { AddAndUpdateCardType, CardsType } from '../../../api/cardAPI'
import { ModalMain } from '../../../common/components/Modal/ModalMain'
import { ModalsAll } from '../../../common/components/Modal/ModalsAll'
import { RatingComponent } from '../../../common/components/Rating/RatingComponent'
import { selectorStatus } from '../../../common/selectors/selectors'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'

import style from './Table.module.scss'
import { ActionsButton } from './TableActionsButton/ActionsButton'

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
    <tr key={props.elem._id} className={style.row}>
      <td
        className={style.td}
        onClick={() => navigateLearnPage(props.elem._id)}
        data-label="Question"
      >
        <div className={style.question_answer}>
          {props.elem.questionImg ? (
            <img className={style.linkImage} src={props.elem.questionImg} alt="questionImg" />
          ) : (
            <p className={style.linkName}>{props.elem.question}</p>
          )}
        </div>
      </td>
      <td className={style.td} data-label="Answer">
        <div className={style.question_answer}>
          {props.elem.answerImg ? (
            <img className={style.linkImage} src={props.elem.answerImg} alt="answerImg" />
          ) : (
            <p className={style.linkName}>{props.elem.answer}</p>
          )}
        </div>
      </td>
      <td className={style.td} data-label="Last Updated">
        <div className={style.card_update_create}>
          {new Date(Date.parse(props.elem.updated)).toLocaleDateString('ru-RU')}
        </div>
      </td>
      <td className={style.td} data-label="Grade">
        <div className={style.rating}>
          <RatingComponent
            changeRating={value => changeRating(value)}
            valueRating={props.elem.grade}
            disabled={isProgress === 'progress'}
          />
        </div>
      </td>
      <td className={style.td} data-label="Actions">
        <div className={style.td_btn}>
          <ActionsButton
            showBtn={props.userId === props.elem.user_id}
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
        </div>
      </td>
      {modalName !== '' && (
        <ModalMain open={openModal} setOpenModal={setOpenModal}>
          <ModalsAll
            nameModal={modalName}
            title={{ card: 'Edit card', delete: 'Delete card' }}
            setOpenModal={setOpenModal}
            deleteName={props.elem.question}
            onSubmitDelete={() => {
              props.deleteHandler(props.elem._id, props.elem.cardsPack_id)
            }}
            onSubmitCard={card =>
              props.editCardHandler({
                ...card,
                cardsPack_id: props.elem.cardsPack_id,
                _id: props.elem._id,
              })
            }
            questionCard={props.elem.question}
            answerCard={props.elem.answer}
            questionCardImg={props.elem.questionImg ? props.elem.questionImg : ''}
            answerCardImg={props.elem.answerImg ? props.elem.answerImg : ''}
            deckCover={props.elem.questionImg}
          />
        </ModalMain>
      )}
    </tr>
  )
}
