import React from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { ReactComponent as CheckLogo } from '../../../assets/svg/CheckEmailLogo.svg'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { PATH } from '../../../common/routes/const-routes'
import { selectorEmail } from '../../../common/selectors/selectors'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { SetResetStateTC } from '../forgot-password.reducer'

import style from './CheckEmail.module.scss'

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
    <main>
      <Wrapper className={style.container}>
        <div className={style.card}>
          <h2 className={style.title}>Check Email</h2>
          <CheckLogo className={style.logo} />
          <p className={style.description}>We’ve sent an Email with instructions to {email}</p>
          <SuperButton onClick={GoToLogin} className={style.btn} title={'Back to login'} />
        </div>
      </Wrapper>
    </main>
  )
}
