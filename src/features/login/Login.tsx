import React from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { ProfilePage } from '../../common/routes/const-routes'
import { ErrorSnackBar } from '../ErrorSnackBar/ErrorSnackBar'

import s from './login.module.css'
import SingInForm from './SingInForm'

const Login = () => {
  const login = useAppSelector(state => state.auth.isLoggedIn)
  const status = useAppSelector(state => state.auth.status)

  if (login) {
    return <Navigate to={ProfilePage} />
  }

  return (
    <div className={s.login_container}>
      {status === 'progress' && <LinearProgress sx={{ width: '100%' }} />}
      <SingInForm />
      <ErrorSnackBar />
    </div>
  )
}

export default Login
