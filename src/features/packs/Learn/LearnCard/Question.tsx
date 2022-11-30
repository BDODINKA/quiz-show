import React from 'react'

import { SuperButton } from '../../../../common/components/SuperButton/SuperButton'

import style from './Question.module.css'

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

  return props.children ? (
    <div className={style.box}>
      <div className={style.question}>
        <strong>Question:</strong>
        {props.questionImg ? (
          <img src={props.questionImg} alt="" style={{ width: '100px', height: '100px' }} />
        ) : (
          <span>{props.question}</span>
        )}
      </div>
      <div className={style.attempts}>{`Количество попыток ответов на вопрос: ${10}`}</div>
      {props.children}
      <SuperButton title={'Next'} className={style.btn} onClick={nextCardHandler} />
    </div>
  ) : (
    <div className={style.box}>
      <div className={style.question}>
        <strong>Question:</strong>
        {props.questionImg ? (
          <img src={props.questionImg} alt="" style={{ width: '100px', height: '100px' }} />
        ) : (
          <span>{props.question}</span>
        )}
      </div>
      <div className={style.attempts}>{`Количество попыток ответов на вопрос: ${10}`}</div>
      <SuperButton title={'Show answer'} className={style.btn} onClick={showAnswerHandler} />
    </div>
  )
}
