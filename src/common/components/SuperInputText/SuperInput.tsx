import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react'

import style from './SuperInput.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
}

export const SuperInput: React.FC<SuperInputTextPropsType> = ({
  type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)

    onChangeText && onChangeText(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e)

    onEnter && e.key === 'Enter' && onEnter()
  }

  const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
  const finalInputClassName = `${style.superInput} ${
    className ? className : error && style.errorInput
  }`

  return (
    <>
      <input
        type={type}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
      <div className={finalSpanClassName}>{error && <span>{error}</span>}</div>
    </>
  )
}
