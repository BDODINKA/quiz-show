import React from 'react'

import { AlertColor } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { CustomAlertSnackBar } from '../../../common/CustomSnackBar/CustomSnackBar'
import CheckEmail from '../CheckEmail/CheckEmail'
import { SetResetStateTC } from '../forgot-password.reducer'

import { ForgotPassForm } from './ForgotPassForm'
import style from './ForgotPasswordForm.module.css'

const ForgotPass = () => {
  const dispatch = useAppDispatch()
  const { status, message } = useAppSelector(state => state.forgotPass.response)

  if (status === 'success') {
    return <CheckEmail />
  }
  const closeHandlerSnackbar = () => {
    dispatch(SetResetStateTC())
  }

  return (
    <div>
      <ForgotPassForm status={status as AlertColor} style={style} />
      <CustomAlertSnackBar
        message={message}
        status={status as AlertColor}
        closeHandlerSnackbar={closeHandlerSnackbar}
      />
    </div>
  )
}

export default ForgotPass
