import React, { useState } from 'react'

import { Formik } from 'formik'

import { AddAndUpdateCardType } from '../../../../api/cardAPI'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { validateCardField, validateCardImage } from '../../../constants/validate'
import { selectorStatus } from '../../../selectors/selectors'
import { InputTypeFile } from '../../InputTypeFile/InputTypeFile'
import { SuperButton } from '../../SuperButton/SuperButton'
import { SuperInput } from '../../SuperInputText/SuperInput'
import { SuperSelect } from '../../SuperSelect/SuperSelect'

import style from './ModalCard.module.css'

type PropsType = {
  onClose?: () => void
  setOpenModal: (setOpenModal: boolean) => void
  title: string
  onSubmit: (card: AddAndUpdateCardType) => void
  question: string
  answer: string
  questionCardImg?: string
  answerCardImg?: string
}

const selectArr = ['Text', 'Picture']

export const ModalCard = (props: PropsType) => {
  const [optionValue, onChangeOption] = useState(selectArr[0])
  const status = useAppSelector(selectorStatus)

  const [questionImage, setQuestionImage] = useState(props.questionCardImg)
  const [answerImage, setAnswerImage] = useState(props.answerCardImg)

  const setActiveHandler = () => {
    const modal = document.getElementById('overlay')

    if (modal) {
      modal.style.opacity = '0'
      setTimeout(() => {
        props.setOpenModal(false)
        props.onClose && props.onClose()
        setQuestionImage('')
        setAnswerImage('')
      }, 1000)
    }
  }

  const initial = {
    question: props.question,
    answer: props.answer,
    questionImage,
    answerImage,
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initial}
      validationSchema={optionValue === 'Text' ? validateCardField : validateCardImage}
      onSubmit={(values, { resetForm }) => {
        props.onSubmit({
          question: values.question,
          answer: values.answer,
          questionImg: values.questionImage,
          answerImg: values.answerImage,
        } as AddAndUpdateCardType)
        resetForm()
        setActiveHandler()
      }}
    >
      {formik => (
        <div className={style.modal}>
          <div className={style.form}>
            <div className="container">
              <h2 className={style.title}>{props.title}</h2>
              {/*<div onClick={setActiveHandler}>{close_icon}</div>*/}
              <div>Choose a question format</div>
              <SuperSelect
                options={selectArr}
                value={optionValue}
                onChangeOption={onChangeOption}
              />
              <form
                onSubmit={formik.handleSubmit}
                className={style.forma}
                onReset={formik.handleReset}
              >
                {optionValue === 'Picture' ? (
                  <InputTypeFile
                    title="Question:"
                    type={'file'}
                    {...formik.getFieldProps('questionImage')}
                    error={formik.touched && formik.errors.questionImage}
                    spanClassName={style.spanError}
                    uploadImage={setQuestionImage}
                    defaultImg={questionImage ? questionImage : ''}
                  />
                ) : (
                  <div>
                    <h4>Question</h4>
                    <SuperInput
                      type={'text'}
                      placeholder={'Question'}
                      {...formik.getFieldProps('question')}
                      error={formik.touched && formik.errors.question}
                      className={style.input}
                      spanClassName={style.spanError}
                    />
                  </div>
                )}
                {optionValue === 'Picture' ? (
                  <InputTypeFile
                    title="Answer:"
                    type={'file'}
                    {...formik.getFieldProps('answerImage')}
                    error={formik.touched && formik.errors.answerImage}
                    spanClassName={style.spanError}
                    uploadImage={setAnswerImage}
                    defaultImg={answerImage ? answerImage : ''}
                  />
                ) : (
                  <div>
                    <h4>Answer</h4>
                    <SuperInput
                      type={'text'}
                      placeholder={'Answer'}
                      {...formik.getFieldProps('answer')}
                      error={formik.touched && formik.errors.answer}
                      className={style.input}
                      spanClassName={style.spanError}
                    />
                  </div>
                )}

                <div className={style.btn_block}>
                  <SuperButton
                    type={'reset'}
                    title={'Cancel'}
                    className={style.btn_cancel}
                    onClick={setActiveHandler}
                  />
                  <SuperButton
                    type={'submit'}
                    disabled={status === 'progress'}
                    className={style.btn}
                    title={'Save'}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}
