import React from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { RootStateType } from '../../../app/store'
import SuperButton from '../../../common/components/SuperButton/SuperButton'
import { SuperCheckbox } from '../../../common/components/SuperCheckbox/SuperCheckbox'
import SuperInput from '../../../common/components/SuperInputText/SuperInput'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import style from './ModalPack.module.css'

type PropsType = {
  onClose?: () => void
  setActive: (modalActive: boolean) => void
  title: string
  onSubmit: (text: string, deckCover: string, privates: boolean) => void
}

const selectorProgress = (state: RootStateType) => state.app.status

export const ModalPack = (props: PropsType) => {
  const status = useAppSelector(selectorProgress)

  /*const redirect = () => {
    props.onClose()
  }*/
  const setActiveHandler = () => {
    props.setActive(false)
  }

  return (
    <Formik
      initialValues={{ text: '', private: false }}
      validationSchema={Yup.object({
        text: Yup.string()
          .max(20, 'Max length should be max 20 Symbols')
          .required('Field Required'),
      })}
      onSubmit={values => {
        props.onSubmit(values.text, '', values.private)
        console.log(values)
        setActiveHandler()
        // props.onClose()
      }}
    >
      {formik => (
        <div className={style.modal}>
          <div className={style.form}>
            <div className="container">
              <h2 className={style.title}>{props.title}</h2>
              {/*<div onClick={setActiveHandler}>{close_icon}</div>*/}
              <form onSubmit={formik.handleSubmit} className={style.forma}>
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
                    title={'Cancel'}
                    className={style.btn_cancel}
                    onClick={setActiveHandler}
                  />
                  <SuperButton
                    type={'submit'}
                    disabled={status === 'progress'}
                    className={style.btn}
                    title={'Add newPack'}
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
