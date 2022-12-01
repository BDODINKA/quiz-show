import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

import { useNavigate } from 'react-router-dom'

import { ReactComponent as ProfileLogOutBtn } from '../../assets/svg/logoutBtnProfile.svg'
import { ReactComponent as ProfileLogoBtn } from '../../assets/svg/user.svg'
import { PATH } from '../../common/routes/const-routes'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { LogOutTC } from '../profile/profileReducer'

import style from './header.module.scss'

type PropsType = {
  closeMenu: () => void
} & DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>

export const HeaderMenu = (props: PropsType) => {
  const { className } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const navigateToProfile = () => {
    props.closeMenu()
    navigate(PATH.PROFILE_PAGE)
  }

  const goToLogout = () => {
    props.closeMenu()
    dispatch(LogOutTC())
  }

  return (
    <ul className={className}>
      <li onClick={navigateToProfile}>
        <ProfileLogoBtn className={style.logoBtn} />
        Profile
      </li>
      <li onClick={goToLogout}>
        <ProfileLogOutBtn className={style.logoBtn} />
        Log Out
      </li>
    </ul>
  )
}
