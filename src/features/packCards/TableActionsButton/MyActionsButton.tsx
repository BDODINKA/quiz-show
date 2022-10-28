import React from 'react'

import { RootStateType } from '../../../app/store'
import edit from '../../../assets/img/Table/Edit.svg'
import teacher from '../../../assets/img/Table/teacher.svg'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import style from './actionBtn.module.css'

type PropsType = {
  deleteHandler?: () => void
}

const selectorStatus = (state: RootStateType) => state.app.status

export const MyActionsButton = (props: PropsType) => {
  const status = useAppSelector(selectorStatus)
  const deleteHandler = () => {
    props.deleteHandler && props.deleteHandler()
  }

  return (
    <>
      <div>
        <img src={teacher} alt="teacher" />
      </div>
      <div>
        <img src={edit} alt="edit" />
      </div>
      <SuperButton
        onClick={deleteHandler}
        disabled={status === 'progress'}
        className={style.deleteBtn}
      />
    </>
  )
}
