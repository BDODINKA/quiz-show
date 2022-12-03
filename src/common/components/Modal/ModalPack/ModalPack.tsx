import React, { useState } from 'react'

import { Formik } from 'formik'

import { CardsPackAddType } from '../../../../api/cardPacksAPI'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { validatePack } from '../../../constants/validate'
import { selectorStatus } from '../../../selectors/selectors'
import { InputTypeFile } from '../../InputTypeFile/InputTypeFile'
import { SuperButton } from '../../SuperButton/SuperButton'
import { SuperCheckbox } from '../../SuperCheckbox/SuperCheckbox'
import { SuperInput } from '../../SuperInputText/SuperInput'

import style from './ModalPack.module.scss'

type PropsType = {
  onClose?: () => void
  setOpenModal: (setOpenModal: boolean) => void
  title: string
  onSubmit: (pack: CardsPackAddType) => void
  text: string
  deckCover: string
}

export const ModalPack = (props: PropsType) => {
  const status = useAppSelector(selectorStatus)
  const [deckCover, setDeckCover] = useState(props.deckCover)

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
      validationSchema={validatePack}
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
                className={style.forms}
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
                  <label className={style.privateBox__label} htmlFor="private">
                    Private
                  </label>
                </div>
                <div className={style.btn__block}>
                  <SuperButton
                    type={'reset'}
                    title={'Cancel'}
                    className={style.btn__cancel}
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
