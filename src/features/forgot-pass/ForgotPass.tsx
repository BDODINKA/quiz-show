import React from 'react'

import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { login } from '../../common/routes/const-routes'

import CheckEmail from './CheckEmail'
import { SendStatus } from './forgot-password.reducer'
import { ForgotPassForm } from './ForgotPassForm'

const ForgotPass = () => {
  const isSend: SendStatus = useAppSelector(state => state.forgotPass.isSend)

  if (isSend === SendStatus.success) {
    return <CheckEmail />
  }

  return (
    <div>
      <h2>{isSend}</h2>
      <ForgotPassForm isSend={isSend} />
      <NavLink to={login}>Try logging in</NavLink>
    </div>
  )
}

export default ForgotPass
