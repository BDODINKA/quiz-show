import React from 'react'

import { Alert, AlertColor } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

import { useAppDispatch } from '../../app/store'
import { SetResetStateTC } from '../../features/forgot-pass/forgot-password.reducer'

type PropsType = {
  status?: AlertColor
  message?: string
}

export const AlertSnackBar = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const status = props.status === 'info' ? undefined : props.status

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(SetResetStateTC())
  }

  return (
    <>
      <Snackbar open={!!props.message} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  )
}
