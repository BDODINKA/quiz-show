import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import style from './SuperButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
  title?: string
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  title,
  ...restProps
}) => {
  const finalClassName = red ? `${style.red} ${style.default}` : `${className}`

  return (
    <button className={finalClassName} {...restProps}>
      {title}
    </button>
  )
}
