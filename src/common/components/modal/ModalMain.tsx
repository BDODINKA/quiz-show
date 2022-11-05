import React from 'react'

import style from './ModalMain.module.css'

type PropsType = {
  active: boolean
  setActive: (modalActive: boolean) => void
  children: React.ReactNode
}

export const ModalMain = (props: PropsType) => {
  return (
    <div
      className={props.active ? `${style.modal_active} ${style.modal}` : style.modal}
      onClick={() => props.setActive(false)}
    >
      <div
        className={
          props.active
            ? `${style.modal__content_active} ${style.modal__content}`
            : style.modal__content
        }
        onClick={e => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  )
}
