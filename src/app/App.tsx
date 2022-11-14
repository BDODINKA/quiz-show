import React, { useEffect } from 'react'

import './App.css'
import { LinearProgress } from '@mui/material'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CustomAlertSnackBar } from '../common/components/CustomSnackBar/CustomAlertSnackBar'
import PageNotFound from '../common/components/page-404/PageNotFound'
import { PATH } from '../common/routes/const-routes'
import { selectorError, selectorIsLogin, selectorStatus } from '../common/selectors/selectors'
import CheckEmail from '../features/forgot-pass/CheckEmail/CheckEmail'
import CreateNewPassword from '../features/forgot-pass/CreateNewPass/CreateNewPassword'
import { ForgotPass } from '../features/forgot-pass/ForgotPass/ForgotPass'
import Header from '../features/header/Header'
import Login from '../features/login/Login'
import { Cards } from '../features/packs/Cards/Cards'
import Learn from '../features/packs/Learn/Learn'
import { Packs } from '../features/packs/Packs'
import { Profile } from '../features/profile/Profile'
import { authMeTC } from '../features/profile/profile.reducer'
import SignUp from '../features/sign-up/SignUp'
import { useAppDispatch, useAppSelector } from '../utils/hooks/customHooks'

import { setAppErrorAC, setAppStatusAC } from './app-reducer'

function App() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(selectorIsLogin)
  const status = useAppSelector(selectorStatus)
  const message = useAppSelector(selectorError)

  useEffect(() => {
    if (!isLogin) {
      dispatch(authMeTC())
    }
  }, [isLogin])

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
          <Route path={PATH.PACK_CARDS_PAGE} element={<Packs />} />
          <Route path={`${PATH.MY_PACK_PAGE}/:id`} element={<Cards />} />
          <Route path={`${PATH.LEARN_PAGE}/:id`} element={<Learn />} />
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
