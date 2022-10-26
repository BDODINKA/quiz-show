import React, {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from 'react'

import SuperButton from '../SuperButton/SuperButton'
import SuperInput from '../SuperInputText/SuperInput'

type PropsType = {
  text?: string
  classNameInput?: string
  classNameSpan?: string
  classNameBtn?: string
  classPlaceholder?: string
  titleBtn?: string
  changedText?: (text: string) => void
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const EditableSpan = (props: PropsType) => {
  const {
    classPlaceholder,
    maxLength,
    classNameSpan,
    classNameInput,
    classNameBtn,
    titleBtn,
    placeholder,
    changedText,
  } = props
  const [editMode, setEditMode] = useState<boolean>(false)
  const [text, setText] = useState<string | undefined>(props.text)
  const [touchCount, setTouchCount] = useState<number>(1)
  const editModeHandler = (value: boolean) => {
    setEditMode(value)
    if (!value) {
      if (text) changedText && changedText(text)
    }
  }

  const editTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const countTouchHandler = (count: number) => {
    if (count === 2) {
      setEditMode(true)
      setTouchCount(1)
    } else {
      setTouchCount(touchCount + 1)
    }
  }

  return editMode ? (
    <>
      <span className={classPlaceholder}>{placeholder}</span>
      <SuperInput
        value={text}
        maxLength={maxLength}
        className={classNameInput}
        onChange={editTitleHandler}
        onBlur={() => editModeHandler(false)}
        autoFocus={true}
      />
      <SuperButton
        title={titleBtn}
        className={classNameBtn}
        onClick={() => editModeHandler(false)}
      />
    </>
  ) : (
    <span
      className={classNameSpan}
      onDoubleClick={() => editModeHandler(true)}
      onTouchStart={() => countTouchHandler(touchCount)}
    >
      {text}
      <span></span>
    </span>
  )
}

export default EditableSpan
