import '@/styles/globals.css'
import Head from 'next/head'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.object
}
