import React from 'react'

import { HashRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'

import PageNotFound from '../../common/page-404/PageNotFound'
import {
  LoginPage,
  NewPassPage,
  NotPage,
  ProfilePage,
  RegistrationPage,
  RestorePassPage,
} from '../../common/routes/const-routes'
import Header from '../header/Header'
import Login from '../login/Login'
import { Profile } from '../profile/Profile'

import SuperComponents from './SuperComponents'
import style from './testApp.module.css'

export const TestApp = () => {
  return (
    <HashRouter>
      <div className={style.block}>
        <NavLink to={LoginPage}>login</NavLink>
        <NavLink to={RegistrationPage}>register</NavLink>
        <NavLink to={ProfilePage}>profile</NavLink>
        <NavLink to={NotPage}>notPage</NavLink>
        <NavLink to={RestorePassPage}>restorePass</NavLink>
        <NavLink to={NewPassPage}>newPass</NavLink>
        <NavLink to={'/'}>SuperComponents</NavLink>
      </div>
      <Header />
      <Routes>
        <Route path={'/'} element={<SuperComponents />} />
        <Route path={'*'} element={<Navigate to={'/'} />} />
        <Route path={LoginPage} element={<Login />} />
        <Route path={RegistrationPage} element={<h1>Register</h1>} />
        <Route path={ProfilePage} element={<Profile />} />
        <Route path={NotPage} element={<PageNotFound />} />
        <Route path={RestorePassPage} element={<h1>Restore Password</h1>} />
        <Route path={NewPassPage} element={<h1>Enter New Password</h1>} />
      </Routes>
    </HashRouter>
  )
}
