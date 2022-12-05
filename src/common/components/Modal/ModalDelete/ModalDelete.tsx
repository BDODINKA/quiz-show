import React from 'react'

import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectorStatus } from '../../../selectors/selectors'
import { InputTypeFile } from '../../InputTypeFile/InputTypeFile'
import { SuperButton } from '../../SuperButton/SuperButton'

import defaultImage from './../../../../assets/img/defaultImage.jpg'
import style from './ModalDelete.module.scss'

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
        <div className={style.container}>
          {props.deckCover ? (
            <div>
              <div className={style.description__img}>
                <InputTypeFile
                  uploadImage={() => {}}
                  defaultImg={props.deckCover}
                  hiddenBtn={true}
                />
              </div>
              Do you really want to remove
              <span className={style.description__title}> {props.name}</span>? All cards will be
              deleted.
            </div>
          ) : (
            <div>
              <img className={style.description__img} src={defaultImage} alt="default image" />
              <div className={style.description}>
                Do you really want to remove
                <span className={style.description__title}> {props.name}</span>?
                <p>All cards will be deleted.</p>
              </div>
            </div>
          )}
          <div className={style.btn__block}>
            <SuperButton
              title={'Cancel'}
              className={style.btn__cancel}
              onClick={setActiveHandler}
            />
            <SuperButton
              disabled={!!status}
              className={style.btn}
              onClick={deleteHandler}
              title={props.title}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
