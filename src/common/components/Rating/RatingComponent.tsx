import React from 'react'

import { Rating } from '@mui/material'

import { Nullable } from '../../../types/Nullable'

type PropsType = {
  changeRating: (value: number) => void
  valueRating: number
  disabled: boolean
}

export const RatingComponent = (props: PropsType) => {
  const changeRating = (newValue: Nullable<number>) => {
    newValue && props.changeRating(newValue)
  }

  return (
    <Rating
      disabled={props.disabled}
      name="Rating"
      value={props.valueRating}
      defaultValue={0}
      precision={0.1}
      onChange={(event, newValue) => changeRating(newValue)}
    />
  )
}
