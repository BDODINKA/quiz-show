import React from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { LoginPage } from '../../common/routes/const-routes'
import { useAppSelector } from '../../utils/hooks/customHooks'

import s from './signUp.module.css'
import { SignUpForm } from './SignUpForm'

const selectIsSignUp = (state: RootStateType) => state.reg.isSignUp
const selectError = (state: RootStateType) => state.app.error
const selectStatus = (state: RootStateType) => state.app.status

const SignUp = () => {
  const signUp = useAppSelector(selectIsSignUp)
  const error = useAppSelector(selectError)
  const status = useAppSelector(selectStatus)
  const navigate = useNavigate()

  const closeHandlerSnackbar = () => {}

  if (signUp) navigate(LoginPage)

  return (
    <div className={s.signUp_container}>
      <SignUpForm />
      <CustomAlertSnackBar
        status={status}
        message={error}
        closeHandlerSnackbar={closeHandlerSnackbar}
        autoHideDuration={6000}
      />
    </div>
  )
}

export default SignUp
