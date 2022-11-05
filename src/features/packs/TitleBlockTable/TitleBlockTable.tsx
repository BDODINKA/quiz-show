import React from 'react'

import SuperButton from '../../../common/components/SuperButton/SuperButton'

import styleDefault from './TitleBlockTable.module.css'

type PropsType = {
  titlePack: string
  titleButton: string
  image?: any
  onClick: () => void
  style?: { [key: string]: string }
}

export const TitleBlockTable: React.FC<PropsType> = ({
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