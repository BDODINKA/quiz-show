import React from 'react'

import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectorStatus } from '../../../selectors/selectors'
import { InputTypeFile } from '../../InputTypeFile/InputTypeFile'
import { SuperButton } from '../../SuperButton/SuperButton'

import style from './ModalDelete.module.css'

type PropsType = {
  onClose?: () => void
  setOpenModal: (setOpenModal: boolean) => void
  title: string
  name: string
  deckCover?: string
  deleteCallback?: () => void
}

export const ModalDelete = (props: PropsType) => {
  const status = useAppSelector(selectorStatus)

  const setActiveHandler = () => {
    const modal = document.getElementById('overlay')

    if (modal) {
      modal.style.opacity = '0'
      setTimeout(() => {
        props.setOpenModal(false)
      }, 500)
    }
  }

  const deleteHandler = () => {
    props.deleteCallback && props.deleteCallback()
  }

  return (
    <div className={style.modal}>
      <div className={style.form}>
        <h2 className={style.title}>{props.title}</h2>
        {props.deckCover ? (
          <div>
            Do you really want to remove
            <InputTypeFile uploadImage={() => {}} defaultImg={props.deckCover} hiddenBtn={true} />?
            All cards will be deleted.
          </div>
        ) : (
          <div>{`Do you really want to remove ${props.name}? All cards will be deleted.`}</div>
        )}
        <div className={style.btn_block}>
          <SuperButton title={'Cancel'} className={style.btn_cancel} onClick={setActiveHandler} />
          <SuperButton
            disabled={!!status}
            className={style.btn}
            onClick={deleteHandler}
            title={props.title}
          />
        </div>
      </div>
    </div>
  )
}
