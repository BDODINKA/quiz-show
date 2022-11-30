import React, { useState } from 'react'

import { DropDownMenu } from '../../../common/components/DropDownMenu/DropDownMenu'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'

import styleDefault from './TitleBlockTable.module.css'

type PropsType = {
  titlePack: string
  titleButton: string
  image?: any
  onClick?: () => void
  deckCoverImg?: string
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
  deckCoverImg,
  changeModal,
  deleteModal,
  navigateToLearn,
}) => {
  const [openMenu, setOpenMenu] = useState(false)

  const finalClass = style ? style : styleDefault

  const open = () => {
    setOpenMenu(!openMenu)
  }

  const editHandler = () => {
    setOpenMenu(!openMenu)
    changeModal && changeModal()
  }

  const deleteHandler = () => {
    setOpenMenu(!openMenu)
    deleteModal && deleteModal()
  }

  const learnHandler = () => {
    setOpenMenu(!openMenu)
    navigateToLearn && navigateToLearn()
  }

  return (
    <div className={finalClass.packs_list_header}>
      <div className={finalClass.packs_list_name}>
        <div className={styleDefault.packTitle_and_button}>
          <div className={styleDefault.titlePack}>{titlePack}</div>
          {deckCoverImg && (
            <img className={styleDefault.deckCoverImg} src={deckCoverImg} alt="picture" />
          )}
        </div>
        <span onClick={open}>
          {image}
          {openMenu && (
            <DropDownMenu closeMenu={() => setOpenMenu(!openMenu)} className={''}>
              <ul>
                <li onClick={deleteHandler}>Delete</li>
                <li onClick={editHandler}>Edit</li>
                <li onClick={learnHandler}>Learn</li>
              </ul>
            </DropDownMenu>
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
