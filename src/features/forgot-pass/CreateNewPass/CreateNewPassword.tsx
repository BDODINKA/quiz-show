import React from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { Wrapper } from '../../../common/components/Wrapper/Wrapper'
import { PATH } from '../../../common/routes/const-routes'
import { selectorStatus } from '../../../common/selectors/selectors'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'

import style from './CreateNewPassword.module.css'
import CreateNewPasswordForm from './CreateNewPasswordForm'

export const CreateNewPassword = () => {
  const { token } = useParams()
  const status = useAppSelector(selectorStatus)

  if (status === 'success') return <Navigate to={PATH.LOGIN_PAGE} />

  return (
    <Wrapper className={style.container}>
      <CreateNewPasswordForm status={status} token={token} />
    </Wrapper>
  )
}
