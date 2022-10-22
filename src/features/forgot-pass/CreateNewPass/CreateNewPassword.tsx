import React from 'react'

import { Navigate, useParams } from 'react-router-dom'

import { RootStateType } from '../../../app/store'
import { CustomAlertSnackBar } from '../../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { LoginPage } from '../../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import { StatusAC } from '../../profile/profile.reducer'
import { SetResetStateTC } from '../forgot-password.reducer'

import style from './CreateNewPassword.module.css'
import CreateNewPasswordForm from './CreateNewPasswordForm'

const selectStatus = (state: RootStateType) => state.forgotPass.response.status
const selectMessage = (state: RootStateType) => state.forgotPass.response.message

const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const status = useAppSelector(selectStatus)
  const message = useAppSelector(selectMessage)

  const closeHandlerSnackbar = () => {
    dispatch(StatusAC(null))
    dispatch(SetResetStateTC())
  }

  if (status === 'success') {
    return <Navigate to={LoginPage} />
  }

  return (
    <div className={style.container}>
      <CreateNewPasswordForm status={status} token={token} />
      <CustomAlertSnackBar
        status={status}
        message={message}
        closeHandlerSnackbar={closeHandlerSnackbar}
        autoHideDuration={6000}
      />
    </div>
  )
}

export default CreateNewPassword
