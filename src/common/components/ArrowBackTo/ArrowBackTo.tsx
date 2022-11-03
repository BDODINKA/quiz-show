import React from 'react'

import { NavLink } from 'react-router-dom'

import style from '../../../features/profile/profile.module.css'
import { PATH } from '../../routes/const-routes'

const ArrowBackTo = () => {
  return (
    <div className={style.backBlock}>
      <NavLink to={PATH.PACK_CARDS_PAGE} className={style.arrow} />
      <NavLink to={PATH.PACK_CARDS_PAGE} className={style.link}>
        Back to Packs List
      </NavLink>
    </div>
  )
}

export default ArrowBackTo
