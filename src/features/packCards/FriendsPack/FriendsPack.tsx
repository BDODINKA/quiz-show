import React from 'react'

import { TitleAndButtonPack } from '../TitleAndButtonPack'
import style from '../TitleAndButtonPack.module.css'

import { TableFriendsPack } from './TableFriendsPack'

const FriendsPack = () => {
  return (
    <div className={style.packs_list_container}>
      <div className={style.table_container}>
        <TitleAndButtonPack
          titlePack="Friend's Pack"
          titleButton="Learn to pack"
          onClick={() => {}}
        />
        <TableFriendsPack />
      </div>
    </div>
  )
}

export default FriendsPack
