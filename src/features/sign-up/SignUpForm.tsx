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

import style from './/signUp.module.scss'
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
    <div className={style.form__container}>
      <div className={style.form__title}>Sign Up</div>
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
            <form className={style.form__block} onSubmit={formik.handleSubmit}>
              <div className={style.input__block}>
                <label className={style.input__title} htmlFor="email">
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
              </div>
              <div className={style.input__block}>
                <label className={style.input__title} htmlFor="password">
                  Password
                </label>
                {/* <SuperInput
                    className={style.password__input}
                    id="password"
                    type={passShown ? 'password' : 'text'}
                    {...formik.getFieldProps('password')}
                  />
                  <span onClick={() => setPassShown(!passShown)}>
                    <img
                      className={style.visible_password}
                      src={!passShown ? show_password : hide_password}
                      alt="password"
                    />
                  </span>
                </div>

                {formik.touched.password && formik.errors.password ? (
                  <span className="error" style={{ color: 'red' }}>
                    {formik.errors.password}
                  </span>
                ) : null}*/}
                <SuperInput
                  className={style.password__input}
                  id="password"
                  type={passShown ? 'password' : 'text'}
                  error={formik.touched && formik.errors.password}
                  {...formik.getFieldProps('password')}
                  spanClassName={style.spanError}
                />
                <span className={style.password__visible} onClick={() => setPassShown(!passShown)}>
                  <img
                    className={style.password__visible_image}
                    src={!passShown ? show_password : hide_password}
                    alt="password"
                  />
                </span>
              </div>

              <div className={style.input__block}>
                <label className={style.input__title} htmlFor="password">
                  Confirm password
                </label>
                {/* <SuperInput
                    className={style.input_password}
                    id="confirmPassword"
                    type={confPassShown ? 'password' : 'text'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <span onClick={() => setConfPassShown(!confPassShown)}>
                    <img
                      className={style.visible_password}
                      src={!confPassShown ? show_password : hide_password}
                      alt="password"
                    />
                  </span>
                </div>

                <span className="error" style={{ color: 'red' }}>
                  {formik.errors.confirmPassword}
                </span>*/}

                <SuperInput
                  className={style.password__input}
                  id="confirmPassword"
                  type={confPassShown ? 'password' : 'text'}
                  error={formik.errors.confirmPassword}
                  {...formik.getFieldProps('confirmPassword')}
                  spanClassName={style.spanError}
                />
                <span
                  className={style.password__visible}
                  onClick={() => setConfPassShown(!confPassShown)}
                >
                  <img
                    className={style.password__visible_image}
                    src={!confPassShown ? show_password : hide_password}
                    alt="password"
                  />
                </span>
              </div>
              <div className={style.button__sign_up_form_block}>
                <SuperButton
                  type="submit"
                  className={style.button__sign_up_form}
                  title={'Sign Up'}
                  disabled={status === 'progress'}
                ></SuperButton>
                <span className={style.have__account}>Already have an account?</span>
                <NavLink to={PATH.LOGIN_PAGE} className={style.button__sign_in}>
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
