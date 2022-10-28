import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { PATH } from '../../common/routes/const-routes'
import { useAppSelector } from '../../utils/hooks/customHooks'

import s from './login.module.css'
import SingInForm from './SingInForm'

const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn

const Login = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.PACK_CARDS_PAGE)
    }
  }, [isLoggedIn])

  return (
    <div>
      <div className={s.login_container}>
        <SingInForm />
      </div>
    </div>
  )
}

export default Login
