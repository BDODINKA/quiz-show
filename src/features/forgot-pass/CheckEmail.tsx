import React from 'react'

import { AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { AlertSnackBar } from '../../common/ErrorSnackBar/ErrorSnackBar'
import { login } from '../../common/routes/const-routes'
import SuperButton from '../../common/superButton/SuperButton'

import { SetResetStateTC } from './forgot-password.reducer'

const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(state => state.forgotPass.sendFormToEmail.email)
  const { message, status } = useAppSelector(state => state.forgotPass.response)
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
      <AlertSnackBar message={message} status={status as AlertColor} />
    </div>
  )
}

export default CheckEmail
