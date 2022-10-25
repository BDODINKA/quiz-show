import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { setAppStatusAC } from '../../../app/app-reducer'
import { RootStateType } from '../../../app/store'
import { CustomAlertSnackBar } from '../../../common/components/CustomSnackBar/CustomAlertSnackBar'
import { LoginPage } from '../../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/customHooks'
import { SetResetStateTC } from '../forgot-password.reducer'

import style from './CreateNewPassword.module.css'
import CreateNewPasswordForm from './CreateNewPasswordForm'

const selectStatus = (state: RootStateType) => state.app.status
const selectMessage = (state: RootStateType) => state.app.error

const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const status = useAppSelector(selectStatus)
  const message = useAppSelector(selectMessage)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') {
      console.log('sss')
      navigate(LoginPage)
    }
  }, [status])

  const closeHandlerSnackbar = () => {
    dispatch(setAppStatusAC(null))
    dispatch(SetResetStateTC())
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
