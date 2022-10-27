import React, { MouseEventHandler } from 'react'

import SuperButton from '../../common/components/SuperButton/SuperButton'
import style from '../packCards/TitleAndButtonPack.module.css'

type PropsType = {
  titlePack: string
  titleButton: string
  image?: any
  onClick: () => void
}

export const TitleAndButtonPack: React.FC<PropsType> = ({
  titlePack,
  titleButton,
  image,
  onClick,
}) => {
  return (
    <div className={style.packs_list_header}>
      <div className={style.packs_list_name}>
        {titlePack}
        <span>{image}</span>
      </div>

      <div>
        <SuperButton title={titleButton} className={style.btn_add_new_pack} onClick={onClick} />
      </div>
    </div>
  )
}
