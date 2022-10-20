import React from 'react'

import { AlertColor } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { CustomAlertSnackBar } from '../../../common/CustomSnackBar/CustomAlertSnackBar'
import { LoginPage } from '../../../common/routes/const-routes'
import { StatusAC } from '../../profile/profile.reducer'
import { SetResetStateTC } from '../forgot-password.reducer'

import style from './CreateNewPassword.module.css'
import CreateNewPasswordForm from './CreateNewPasswordForm'

const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const { status, message } = useAppSelector(state => state.forgotPass.response)

  const closeHandlerSnackbar = () => {
    dispatch(StatusAC(null))
    dispatch(SetResetStateTC())
  }

  if (status === 'success') {
    return <Navigate to={LoginPage} />
  }

  return (
    <div className={style.container}>
      <CreateNewPasswordForm status={status as string} token={token} />
      <CustomAlertSnackBar
        status={status as AlertColor}
        message={message as string}
        closeHandlerSnackbar={closeHandlerSnackbar}
        autoHideDuration={6000}
      />
    </div>
  )
}

export default CreateNewPassword
