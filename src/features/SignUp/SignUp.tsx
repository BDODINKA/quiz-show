import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'

import s from './signUp.module.css'
import { SignUpErrorSnackbar } from './SignUpErrorSnackbar'
import { SignUpForm } from './SignUpForm'

const SignUp = () => {
  const signUp = useAppSelector(state => state.reg.isSignUp)

  const navigate = useNavigate()

  if (signUp) navigate('/Login')

  return (
    <div className={s.signUp_container}>
      <SignUpForm />
      <SignUpErrorSnackbar />
    </div>
  )
}

export default SignUp
