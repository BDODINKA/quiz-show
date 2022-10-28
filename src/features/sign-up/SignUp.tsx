import React from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { PATH } from '../../common/routes/const-routes'
import { useAppSelector } from '../../utils/hooks/customHooks'

import s from './signUp.module.css'
import { SignUpForm } from './SignUpForm'

const selectIsSignUp = (state: RootStateType) => state.reg.isSignUp

const SignUp = () => {
  const signUp = useAppSelector(selectIsSignUp)
  const navigate = useNavigate()

  if (signUp) navigate(PATH.LOGIN_PAGE)

  return (
    <div className={s.signUp_container}>
      <SignUpForm />
    </div>
  )
}

export default SignUp
