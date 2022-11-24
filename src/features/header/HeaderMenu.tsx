import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../common/routes/const-routes'
import { useAppDispatch } from '../../utils/hooks/customHooks'
import { LogOutTC } from '../profile/profileReducer'

type PropsType = {
  closeMenu: () => void
}

export const HeaderMenu = (props: PropsType) => {
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
    <ul>
      <li onClick={navigateToProfile}>Profile</li>
      <li onClick={goToLogout}>Log Out</li>
    </ul>
  )
}
