import React from 'react'

import { NavLink } from 'react-router-dom'

import back from '../../../assets/img/404/404.png'
import { SuperButton } from '../SuperButton/SuperButton'
import { Wrapper } from '../Wrapper/Wrapper'

import style from './NotFound404.module.scss'

export const PageNotFound = () => {
  return (
    <Wrapper className={style.block}>
      <div className={style.content}>
        <h1 className={style.title}>Ooops!</h1>
        <p className={style.description}>Sorry! Page not found!</p>
        <NavLink to={'/'} className={style.btn__link}>
          <SuperButton title={'Back to home page'} className={style.btn} />
        </NavLink>
      </div>
      <img src={back} alt="background" />
    </Wrapper>
  )
}
