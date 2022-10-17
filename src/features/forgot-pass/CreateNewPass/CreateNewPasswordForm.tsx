import React, { useState } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch } from '../../../app/store'
import SuperButton from '../../../common/superButton/SuperButton'
import SuperInput from '../../../common/superInputText/SuperInput'
import { SendNewPasswordFormTC, SendStatusType } from '../forgot-password.reducer'

import style from './CreateNewPassword.module.css'

type PropsType = {
  status: string
  token?: string
}

const CreateNewPasswordForm = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const [showPass, setShowPass] = useState<boolean>(false)
  const { token, status } = props

  const typeInput = showPass ? 'text' : 'password'
  const classInputType = showPass ? style.logo : style.logoActive

  const showPassClick = (value: boolean) => {
    setShowPass(value)
  }

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required('No password provided.')
          .min(7, 'Password is too short - should be 7 chars minimum.')
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          .max(16, 'Password is too long - should be 16 chars maximum.'),
      })}
      onSubmit={values => {
        dispatch(SendNewPasswordFormTC({ password: values.password, resetPasswordToken: token }))
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit} className={style.card}>
          <h2 className={style.title}>Create new password</h2>
          <SuperInput
            type={typeInput}
            placeholder={'Password'}
            {...formik.getFieldProps('password')}
            error={formik.touched && formik.errors.password}
            disabled={status === SendStatusType.inProgress}
            className={style.input}
            spanClassName={style.spanError}
          />
          <div className={classInputType} onClick={() => showPassClick(!showPass)}></div>
          <p className={style.description}>
            Create new password and we will send you further instructions to email
          </p>
          <SuperButton
            type={'submit'}
            disabled={status === SendStatusType.inProgress}
            className={style.btn}
            title={'Create new password'}
          />
        </form>
      )}
    </Formik>
  )
}

export default CreateNewPasswordForm
