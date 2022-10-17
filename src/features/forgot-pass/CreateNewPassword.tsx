import React from 'react'

import { AlertColor } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/CustomSnackBar/CustomSnackBar'
import { login } from '../../common/routes/const-routes'

import style from './CreateNewPassword.module.css'
import CreateNewPasswordForm from './CreateNewPasswordForm'
import { SendStatusType, SetResetStateTC } from './forgot-password.reducer'

const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const { status, message } = useAppSelector(state => state.forgotPass.response)

  console.log(status, message)
  const closeHandlerSnackbar = () => {
    dispatch(SetResetStateTC())
  }

  if (status === SendStatusType.success) {
    return <Navigate to={login} />
  }

  return (
    <div className={style.container}>
      <CreateNewPasswordForm status={status} token={token} />
      <CustomAlertSnackBar
        status={status as AlertColor}
        message={message}
        closeHandlerSnackbar={closeHandlerSnackbar}
      />
    </div>
  )
}

export default CreateNewPassword
