import React from 'react'

import { Formik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { login } from '../../common/routes/const-routes'
import SuperButton from '../../common/superButton/SuperButton'
import SuperInput from '../../common/superInputText/SuperInput'

import { SendNewPasswordFormTC, SendStatus } from './forgot-password.reducer'

const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const isSend: SendStatus = useAppSelector(state => state.forgotPass.isSend)

  if (isSend === SendStatus.success) {
    return <Navigate to={login} />
  }

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required('No password provided.')
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          .max(16, 'Password is too long - should be 16 chars maximum.'),
      })}
      onSubmit={values => {
        dispatch(SendNewPasswordFormTC({ password: values.password, resetPasswordToken: token }))
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <SuperInput
            type={'password'}
            placeholder={'Password'}
            {...formik.getFieldProps('password')}
            error={formik.touched && formik.errors.password}
            disabled={isSend === SendStatus.inProgress}
          />
          <p>Create new password and we will send you further instructions to email</p>
          <SuperButton type={'submit'} disabled={isSend === SendStatus.inProgress}></SuperButton>
        </form>
      )}
    </Formik>
  )
}

export default CreateNewPassword
