import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSnackbar } from 'notistack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import auth from '@/services/auth'
import Logo from '@/components/Logo'
import HeaderLogin from '@/assets/header-login.png'
import HeaderSplash from '@/assets/header-splash.png'

export default function Login () {
  const [username, setUsername] = useState('kminchelle')
  const [password, setPassword] = useState('0lelplR')

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const submit = (e) => {
    e.preventDefault()

    auth.login({ username, password })
      .then((res) => {
        router.push('/')
      })
      .catch(() => {
        enqueueSnackbar('Incorrect username or password!', { variant: 'error' })
      })
  }

  return (
    <main>
      <Stack minHeight="100vh">
        <Stack
          direction="row"
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
          p={{ xs: 6, sm: 3 }}
          mb={5}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: {
                sm: 'none'
              },
              zIndex: -9
            }}
          >
            <Image
              src={HeaderLogin}
              width={132}
            />
          </Box>
          <Logo />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              display: {
                xs: 'none',
                sm: 'block'
              },
              zIndex: -9
            }}
          >
            <Image
              src={HeaderSplash}
            />
          </Box>
        </Stack>

        <Box flexGrow={{ xs: 1, sm: 0 }}>
          <Box
            sx={{
              p: 2,
              boxShadow: {
                xs: 0,
                sm: 1
              },
              borderRadius: 2,
              maxWidth: {
                sm: 600 - 32
              },
              margin: '0 auto',
              mb: 2,
              background: 'white'
            }}
          >

            <form onSubmit={submit}>
              <Typography variant="h5" component="h1">
                Login
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  mb: 3
                }}
              >
                Please sign in to continue.
              </Typography>

              <TextField
                value={username}
                label="Username"
                variant="standard"
                fullWidth
                sx={{ mb: 3 }}
                onChange={(e) => setUsername(e.target.value)}
              />

              <br/>

              <TextField
                value={password}
                label="Password"
                type="password"
                variant="standard"
                fullWidth
                sx={{ mb: 3 }}
                onChange={(e) => setPassword(e.target.value)}
              />

              <br/>

              <Box
                sx={{
                  textAlign: 'right',
                  mb: 2
                }}
              >
                <LoadingButton
                  variant="contained"
                  disableElevation
                  type="submit"
                >
                  LOGIN
                </LoadingButton>
              </Box>
            </form>
          </Box>
        </Box>

        <Typography textAlign="center" pb={4}>
          Don&apos;t have an account?&nbsp;
          <Link href="/signup">
            Sign Up
          </Link>
        </Typography>
      </Stack>
    </main>
  )
}
