import '@/styles/globals.css'
import Head from 'next/head'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6338A1'
    },
    secondary: {
      main: '#EC4927'
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius: '24px'
        }
      }
    }
  }
})

export default function App ({ Component, pageProps }) {
  useEffect(() => {
    Cookies.set('message', 'hello world')
  })

  return (
    <>
      <Head>
        <title>web-challenge-laksito</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
}
