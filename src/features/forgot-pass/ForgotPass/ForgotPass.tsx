import React from 'react'

import { Navigate } from 'react-router-dom'

import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { PATH } from '../../../common/routes/const-routes'
import { selectorIsSend, selectorStatus } from '../../../common/selectors/selectors'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import style from '../../forgot-pass/ForgotPass/ForgotPasswordForm.module.scss'

import { ForgotPassForm } from './ForgotPassForm'

export const ForgotPass = () => {
  const status = useAppSelector(selectorStatus)
  const IsSend = useAppSelector(selectorIsSend)

  if (IsSend) return <Navigate to={PATH.CHECK_EMAIL_PAGE} />

  return (
    <Wrapper className={style.forgotPass__container}>
      <ForgotPassForm status={status} />
    </Wrapper>
  )
}
