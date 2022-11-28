import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Wrapper } from '../../common/components/Wrapper/Wrapper'
import { PATH } from '../../common/routes/const-routes'
import { selectorSignUp } from '../../common/selectors/selectors'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import s from './signUp.module.css'
import { SignUpForm } from './SignUpForm'

export const SignUp = () => {
  const signUp = useAppSelector(selectorSignUp)
  const navigate = useNavigate()

  if (signUp) navigate(PATH.LOGIN_PAGE)

  return (
    <Wrapper className={s.signUp_container}>
      <SignUpForm />
    </Wrapper>
  )
}
