import React, { useState } from 'react'

import { SuperButton } from '../../../../common/components/SuperButton/SuperButton'
import { selectorStatus } from '../../../../common/selectors/selectors'
import { useAppSelector } from '../../../../utils/hooks/customHooks'

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

  return (
    <>
      {props.showBtn ? (
        <>
          <SuperButton
            onClick={learnHandler}
            disabled={disabled && status === 'progress'}
            className={style.learn}
          />
          <SuperButton
            onClick={changeNameHandler}
            disabled={disabled && status === 'progress'}
            className={style.editBtn}
          />
          <SuperButton
            onClick={deleteHandler}
            disabled={disabled && status === 'progress'}
            className={style.deleteBtn}
          />
        </>
      ) : (
        <>
          <SuperButton
            onClick={learnHandler}
            disabled={disabled && status === 'progress'}
            className={style.learn}
          />
        </>
      )}
    </>
  )
}
