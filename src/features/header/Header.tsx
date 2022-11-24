import React from 'react'

import { NavLink } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import logo from '../../assets/svg/logo-Incubator.svg'
import { InputTypeFile } from '../../common/components/InputTypeFile/InputTypeFile'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/routes/const-routes'
import { useAppSelector } from '../../utils/hooks/customHooks'

import style from './header.module.css'

const selectIsLogin = (state: RootStateType) => state.auth.isLoggedIn
const selectProfile = (state: RootStateType) => state.profile.profile

const Header = () => {
  const isLogin = useAppSelector(selectIsLogin)
  const profile = useAppSelector(selectProfile)

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
            <NavLink className={style.profileName} to={PATH.PROFILE_PAGE}>
              {name}
            </NavLink>
            <InputTypeFile
              defaultImg={avatar as string}
              className={style.profileAva}
              uploadImage={() => {}}
              hiddenBtn={true}
            >
              {avatar}
            </InputTypeFile>
          </div>
        ) : (
          <NavLink to={PATH.LOGIN_PAGE}>
            <SuperButton className={style.button_sign_in_navbar} type="submit" title={'Sign In'} />
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Header
