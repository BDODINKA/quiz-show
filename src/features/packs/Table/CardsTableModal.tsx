import React, { useState } from 'react'

import { CardsType, UpdateCardType } from '../../../api/cardAPI'
import { ModalCard } from '../../../common/components/modal/ModalCard/ModalCard'
import { ModalDelete } from '../../../common/components/modal/ModalDelete/ModalDelete'
import { ModalMain } from '../../../common/components/modal/ModalMain'
import { RatingComponent } from '../../../common/components/Rating/RatingComponent'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import { ActionsButton } from './TableActionsButton/ActionsButton'
import style from './TableCard.module.css'

type PropsType = {
  elem: CardsType
  profileId?: string
  changeRating?: (grade: number) => void
  deleteHandler: (_id: string, packId: string) => void
  editCardHandler: (updateCard: UpdateCardType) => void
  navigateLearnPage: (cardId: string) => void
  userId?: string
}

export const CardsTableModal = (props: PropsType) => {
  const isProgress = useAppSelector(state => state.app.status)
  const [modalActive, setModalActive] = useState(false)
  const [modalBtn, setModalBtn] = useState('')

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
              setModalActive(true)
              setModalBtn('delete')
            }}
            changeName={() => {
              setModalActive(true)
              setModalBtn('change')
            }}
          />
        ) : (
          <ActionsButton showBtn={false} />
        )}
        {modalActive && modalBtn === 'delete' ? (
          <ModalMain active={modalActive} setActive={setModalActive}>
            <ModalDelete
              setActive={setModalActive}
              title={'Delete Card'}
              name={props.elem.question}
              deleteCallback={() => {
                props.deleteHandler(props.elem._id, props.elem.cardsPack_id)
                console.log(props.elem._id)
              }}
            />
          </ModalMain>
        ) : (
          <ModalMain active={modalActive} setActive={setModalActive}>
            <ModalCard
              question={props.elem.question}
              setActive={setModalActive}
              title={'Edit card'}
              answer={props.elem.answer}
              onSubmit={(question, answer) =>
                props.editCardHandler({
                  cardsPack_id: props.elem.cardsPack_id,
                  _id: props.elem._id,
                  question,
                  answer,
                })
              }
            />
          </ModalMain>
        )}
      </td>
    </tr>
  )
}
