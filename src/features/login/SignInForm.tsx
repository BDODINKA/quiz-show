import React, { useState } from 'react'

import { Formik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import hide_password from '../../assets/img/Login/close_eye_password.png'
import show_password from '../../assets/img/Login/open_eye_password.png'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperCheckbox } from '../../common/components/SuperCheckbox/SuperCheckbox'
import { SuperInput } from '../../common/components/SuperInputText/SuperInput'
import { PATH } from '../../common/routes/const-routes'
import { selectorStatus } from '../../common/selectors/selectors'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import { loginTC } from './login-reducer'
import style from './login.module.scss'

export const SignInForm = () => {
  const [shown, setShown] = useState<boolean>(true)
  const status = useAppSelector(selectorStatus)

  const dispatch = useAppDispatch()

  return (
    <div className={style.form__container}>
      <div className={style.form__title}>Sign In</div>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required').min(8, 'Your password is too short'),
        })}
        onSubmit={values => {
          dispatch(loginTC(values))
        }}
      >
        {formik => (
          <form className={style.form__block} onSubmit={formik.handleSubmit}>
            <div className={style.input__block}>
              <label className={style.input__title} htmlFor="firstName">
                Email
              </label>
              <SuperInput
                className={style.input__email}
                id="email"
                type="email"
                error={formik.touched && formik.errors.email}
                {...formik.getFieldProps('email')}
                spanClassName={style.spanError}
              />
              {/* {formik.touched.email && formik.errors.email ? (
                <div className={style.error__message}>{formik.errors.email}</div>
              ) : null}*/}
            </div>
            <div className={style.input__block}>
              <label className={style.input__title} htmlFor="password">
                Password
              </label>
              <SuperInput
                className={style.password__input}
                id="password"
                type={shown ? 'password' : 'text'}
                error={formik.touched && formik.errors.password}
                {...formik.getFieldProps('password')}
                spanClassName={style.spanError}
              />
              <span className={style.password__visible} onClick={() => setShown(!shown)}>
                <img
                  className={style.password__visible_image}
                  src={!shown ? show_password : hide_password}
                  alt="password"
                />
              </span>
            </div>
            <div className={style.checkbox__block}>
              <div>
                <SuperCheckbox
                  id="rememberMe"
                  type="checkbox"
                  className={style.checkbox}
                  {...formik.getFieldProps('rememberMe')}
                />
              </div>
              <div className={style.rememberMe}>
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            </div>
            <div className={style.button__sign_in_form_block}>
              <NavLink to={PATH.RESTORE_PASS_PAGE} className={style.forgot_password}>
                Forgot Password?
              </NavLink>
              <SuperButton
                type="submit"
                className={style.button__sign_in_form}
                title={'Sign In'}
                disabled={status === 'progress'}
              />
            </div>
            <div className={style.have_account}>Already have an account?</div>
          </form>
        )}
      </Formik>
      <div className={style.button__sign_up_form_block}>
        <NavLink className={style.button__sign_up} to={PATH.REGISTRATION_PAGE}>
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}
