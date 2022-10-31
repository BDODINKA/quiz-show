import React, { useState } from 'react'

import edit from '../../../assets/img/Table/Edit.svg'
import teacher from '../../../assets/img/Table/teacher.svg'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { selectorStatus } from '../../../common/selectors/selectors'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import style from './actionBtn.module.css'

type PropsType = {
  deleteHandler?: () => void
  changeName?: () => void
}

export const MyActionsButton = (props: PropsType) => {
  const [disabled, setDisabled] = useState(false)
  const status = useAppSelector(selectorStatus)

  const deleteHandler = () => {
    setDisabled(true)
    props.deleteHandler && props.deleteHandler()
  }
  const changeNameHandler = () => {
    props.changeName && props.changeName()
  }

  return (
    <>
      <div>
        <img src={teacher} alt="teacher" />
      </div>
      <div onClick={changeNameHandler}>
        <img src={edit} alt="edit" />
      </div>
      <SuperButton
        onClick={deleteHandler}
        disabled={disabled && status === 'progress'}
        className={style.deleteBtn}
      />
    </>
  )
}
