import React from 'react'

import { TitleAndButtonPack } from '../TitleAndButtonPack'
import style from '../TitleAndButtonPack.module.css'

import dots from './../../../assets/img/Table/dots.svg'
import s from './MyPack.module.css'
import { TableMyPack } from './TableMyPack'

export const MyPack = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleAndButtonPack
          titlePack="My Pack"
          titleButton="Add new card"
          image={<img className={s.dots} src={dots} alt="dots" />}
          onClick={() => {}}
        />
        <TableMyPack />
      </div>
    </div>
  )
}
