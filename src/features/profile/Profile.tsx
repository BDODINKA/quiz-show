import React from 'react'

import { Navigate, NavLink } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { CustomAlertSnackBar } from '../../common/components/CustomSnackBar/CustomAlertSnackBar'
import EditableSpan from '../../common/components/EditableSpan/EditableSpan'
import SuperButton from '../../common/components/superButton/SuperButton'
import { LoginPage, PackCardsPage } from '../../common/routes/const-routes'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/customHooks'

import style from './profile.module.css'
import { LogOutTC, UpdateUserProfile } from './profile.reducer'

const selectProfile = (state: RootStateType) => state.profile.profile
const selectStatus = (state: RootStateType) => state.app.status
const selectError = (state: RootStateType) => state.app.error

export const Profile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)

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
      <CustomAlertSnackBar status={status} message={error} autoHideDuration={6000} />
    </div>
  )
}
