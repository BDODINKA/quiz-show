import React from 'react'

import { NavLink } from 'react-router-dom'

import style from './NotFound404.module.css'

const PageNotFound = () => {
  return (
    <div className={style.block}>
      <div className={style.content}>
        <h1 className={style.title}>Page not Found</h1>
        <p className={style.description}>Something Wrong</p>
        <NavLink to={'/'} className={style.btn}>
          ComeBack
        </NavLink>
      </div>
    </div>
  )
}

export default PageNotFound
