import React, { useState } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { RootStateType } from '../../../../app/store'
import { useAppSelector } from '../../../../utils/hooks/customHooks'
import SuperButton from '../../SuperButton/SuperButton'
import SuperInput from '../../SuperInputText/SuperInput'

import style from './ModalCard.module.css'

type PropsType = {
  onClose?: () => void
  setActive: (modalActive: boolean) => void
  title: string
  onSubmit: (question: string, answer: string) => void
}

const selectorProgress = (state: RootStateType) => state.app.status

export const ModalCard = (props: PropsType) => {
  const status = useAppSelector(selectorProgress)
  const [select, setSelect] = useState('')

  /*const redirect = () => {
    props.onClose()
  }*/
  const setActiveHandler = () => {
    props.setActive(false)
  }
  const selectHandler = () => {}

  return (
    <Formik
      enableReinitialize
      initialValues={{ question: '', answer: '' }}
      validationSchema={Yup.object({
        text: Yup.string()
          .max(20, 'Max length should be max 20 Symbols')
          .required('Field Required'),
      })}
      onSubmit={(values, { resetForm }) => {
        props.onSubmit(values.question, values.answer)
        console.log(values)
        setActiveHandler()
        resetForm()
      }}
    >
      {formik => (
        <div className={style.modal}>
          <div className={style.form}>
            <div className="container">
              <h2 className={style.title}>{props.title}</h2>
              {/*<div onClick={setActiveHandler}>{close_icon}</div>*/}
              <select>
                <option>Text</option>
                <option>Picture</option>
              </select>
              <form onSubmit={formik.handleSubmit} className={style.forma}>
                <SuperInput
                  type={'text'}
                  placeholder={'Question'}
                  {...formik.getFieldProps('text')}
                  error={formik.touched && formik.errors.question}
                  className={style.input}
                  spanClassName={style.spanError}
                />
                <SuperInput
                  type={'text'}
                  placeholder={'Answer'}
                  {...formik.getFieldProps('text')}
                  error={formik.touched && formik.errors.answer}
                  className={style.input}
                  spanClassName={style.spanError}
                />
                <div className={style.btn_block}>
                  <SuperButton
                    title={'Cancel'}
                    className={style.btn_cancel}
                    onClick={setActiveHandler}
                  />
                  <SuperButton
                    type={'submit'}
                    disabled={status === 'progress'}
                    className={style.btn}
                    title={'Add newCard'}
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
