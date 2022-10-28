import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { PATH } from '../../../common/routes/const-routes'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import { ForgotPassForm } from './ForgotPassForm'
import style from './ForgotPasswordForm.module.css'

const selectStatus = (state: RootStateType) => state.app.status
const selectIsSend = (state: RootStateType) => state.forgotPass.isSend

export const ForgotPass = () => {
  const navigate = useNavigate()
  const status = useAppSelector(selectStatus)
  const IsSend = useAppSelector(selectIsSend)

  useEffect(() => {
    if (IsSend) {
      navigate(PATH.CHECK_EMAIL_PAGE)
    }
  }, [IsSend])

  return (
    <div>
      <ForgotPassForm status={status} style={style} />
    </div>
  )
}
