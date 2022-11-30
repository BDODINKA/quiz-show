import React, { useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import logo from '../../assets/svg/logo-Incubator.svg'
import { DropDownMenu } from '../../common/components/DropDownMenu/DropDownMenu'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../common/components/Wrapper/Wrapper'
import { PATH } from '../../common/routes/const-routes'
import { selectorIsLogin, selectorProfile } from '../../common/selectors/selectors'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import style from './header.module.css'
import { HeaderMenu } from './HeaderMenu'

export const Header = () => {
  const isLogin = useAppSelector(selectorIsLogin)
  const profile = useAppSelector(selectorProfile)

  const navigate = useNavigate()

  const [openMenu, setOpenMenu] = useState(false)

  const name = profile && profile.name
  const avatar = profile && profile.avatar

  const navigateToPacks = () => {
    return navigate(PATH.PACK_CARDS_PAGE)
  }

  return (
    <header className={style.header_container}>
      <Wrapper className={style.navbar_form_container}>
        <img src={logo} alt="IT-Incubator" onClick={() => isLogin && navigateToPacks()} />
        {isLogin ? (
          <div className={style.profileBlock}>
            <NavLink className={style.profileName} to={PATH.PROFILE_PAGE}>
              {name}
            </NavLink>
            <img
              src={avatar ? avatar : ''}
              alt=""
              className={style.profileAva}
              onClick={() => setOpenMenu(!openMenu)}
            />
            {openMenu && (
              <DropDownMenu closeMenu={() => setOpenMenu(!openMenu)} className={style.drop}>
                <HeaderMenu closeMenu={() => setOpenMenu(!openMenu)} />
              </DropDownMenu>
            )}
          </div>
        ) : (
          <NavLink to={PATH.LOGIN_PAGE}>
            <SuperButton className={style.button_sign_in_navbar} type="submit" title={'Sign In'} />
          </NavLink>
        )}
      </Wrapper>
    </header>
  )
}
