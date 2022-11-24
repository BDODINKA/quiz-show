import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

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

      navigate(url ? url : PATH.PACK_CARDS_PAGE)
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
