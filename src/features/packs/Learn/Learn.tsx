import React, { useEffect } from 'react'

import ArrowBackTo from '../../../common/components/ArrowBackTo/ArrowBackTo'
import style from '../TitleBlockTable/TitleBlockTable.module.css'

import styles from './Learn.module.css'
import { LearnCard } from './LearnCard/LearnCard'

const Learn = () => {
  useEffect(() => {}, [])

  return (
    <div className={style.packs_list_container}>
      <ArrowBackTo />
      <div className={styles.box}>
        <div className={styles.title}>
          <h2>{`Learn “Pack Name”`}</h2>
        </div>
        <LearnCard />
      </div>
    </div>
  )
}

export default Learn
