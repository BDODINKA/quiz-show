import React from 'react'

import { AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/CustomSnackBar/CustomSnackBar'
import { login } from '../../common/routes/const-routes'
import SuperButton from '../../common/superButton/SuperButton'

import style from './CheckEmail.module.css'
import { SetResetStateTC } from './forgot-password.reducer'

const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(state => state.forgotPass.sendFormToEmail)
  const { message, status } = useAppSelector(state => state.forgotPass.response)
  const navigate = useNavigate()

  const GoToLogin = () => {
    navigate(login)
    dispatch(SetResetStateTC())
  }
  const closeHandlerSnackbar = () => {
    dispatch(SetResetStateTC())
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h2 className={style.title}>Check Email</h2>
        <div className={style.logo}></div>
        <p className={style.description}>We’ve sent an Email with instructions to {email}</p>
        <SuperButton onClick={GoToLogin} className={style.btn} title={'Back to login'} />
        <CustomAlertSnackBar
          message={message}
          status={status as AlertColor}
          closeHandlerSnackbar={closeHandlerSnackbar}
        />
      </div>
    </div>
  )
}

export default CheckEmail
