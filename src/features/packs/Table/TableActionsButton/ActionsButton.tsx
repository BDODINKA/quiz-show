import React, { useState } from 'react'

import { ReactComponent as DeleteBtn } from '../../../../assets/img/Table/Delete.svg'
import { ReactComponent as EditBtn } from '../../../../assets/img/Table/Edit.svg'
import { ReactComponent as LearnBtn } from '../../../../assets/img/Table/teacher.svg'
import { selectorStatus } from '../../../../common/selectors/selectors'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'

import style from './actionBtn.module.css'

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
  const finalClassName = disabled && status === 'progress' ? `${style.disabledBtn}` : `${style.btn}`

  return (
    <>
      {props.showBtn ? (
        <>
          <LearnBtn className={finalClassName} onClick={learnHandler} />
          <EditBtn className={finalClassName} onClick={changeNameHandler} />
          <DeleteBtn className={finalClassName} onClick={deleteHandler} />
        </>
      ) : (
        <>
          <LearnBtn className={finalClassName} onClick={learnHandler} />
        </>
      )}
    </>
  )
}
