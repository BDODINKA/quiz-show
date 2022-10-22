import React from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { ProfilePage } from '../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import { setStatusAC } from './login-reducer'
import s from './login.module.css'
import SingInForm from './SingInForm'

const selectStatus = (state: RootStateType) => state.auth.status
const selectError = (state: RootStateType) => state.auth.error
const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn

const Login = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const closeHandlerSnackbar = () => {
    dispatch(setStatusAC(null))
  }

  if (isLoggedIn) {
    return <Navigate to={ProfilePage} />
  }

  return (
    <div>
      {status === 'progress' && <LinearProgress sx={{ width: '100%' }} />}

      <div className={s.login_container}>
        <CustomAlertSnackBar
          status={status}
          closeHandlerSnackbar={closeHandlerSnackbar}
          message={error}
          autoHideDuration={6000}
        />
        <SingInForm />
      </div>
    </div>
  )
}

export default Login
