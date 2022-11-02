import React, { useEffect } from 'react'

import './App.css'
import { LinearProgress } from '@mui/material'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CustomAlertSnackBar } from '../common/components/CustomSnackBar/CustomAlertSnackBar'
import { PATH } from '../common/routes/const-routes'
import CheckEmail from '../features/forgot-pass/CheckEmail/CheckEmail'
import CreateNewPassword from '../features/forgot-pass/CreateNewPass/CreateNewPassword'
import { ForgotPass } from '../features/forgot-pass/ForgotPass/ForgotPass'
import Header from '../features/header/Header'
import Login from '../features/login/Login'
import { CardPacks } from '../features/packCards/CardPacks'
import { MyPack } from '../features/packCards/MyPack/MyPack'
import PageNotFound from '../features/page-404/PageNotFound'
import { Profile } from '../features/profile/Profile'
import { authMeTC } from '../features/profile/profile.reducer'
import SignUp from '../features/sign-up/SignUp'
import { useAppDispatch, useAppSelector } from '../utils/hooks/customHooks'

import { setAppErrorAC, setAppStatusAC } from './app-reducer'
import { RootStateType } from './store'

const selectProfile = (state: RootStateType) => state.profile.profile
const selectStatus = (state: RootStateType) => state.app.status
const selectMessage = (state: RootStateType) => state.app.error

function App() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectStatus)
  const message = useAppSelector(selectMessage)

  useEffect(() => {
    if (profile === null) {
      dispatch(authMeTC())
    }
  }, [])

  const closeHandlerSnackbar = () => {
    dispatch(setAppStatusAC(null))
    dispatch(setAppErrorAC(null))
  }

  return (
    <>
      <HashRouter>
        <Header />
        {status === 'progress' && <LinearProgress sx={{ width: '100%' }} />}
        <Routes>
          <Route path={'*'} element={<Navigate to={PATH.NOT_PAGE} />} />
          <Route path={'/'} element={<Navigate to={PATH.LOGIN_PAGE} />} />
          <Route path={PATH.LOGIN_PAGE} element={<Login />} />
          <Route path={PATH.REGISTRATION_PAGE} element={<SignUp />} />
          <Route path={PATH.PROFILE_PAGE} element={<Profile />} />
          <Route path={PATH.NOT_PAGE} element={<PageNotFound />} />
          <Route path={PATH.CHECK_EMAIL_PAGE} element={<CheckEmail />} />
          <Route path={PATH.RESTORE_PASS_PAGE} element={<ForgotPass />} />
          <Route path={PATH.NEW_PASS_PAGE} element={<CreateNewPassword />} />
          <Route path={PATH.PACK_CARDS_PAGE} element={<CardPacks />} />
          <Route path={PATH.MY_PACK_PAGE} element={<MyPack />} />
        </Routes>
        <CustomAlertSnackBar
          status={status}
          message={message}
          autoHideDuration={6000}
          closeHandlerSnackbar={closeHandlerSnackbar}
        />
      </HashRouter>
    </>
  )
}

export default App
