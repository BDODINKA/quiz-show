import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { CustomAlertSnackBar } from '../../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { CheckEmailPage } from '../../../common/routes/const-routes'
import { useAppSelector } from '../../../utils/hooks/customHooks'

import { ForgotPassForm } from './ForgotPassForm'
import style from './ForgotPasswordForm.module.css'

const selectMessage = (state: RootStateType) => state.app.error
const selectStatus = (state: RootStateType) => state.app.status
const selectIsSend = (state: RootStateType) => state.forgotPass.isSend

export const ForgotPass = () => {
  const navigate = useNavigate()
  const message = useAppSelector(selectMessage)
  const status = useAppSelector(selectStatus)
  const IsSend = useAppSelector(selectIsSend)

  useEffect(() => {
    if (IsSend) {
      navigate(CheckEmailPage)
    }
  }, [IsSend])

  return (
    <div>
      <ForgotPassForm status={status} style={style} />
      <CustomAlertSnackBar message={message} status={status} autoHideDuration={6000} />
    </div>
  )
}
