import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react'

import defaultImage from '../../../assets/img/defaultImage.jpg'

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
  defaultImg: string
  hiddenBtn?: boolean
  classNameBtn?: string
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
  hiddenBtn,

  ...restProps
}) => {
  // const [image, setImage] = useState(defaultImage)
  const [isImageBroken, setIsImageBroken] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // const selectFileHandler = () => {
  //   inputRef && inputRef.current?.click()
  //   inputRef && inputRef.current?.value
  // }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          // setImage(file64)

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
  const finalBtnClassName = `${classNameBtn ? s.btn && classNameBtn : s.btn}`

  const defaultImg = restProps.defaultImg !== '' ? restProps.defaultImg : defaultImage

  return (
    <>
      <img
        src={isImageBroken ? defaultImage : defaultImg}
        style={{ width: '100px' }}
        onError={errorHandler}
        className={finalInputClassName}
        alt="image"
      />
      {!hiddenBtn && (
        <label style={{ height: '100px' }}>
          <input
            type={type}
            onChange={uploadHandler}
            style={{ display: 'none' }}
            ref={inputRef}
            value={''}
          />
          <span title="Upload Image" className={finalBtnClassName} />
        </label>
      )}
      {error && <span className={finalSpanClassName}>{error}</span>}
    </>
  )
}
