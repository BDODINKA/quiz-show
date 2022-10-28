import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { PATH } from '../../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'

import style from './CreateNewPassword.module.css'
import CreateNewPasswordForm from './CreateNewPasswordForm'

const selectStatus = (state: RootStateType) => state.app.status

const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const status = useAppSelector(selectStatus)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') {
      console.log('sss')
      navigate(PATH.LOGIN_PAGE)
    }
  }, [status])

  return (
    <div className={style.container}>
      <CreateNewPasswordForm status={status} token={token} />
    </div>
  )
}

export default CreateNewPassword
