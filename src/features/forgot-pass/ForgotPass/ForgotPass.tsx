import React from 'react'

import { Navigate } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { PATH } from '../../../common/routes/const-routes'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import { ForgotPassForm } from './ForgotPassForm'
import style from './ForgotPasswordForm.module.css'

const selectStatus = (state: RootStateType) => state.app.status
const selectIsSend = (state: RootStateType) => state.forgotPass.isSend

export const ForgotPass = () => {
  const status = useAppSelector(selectStatus)
  const IsSend = useAppSelector(selectIsSend)

  if (IsSend) return <Navigate to={PATH.CHECK_EMAIL_PAGE} />

  return (
    <div>
      <ForgotPassForm status={status} style={style} />
    </div>
  )
}
