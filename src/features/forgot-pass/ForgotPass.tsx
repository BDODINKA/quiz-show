import React from 'react'

import { AlertColor } from '@mui/material'

import { useAppSelector } from '../../app/store'
import { AlertSnackBar } from '../../common/ErrorSnackBar/ErrorSnackBar'

import CheckEmail from './CheckEmail'
import { ForgotPassForm } from './ForgotPassForm'
import style from './ForgotPasswordForm.module.css'

const ForgotPass = () => {
  const { status, message } = useAppSelector(state => state.forgotPass.response)

  if (status === 'success') {
    return <CheckEmail />
  }

  return (
    <div>
      <ForgotPassForm status={status as AlertColor} style={style} />
      <AlertSnackBar message={message} status={status as AlertColor} />
    </div>
  )
}

export default ForgotPass
