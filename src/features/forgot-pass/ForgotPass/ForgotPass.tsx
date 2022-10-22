import React from 'react'

import { AlertColor, LinearProgress } from '@mui/material'

import { RootStateType } from '../../../app/store'
import { CustomAlertSnackBar } from '../../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import CheckEmail from '../CheckEmail/CheckEmail'
import { SetResetStateTC } from '../forgot-password.reducer'

import { ForgotPassForm } from './ForgotPassForm'
import style from './ForgotPasswordForm.module.css'

const selectMessage = (state: RootStateType) => state.forgotPass.response.message
const selectStatus = (state: RootStateType) => state.forgotPass.response.status

const ForgotPass = () => {
  const dispatch = useAppDispatch()
  const message = useAppSelector(selectMessage)
  const status = useAppSelector(selectStatus)

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
