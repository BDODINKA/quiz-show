import React from 'react'

import { Formik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { SuperInput } from '../../../common/components/SuperInputText/SuperInput'
import { PATH } from '../../../common/routes/const-routes'
import { Nullable } from '../../../types/Nullable'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { SendForgotFormTC } from '../forgot-password.reducer'

import style from './ForgotPasswordForm.module.scss'

type PropsType = {
  status: Nullable<string>
}
export const ForgotPassForm = (props: PropsType) => {
  const dispatch = useAppDispatch()

  return (
    <div className={style.form__container}>
      <div className={style.form__title}>Forgot your password?</div>
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
          <form onSubmit={formik.handleSubmit} className={style.form__block}>
            <div className={style.input__block}>
              <label className={style.input__title} htmlFor="email">
                Email
              </label>
              <SuperInput
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                error={formik.touched && formik.errors.email}
                className={style.input__email}
                spanClassName={style.spanError}
              />
              <div className={style.description}>
                Enter your email address and we will send you further instructions
              </div>
              <SuperButton
                type="submit"
                disabled={props.status === 'progress'}
                className={style.button__forgotPass_form}
                title={'Send Instructions'}
              />
              <div className={style.question}>Did you remember your password?</div>
              <NavLink to={PATH.LOGIN_PAGE} className={style.link}>
                Try logging in
              </NavLink>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
