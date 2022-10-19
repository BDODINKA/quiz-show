import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { ProfilePage } from '../../common/routes/const-routes'
import { ErrorSnackBar } from '../ErrorSnackBar/ErrorSnackBar'

import s from './login.module.css'
import SingInForm from './SingInForm'

const Login = () => {
  const login = useAppSelector(state => state.auth.isLoggedIn)

  if (login) {
    return <Navigate to={ProfilePage} />
  }

  return (
    <div className={s.login_container}>
      <SingInForm />
      <ErrorSnackBar />
    </div>
  )
}

export default Login
