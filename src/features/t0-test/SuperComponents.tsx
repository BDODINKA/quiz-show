import React from 'react'

import SuperButton from '../../common/superButton/SuperButton'
import SuperCheckbox from '../../common/superCheckbox/SuperCheckbox'
import SuperInput from '../../common/superInputText/SuperInput'

const SuperComponents = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '200px',
        paddingTop: '100px',
      }}
    >
      <SuperInput />
      <SuperCheckbox />
      <SuperButton />
    </div>
  )
}

export default SuperComponents
