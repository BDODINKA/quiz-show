import React from 'react'

import { SuperButton } from '../../../../common/components/SuperButton/SuperButton'

import style from './Question.module.scss'

type PropsType = {
  children?: React.ReactNode
  showAnswer?: () => void
  nextCardHandler?: () => void
  question?: string
  questionImg?: string
}

export const Question = (props: PropsType) => {
  const showAnswerHandler = () => {
    props.showAnswer && props.showAnswer()
  }
  const nextCardHandler = () => {
    props.nextCardHandler && props.nextCardHandler()
  }

  return (
    <div className={style.container}>
      <div className={style.question}>
        <strong>Question:</strong>
        {props.questionImg ? (
          <img src={props.questionImg} alt="" className={style.img} />
        ) : (
          <p>{props.question}</p>
        )}
      </div>
      <p className={style.attempts}>{`Количество попыток ответов на вопрос: ${10}`}</p>
      {props.children ? (
        <>
          {props.children}
          <SuperButton title={'Next'} className={style.btn} onClick={nextCardHandler} />
        </>
      ) : (
        <SuperButton title={'Show answer'} className={style.btn} onClick={showAnswerHandler} />
      )}
    </div>
  )
}
