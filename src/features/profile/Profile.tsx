import React from 'react'

import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import EditableSpan from '../../common/EditableSpan/EditableSpan'
import { PackCards } from '../../common/routes/const-routes'
import SuperButton from '../../common/superButton/SuperButton'

import style from './profile.module.css'

export const Profile = () => {
  // const dispatch = useAppDispatch()
  //@ts-ignore
  const { name, email } = useAppSelector(state => state)

  const goToLogout = () => {
    // dispatch('')
    console.log('logOut')
  }

  return (
    <div className={style.container}>
      <div className={style.backBlock}>
        <NavLink to={PackCards} className={style.arrow} />
        <NavLink to={PackCards} className={style.link}>
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
          text={'name'}
          classNameInput={style.input}
          classNameSpan={style.span}
          classNameBtn={style.saveBtn}
          placeholder={'NickName'}
          classPlaceholder={style.placeholder}
          maxLength={25}
        />
        <p className={style.email}>{'email'}</p>
        <SuperButton onClick={goToLogout} className={style.btn} title={'Log out'} />
      </div>
    </div>
  )
}
