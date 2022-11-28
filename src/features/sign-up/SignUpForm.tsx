import React, { useState } from 'react'

import { Formik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import hide_password from '../../assets/img/SignUp/close_eye_password.png'
import show_password from '../../assets/img/SignUp/open_eye_password.png'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperInput } from '../../common/components/SuperInputText/SuperInput'
import { PATH } from '../../common/routes/const-routes'
import { selectorStatus } from '../../common/selectors/selectors'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import s from './/signUp.module.css'
import { signUpTC } from './signUpReducer'

export const SignUpForm = () => {
  const [passShown, setPassShown] = useState<boolean>(true)
  const [confPassShown, setConfPassShown] = useState<boolean>(true)
  const status = useAppSelector(selectorStatus)

  const dispatch = useAppDispatch()

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Your password is too short.')
      .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  return (
    <div className={s.form_container}>
      <div className={s.title_form}>Sign Up</div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          dispatch(signUpTC(values))
        }}
      >
        {formik => {
          return (
            <form className={s.form_block} onSubmit={formik.handleSubmit}>
              <div className={s.input_block}>
                <label className={s.title_input} htmlFor="email">
                  Email
                </label>
                <SuperInput
                  className={s.input_email}
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className={s.error_message}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className={s.input_block}>
                <label className={s.title_input} htmlFor="password">
                  Password
                </label>
                <div className={s.password_block}>
                  <SuperInput
                    className={s.input_password}
                    id="password"
                    type={passShown ? 'password' : 'text'}
                    {...formik.getFieldProps('password')}
                  />
                  <span onClick={() => setPassShown(!passShown)}>
                    <img
                      className={s.visible_password}
                      src={!passShown ? show_password : hide_password}
                      alt="password"
                    />
                  </span>
                </div>

                {formik.touched.password && formik.errors.password ? (
                  <span className="error" style={{ color: 'red' }}>
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>
              <div className={s.input_block}>
                <label className={s.title_input} htmlFor="password">
                  Confirm password
                </label>
                <div className={s.password_block}>
                  <SuperInput
                    className={s.input_password}
                    id="confirmPassword"
                    type={confPassShown ? 'password' : 'text'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <span onClick={() => setConfPassShown(!confPassShown)}>
                    <img
                      className={s.visible_password}
                      src={!confPassShown ? show_password : hide_password}
                      alt="password"
                    />
                  </span>
                </div>

                <span className="error" style={{ color: 'red' }}>
                  {formik.errors.confirmPassword}
                </span>
              </div>
              <div className={s.button_signUp_form_block}>
                <SuperButton
                  type="submit"
                  className={s.button_signUp_form}
                  title={'Sign Up'}
                  disabled={status === 'progress'}
                ></SuperButton>
                <span className={s.have_account}>Already have an account?</span>
                <NavLink to={PATH.LOGIN_PAGE} className={s.link}>
                  Sign In
                </NavLink>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}
