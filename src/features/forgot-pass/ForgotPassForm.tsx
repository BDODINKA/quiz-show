import React from 'react'

import { AlertColor } from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch } from '../../app/store'
import SuperButton from '../../common/superButton/SuperButton'
import SuperInput from '../../common/superInputText/SuperInput'

import { SendStatusType, SendForgotFormTC } from './forgot-password.reducer'

type PropsType = {
  status: AlertColor
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
        <form onSubmit={formik.handleSubmit}>
          <SuperInput
            type={'email'}
            placeholder={'Email'}
            {...formik.getFieldProps('email')}
            error={formik.touched && formik.errors.email}
          />
          <p>Enter your email address and we will send you further instructions </p>
          <SuperButton
            type={'submit'}
            disabled={props.status === SendStatusType.inProgress}
          ></SuperButton>
        </form>
      )}
    </Formik>
  )
}
