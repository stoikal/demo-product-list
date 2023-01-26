import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6338A1'
    },
    secondary: {
      main: '#EC4927'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px'
        }
      }
    }
  }
})
