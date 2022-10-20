import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { LoginPage } from '../../../common/routes/const-routes'
import SuperButton from '../../../common/superButton/SuperButton'
import { SetResetStateTC } from '../forgot-password.reducer'

import style from './CheckEmail.module.css'

const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(state => state.forgotPass.sendFormToEmail)
  const navigate = useNavigate()

  const GoToLogin = () => {
    navigate(LoginPage)
    dispatch(SetResetStateTC())
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h2 className={style.title}>Check Email</h2>
        <div className={style.logo}></div>
        <p className={style.description}>We’ve sent an Email with instructions to {email}</p>
        <SuperButton onClick={GoToLogin} className={style.btn} title={'Back to login'} />
      </div>
    </div>
  )
}

export default CheckEmail
