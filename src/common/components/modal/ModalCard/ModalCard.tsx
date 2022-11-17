import React, { useState } from 'react'

import { Formik } from 'formik'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { RootStateType } from '../../../../app/store'
import { useAppSelector } from '../../../../utils/hooks/customHooks'
import { InputTypeFile } from '../../InputTypeFile/InputTypeFile'
import SuperButton from '../../SuperButton/SuperButton'
import SuperInput from '../../SuperInputText/SuperInput'
import { SuperSelect } from '../../SuperSelect/SuperSelect'

import style from './ModalCard.module.css'

type PropsType = {
  onClose?: () => void
  setActive: (modalActive: boolean) => void
  title: string
  onSubmit: (question: string, answer: string, questionImage: string, answerImage: string) => void
  question: string
  answer: string
}

const selectArr = ['Text', 'Picture']

const selectorProgress = (state: RootStateType) => state.app.status

export const ModalCard = (props: PropsType) => {
  const [optionValue, onChangeOption] = useState(selectArr[0])
  const status = useAppSelector(selectorProgress)

  const [questionImage, setQuestionImage] = useState('')
  const [answerImage, setAnswerImage] = useState('')

  const { cardPackId } = useParams<'cardPackId'>()

  //console.log(questionImage)
  // console.log(cardPackId.id)

  const setActiveHandler = () => {
    props.setActive(false)
    props.onClose && props.onClose()
    setQuestionImage('')
    setAnswerImage('')
  }

  const initial = {
    question: props.question,
    answer: props.answer,
    questionImage,
    answerImage,
  }

  console.log(initial)

  return (
    <Formik
      enableReinitialize
      initialValues={initial}
      validationSchema={
        optionValue === 'Text'
          ? Yup.object({
              question: Yup.string()
                .max(20, 'Max length should be max 20 Symbols')
                .required('Field Required'),
              answer: Yup.string()
                .max(20, 'Max length should be max 20 Symbols')
                .required('Field Required'),
            })
          : Yup.object({
              questionImage: Yup.string().required('Image Required'),
              answerImage: Yup.string().required('Image Required'),
            })
      }
      onSubmit={(values, { resetForm }) => {
        console.log(values)
        // if (values.question || values.answer || values.questionImage || values.answerImage)
        props.onSubmit(values.question, values.answer, values.questionImage, values.answerImage)
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
                <div>Question</div>
                {optionValue === 'Picture' ? (
                  <InputTypeFile
                    type={'file'}
                    {...formik.getFieldProps('questionImage')}
                    error={formik.touched && formik.errors.questionImage}
                    spanClassName={style.spanError}
                    uploadImage={setQuestionImage}
                    defaultImg={questionImage}
                  />
                ) : (
                  <SuperInput
                    type={'text'}
                    placeholder={'Question'}
                    {...formik.getFieldProps('question')}
                    error={formik.touched && formik.errors.question}
                    className={style.input}
                    spanClassName={style.spanError}
                  />
                )}

                <div>Answer</div>
                {optionValue === 'Picture' ? (
                  <InputTypeFile
                    type={'file'}
                    {...formik.getFieldProps('answerImage')}
                    error={formik.touched && formik.errors.answerImage}
                    spanClassName={style.spanError}
                    uploadImage={setAnswerImage}
                    defaultImg={answerImage}
                  />
                ) : (
                  <SuperInput
                    type={'text'}
                    placeholder={'Answer'}
                    {...formik.getFieldProps('answer')}
                    error={formik.touched && formik.errors.answer}
                    className={style.input}
                    spanClassName={style.spanError}
                  />
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

                {/*<div onClick={redirect} className={style.link}>
                Comeback to PackList
              </div>*/}
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}
