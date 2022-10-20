import React from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import EditableSpan from '../../common/EditableSpan/EditableSpan'
import { LoginPage, PackCardsPage } from '../../common/routes/const-routes'
import SuperButton from '../../common/superButton/SuperButton'

import style from './profile.module.css'
import { LogOutTC, ProfileStateType, UpdateUserProfile } from './profile.reducer'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { profile, status } = useAppSelector<ProfileStateType>(state => state.profile)

  const goToLogout = () => {
    dispatch(LogOutTC())
  }
  const changeName = (name: string) => {
    dispatch(UpdateUserProfile({ name: name, avatar: '' }))
  }

  if (profile === null) {
    return <Navigate to={LoginPage} />
  }

  return (
    <div>
      {status === 'progress' && <LinearProgress sx={{ width: '100%' }} />}
      <div className={style.container}>
        <div className={style.backBlock}>
          <NavLink to={PackCardsPage} className={style.arrow} />
          <NavLink to={PackCardsPage} className={style.link}>
            Back to Packs List
          </NavLink>
        </div>
        <div className={style.card}>
          <h2 className={style.title}>Personal Information</h2>
          <div className={style.avaGroup}>
            <div className={style.ava}></div>
            <div className={style.addAva}></div>
          </div>
          <EditableSpan
            titleBtn={'save'}
            text={profile.name}
            classNameInput={style.input}
            classNameSpan={style.span}
            classNameBtn={style.saveBtn}
            placeholder={'NickName'}
            classPlaceholder={style.placeholder}
            maxLength={25}
            changedText={name => changeName(name)}
          />
          <p className={style.email}>{profile.email}</p>
          <SuperButton
            onClick={goToLogout}
            className={style.btn}
            title={'Log out'}
            disabled={status === 'progress'}
          />
        </div>
      </div>
    </div>
  )
}
