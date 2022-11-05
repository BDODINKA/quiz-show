import React from 'react'

import { RootStateType } from '../../../../app/store'
import { useAppSelector } from '../../../../utils/hooks/customHooks'
import SuperButton from '../../SuperButton/SuperButton'

import style from './ModalDelete.module.css'

type PropsType = {
  onClose?: () => void
  setActive: (modalActive: boolean) => void
  title: string
  name: string
  deleteCallback?: () => void
}

const selectorProgress = (state: RootStateType) => state.app.status

export const ModalDelete = (props: PropsType) => {
  const status = useAppSelector(selectorProgress)

  /*const redirect = () => {
    props.onClose()
  }*/
  const setActiveHandler = () => {
    props.setActive(false)
  }
  const deleteHandler = () => {
    props.deleteCallback?.()
  }

  return (
    <div className={style.modal}>
      <div className={style.form}>
        <h2 className={style.title}>{props.title}</h2>
        {/*<div onClick={setActiveHandler}>{close_icon}</div>*/}
        <div>Do you really want to remove ${props.name}? All cards will be deleted.</div>

        <div className={style.btn_block}>
          <SuperButton title={'Cancel'} className={style.btn_cancel} onClick={setActiveHandler} />
          <SuperButton
            disabled={status === 'progress'}
            className={style.btn}
            onClick={deleteHandler}
            title={props.title}
          />
        </div>

        {/*<div onClick={redirect} className={style.link}>
                Comeback to PackList
              </div>*/}
      </div>
    </div>
  )
}
