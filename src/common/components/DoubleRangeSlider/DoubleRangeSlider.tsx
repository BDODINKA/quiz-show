import React from 'react'

import { Box, Slider } from '@mui/material'

type PropsType = {
  valueLabel?: string
  initialValue: number[]
  getValue?: (value: number | number[]) => void
  currentValue: number[]
}

export const DoubleRangeSlider = (props: PropsType) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    props.getValue && props.getValue(newValue)
  }

  return (
    <Box sx={{ width: 155 }}>
      <Slider
        value={props.currentValue}
        onChange={handleChange}
        min={props.initialValue[0]}
        max={props.initialValue[1]}
      />
    </Box>
  )
}
