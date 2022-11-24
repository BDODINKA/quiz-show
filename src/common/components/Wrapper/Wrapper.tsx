import React from 'react'

type PropsType = {
  children: React.ReactNode
  className?: string
}

export const Wrapper = (props: PropsType) => {
  return <div className={props.className}>{props.children}</div>
}
