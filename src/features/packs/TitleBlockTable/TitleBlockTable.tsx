import React, { useState } from 'react'

import { ReactComponent as ImgBtn } from '../../../assets/svg/dotsBtn.svg'
import { DropDownMenu } from '../../../common/components/DropDownMenu/DropDownMenu'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { Wrapper } from '../../../common/components/Wrapper/Wrapper'

import style from './TitleBlockTable.module.scss'

type PropsType = {
  titlePack: string
  titleButton: string
  dropMenu?: boolean
  onClick?: () => void
  deckCoverImg?: string
  deleteModal?: () => void
  navigateToLearn?: () => void
  changeModal?: () => void
}

export const TitleBlockTable: React.FC<PropsType> = ({
  titlePack,
  titleButton,
  dropMenu,
  onClick,
  deckCoverImg,
  changeModal,
  deleteModal,
  navigateToLearn,
}) => {
  const [openMenu, setOpenMenu] = useState(false)

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
    <Wrapper>
      <div className={style.container}>
        <div className={style.titleBlock}>
          <div className={style.title}>{titlePack}</div>
          {deckCoverImg && <img className={style.img} src={deckCoverImg} alt="picture" />}
          {dropMenu && <ImgBtn onClick={open} className={style.btnImg} />}
          {openMenu && (
            <DropDownMenu closeMenu={() => setOpenMenu(!openMenu)} className={''}>
              <ul>
                <li onClick={deleteHandler}>Delete</li>
                <li onClick={editHandler}>Edit</li>
                <li onClick={learnHandler}>Learn</li>
              </ul>
            </DropDownMenu>
          )}
        </div>
        <div>
          <SuperButton title={titleButton} className={style.btn} onClick={onClick} />
        </div>
      </div>
    </Wrapper>
  )
}
