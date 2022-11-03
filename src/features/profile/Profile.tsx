import React from 'react'

import { ArrowBack } from '@material-ui/icons'
import { Navigate, NavLink } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import ArrowBackTo from '../../common/components/ArrowBackTo/ArrowBackTo'
import EditableSpan from '../../common/components/EditableSpan/EditableSpan'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import style from './profile.module.css'
import { LogOutTC, UpdateUserProfile } from './profile.reducer'

const selectProfile = (state: RootStateType) => state.profile.profile
const selectStatus = (state: RootStateType) => state.app.status

export const Profile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectStatus)

  const goToLogout = () => {
    dispatch(LogOutTC())
  }
  const changeName = (name: string) => {
    dispatch(UpdateUserProfile({ name: name, avatar: '' }))
  }

  if (profile === null) {
    return <Navigate to={PATH.LOGIN_PAGE} />
  }

  return (
    <div>
      <div className={style.container}>
        <ArrowBackTo />
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
