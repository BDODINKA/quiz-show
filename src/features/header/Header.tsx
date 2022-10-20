import React from 'react'

import { NavLink } from 'react-router-dom'

import { ProfileType } from '../../api/authAPI'
import { useAppSelector } from '../../app/store'
import logo from '../../assets/svg/logo-Incubator.svg'
import { LoginPage, ProfilePage } from '../../common/routes/const-routes'
import SuperButton from '../../common/superButton/SuperButton'

import style from './header.module.css'

const Header = () => {
  const isLogin = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const profile = useAppSelector<null | ProfileType>(state => state.profile.profile)
  const name = profile && profile.name
  const avatar = profile && profile.avatar

  return (
    <div className={style.header_container}>
      <div className={style.navbar_form_container}>
        <div>
          <img src={logo} alt="IT-Incubator" />
        </div>
        {isLogin ? (
          <div className={style.profileBlock}>
            <NavLink className={style.profileName} to={ProfilePage}>
              {name}
            </NavLink>
            <div className={style.profileAva}>{avatar}</div>
          </div>
        ) : (
          <NavLink to={LoginPage}>
            <SuperButton className={style.button_sign_in_navbar} type="submit" title={'Sign In'} />
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Header
