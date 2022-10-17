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
import CreateNewPassword from '../forgot-pass/CreateNewPass/CreateNewPassword'
import ForgotPass from '../forgot-pass/ForgotPass/ForgotPass'

import SuperComponents from './SuperComponents'
import style from './testApp.module.css'

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
        <Route path={login} element={<h1>Login</h1>} />
        <Route path={registration} element={<h1>Register</h1>} />
        <Route path={profile} element={<h1>profile</h1>} />
        <Route path={notPage} element={<PageNotFound />} />
        <Route path={restorePass} element={<ForgotPass />} />
        <Route path={newPass} element={<CreateNewPassword />} />
      </Routes>
    </HashRouter>
  )
}
