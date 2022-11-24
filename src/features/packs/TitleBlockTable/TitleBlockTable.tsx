import React, { useState } from 'react'

import { SuperButton } from '../../../common/components/SuperButton/SuperButton'

import styleDefault from './TitleBlockTable.module.css'

type PropsType = {
  titlePack: string
  titleButton: string
  image?: any
  onClick?: () => void
  style?: { [key: string]: string }
  deleteModal?: () => void
  navigateToLearn?: () => void
  changeModal?: () => void
}

export const TitleBlockTable: React.FC<PropsType> = ({
  titlePack,
  titleButton,
  image,
  onClick,
  style,
  changeModal,
  deleteModal,
  navigateToLearn,
}) => {
  const [openMenu, setOpenMenu] = useState(false)

  const finalClass = style ? style : styleDefault

  const open = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <div className={finalClass.packs_list_header}>
      <div className={finalClass.packs_list_name}>
        {titlePack}
        <span onClick={open}>
          {image}
          {openMenu && (
            <div onMouseLeave={open}>
              <div onClick={changeModal}>change</div>
              <div onClick={deleteModal}>delete</div>
              <div onClick={navigateToLearn}>learn</div>
            </div>
          )}
        </span>
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
