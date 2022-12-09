import React, { useState } from 'react'

import { LinearProgress } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/svg/logo-Incubator.svg'
import { ReactComponent as NoAva } from '../../assets/svg/noAva.svg'
import { DropDownMenu } from '../../common/components/DropDownMenu/DropDownMenu'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../common/components/Wrapper/Wrapper'
import { PATH } from '../../common/routes/const-routes'
import { selectorIsLogin, selectorProfile, selectorStatus } from '../../common/selectors/selectors'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import style from './header.module.scss'
import { HeaderMenu } from './HeaderMenu'

export const Header = () => {
  const isLogin = useAppSelector(selectorIsLogin)
  const profile = useAppSelector(selectorProfile)
  const status = useAppSelector(selectorStatus)

  const navigate = useNavigate()

  const [openMenu, setOpenMenu] = useState(false)

  const name = profile && profile.name
  const avatar = profile && profile.avatar

  const navigateToPacks = () => {
    return navigate(PATH.PACK_CARDS_PAGE)
  }

  return (
    <header className={style.header}>
      <Wrapper className={style.container}>
        <Logo onClick={() => isLogin && navigateToPacks()} className={style.logo} />
        {isLogin ? (
          <div className={style.profileBlock}>
            <NavLink className={style.name} to={PATH.PROFILE_PAGE}>
              {name}
            </NavLink>
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className={style.ava}
                onClick={() => setOpenMenu(!openMenu)}
              />
            ) : (
              <NoAva className={style.ava} />
            )}

            {openMenu && (
              <DropDownMenu onMouseLeave={() => setOpenMenu(!openMenu)} className={style.drop}>
                <HeaderMenu closeMenu={() => setOpenMenu(!openMenu)} className={style.menu} />
              </DropDownMenu>
            )}
          </div>
        ) : (
          <NavLink to={PATH.LOGIN_PAGE}>
            <SuperButton className={style.button} type="submit" title={'Sign In'} />
          </NavLink>
        )}
      </Wrapper>
      {status === 'progress' && <LinearProgress sx={{ width: '100%', height: '4px' }} />}
    </header>
  )
}
