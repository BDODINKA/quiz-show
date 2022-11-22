import React, { useEffect, useMemo } from 'react'

import { createPortal } from 'react-dom'

const modalRoot = document.querySelector('#modal')

type PropsType = {
  children: React.ReactNode
  open: boolean
}

export const PortalModal = (props: PropsType) => {
  const element = useMemo(() => {
    const divElement = document.createElement('div')

    divElement.className = 'modal_element'

    return divElement
  }, [])

  useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(element)
    }

    return () => {
      modalRoot && modalRoot.removeChild(element)
    }
  }, [])

  return <>{props.open ? createPortal(props.children, element) : null}</>
}
