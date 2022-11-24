import React, { useState } from 'react'

import { SuperButton } from '../../../common/components/SuperButton/SuperButton'

import styleDefault from './TitleBlockTable.module.css'

type PropsType = {
  titlePack: string
  titleButton: string
  image?: any
  deckCoverImg?: string
      //onClick: () => void
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

  return (
    <div className={finalClass.packs_list_header}>
      <div className={finalClass.packs_list_name}>
        <div className={styleDefault.packTitle_and_button}>
          <div className={styleDefault.titlePack}>{titlePack}</div>

          <span>{image}</span>
        </div>

        <img className={styleDefault.deckCoverImg} src={deckCoverImg} />
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

// import React from 'react'
//
// import SuperButton from '../../../common/components/SuperButton/SuperButton'
// import s from '../TitleBlockTable/TitleBlockTable.module.css'
//
// import style from './NamePack.module.css'
//
// const NamePack = () => {
//   return (
//       <div className={style.name_pack_container}>
//         <div className={style.content_container}>
//           <div className={style.title}>Name Pack</div>
//           <div className={style.button_add_new_card}>
//             <div className={style.sentence}>
//               This is pack empty. Click add new card to fill this pack
//             </div>
//             <SuperButton title="Add new card" className={s.btn_add_new_pack} />
//           </div>
//         </div>
//       </div>
//   )
// }
//
// export default NamePack
