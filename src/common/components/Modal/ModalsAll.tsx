import React from 'react'

import { AddAndUpdateCardType } from '../../../api/cardAPI'
import { CardsPackAddType } from '../../../api/cardPacksAPI'

import { ModalCard } from './ModalCard/ModalCard'
import { ModalDelete } from './ModalDelete/ModalDelete'
import { ModalPack } from './ModalPack/ModalPack'
type PropsType = {
  nameModal: 'modalCard' | 'modalDelete' | 'modalPack'
  text?: string
  deckCover?: string
  title: Record<string, string>
  onClose?: () => void
  onSubmitPack?: (pack: CardsPackAddType) => void
  setOpenModal: (modalActive: boolean) => void
  onSubmitCard?: (card: AddAndUpdateCardType) => void
  onSubmitDelete?: () => void

  questionCard?: string
  answerCard?: string
  deleteName?: string
}
export const ModalsAll = (props: PropsType) => {
  const {
    onSubmitCard,
    onSubmitDelete,
    onSubmitPack,
    setOpenModal,
    answerCard,
    deleteName,
    questionCard,
    nameModal,
    deckCover,
    text,
    title,
  } = props

  if (nameModal === 'modalCard')
    return (
      <ModalCard
        question={questionCard as string}
        answer={answerCard as string}
        setOpenModal={setOpenModal}
        title={title.card}
        onSubmit={card => onSubmitCard && onSubmitCard(card)}
      />
    )

  if (nameModal === 'modalPack')
    return (
      <ModalPack
        setOpenModal={setOpenModal}
        title={title.pack}
        onSubmit={pack => onSubmitPack && onSubmitPack(pack)}
        text={text as string}
        deckCover={deckCover}
      />
    )

  if (nameModal === 'modalDelete')
    return (
      <ModalDelete
        setOpenModal={setOpenModal}
        title={title.delete}
        deleteCallback={onSubmitDelete}
        name={deleteName as string}
      />
    )
  else {
    return null
  }
}
