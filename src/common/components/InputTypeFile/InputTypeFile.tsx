import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react'

import defaultImage from '../../../assets/img/defaultImage.jpg'

import style from './InputTypeFile.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputTypeFilePropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
  uploadImage?: (data: string) => void
  defaultImg: string
  hiddenBtn?: boolean
  classNameBtn?: string
  title?: string
}

export const InputTypeFile: React.FC<InputTypeFilePropsType> = ({
  type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  classNameBtn,
  uploadImage,
  title,
  hiddenBtn,

  ...restProps
}) => {
  const [isImageBroken, setIsImageBroken] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          uploadImage && uploadImage(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const errorHandler = () => {
    setIsImageBroken(true)
    alert('Кривая картинка')
  }

  const finalSpanClassName = `${spanClassName ? style.error && spanClassName : ''}`
  const finalInputClassName = `${
    className ? style.superInput && className : error && style.error__input
  }`
  const finalBtnClassName = `${classNameBtn ? style.btn && classNameBtn : style.btn}`

  const defaultImg = restProps.defaultImg !== '' ? restProps.defaultImg : defaultImage

  return (
    <div className={style.container}>
      <div className={style.input__header}>
        <h4 className={style.input__title}>{title}</h4>
        {!hiddenBtn && (
          <label style={{ height: '20px', width: '100px', background: 'transparent' }}>
            <input
              type={type}
              onChange={uploadHandler}
              style={{ display: 'none' }}
              ref={inputRef}
              value={''}
            />
            <span className={finalBtnClassName}>Upload Image</span>
          </label>
        )}
        {error && <span className={finalSpanClassName}>{error}</span>}
      </div>
      <img
        src={isImageBroken ? defaultImage : defaultImg}
        style={{ width: '100px' }}
        onError={errorHandler}
        className={finalInputClassName}
        alt="image"
      />
    </div>
  )
}
