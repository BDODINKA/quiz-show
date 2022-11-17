import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react'

import defaultImage from '../../../assets/img/defaultImage.jpg'
import SuperButton from '../SuperButton/SuperButton'

import s from './InputTypeFile.module.css'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputTypeFilePropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
  uploadImage: (data: string) => void
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
  uploadImage,

  ...restProps
}) => {
  const [image, setImage] = useState(defaultImage)
  const [isImageBroken, setIsImageBroken] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setImage(file64)
          uploadImage(file64)
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

  const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
  const finalInputClassName = `${s.superInput} ${className ? className : error && s.errorInput}`

  return (
    <div>
      <img
        src={isImageBroken ? defaultImage : image}
        style={{ width: '100px' }}
        onError={errorHandler}
        className={finalInputClassName}
        alt="image"
      />
      <label>
        <input type={type} onChange={uploadHandler} style={{ display: 'none' }} ref={inputRef} />
        <SuperButton title="Upload Image" onClick={selectFileHandler} type="submit" />
      </label>
      {error && <span className={finalSpanClassName}>{error}</span>}
    </div>
  )
}
