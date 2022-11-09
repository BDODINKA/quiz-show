import React, { useState } from 'react'

import { Answer } from './Answer'
import { Question } from './Question'

export const LearnCard = () => {
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
      console.log('NextCard without Rating')
    } else {
      console.log(answer)
    }
  }

  return (
    <div>
      {showAnswer ? (
        <Question nextCardHandler={nextCard} question={`How "This" works in JavaScript?`}>
          <Answer onChangeRadio={value => onChangeAnswer(value)} />
        </Question>
      ) : (
        <Question showAnswer={showAnswerHandler} question={`How "This" works in JavaScript?`} />
      )}
    </div>
  )
}
