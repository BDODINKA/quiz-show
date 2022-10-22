import { createTheme } from '@mui/material'

export const themeSnackBar = createTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          ':hover': {
            color: '#1900ff',
            border: 'none',
          },
        },
      },
    },
  },
})
