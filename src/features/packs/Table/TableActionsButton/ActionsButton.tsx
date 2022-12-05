import React, { useState } from 'react'

import { ReactComponent as DeleteBtn } from '../../../../assets/img/Table/Delete.svg'
import { ReactComponent as EditBtn } from '../../../../assets/img/Table/Edit.svg'
import { ReactComponent as LearnBtn } from '../../../../assets/img/Table/teacher.svg'
import { selectorStatus } from '../../../../common/selectors/selectors'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'

import style from './actionBtn.module.scss'

type PropsType = {
  deleteHandler?: () => void
  changeName?: () => void
  learnHandler?: () => void
  showBtn: boolean
}

export const ActionsButton = (props: PropsType) => {
  const [disabled, setDisabled] = useState(false)
  const status = useAppSelector(selectorStatus)

  const deleteHandler = () => {
    setDisabled(true)
    props.deleteHandler && props.deleteHandler()
  }
  const changeNameHandler = () => {
    props.changeName && props.changeName()
  }
  const learnHandler = () => {
    props.learnHandler && props.learnHandler()
  }

  return (
    <>
      <LearnBtn
        className={
          disabled && status === 'progress' ? `${style.disabledLearn}` : `${style.btnLearn}`
        }
        onClick={learnHandler}
      />
      {props.showBtn && (
        <>
          <EditBtn
            className={
              disabled && status === 'progress' ? `${style.disabledEdit}` : `${style.btnEdit}`
            }
            onClick={changeNameHandler}
          />
          <DeleteBtn
            className={
              disabled && status === 'progress' ? `${style.disabledDelete}` : `${style.btnDelete}`
            }
            onClick={deleteHandler}
          />
        </>
      )}
    </>
  )
}
