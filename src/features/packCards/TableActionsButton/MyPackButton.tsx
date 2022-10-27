import React from 'react'

import remove from '../../../assets/img/Table/Delete.svg'
import edit from '../../../assets/img/Table/Edit.svg'

export const MyPackButton = () => {
  return (
    <>
      <div>
        <img src={edit} alt="edit" />
      </div>
      <div>
        <img src={remove} alt="remove" />
      </div>
    </>
  )
}
