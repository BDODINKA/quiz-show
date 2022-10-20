import React, { useEffect } from 'react'

import { redirect } from 'react-router-dom'

import { ProfilePage } from '../common/routes/const-routes'
import { authMeTC } from '../features/profile/profile.reducer'
import { TestApp } from '../features/t0-test/Test-App'

import './App.css'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (!status) {
      dispatch(authMeTC())
    }
  }, [])

  if (status) {
    redirect(ProfilePage)
  }

  return (
    <>
      <TestApp />
    </>
  )
}

export default App
