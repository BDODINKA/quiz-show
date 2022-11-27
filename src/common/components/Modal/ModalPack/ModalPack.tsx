import React, { useState } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { CardsPackAddType } from '../../../../api/cardPacksAPI'
import { RootStateType } from '../../../../app/store'
import { useAppSelector } from '../../../../utils/hooks/customHooks'
import { InputTypeFile } from '../../InputTypeFile/InputTypeFile'
import { SuperButton } from '../../SuperButton/SuperButton'
import { SuperCheckbox } from '../../SuperCheckbox/SuperCheckbox'
import { SuperInput } from '../../SuperInputText/SuperInput'

import style from './ModalPack.module.css'

type PropsType = {
  onClose?: () => void
  setOpenModal: (setOpenModal: boolean) => void
  title: string
  onSubmit: (pack: CardsPackAddType) => void
  text: string
  deckCover: string | undefined
}

const selectorProgress = (state: RootStateType) => state.app.status

export const ModalPack = (props: PropsType) => {
  const status = useAppSelector(selectorProgress)
  const [deckCover, setDeckCover] = useState('')

  const setActiveHandler = () => {
    const modal = document.getElementById('overlay')

    if (modal) {
      modal.style.opacity = '0'
      setTimeout(() => {
        props.setOpenModal(false)
      }, 1000)
    }
  }

  const initial = { text: props.text, deckCover, private: false }

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
        if (values) {
          props.onSubmit({
            name: values.text,
            private: values.private,
            deckCover: values.deckCover,
          })
        }
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
                <InputTypeFile
                  title="Cover:"
                  type={'file'}
                  {...formik.getFieldProps('deckCover')}
                  uploadImage={setDeckCover}
                  defaultImg={deckCover}
                  hiddenBtn={false}
                />
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
