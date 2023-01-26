import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: '#6338A1',
    secondary: '#ec4927'
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
