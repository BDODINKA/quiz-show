import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import style from '../Modal/ModalCard/ModalCard.module.css'
import { SuperButton } from '../SuperButton/SuperButton'
import { SuperInput } from '../SuperInputText/SuperInput'

type PropsType = {
  text?: string
  classNameInput?: string
  classNameSpan?: string
  classNameBtn?: string
  classPlaceholder?: string
  titleBtn?: string
  changedText?: (text: string) => void
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const EditableSpan = (props: PropsType) => {
  const {
    classPlaceholder,
    classNameSpan,
    classNameInput,
    classNameBtn,
    titleBtn,
    placeholder,
    changedText,
  } = props
  const [editMode, setEditMode] = useState<boolean>(false)
  const [text, setText] = useState<string | undefined>(props.text)
  const [touchCount, setTouchCount] = useState<number>(1)

  const editModeHandler = (value: boolean) => {
    setEditMode(value)
  }

  const editTitleHandler = (values: string) => {
    setText(values)
    changedText && changedText(values)
    setEditMode(false)
  }

  const countTouchHandler = (count: number) => {
    if (count === 2) {
      setEditMode(true)
      setTouchCount(1)
    } else {
      setTouchCount(touchCount + 1)
    }
  }

  return editMode ? (
    <>
      <span className={classPlaceholder}>{placeholder}</span>
      <Formik
        enableReinitialize
        initialValues={{ field: props.text }}
        validationSchema={Yup.object({
          field: Yup.string()
            .max(20, 'Max length should be max 20 Symbols')
            .min(3, 'Max length should be min 3 Symbols')
            .required('Field Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          editTitleHandler(values.field as string)
          resetForm()
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <SuperInput
              type={'text'}
              className={classNameInput}
              {...formik.getFieldProps('field')}
              error={formik.touched && formik.errors.field}
              spanClassName={style.spanError}
              autoFocus={true}
            />
            <SuperButton type={'submit'} title={titleBtn} className={classNameBtn} />
          </form>
        )}
      </Formik>
    </>
  ) : (
    <span
      className={classNameSpan}
      onDoubleClick={() => editModeHandler(true)}
      onTouchStart={() => countTouchHandler(touchCount)}
    >
      {text}
    </span>
  )
}
