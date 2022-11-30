import React, { useState } from 'react'

import { Answer } from './Answer'
import { Question } from './Question'

type PropsType = {
  question: string
  answer: string
  nextCard: () => void
  questionImg: string
  answerImg: string
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
    } else {
      props.nextCard()
      setShowAnswer(false)
    }
  }

  return (
    <div>
      {showAnswer ? (
        <Question
          nextCardHandler={nextCard}
          question={props.question}
          questionImg={props.questionImg}
        >
          <Answer
            onChangeRadio={value => onChangeAnswer(value)}
            answer={props.answer}
            answerImg={props.answerImg}
          />
        </Question>
      ) : (
        <Question
          showAnswer={showAnswerHandler}
          question={props.question}
          questionImg={props.questionImg}
        />
      )}
    </div>
  )
}
