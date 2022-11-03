import React from 'react'

import SuperButton from '../../common/components/SuperButton/SuperButton'
import styleDefault from '../packCards/TitleAndButtonPack.module.css'

type PropsType = {
  titlePack: string
  titleButton: string
  image?: any
  onClick: () => void
  style?: { [key: string]: string }
}

export const TitleAndButtonPack: React.FC<PropsType> = ({
  titlePack,
  titleButton,
  image,
  onClick,
  style,
}) => {
  const finalClass = style ? style : styleDefault

  return (
    <div className={finalClass.packs_list_header}>
      <div className={finalClass.packs_list_name}>
        {titlePack}
        <span>{image}</span>
      </div>

      <div>
        <SuperButton
          title={titleButton}
          className={finalClass.btn_add_new_pack}
          onClick={onClick}
        />
      </div>
    </div>
  )
}
