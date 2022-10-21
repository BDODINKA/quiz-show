import React from 'react'

import { AlertColor, LinearProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { CustomAlertSnackBar } from '../../../common/CustomSnackBar/CustomAlertSnackBar'
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
      {status === 'progress' && <LinearProgress sx={{ width: '100%' }} />}
      <ForgotPassForm status={status as string} style={style} />
      <CustomAlertSnackBar
        message={message as string}
        status={status as AlertColor}
        closeHandlerSnackbar={closeHandlerSnackbar}
        autoHideDuration={6000}
      />
    </div>
  )
}

export default ForgotPass
