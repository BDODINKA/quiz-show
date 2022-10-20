import React from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { CustomAlertSnackBar, SnackBarType } from '../../common/CustomSnackBar/CustomAlertSnackBar'
import { ProfilePage } from '../../common/routes/const-routes'

import { setStatusAC } from './login-reducer'
import s from './login.module.css'
import SingInForm from './SingInForm'

const Login = () => {
  const dispatch = useAppDispatch()
  const { status, error, isLoggedIn } = useAppSelector(state => state.auth)

  const closeHandlerSnackbar = () => {
    dispatch(setStatusAC(null))
  }

  if (isLoggedIn && status) {
    return <Navigate to={ProfilePage} />
  }

  return (
    <div>
      {status === 'progress' && <LinearProgress sx={{ width: '100%' }} />}

      <div className={s.login_container}>
        <CustomAlertSnackBar
          status={status as SnackBarType}
          closeHandlerSnackbar={closeHandlerSnackbar}
          message={error as string}
          autoHideDuration={6000}
        />
        <SingInForm />
      </div>
    </div>
  )
}

export default Login
