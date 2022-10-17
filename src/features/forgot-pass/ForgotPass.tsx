import React from 'react'

import { AlertColor } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { AlertSnackBar } from '../../common/ErrorSnackBar/ErrorSnackBar'
import { login } from '../../common/routes/const-routes'

import CheckEmail from './CheckEmail'
import { ForgotPassForm } from './ForgotPassForm'

const ForgotPass = () => {
  const { status, message } = useAppSelector(state => state.forgotPass.response)

  console.log(status)

  if (status === 'success') {
    return <CheckEmail />
  }

  return (
    <div>
      <h2></h2>
      <ForgotPassForm status={status as AlertColor} />
      <NavLink to={login}>Try logging in</NavLink>
      <AlertSnackBar message={message} status={status as AlertColor} />
    </div>
  )
}

export default ForgotPass
