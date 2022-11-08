import React, { ChangeEvent } from 'react'

import { SuperCheckbox } from '../../../../common/components/SuperCheckbox/SuperCheckbox'

import style from './Answer.module.css'

type PropsType = {
  onChangeRadio?: (value: string) => void
}

export const Answer = (props: PropsType) => {
  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeRadio && props.onChangeRadio(e.currentTarget.value)
  }

  return (
    <div>
      <div className={style.title}>
        <strong>{`Answer:`}</strong>
        <p> {`This is how "This" works in JavaScript`}</p>
      </div>
      <div className={style.radioBox}>
        <label form={'answer'}>Rate yourself:</label>
        <SuperCheckbox
          name={'answer'}
          value={'Did not know'}
          type={'radio'}
          onChange={onChangeRadio}
        >{`Did not know`}</SuperCheckbox>
        <SuperCheckbox
          name={'answer'}
          type={'radio'}
          value={'Forgot'}
          onChange={onChangeRadio}
        >{`Forgot`}</SuperCheckbox>
        <SuperCheckbox
          name={'answer'}
          type={'radio'}
          value={'A lot of thought'}
          onChange={onChangeRadio}
        >{`A lot of thought`}</SuperCheckbox>
        <SuperCheckbox
          name={'answer'}
          type={'radio'}
          value={'Confused'}
          onChange={onChangeRadio}
        >{`Confused`}</SuperCheckbox>
        <SuperCheckbox
          name={'answer'}
          type={'radio'}
          value={'Knew the answer'}
          onChange={onChangeRadio}
        >
          {`Knew the answer`}
        </SuperCheckbox>
      </div>
    </div>
  )
}
