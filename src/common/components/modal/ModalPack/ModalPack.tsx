import React from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { RootStateType } from '../../../../app/store'
import { useAppSelector } from '../../../../utils/hooks/customHooks'
import SuperButton from '../../SuperButton/SuperButton'
import { SuperCheckbox } from '../../SuperCheckbox/SuperCheckbox'
import SuperInput from '../../SuperInputText/SuperInput'

import style from './ModalPack.module.css'

type PropsType = {
  onClose?: () => void
  setActive: (modalActive: boolean) => void
  title: string
  onSubmit: (text: string, deckCover: string, privates: boolean) => void
  text: string
}

const selectorProgress = (state: RootStateType) => state.app.status

export const ModalPack = (props: PropsType) => {
  const status = useAppSelector(selectorProgress)

  const setActiveHandler = () => {
    props.setActive(false)
    props.onClose && props.onClose
  }

  const initial = { text: props.text, private: false }

  return (
    <Formik
      enableReinitialize
      initialValues={initial}
      validationSchema={Yup.object({
        text: Yup.string()
          .max(20, 'Max length should be max 20 Symbols')
          .required('Field Required'),
      })}
      onSubmit={(values, { resetForm }) => {
        if (values.text) props.onSubmit(values.text, '', values.private)
        resetForm()
        setActiveHandler()
      }}
    >
      {formik => (
        <div className={style.modal}>
          <div className={style.form}>
            <div className="container">
              {/*<div onClick={setActiveHandler}>{'close_icon'}</div>*/}
              <h2 className={style.title}>{props.title}</h2>
              <form
                onSubmit={formik.handleSubmit}
                className={style.forma}
                onReset={formik.handleReset}
              >
                <SuperInput
                  type={'text'}
                  placeholder={'New Pack Name'}
                  {...formik.getFieldProps('text')}
                  error={formik.touched && formik.errors.text}
                  className={style.input}
                  spanClassName={style.spanError}
                />
                <div className={style.privateBox}>
                  <SuperCheckbox
                    id="private"
                    type="checkbox"
                    {...formik.getFieldProps('private')}
                    className={style.checkBox}
                  />
                  <label className={style.privateBox_label} htmlFor="private">
                    Private
                  </label>
                </div>
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