import React from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { RootStateType } from '../../app/store'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { SuperCheckbox } from '../../common/components/SuperCheckbox/SuperCheckbox'
import SuperInput from '../../common/components/SuperInputText/SuperInput'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import style from './CardPackForm.module.css'
import { addPackTC } from './cardPacks-reducer'

type PropsType = {
  onClose: () => void
}

const selectorProgress = (state: RootStateType) => state.app.status

export const CardPackForm = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectorProgress)

  const redirect = () => {
    props.onClose()
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
        dispatch(addPackTC(values.text, '', values.private))
        props.onClose()
      }}
    >
      {formik => (
        <div className={style.container}>
          <div className={style.form}>
            <h2 className={style.title}>Create New Pack</h2>
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
                <label htmlFor="private">private</label>
                <SuperCheckbox
                  id="private"
                  type="checkbox"
                  {...formik.getFieldProps('private')}
                  className={style.checkBox}
                />
              </div>
              <SuperButton
                type={'submit'}
                disabled={status === 'progress'}
                className={style.btn}
                title={'Add newPack'}
              />
              <div onClick={redirect} className={style.link}>
                Comeback to PackList
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  )
}
