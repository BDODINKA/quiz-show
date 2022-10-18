import React, {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from 'react'

import SuperButton from '../superButton/SuperButton'
import SuperInput from '../superInputText/SuperInput'

type PropsType = {
  title?: string
  classNameInput?: string
  classNameSpan?: string
  classNameBtn?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const EditableSpan = (props: PropsType) => {
  const { className } = props
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string | undefined>(props.title)

  const editModeHandler = (value: boolean) => {
    setEditMode(value)
  }
  const editTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const classNameBtn = className ? `${className}${props.classNameBtn}` : `${className}`
  const classNameSpan = props.classNameSpan ? `${className}${props.className}` : `${className}`
  const classNameInput = props.classNameInput ? `${className}${props.className}` : `${className}`

  return editMode ? (
    <div>
      <SuperInput value={title} className={classNameInput} onChange={editTitleHandler} />
      <SuperButton title={'save'} className={classNameBtn} onClick={() => editModeHandler(false)} />
    </div>
  ) : (
    <span className={classNameSpan} onClick={() => editModeHandler(true)}>
      {title}
    </span>
  )
}

export default EditableSpan
