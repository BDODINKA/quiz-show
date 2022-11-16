import React, { ChangeEvent } from 'react'

import { SuperCheckbox } from '../../../../common/components/SuperCheckbox/SuperCheckbox'

import style from './Answer.module.css'

type PropsType = {
  onChangeRadio?: (value: number) => void
  answer: string
}

export const Answer = (props: PropsType) => {
  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeRadio && props.onChangeRadio(Number(e.currentTarget.value))
  }

  return (
    <div>
      <div className={style.title}>
        <strong>{`Answer:`}</strong>
        <p> {props.answer}</p>
      </div>
      <div className={style.radioBox}>
        <label form={'answer'}>Rate yourself:</label>
        <SuperCheckbox
          name={'answer'}
          value={1}
          type={'radio'}
          onChange={onChangeRadio}
        >{`Did not know`}</SuperCheckbox>
        <SuperCheckbox
          name={'answer'}
          type={'radio'}
          value={2}
          onChange={onChangeRadio}
        >{`Forgot`}</SuperCheckbox>
        <SuperCheckbox
          name={'answer'}
          type={'radio'}
          value={3}
          onChange={onChangeRadio}
        >{`A lot of thought`}</SuperCheckbox>
        <SuperCheckbox
          name={'answer'}
          type={'radio'}
          value={4}
          onChange={onChangeRadio}
        >{`Confused`}</SuperCheckbox>
        <SuperCheckbox name={'answer'} type={'radio'} value={5} onChange={onChangeRadio}>
          {`Knew the answer`}
        </SuperCheckbox>
      </div>
    </div>
  )
}
