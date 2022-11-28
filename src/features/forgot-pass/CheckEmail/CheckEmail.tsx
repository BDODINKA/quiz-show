import React from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { PATH } from '../../../common/routes/const-routes'
import { selectorEmail } from '../../../common/selectors/selectors'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { SetResetStateTC } from '../forgot-password.reducer'

import style from './CheckEmail.module.css'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()

  const email = useAppSelector(selectorEmail)

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
