import React, { useState } from 'react'

import { Navigate } from 'react-router-dom'

import { ArrowBackTo } from '../../common/components/ArrowBackTo/ArrowBackTo'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { InputTypeFile } from '../../common/components/InputTypeFile/InputTypeFile'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../common/components/Wrapper/Wrapper'
import { PATH } from '../../common/routes/const-routes'
import { selectorProfile, selectorStatus } from '../../common/selectors/selectors'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import style from './profile.module.css'
import { LogOutTC, UpdateUserProfile } from './profileReducer'

export const Profile = () => {
  const profile = useAppSelector(selectorProfile)
  const status = useAppSelector(selectorStatus)

  const dispatch = useAppDispatch()

  const [image, setImage] = useState('')

  const goToLogout = () => {
    dispatch(LogOutTC())
  }

  const changeName = (name: string) => {
    dispatch(UpdateUserProfile({ name: name, avatar: '' }))
  }

  const changeAva = (ava: string) => {
    setImage(ava)
    if (image && profile) {
      dispatch(UpdateUserProfile({ name: profile.name, avatar: ava }))
    }
  }

  if (profile === null) {
    return <Navigate to={PATH.LOGIN_PAGE} />
  }

  return (
    <Wrapper className={style.container}>
      <ArrowBackTo />
      <div className={style.card}>
        <h2 className={style.title}>Personal Information</h2>
        <div className={style.avaGroup}>
          <InputTypeFile
            type={'file'}
            className={style.ava}
            defaultImg={profile.avatar ? profile.avatar : image}
            uploadImage={changeAva}
          />
        </div>
        <EditableSpan
          titleBtn={'save'}
          text={profile.name}
          classNameInput={style.input}
          classNameSpan={style.span}
          classNameBtn={style.saveBtn}
          placeholder={'NickName'}
          classPlaceholder={style.placeholder}
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
    </Wrapper>
  )
}
