import React from 'react'

import { NavLink } from 'react-router-dom'

import { ReactComponent as ArrowBack } from '../../../assets/svg/arrowProfile.svg'
import { PATH } from '../../routes/const-routes'

import style from './ArrowBackTo.module.scss'

export const ArrowBackTo = () => {
  return (
    <div className={style.block}>
      <NavLink to={PATH.PACK_CARDS_PAGE}>
        <ArrowBack className={style.arrow} />
      </NavLink>
      <NavLink to={PATH.PACK_CARDS_PAGE} className={style.link}>
        Back to Packs List
      </NavLink>
    </div>
  )
}
