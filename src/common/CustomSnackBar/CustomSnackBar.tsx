import React from 'react'

import { AlertColor, ThemeProvider } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { themeSnackBar } from './Theme'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <ThemeProvider theme={themeSnackBar}>
      <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />
    </ThemeProvider>
  )
})

type PropsType = {
  status?: AlertColor
  message?: string
  closeHandlerSnackbar?: () => void
}

export const CustomAlertSnackBar = (props: PropsType) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    props.closeHandlerSnackbar && props.closeHandlerSnackbar()
  }

  return (
    <>
      <Snackbar
        open={!!props.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.status} sx={{ width: '300px' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  )
}
