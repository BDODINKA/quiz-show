import React from 'react'

import { Box, Slider } from '@mui/material'

type PropsType = {
  valueLabel?: string
  getValue?: (value: number | number[]) => void
  currentValue: number[]
  minMaxValue: number[]
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
        min={props.minMaxValue[0]}
        max={props.minMaxValue[1]}
      />
    </Box>
  )
}
