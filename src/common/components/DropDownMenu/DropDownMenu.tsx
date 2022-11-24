import React from 'react'

type PropsType = {
  closeMenu: () => void
  children: React.ReactNode
}

export const DropDownMenu = (props: PropsType) => {
  return (
    <nav onMouseLeave={() => props.closeMenu()} {...props}>
      {props.children}
    </nav>
  )
}
