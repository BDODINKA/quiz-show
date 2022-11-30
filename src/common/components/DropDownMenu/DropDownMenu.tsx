import React from 'react'

type PropsType = {
  closeMenu: () => void
  children: React.ReactNode
  className: string
}

export const DropDownMenu = (props: PropsType) => {
  return (
    <nav onMouseLeave={() => props.closeMenu()} className={props.className}>
      {props.children}
    </nav>
  )
}
