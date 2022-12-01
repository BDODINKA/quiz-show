import React from 'react'

import style from './Wrapper.module.scss'

type PropsType = {
  children: React.ReactNode
  className?: string
}

export const Wrapper = (props: PropsType) => {
  const className = props.className ? `${props.className} ${style.container}` : `${style.container}`

  return <div className={className}>{props.children}</div>
}
