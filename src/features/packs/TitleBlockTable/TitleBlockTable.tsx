import React, { useState } from 'react'

import { ReactComponent as DeleteBtn } from '../../../assets/img/Table/Delete.svg'
import { ReactComponent as EditBtn } from '../../../assets/img/Table/Edit.svg'
import { ReactComponent as LearnBtn } from '../../../assets/img/Table/teacher.svg'
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
    <Wrapper className={style.container}>
      <div className={deckCoverImg ? style.titleBlockImg : style.titleBlock}>
        <div className={style.title}>
          {titlePack}
          {dropMenu && <ImgBtn onClick={open} className={style.btnImg} />}
        </div>
        {openMenu && (
          <DropDownMenu closeMenu={() => setOpenMenu(!openMenu)} className={style.drop}>
            <ul className={style.menu}>
              <li onClick={deleteHandler}>
                <DeleteBtn />
                Delete
              </li>
              <li onClick={editHandler}>
                <EditBtn />
                Edit
              </li>
              <li onClick={learnHandler}>
                <LearnBtn />
                Learn
              </li>
            </ul>
          </DropDownMenu>
        )}
        {deckCoverImg && <img className={style.img} src={deckCoverImg} alt="picture" />}
      </div>
      <div>
        <SuperButton title={titleButton} className={style.btn} onClick={onClick} />
      </div>
    </Wrapper>
  )
}
