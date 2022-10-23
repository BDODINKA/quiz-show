import * as React from 'react'

import { AlertColor, ThemeProvider } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { Nullable } from '../../../types/Nullable'
import { useAppDispatch } from '../../../utils/hooks/customHooks'

import { themeSnackBar } from './Theme'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <ThemeProvider theme={themeSnackBar}>
      <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />
    </ThemeProvider>
  )
})

export type SnackBarType = AlertColor | 'progress'

type PropsType = {
  status: Nullable<SnackBarType>
  message: Nullable<string>
  closeHandlerSnackbar?: () => void
  autoHideDuration: number
}

export const CustomAlertSnackBar = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const { status, message, closeHandlerSnackbar, autoHideDuration } = props

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppStatusAC(null))
    dispatch(setAppErrorAC(null))
    closeHandlerSnackbar && closeHandlerSnackbar()
  }
  const Snack = status !== 'progress' && status !== null ? status : undefined

  return (
    <Snackbar
      open={!!Snack}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={Snack} sx={{ width: '300px' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
