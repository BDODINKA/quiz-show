import React, { useEffect } from 'react'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { PATH } from '../../common/routes/const-routes'
import { selectorIsLogin } from '../../common/selectors/selectors'
import { useAppSelector } from '../../utils/hooks/customHooks'

import s from './login.module.css'
import SingInForm from './SingInForm'

const Login = () => {
  const isLoggedIn = useAppSelector(selectorIsLogin)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      const url = sessionStorage.getItem('url')

      if (url) {
        navigate(url)
      } else {
        navigate(PATH.MY_PACK_PAGE)
      }
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
