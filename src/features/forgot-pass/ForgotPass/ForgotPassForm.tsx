import React from 'react'

import { AlertColor } from '@mui/material'
import { Formik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch } from '../../../app/store'
import { LoginPage } from '../../../common/routes/const-routes'
import SuperButton from '../../../common/superButton/SuperButton'
import SuperInput from '../../../common/superInputText/SuperInput'
import { SendStatusType, SendForgotFormTC } from '../forgot-password.reducer'

import style from './ForgotPasswordForm.module.css'

type PropsType = {
  status: AlertColor
  style: any
}
export const ForgotPassForm = (props: PropsType) => {
  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={values => {
        dispatch(SendForgotFormTC(values.email))
      }}
    >
      {formik => (
        <div className={style.container}>
          <div className={style.form}>
            <h2 className={style.title}>Forgot your password?</h2>
            <form onSubmit={formik.handleSubmit} className={props.style.forma}>
              <SuperInput
                type={'email'}
                placeholder={'Email'}
                {...formik.getFieldProps('email')}
                error={formik.touched && formik.errors.email}
                className={props.style.input}
                spanClassName={props.style.spanError}
              />
              <p className={props.style.description}>
                Enter your email address and we will send you further instructions{' '}
              </p>
              <SuperButton
                type={'submit'}
                disabled={props.status === SendStatusType.inProgress}
                className={props.style.btn}
                title={'Send Instructions'}
              />
              <p className={style.question}>Did you remember your password?</p>
              <NavLink to={LoginPage} className={style.link}>
                Try logging in
              </NavLink>
            </form>
          </div>
        </div>
      )}
    </Formik>
  )
}
