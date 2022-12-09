import React from 'react'

type PropsType = {
  children: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

export const DropDownMenu = (props: PropsType) => {
  const { onClick, onMouseLeave, className } = props

  return (
    <nav onMouseLeave={onMouseLeave} onClick={onClick} className={className}>
      {props.children}
    </nav>
  )
}
