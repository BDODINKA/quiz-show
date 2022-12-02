import React from 'react'

import { Navigate, NavLink } from 'react-router-dom'

import { ReactComponent as Arrow } from '../../../assets/svg/arrowProfile.svg'
import { PATH } from '../../routes/const-routes'
import style from '../ArrowBackTo/ArrowBackTo.module.scss'

export const ArrowBackTo = () => {
  return (
    <div className={style.backBlock}>
      <Arrow onClick={() => <Navigate to={PATH.PACK_CARDS_PAGE} />} />
      <NavLink to={PATH.PACK_CARDS_PAGE} className={style.link}>
        Back to Packs List
      </NavLink>
    </div>
  )
}
