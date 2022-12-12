import React from 'react'

import style from './Wrapper.module.scss'

type PropsType = {
  children: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

export const Wrapper = (props: PropsType) => {
  const { className, onMouseLeave } = props
  const finalClassName = props.className ? `${className} ${style.container}` : `${style.container}`

  return (
    <section className={finalClassName} onMouseLeave={onMouseLeave}>
      {props.children}
    </section>
  )
}
