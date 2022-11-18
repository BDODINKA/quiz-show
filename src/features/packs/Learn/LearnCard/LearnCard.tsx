import React, { useState } from 'react'

import { Answer } from './Answer'
import { Question } from './Question'

type PropsType = {
  question: string
  answer: string
  nextCard: () => void
}

export const LearnCard = (props: PropsType) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [answer, setAnswer] = useState(0)

  const showAnswerHandler = () => {
    setShowAnswer(true)
  }
  const onChangeAnswer = (value: number) => {
    setAnswer(value)
  }
  const nextCard = () => {
    if (answer === 0) {
      props.nextCard()
      setShowAnswer(false)
      console.log('NextCard without Rating')
    } else {
      props.nextCard()
      setShowAnswer(false)
    }
  }

  return (
    <div>
      {showAnswer ? (
        <Question nextCardHandler={nextCard} question={props.question}>
          <Answer onChangeRadio={value => onChangeAnswer(value)} answer={props.answer} />
        </Question>
      ) : (
        <Question showAnswer={showAnswerHandler} question={props.question} />
      )}
    </div>
  )
}
