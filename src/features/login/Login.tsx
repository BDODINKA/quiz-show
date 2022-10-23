import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { ProfilePage } from '../../common/routes/const-routes'
import { useAppSelector } from '../../utils/hooks/customHooks'

import s from './login.module.css'
import SingInForm from './SingInForm'

const selectStatus = (state: RootStateType) => state.app.status
const selectError = (state: RootStateType) => state.app.error
const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn

const Login = () => {
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ProfilePage)
    }
  }, [isLoggedIn])

  return (
    <div>
      <div className={s.login_container}>
        <CustomAlertSnackBar status={status} message={error} autoHideDuration={6000} />
        <SingInForm />
      </div>
    </div>
  )
}

export default Login
