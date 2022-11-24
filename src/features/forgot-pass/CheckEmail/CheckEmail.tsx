import React from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { PATH } from '../../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import { SetResetStateTC } from '../forgot-password.reducer'

import style from './CheckEmail.module.css'

const selectEmail = (state: RootStateType) => state.forgotPass.sendFormToEmail.email

export const CheckEmail = () => {
  const dispatch = useAppDispatch()

  const email = useAppSelector(selectEmail)

  const navigate = useNavigate()

  const GoToLogin = () => {
    navigate(PATH.LOGIN_PAGE)
    dispatch(SetResetStateTC())
  }

  if (!email) return <Navigate to={PATH.LOGIN_PAGE} />

  return (
    <Wrapper className={style.container}>
      <div className={style.card}>
        <h2 className={style.title}>Check Email</h2>
        <div className={style.logo}></div>
        <p className={style.description}>We’ve sent an Email with instructions to {email}</p>
        <SuperButton onClick={GoToLogin} className={style.btn} title={'Back to login'} />
      </div>
    </Wrapper>
  )
}
