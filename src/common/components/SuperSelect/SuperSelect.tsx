import React, { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import style from './SuperSelect.module.scss'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

export const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o, i) => {
        return (
          <option className={style.option} key={o + '-' + i} value={o}>
            {o}
          </option>
        )
      })
    : []

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e)
    onChangeOption && onChangeOption(e.currentTarget.value)
  }

  return (
    <select className={style.select} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  )
}
