import React from 'react'

import { NavLink } from 'react-router-dom'

import { Wrapper } from '../Wrapper/Wrapper'

import style from './NotFound404.module.css'

export const PageNotFound = () => {
  return (
    <Wrapper className={style.block}>
      <div className={style.content}>
        <h1 className={style.title}>Page not Found</h1>
        <p className={style.description}>Something Wrong</p>
        <NavLink to={'/'} className={style.btn}>
          ComeBack
        </NavLink>
      </div>
    </Wrapper>
  )
}
