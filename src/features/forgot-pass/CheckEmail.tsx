import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { login } from '../../common/routes/const-routes'
import SuperButton from '../../common/superButton/SuperButton'

import { SetResetStateTC } from './forgot-password.reducer'

const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(state => state.forgotPass.sendFormMail.email)
  const navigate = useNavigate()

  const GoToLogin = () => {
    navigate(login)
    dispatch(SetResetStateTC())
  }

  return (
    <div>
      <h2>Check Email</h2>
      <div></div>
      <p>We’ve sent an Email with instructions to {email}</p>
      <SuperButton onClick={GoToLogin} />
    </div>
  )
}

export default CheckEmail
