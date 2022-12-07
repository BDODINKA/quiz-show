import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import style from './SuperButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
  title?: string
  children?: React.ReactNode
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  children,
  title,
  ...restProps
}) => {
  const finalClassName = red ? `${style.red} ${style.default}` : `${className}`

  return (
    <button className={finalClassName} {...restProps}>
      {children && children}
      {title}
    </button>
  )
}
