import { HashRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'

import PageNotFound from '../../common/page-404/PageNotFound'
import {
  login,
  newPass,
  notPage,
  profile,
  registration,
  restorePass,
} from '../../common/routes/const-routes'
import { Profile } from '../profile/Profile'

import SuperComponents from './SuperComponents'
import style from './testApp.module.css'
import Login from "../login/Login";

export const TestApp = () => {
  return (
    <HashRouter>
      <div className={style.block}>
        <NavLink to={login}>login</NavLink>
        <NavLink to={registration}>register</NavLink>
        <NavLink to={profile}>profile</NavLink>
        <NavLink to={notPage}>notPage</NavLink>
        <NavLink to={restorePass}>restorePass</NavLink>
        <NavLink to={newPass}>newPass</NavLink>
        <NavLink to={'/'}>SuperComponents</NavLink>
      </div>
      <Routes>
        <Route path={'/'} element={<SuperComponents />} />
        <Route path={'*'} element={<Navigate to={'/'} />} />
        <Route path={login} element={<Login/>} />
        <Route path={registration} element={<h1>Register</h1>} />
        <Route path={profile} element={<Profile />} />
        <Route path={notPage} element={<PageNotFound />} />
        <Route path={restorePass} element={<h1>Restore Password</h1>} />
        <Route path={newPass} element={<h1>Enter New Password</h1>} />
      </Routes>
    </HashRouter>
  )
}
